import { Dictionary } from "../data/types";

const dictionaryReplace = (params: { text: string, dictionary: Array<Dictionary> }) => {
  // const words = params.str.split(' ');
  // const dictionaryFound:Array<Dictionary> = [];

  // words.map((word, index) => {
  //   const replaceWith = params.dictionary.filter((item) => item.name === word.toLowerCase())[0]

  //   if (replaceWith) dictionaryFound[index] = replaceWith;
  // });

  // return { words, dictionaryFound }
  // const words = params.str.split(' ');
  const { text, dictionary } = params;

  const dictionaryFound:Array<Dictionary> = [];

  let newText = text;
  let countFoundedWords = 0;

  dictionary.map(word => {
    if (newText.match(word.name)) {
      newText = newText.replace(word.name, `{${countFoundedWords}}`)
      dictionaryFound[countFoundedWords] = word;
      countFoundedWords++;
    }
  });

  return { newText, dictionaryFound }}

export default dictionaryReplace;