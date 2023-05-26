const studentInfo = {city: ["Göteborg"],
major: "frontend",
answers: [1, 2 , 2, 1, 2, 1, 1, 2, 1, 1]}

console.log(studentInfo)

async function getCompany(){
  const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/admin/companies.json`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data; 
}
console.log(localStorage)
async function getStudent(){
  const studentID = localStorage.getItem("studentId")
  // console.log(studentID)
  const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students/${studentID}.json`

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data)
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
compare()