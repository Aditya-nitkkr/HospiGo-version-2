const DailySlotStatus = require("../models/dailySlotStatusSchema");
const DoctorSlotTemplate = require("../models/doctorSlotTemplateSchema");

const bookSlot = async (doctorId, hospitalId, date, time) => {
  try {
    // this first create the first booking instance in the daily slot status
    // and only update when the first booking , if other patient make the first
    // booking then nothing happen
    await DailySlotStatus.findOneAndUpdate(
      { doctorId, date, time },
      {
        $setOnInsert: {
          hospitalId,
          capacityOverride: null,
          bookedCount: 0,
          isBlocked: false,
        },
      },
      { upsert: true },
    );

    // STEP 2: Look up what the doctor's DEFAULT capacity is for this time,
    // from the template — needed in case no admin override exists.

    const template = await DoctorSlotTemplate.findOne({ doctorId });
    const slotTemplate = template.timeSlots.find((s) => s.time === time);

    if (!slotTemplate) throw new Error("Invalid time slot for this doctor");

    // Atomic conditional increment — this is what prevents overbooking
    const updated = await DailySlotStatus.findOneAndUpdate(
      {
        doctorId,
        date,
        time,
        isBlocked: false,
        $expr: {
          $lt: [
            "$bookedCount",
            { $ifNull: ["$capacityOverride", slotTemplate.defaultCapacity] },
          ],
        },
      },
      { $inc: { bookedCount: 1 } },
      { new: true },
    );

    // console.log("updated ", updated);
    if (!updated) {
      throw new Error("Slot is full, blocked, or unavailable");
    }

    return updated;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  bookSlot,
};
