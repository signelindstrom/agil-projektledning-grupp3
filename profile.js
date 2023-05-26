const studentGreeting = document.querySelector('#student-greeting');
const studentSchool = document.querySelector('#student-school');
const studentInfo = document.querySelector('#student-info');
const studentAbout = document.querySelector('#student-about');
const studentLink1 = document.querySelector('#student-link1');
const studentLink2 = document.querySelector('#student-link2');
const studentLink3 = document.querySelector('#student-link3');
const editInfoBtn = document.querySelector('#edit-info');

async function getFirebaseData() {
    const url = 'https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students.json';

    const response = await fetch(url);
    const data = await response.json();

    return data
}

// if user is logged in
if (localStorage.getItem('loggedIn') == 'true') {

    getId();
    async function getId() {

        const data = await getFirebaseData();
        const studentArray = Object.values(data);
        const keyArray = Object.keys(data);

        for (let i = 0; i < studentArray.length; i++) {
            const { mail } = studentArray[i];
            if (localStorage.getItem('studentMail') == mail) {
                const studentId = keyArray[i];
                localStorage.setItem('studentId', studentId);
            }
        }
    }

    // display user information
    studentGreeting.innerText = `Hej, ${localStorage.getItem('loggedInStudent')}`;
    studentSchool.innerText = `${localStorage.getItem('studentSchool')}, ${localStorage.getItem('studentProgram')}`;

    studentAbout.innerText = localStorage.getItem('studentAbout');
    studentLink1.value = localStorage.getItem('studentLink1');
    studentLink2.value = localStorage.getItem('studentLink2');
    studentLink3.value = localStorage.getItem('studentLink3');

    // lets user change their information
    let edit = 0;
    editInfoBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        edit++;
        if (edit % 2 == 0) {

            // updates localStorage with updated info
            localStorage.setItem('studentAbout', studentAbout.value);
            localStorage.setItem('studentLink1', studentLink1.value);
            localStorage.setItem('studentLink2', studentLink2.value);
            localStorage.setItem('studentLink3', studentLink3.value);
            const linksArray = [localStorage.getItem('studentLink1'), localStorage.getItem('studentLink2'), localStorage.getItem('studentLink3')]

            studentAbout.disabled = true;
            studentLink1.disabled = true;
            studentLink2.disabled = true;
            studentLink3.disabled = true;
            editInfoBtn.innerText = 'Redigera'

            const updatedInfo = {
                about_me: localStorage.getItem('studentAbout'),
                links: linksArray
            }

            const data = await getFirebaseData();
            const studentArray = Object.values(data);

            // updates database with updated info
            studentArray.forEach((student) => {
                const { mail } = student;
                if (localStorage.getItem('studentMail') == mail) {
                    putUpdatedInfo(updatedInfo);

                    async function putUpdatedInfo(obj) {
                        const url = `https://digitalia-e9f5c-default-rtdb.europe-west1.firebasedatabase.app/students/${localStorage.getItem('studentId')}.json`;

                        const init = {
                            method: 'PATCH',
                            body: JSON.stringify(obj),
                            headers: {
                                'Content-type': "application/json; charset=UTF-8"
                            }
                        }

                        const response = await fetch(url, init);
                        const data = await response.json();
                    }
                }
            })




        } else {
            studentAbout.disabled = false;
            studentLink1.disabled = false;
            studentLink2.disabled = false;
            studentLink3.disabled = false;
            editInfoBtn.innerText = 'Spara'
        }
    })

    // logout user
    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', () =>{
        localStorage.clear();
        localStorage.setItem('loggedIn', false);
        setTimeout(() => {
            location.assign('../index.html')
        }, 200);
    })
}

// if user is not logged in, user is redirected to login/signup-page
else location.assign('login.html')



