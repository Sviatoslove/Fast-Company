export default function objectsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
