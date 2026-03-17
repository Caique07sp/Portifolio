
//Esse é para mostrar em qual menu o usuario esta
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; 
        const sectionId = current.getAttribute('id');

        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}


window.addEventListener('scroll', scrollActive);

// Esse é o menu mobile
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navLinksMobile = document.querySelectorAll('.nav a');


if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });
}


navLinksMobile.forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    const icon = navToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
}));


//Essa é para o scroll da tela
const sr = ScrollReveal({
    origin: 'top',      
    distance: '60px',   
    duration: 2000,     
    delay: 200,         
    reset: false   
});


sr.reveal('.hero-text', { origin: 'left' });
sr.reveal('.hero-img', { origin: 'right', delay: 400 });

sr.reveal('.about-img', { origin: 'left' });
sr.reveal('.about-text', { origin: 'right', delay: 400 });


sr.reveal('.skill-card', { interval: 200 });


sr.reveal('.section-title', {});
sr.reveal('.project-card', { interval: 200, origin: 'bottom' });


sr.reveal('.contact-text-content', { origin: 'left' });
sr.reveal('.contact-visual', { origin: 'bottom', delay: 500 });



// Digitação automatica
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.typewriter');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait);
}


/* Botao voltar ao topo */
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
   
    if (this.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollTop);

/* Trocar cor */
const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'fa-sun'; 


const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');


const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun';


if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme);
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme);
}


themeButton.addEventListener('click', () => {
    
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);
    

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});