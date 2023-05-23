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


async function getFirebaseData() {
    const url = 'https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students.json';

    const response = await fetch(url);
    const data = await response.json();

    return data
}


// login/signup
const signupUserBtn = document.querySelector('#signup-user-btn');
const loginUserBtn = document.querySelector('#login-user-btn');

// login
loginUserBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const data = await getFirebaseData();
    const userArray = Object.values(data);

    const loginMail = document.querySelector('#login-mail').value;
    const loginPassword = document.querySelector('#login-password').value;

    console.log(userArray)

    for (let i = 0; i < userArray.length; i++) {
        const { mail, password, first_name } = userArray[i];
        if (loginMail == mail && loginPassword == password) {
            console.log('yes')
            localStorage.setItem('loggedInStudent', first_name);
            setTimeout(() => {
                alert('nu ska du komma till din profil-sida');
            }, 400);
            break;
        }
        else console.log('fel epost/lösenord')
    }
})


// signup
let createNewStudent;
signupUserBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const data = await getFirebaseData();
    const userArray = Object.values(data);

    const signupMail = document.querySelector('#signup-mail').value;

    for (let i = 0; i < userArray.length; i++) {
        const { mail } = userArray[i];
        if (signupMail == mail) {
            console.log('email in use')
            createNewUser = false;
            break;
        }
        else if (signupMail != mail) {
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

    // adds new user to database
    if (createNewStudent == true) {
        const addNewStudent = {
            mail: signupMail,
            password: signupPassword,
            first_name: firstName,
            last_name: lastName,
            about_me: aboutMe,
            links: linkArray
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

        setTimeout(() => {
            alert('nu bör en ny användare vara skapad')
        }, 400);

    }
})