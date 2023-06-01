function toggleForm(formId) {
  const form = document.getElementById(formId);
  form.classList.toggle('inactive');
}
function hideAllForms(formName) {
  const forms = document.getElementsByClassName('kommunForm');
  for (let i = 0; i < forms.length; i++) {
    if(forms[i].id !== formName){
      forms[i].classList.add('inactive');
    }
  }
}
document.getElementById('btn1').addEventListener('click', function(e) {
  e.preventDefault()
  hideAllForms('form1')
  toggleForm('form1');
});

document.getElementById('btn2').addEventListener('click', function(e) {
  e.preventDefault()
  hideAllForms('form2')
  toggleForm('form2');
});

document.getElementById('btn3').addEventListener('click', function(e) {
  e.preventDefault()
  hideAllForms('form3')
  toggleForm('form3');
});


const studentForm = document.getElementById('studentForm')
const matchButton = document.getElementById('submitMatchBtn')

matchButton.addEventListener('click', async(e) => {
  e.preventDefault()
  let option1 = document.querySelector('input[name="option1"]:checked').value;
  let option2 = document.querySelector('input[name="option2"]:checked').value;
  let option3 = document.querySelector('input[name="option3"]:checked').value;
  let option4 = document.querySelector('input[name="option4"]:checked').value;
  let option5 = document.querySelector('input[name="option5"]:checked').value;
  let option6 = document.querySelector('input[name="option6"]:checked').value;
  let option7 = document.querySelector('input[name="option7"]:checked').value;
  let option8 = document.querySelector('input[name="option8"]:checked').value;
  let option9 = document.querySelector('input[name="option9"]:checked').value;
  let option10 = document.querySelector('input[name="option10"]:checked').value;

  const checkboxes = document.getElementsByName('cityChoice[]');
  const cities = [];

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      if(!cities.includes(checkboxes[i].value)){
        cities.push(checkboxes[i].value);
      }
    }
  }
  let studentChoices = {
    answers: {0: option1, 1: option2, 2:option3, 3:option4, 4:option5, 5:option6, 6:option7, 7:option8, 8:option9},
    lookingFor: option10,
    cities
  }
  if(cities.length > 0){
    await putUpdatedInfo(studentChoices)
    window.location.href="matches.html"
  }else{
    alert("Fyll i åtminstone en stad")
  }

})



async function putUpdatedInfo(obj) {
  const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students/${localStorage.getItem('studentId')}/matchingValues.json`;

  const init = {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
          'Content-type': "application/json; charset=UTF-8"
      }
  }

  const response = await fetch(url, init);
  const data = await response.json();
}