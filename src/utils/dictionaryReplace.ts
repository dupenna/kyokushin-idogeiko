import { Dictionary } from "../data/types";

const dictionaryReplace = (params: { str: string, dictionary: Array<Dictionary> }) => {
  const words = params.str.split(' ');
  const dictionaryFound:Array<Dictionary> = [];

  words.map((word, index) => {
    const replaceWith = params.dictionary.filter((item) => item.name === word.toLowerCase())[0]

    if (replaceWith) dictionaryFound[index] = replaceWith;
  });

  return { words, dictionaryFound }
}

export default dictionaryReplace;