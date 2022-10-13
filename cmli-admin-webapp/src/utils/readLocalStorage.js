export default function readLocalStorage(name) {
  let item = localStorage.getItem(name);
  if (item !== "") {
    return item;
  } else {
    return null;
  }
}
