// Select DOM Items
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State Of menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if(!showMenu) {
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    menuBtn.classList.add('close');
    navItems.forEach(item => item.classList.add('show'));

    showMenu = true;
  } else {
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    menuBtn.classList.remove('close');
    navItems.forEach(item => item.classList.remove('show'));

    showMenu = false;
  }
}
