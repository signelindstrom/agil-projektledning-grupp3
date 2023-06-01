async function getCompany() {
  const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/admin/companies.json`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getStudent() {
  const studentID = localStorage.getItem("studentId");
  const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students/${studentID}.json`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function compare() {
  const companies = await getCompany();
  const student = await getStudent();
  for (let i = 0; i < companies.length; i++) {
    let isReq = compareReq(
      student.matchingValues.lookingFor,
      companies[i].companyLookingFor
    );;
    if (isReq) {
      isReq = compareCity(
        student.matchingValues.cities,
        companies[i].companyCity
      );
    }
    if (isReq) {
      compareAnswers(
        student.matchingValues.answers,
        companies[i].companyChoices
      );
    }
    if (isReq) {
      displayCompany(companies[i]);
    }
  }
}

function compareAnswers(studentAnswers, companyAnswers) {
  let compatability = 0;
  for (let i = 0; i < studentAnswers.length; i++) {
    if (studentAnswers[i] == companyAnswers[`choice${i}`]) {
      compatability++;
    }
  }
  if (compatability >= 7) {

    return true;
  }
  return false;
}
function compareCity(studentCities, companyCity) {
  for (let i = 0; i < studentCities.length; i++) {
    if (studentCities[i] === companyCity) {

      return true;
    }
  }
  return false;
}
function compareReq(studentreq, companyreqarr) {
  for (let i = 0; i < companyreqarr.length; i++) {
    let companyreq = companyreqarr[i];
    if (studentreq === companyreq) {
      return true;
    }
  }
  return false;
}

function displayCompany(company) {

  const contentHolder = document.getElementById("contentHolder");
  let contentDiv = document.createElement("div");
  let imageHolder = document.createElement("img");
  let nameHolder = document.createElement("h4");
  let locationHolder = document.createElement("p");
  let readMoreButton = document.createElement("button");

  nameHolder.innerText = `${company.companyName}`;
  locationHolder.innerText = `${company.companyCity}`;
  imageHolder.src = `${company.companyLogo}`;
  readMoreButton.innerText = "Läs mer";
  
  const readMoreButtonId = "readMoreButton" + company.companyName;
  readMoreButton.id = readMoreButtonId;
  contentDiv.append(imageHolder, nameHolder, locationHolder, readMoreButton);
  contentDiv.classList.add("matchboxtwenty");
  contentHolder.appendChild(contentDiv);

  // klicka på "läs mer"
  document
    .querySelector("#readMoreButton" + company.companyName)
    .addEventListener("click", async () => {
      let companyName = company.companyName;
      const companies = await getCompany();

      function removeModal() {
        const modal = document.getElementById("myModal");
        const modal2 = document.getElementById("myModal2");
        if (modal) {
          modal.remove();
        } else if (modal2) {
          modal2.remove();
        }
      }

      const matchingCompany = companies.find(
        (company) => company.companyName === companyName
      );
      if (matchingCompany) {
        removeModal()
        // MODAL CONTENT
        let modal = document.createElement("div");
        modal.id = "myModal"; 
        modal.classList.add("modal");
        document.body.append(modal);

        let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modal.append(modalContent);

        let span = document.createElement("span");
        span.classList.add("close");
        span.innerText = "x";

        let h2Name = document.createElement("h2");
        h2Name.innerText = matchingCompany.companyName;
        let logo = document.createElement("img");
        logo.classList.add("company-logo-modal");
        logo.src = matchingCompany.companyLogo;
        let logoNameContainer = document.createElement("div");
        let h3About = document.createElement("h3");
        h3About.innerText = "Om oss";
        h3About.id = "h3-about";
        let pAbout = document.createElement("p");
        pAbout.id = "p-about";
        pAbout.innerText = matchingCompany.companyAbout;
        let h3LookingFor = document.createElement("h3");
        h3LookingFor.innerText = "Vi söker";
        let innerContainer = document.createElement("div");
        lookingForContainer = document.createElement("div");
        let pLookingFor = document.createElement("p");
        pLookingFor.innerText = matchingCompany.companyLookingFor;
        let websiteLink = document.createElement("a");
        websiteLink.innerText = "Besök vår webbplats ->";
        websiteLink.href = matchingCompany.companyWebpage;
        lookingForContainer.append(h3LookingFor, pLookingFor);
        innerContainer.append(lookingForContainer, websiteLink);
        innerContainer.id = "inner-container";
        logoNameContainer.append(logo, h2Name);
        logoNameContainer.id = "logo-name-container";
        // antal matchningar här?
        let sendMessageBtn = document.createElement("button");
        sendMessageBtn.innerText = "Skicka meddelande";

        // SLIDESHOW I MODAL

        let slideshowContainer = document.createElement("div");
        slideshowContainer.classList.add("slideshow-container");
        let slide1 = document.createElement("div");
        let slide2 = document.createElement("div");

        slide1.classList.add("mySlides", "fade");
        slide2.classList.add("mySlides", "fade");
        let img1 = document.createElement("img");
        img1.src = matchingCompany.companyImages[0];
        let img2 = document.createElement("img");
        img2.src = matchingCompany.companyImages[1];
        slide1.append(img1);
        slide2.append(img2);

        let prevBtn = document.createElement("a");
        prevBtn.innerText = "<";
        prevBtn.classList.add("prev");
        prevBtn.addEventListener("click", () => {
          plusSlides(-1);
        });

        let nextBtn = document.createElement("a");
        nextBtn.innerText = ">";
        nextBtn.classList.add("next");
        nextBtn.addEventListener("click", () => {
          plusSlides(1);
        });
        slideshowContainer.append(slide1, slide2, prevBtn, nextBtn);

        let slideIndex = 1;
        
        // Next/previous controls
        function plusSlides(n) {
          showSlides((slideIndex += n));
        }
        
        function showSlides(n) {
          let i;
          let slides = document.getElementsByClassName("mySlides");
          
          if (n > slides.length) {
            slideIndex = 1;
          }
          if (n < 1) {
            slideIndex = slides.length;
          }
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }

            slides[slideIndex-1].style.display = "block";
        
        }
        setTimeout(() => {
          showSlides(slideIndex);
        }, 50);
        // SLIDESHOW SLUT

        modalContent.append(
          span,
          logoNameContainer,
          slideshowContainer,
          h3About,
          pAbout,
          innerContainer,
          sendMessageBtn
        );

        modal.style.display = "block";
        

        span.onclick = function () {
          modal.style.display = "none";
          removeModal();
        };

        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
            removeModal();
          }
        };

        sendMessageBtn.addEventListener("click", ()=> {
          removeModal();

          let sendmodal = document.createElement("div");
          sendmodal.id = "myModal2"; 
          sendmodal.classList.add("modal");
          document.body.append(sendmodal);

          let sendmodalContent = document.createElement("div");
          sendmodalContent.classList.add("modal-content");
          sendmodal.append(sendmodalContent);

          let sendSpan = document.createElement("span");
          sendSpan.classList.add("close");
          sendSpan.innerText = "x";

          sendmodal.style.display = "block";

          let sendMessageh3 = document.createElement("h3");
          sendMessageh3.innerText = "Skicka meddelande till " + matchingCompany.companyName;
          let sendMessageForm = document.createElement("form");
          sendMessageForm.id = "send-message-form"
          let textarea = document.createElement("textarea");
          let sendMessageBtn = document.createElement("button");
          sendMessageBtn.innerText = "Skicka meddelande"

          // collapsible
          let tipsBtn = document.createElement("button");
          tipsBtn.innerText = "v   Tips"
          tipsBtn.classList.add("collapsible")
          let tipsContent = document.createElement("div");
          tipsContent.classList.add("content")
          let tipsList = document.createElement("ul");
          tipsContent.append(tipsList);
          tipsList.id ="tips-list"
          let tip1 = document.createElement("li");
          tip1.innerText = "Presentera dig själv kortfattat för företaget.";
          let tip2 = document.createElement("li");
          tip2.innerText = "Skriv här eller i din presentation vilka veckor du söker LIA."
          let tip3 = document.createElement("li");
          tip3.innerText = "Fråga någonting om företaget för att initiera en konversation. Några exempel: Vilka ramverk arbetar de med? Vad får en LIA-praktikant göra när de har LIA hos dem? Vad söker deras team just nu?"
          tipsList.append(tip1, tip2, tip3);

          tipsBtn.addEventListener("click", function() {
          this.classList.toggle("active");

          if (tipsContent.style.display === "block") {
            tipsContent.style.display = "none";
          } else {
            tipsContent.style.display = "block";
          }
        });
          // collapsible end

          sendmodalContent.append(sendSpan, sendMessageh3, tipsBtn, tipsContent, sendMessageForm);
          sendMessageForm.append(textarea, sendMessageBtn);

          sendSpan.onclick = function () {
            sendmodal.style.display = "none";
            removeModal();
          };
  
          window.onclick = function (event) {
            if (event.target == sendmodal) {
              sendmodal.style.display = "none";
              removeModal();
            }
          };
        })
      }
    });
}
compare();
