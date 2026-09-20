// Array of root-relative URL paths to the public directory
const HOSPITAL_IMAGES = [
  "/Hospitals-images/hospital-image-1.jpg",
  "/Hospitals-images/hospital-image-2.jpg",
  "/Hospitals-images/hospital-image-3.jpg",
  "/Hospitals-images/hospital-image-4.jpg",
  "/Hospitals-images/hospital-image-5.jpg",
  "/Hospitals-images/hospital-image-6.jpg",
];

function hashStringToIndex(str, arrayLength) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash) % arrayLength;
}

export function getHospitalImage(hospitalId) {
  if (!hospitalId) return HOSPITAL_IMAGES[0];
  const index = hashStringToIndex(String(hospitalId), HOSPITAL_IMAGES.length);
  return HOSPITAL_IMAGES[index];
}