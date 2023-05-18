import { corporation, student } from "./scripts/classes.js";

const student1 = new student('James', 'james@bnond.comb', 'Malmö', 'Frontend developer', [1,2,1,2,2,1,1,1,1])
const corporation1 = new corporation('Företag1', 'företag@bongo.com', 'Malmö', 'Frontend Developer', [1,2,1,1,2,1,1,2,1,])
function compareFunction(student, corporation){
  let compatability = 0;
  for(let i = 0; i < corporation.answers.length; i++){
    if(corporation.answers[i] == student.answers[i]){
      console.log("yess")
      compatability++
      console.log(compatability)
    }
  }
  if(compatability >= 7){
    console.log('its a match')
  }else{
    console.log('no match')
  }
}
compareFunction(student1, corporation1)