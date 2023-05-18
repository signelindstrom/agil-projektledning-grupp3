const toggleBtn = document.querySelector('.navbar_togglebutton');
const menu = document.querySelector('.navbar_menu');
const icons = document.querySelector('.navbar_icons');

toggleBtn.addEventListener('click', (e) => {
e.preventDefault();
menu.classList.add("active");
icons.classList.add("active");
})

