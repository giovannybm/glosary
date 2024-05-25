import words from './data'

export const util = {
    wordsearch:(param:any)=>{
       const word= words.find((el:any)=>el.word.toLowerCase()==param.toLowerCase())
       return word
    }
};
