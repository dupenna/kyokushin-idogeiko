import { Dictionary } from "../data/types";

const dictionaryReplace = (params: { text: string, dictionary: Array<Dictionary> }) => {
  const { text, dictionary } = params;

  const dictionaryFound:Array<Dictionary> = [];

  let newText = text;
  let countFoundedWords = 0;

  dictionary.sort((wordA, wordB) => wordB.name.length - wordA.name.length).map(word => {
    if (newText.match(word.name)) {
      newText = newText.replace(word.name, `{${countFoundedWords}}`)
      dictionaryFound[countFoundedWords] = word;
      countFoundedWords++;
    }
  });

  return { newText, dictionaryFound }}

export default dictionaryReplace;