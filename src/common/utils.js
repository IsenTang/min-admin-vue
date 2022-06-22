/* localstorage get */
export function localGet(data) {
  const result = localStorage.getItem(data);

  try {
    return JSON.parse(result);
  } catch (e) {
    return result;
  }
}

/* localstorage set */
export function localSet(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}
