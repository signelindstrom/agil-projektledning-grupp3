import { corporation, student } from "./scripts/classes.js";

const student1 = new student('James', 'james@bnond.comb', 'Malmö', 'Frontend developer', [1,2,1,2,2,1,1,1,1])
const corporation1 = new corporation('Företag1', 'företag@bongo.com', 'Malmö', 'Frontend Developer', [1,2,1,1,2,1,1,2,1,])
function compareFunction(student, corporation){
  let compatability = 0;
  if(student1.city === corporation1.city){
    for(let i = 0; i < corporation.answers.length; i++){
      if(corporation.answers[i] == student.answers[i] && student1.major === corporation1.requirements){
        console.log("yess")
        compatability++
        console.log(compatability)
      }
    }
    
  }
  if(compatability >= 7){
    console.log('its a match')
  }else{
    console.log('no match')
  }
}

compareFunction(student1, corporation1)

function toggleForm(formId) {
  const form = document.getElementById(formId);
  form.classList.toggle('inactive');
}
function hideAllForms() {
  const forms = document.getElementsByTagName('form');
  for (let i = 0; i < forms.length; i++) {
    forms[i].classList.add('inactive');
  }
}
document.getElementById('btn1').addEventListener('click', function() {
  hideAllForms()
  toggleForm('form1');
});

document.getElementById('btn2').addEventListener('click', function() {
  hideAllForms()
  toggleForm('form2');
});

document.getElementById('btn3').addEventListener('click', function() {
  hideAllForms()
  toggleForm('form3');
});