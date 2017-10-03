export const filterObject = (object, fn) => {
  const keys = Object.keys(object)
  if (!keys.length) return {}
  return keys
    .filter((k) => fn(k, object[k]))
    .reduce((obj, k) => Object.assign(obj, { [k]: object[k] }), {})
}

export const toObject = (snapshot) => ({
  '.key': snapshot.key,
  ...snapshot.val()
})
