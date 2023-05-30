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
console.log(studentForm.elements)