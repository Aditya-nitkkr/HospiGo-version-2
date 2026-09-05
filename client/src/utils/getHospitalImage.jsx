import img1 from "";
import img2 from "../assets/hospital-image-2.jpg";
import img3 from "../assets/hospital-image-3.jpg";
import img4 from "../assets/hospital-image-4.jpg";
import img5 from "../assets/hospital-image-5.jpg";
import img6 from "../assets/hospital-image-6.jpg";

const HOSPITAL_IMAGES = [img1, img2, img3, img4, img5, img6];

// Turns any string (like a MongoDB _id) into a stable positive number,
// so the same hospital always maps to the same image index.
function hashStringToIndex(str, arrayLength) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // keep it a 32-bit int
  }
  return Math.abs(hash) % arrayLength;
}

export function getHospitalImage(hospitalId) {
  const index = hashStringToIndex(hospitalId, HOSPITAL_IMAGES.length);
  return HOSPITAL_IMAGES[index];
}