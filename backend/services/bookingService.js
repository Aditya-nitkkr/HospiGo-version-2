const DailySlotStatus = require("../models/dailySlotStatusSchema");
const DoctorSlotTemplate = require("../models/doctorSlotTemplateSchema");

const bookSlot = async (doctorId, hospitalId, date, time) => {
  try {
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

   
    const template = await DoctorSlotTemplate.findOne({ doctorId });
    const slotTemplate = template.timeSlots.find((s) => s.time === time);

    if (!slotTemplate) throw new Error("Invalid time slot for this doctor");

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
