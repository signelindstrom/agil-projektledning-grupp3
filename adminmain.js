export async function getCompanyData(){
    const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/admin/companies.json`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

let allCompaniesContainer = document.querySelector('#allCompaniesContainer');

displayCompanies();

async function displayCompanies() {
    let companies = await getCompanyData();

    allCompaniesContainer.innerHTML = '';

    companies.forEach(company => {
        let companyDiv = document.createElement("div");
        allCompaniesContainer.append(companyDiv);
        let companyNameText = document.createElement("p");
        let deleteBtn = document.createElement("button");
        companyDiv.append(companyNameText, deleteBtn);
        companyNameText.innerText = company.companyName;
        deleteBtn.innerText = "Ta bort företag";
        deleteBtn.id = company.companyName;

        
        deleteBtn.addEventListener("click", () => {
            let index = companies.findIndex(c => c.companyName == company.companyName)

            deleteCompany(index)
            .then(displayCompanies)
        })
    });
}

async function deleteCompany(index){
    const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/admin/companies/${index}.json`;

    const init = {
        method: "DELETE",
      };
      await fetch(url, init);
}