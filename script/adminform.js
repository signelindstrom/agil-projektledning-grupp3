import {getCompanyData} from './adminmain.js'

let adminAuth = localStorage.getItem('adminAuth');

if (!adminAuth) {
    location.assign('login.html');
}

document.getElementById('companyForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
  
    // hämtar data från formulär
    let companyName = document.querySelector('input[name="companyName"]').value;
    let companyLogo = document.querySelector('input[name="companyLogo"]').value;
    let companyLocation = document.querySelector('input[name="companyLocation"]').value;
    let companyCity = document.querySelector('input[name="companyCity"]').value;
    let companyAbout = document.querySelector('textarea[name="companyAbout"]').value;
    let companyLookingFor = Array.from(document.querySelectorAll('input[name="companyLookingFor"]:checked')).map(function(checkbox) {
      return checkbox.value;
    });
    let companyImages = Array.from(document.querySelectorAll('input[name="companyImages"]')).map(function(input) {
      return input.value;
    });
    let companyWebpage = document.querySelector('input[name="companyWebpage"]').value;
    let companyChoices = {
      choice1: document.querySelector('input[name="companyChoices.choice1"]:checked').value,
      choice2: document.querySelector('input[name="companyChoices.choice2"]:checked').value,
      choice3: document.querySelector('input[name="companyChoices.choice3"]:checked').value,
      choice4: document.querySelector('input[name="companyChoices.choice4"]:checked').value,
      choice5: document.querySelector('input[name="companyChoices.choice5"]:checked').value,
      choice6: document.querySelector('input[name="companyChoices.choice6"]:checked').value,
      choice7: document.querySelector('input[name="companyChoices.choice7"]:checked').value,
      choice8: document.querySelector('input[name="companyChoices.choice8"]:checked').value,
      choice9: document.querySelector('input[name="companyChoices.choice9"]:checked').value,
      choice10: document.querySelector('input[name="companyChoices.choice10"]:checked').value,
    };
  
    // objekt av all info som skrivits in i formet
    let companyData = {
      companyName: companyName,
      companyLogo: companyLogo,
      companyLocation: companyLocation,
      companyCity: companyCity,
      companyAbout: companyAbout,
      companyLookingFor: companyLookingFor,
      companyImages: companyImages,
      companyWebpage: companyWebpage,
      companyChoices: companyChoices
    };
  
    // lägger in det på rätt index i databasen
    const companiesInDatabase = await getCompanyData();
    const amountOfCompanies = companiesInDatabase.length;
    postCompanyData(companyData,amountOfCompanies)
    .then(
        document.getElementById('companyForm').reset()
    )
  });

   async function postCompanyData(obj,index){
    const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/admin/companies/${index}.json`;
  
    const init = {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    await fetch(url, init);
  }


document.querySelector("#adminLogout").addEventListener("click", ()=> {
  localStorage.clear();
  localStorage.setItem('loggedIn', false);
  setTimeout(() => {
      location.assign('../index.html')
  }, 200);
})