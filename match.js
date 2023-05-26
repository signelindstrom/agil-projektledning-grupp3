
async function getCompany(){
  const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/admin/companies.json`;

    const response = await fetch(url);
    const data = await response.json();
    return data; 
}

async function getStudent(){
  const studentID = localStorage.getItem("studentId")
  const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students/${studentID}.json`
  const response = await fetch(url);
  const data = await response.json();
  return data; 
}

async function compare(){
  const companies = await getCompany()
  const student = await getStudent()
  console.log(student)
  for(let i = 0; i < companies.length; i++){
    let isReq = compareReq(student.matchingValues.lookingFor, companies[i].companyLookingFor)
    console.log(isReq)
    if(isReq){
      isReq = compareCity(student.matchingValues.cities, companies[i].companyCity)
      console.log(student.matchingValues.cities)
    }
    console.log(isReq)
    if(isReq){
      compareAnswers(student.matchingValues.Answers, companies[i].companyChoices)
    }
    if(isReq){
      displayCompany(companies[i])
    }
  }
}

function compareAnswers(studentAnswers, companyAnswers){
  console.log(studentAnswers)
  let compatability = 0
  for(let i = 0; i < studentAnswers.length; i++){
    if(studentAnswers[i] == companyAnswers[`choice${i}`]){
      console.log(studentAnswers[i], companyAnswers[`choice${i}`])
      compatability++
    }
  }
  if(compatability >= 7){
    console.log("match")
    return true
  }else{
    console.log("no match")
  }
  return false
}
function compareCity(studentCities, companyCity){
  // console.log(studentCities.length)
  for(let i = 0; i < studentCities.length; i++){
    if(studentCities[i] === companyCity){
      console.log(studentCities)
      console.log(companyCity)
      return true
    }else{
      console.log("try again lmao")
    }
  }
  return false
}
function compareReq(studentreq, companyreqarr){
  // console.log(studentreq)
  for(let i = 0; i < companyreqarr.length; i++){
    let companyreq = companyreqarr[i]
    if(studentreq === companyreq){
      return true
    }
  }
  return false
}

function displayCompany(company){
  console.log(company.companyImages[0])
  const contentHolder = document.getElementById('contentHolder')
  let contentDiv = document.createElement('div')
  let imageHolder = document.createElement('img')
  let nameHolder = document.createElement('h4')
  let locationHolder = document.createElement('p')
  let button = document.createElement('button')
  nameHolder.innerText = `${company.companyName}`
  locationHolder.innerText = `${company.companyCity}`
  imageHolder.src = `${company.companyImages[0]}`
  button.innerText = "Läs mer"
  contentDiv.appendChild(imageHolder)
  contentDiv.appendChild(nameHolder)
  contentDiv.appendChild(locationHolder)
  contentDiv.appendChild(button)
  contentDiv.classList.add('matchboxtwenty')
  contentHolder.appendChild(contentDiv)
}
compare()