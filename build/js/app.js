document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navFija();
    crearGaleria();
    scrollNav();
}

function navFija(){
    const barra = document.querySelector('.header');
    const sobreFest = document.querySelector('.sobreFestival');
    const body = document.querySelector('body');
    window.addEventListener('scroll', function(){
        if (sobreFest.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('bodyScroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('bodyScroll');
        }
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacionPrincipal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const href = e.target.attributes.href.value;
            const seccion = document.querySelector(href);
            seccion.scrollIntoView({behavior:"smooth"}) 
        })
    })
}

function crearGaleria(){
    const galeria = document.querySelector('.galeriaImagenes');
    
    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="/build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="/build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="/build/img/thumb/${i}.jpg" alt="imagenes del festival">
        `
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i){
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="/build/img/grande/${i}.avif" type="image/avif">
        <source srcset="/build/img/grande/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="/build/img/grande/${i}.jpg" alt="imagenes del festival">
        `;
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijarBody')
        overlay.remove();
    }

    const cerrarPhoto = document.createElement('p');
    cerrarPhoto.textContent = 'X';
    cerrarPhoto.classList.add('btnCerrar');
    cerrarPhoto.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijarBody')
        overlay.remove();
    }
    overlay.appendChild(cerrarPhoto);

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijarBody')
}