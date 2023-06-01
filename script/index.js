const matchBtn = document.querySelector('#match-btn');
const loggedIn = localStorage.getItem('loggedIn');

matchBtn.addEventListener('click', ()=>{
    if(loggedIn == 'true'){
        location.assign('../html/matchform.html');
    }

    else if(loggedIn == 'false'){
        location.assign('../html/login.html')
    }
})

const navLink = document.querySelector('#nav-link');

if(loggedIn == 'true'){
    navLink.innerHTML = 'Min profil'
    navLink.href = '../html/profile.html'

    const nav = document.querySelector('#nav');
    const logout = document.createElement('li');
    nav.append(logout);
    const logoutLink = document.createElement('a');
    logout.append(logoutLink);
    logoutLink.innerText = 'Logga ut';

    // logout user
    logoutLink.addEventListener('click', () =>{
        localStorage.clear();
        localStorage.setItem('loggedIn', false);
        setTimeout(() => {
            location.assign('../index.html')
        }, 200);
    })
}