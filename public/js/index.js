const shadowHeader = () => {
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header');
}

window.addEventListener('scroll', shadowHeader);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () =>{
    const scrollDown = window.scrollY;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionClass.classList.add('active-link');
        }
        else{
            sectionClass.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);