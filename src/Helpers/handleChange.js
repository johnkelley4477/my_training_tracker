export default(id, func) => {
  const element = document.getElementById(id);
  if (element !== null)
    func(element.value);
}
