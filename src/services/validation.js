export const url = str => {
  try {
    new URL(str)
    return true
  } catch (err) {
    return false
  }
}
