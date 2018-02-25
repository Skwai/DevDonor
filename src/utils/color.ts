export const hexToRGB = (hex: string) => {
  if (hex[0] === '#') {
    hex = hex.substr(1)
  }
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  return { r, g, b }
}

export const getHexBrightness = (hex: string) => {
  const { r, g, b } = hexToRGB(hex)
  return r * 299 + g * 587 + b * 114 / 1000
}
