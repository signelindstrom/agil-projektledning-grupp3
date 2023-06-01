let adminAuth = localStorage.getItem('adminAuth');
let studentLoggedIn = localStorage.getItem('loggedIn')

if (adminAuth) {
    location.assign('admin.html');
} else if (studentLoggedIn) {
    location.assign('profile.html')
}

const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');
loginForm.style.display = 'none'
signupForm.style.display = 'none'

const loginBtn = document.querySelector('#login-btn');
const signupBtn = document.querySelector('#signup-btn');

loginBtn.addEventListener('click', () => {
    signupForm.style.display = 'none'
    loginForm.style.display = 'block'
})

signupBtn.addEventListener('click', () => {
    loginForm.style.display = 'none'
    signupForm.style.display = 'block'
})

// get schools from database 
const selectSchool = document.querySelector('#school-select');
const selectProg = document.querySelector('#prog-select');

async function getSchools() {
    const url = 'https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/schools.json'

    const response = await fetch(url);
    const data = await response.json();
    const schoolArray = Object.keys(data);
    console.log(schoolArray)

    schoolArray.forEach(alt => {
        const opt = document.createElement('option');
        selectSchool.append(opt);
        opt.innerText = alt;
    })
}
getSchools();

let schoolChoice;
selectSchool.addEventListener('change', () => {
    schoolChoice = selectSchool.value;
    console.log(schoolChoice);

    const schoolString = schoolChoice.toString();
    if (schoolString.includes(' ')) {
        const schoolFormatted = schoolString.replace(' ', '%20');
        getProgram(schoolFormatted);
    } else getProgram(schoolString);

})

// get schools programs from database
async function getProgram(school) {
    selectProg.disabled = false;
    selectProg.innerHTML = '';
    console.log(school);
    const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/schools/${school}.json`;

    const response = await fetch(url);
    const data = await response.json();
    const programArray = Object.values(data);

    programArray.forEach(alt => {
        const opt = document.createElement('option');
        selectProg.append(opt);
        opt.innerText = alt;
    })
}


async function getFirebaseData() {
    const url = 'https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students.json';

    const response = await fetch(url);
    const data = await response.json();

    return data
}


// login/signup
const signupUserBtn = document.querySelector('#signup-user-btn');
const loginUserBtn = document.querySelector('#login-user-btn');
localStorage.setItem('loggedIn', 'false');

const errorMessage = document.createElement('p');

// login
loginUserBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    loginForm.append(errorMessage);

    // check for admin-login
    const url = 'https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/admin.json'
    const response = await fetch(url);
    const adminData = await response.json();
    const { mail, password } = adminData;
    const adminMail = mail;
    const adminPassword = password;
    console.log(adminMail, adminPassword)


    const data = await getFirebaseData();
    const userArray = Object.values(data);

    const loginMail = document.querySelector('#login-mail').value;
    const loginPassword = document.querySelector('#login-password').value;

    if (loginMail == adminMail && loginPassword == adminPassword) {
        localStorage.setItem('adminAuth', true);
        setTimeout(() => {
            location.assign('admin.html')
        }, 400);
    }
    else {
        for (let i = 0; i < userArray.length; i++) {
            const { mail, password, first_name, about_me, links, program, school } = userArray[i];
            if (loginMail == mail && loginPassword == password) {
                errorMessage.innerText = ''
                // localStorage user info
                localStorage.setItem('loggedInStudent', first_name);
                localStorage.setItem('studentMail', mail);
                localStorage.setItem('studentPassword', password);
                localStorage.setItem('studentSchool', school);
                localStorage.setItem('studentProgram', program);
                localStorage.setItem('studentAbout', about_me);
                localStorage.setItem('studentLink1', links[0]);
                localStorage.setItem('studentLink2', links[1]);
                localStorage.setItem('studentLink3', links[2]);
                localStorage.setItem('loggedIn', true);
                setTimeout(() => {
                    location.assign('profile.html')
                }, 400);
                break;
            }
            else errorMessage.innerText = 'Fel löserord eller email'
        }
    }


})


// signup
let createNewStudent = false;
signupUserBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    signupForm.append(errorMessage);

    const data = await getFirebaseData();
    const userArray = Object.values(data);

    const signupMail = document.querySelector('#signup-mail').value;

    for (let i = 0; i < userArray.length; i++) {
        const { mail } = userArray[i];
        if (signupMail == mail) {
            errorMessage.innerText = 'Ett konto med den email-adressen finns redan'
            createNewStudent = false;
            break;
        }
        else if (signupMail != mail) {
            errorMessage.innerText = ''
            createNewStudent = true;
        }
    }

    const signupPassword = document.querySelector('#signup-password').value;
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const aboutMe = document.querySelector('#about-me').value;
    const firstLink = document.querySelector('#link1').value;
    const secondLink = document.querySelector('#link2').value;
    const thirdLink = document.querySelector('#link3').value;
    const linkArray = [firstLink, secondLink, thirdLink];

    // adds new student to database
    if (createNewStudent === true) {
        const addNewStudent = {
            mail: signupMail,
            password: signupPassword,
            first_name: firstName,
            last_name: lastName,
            about_me: aboutMe,
            links: linkArray,
            school: selectSchool.value,
            program: selectProg.value
        }

        console.log(addNewStudent)

        postNewUser(addNewStudent);
        async function postNewUser(obj) {
            const url = 'https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students.json';

            const init = {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-type': "application/json; charset=UTF-8"
                }
            }

            const response = await fetch(url, init);
            const data = await response.json();
        }

        // localStorage user info
        localStorage.setItem('loggedInStudent', firstName);
        localStorage.setItem('studentMail', signupMail);
        localStorage.setItem('studentSchool', selectSchool.value);
        localStorage.setItem('studentProgram', selectProg.value);
        localStorage.setItem('studentAbout', aboutMe);
        localStorage.setItem('studentLink1', firstLink);
        localStorage.setItem('studentLink2', secondLink);
        localStorage.setItem('studentLink3', thirdLink);
        localStorage.setItem('loggedIn', true);

        setTimeout(() => {
            location.assign('profile.html')
        }, 400);

    }
})