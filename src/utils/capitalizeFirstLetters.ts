const capitalizeFirstLetters = (str: string, onlyFirstLetter: boolean = false) => {
  if (onlyFirstLetter) return str.replace(/(^\w)/g, (c) => c.toUpperCase());
  
  return str.replace(/(^\w)|( \w)/g, (c) => c.toUpperCase());
}

export default capitalizeFirstLetters