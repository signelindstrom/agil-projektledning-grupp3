const studentInfo = {city: ["Malmö", "Göteborg"],
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

async function compare(){
  const companies = await getCompany()
  console.log(companies[1].companyLookingFor)
  for(let i = 0; i < companies.length; i++){
    let isReq = compareReq(studentInfo.major, companies[i].companyLookingFor)
    if(isReq){
      compareCity(studentInfo.city, companies.city)
    }
  }
}

function compareCity(studentCities, companyCity){
  for(let i = 0; i < studentCities.length; i++){
    if(studentCities[i] === companyCity){
      return true
    }
  }
}
function compareReq(studentreq, companyreqarr){
  for(let i = 0; i < companyreqarr.length; i++){
    let companyreq = companyreqarr[i]
    if(studentreq === companyreq){
      return true
    }else{
      return false
    }
  }
}
compare()
