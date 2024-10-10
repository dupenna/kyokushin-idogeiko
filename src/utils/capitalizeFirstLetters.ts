const capitalizeFirstLetter = (str: string) => {
  return str.replace(/(^\w)|( \w)/g, (c) => c.toUpperCase());
}

export default capitalizeFirstLetter