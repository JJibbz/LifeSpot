let slideIndex = 1;
showSlides(slideIndex);


function currentSlide(n) {
    showSlides(slideIndex = n);
}


function plusSlides(n) {
    showSlides(slideIndex += n);
}


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    console.log(slides);
    // let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.transform = "";
    }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }

    slides[slideIndex - 1].style.display = "block";
    currSlide = slideIndex;
    console.log('currSlide = ' + currSlide);
    // dots[slideIndex - 1].className += " active";
}


let initMouseX;
var currSlide = 1;
let isMonitored;
let distance = 0;
let slides = document.getElementsByClassName("slide");

function startListen() {
    console.log('startListen');
    showSlides(currSlide);
    ssContainer = document.getElementById('slideContainer');

    ssContainer.addEventListener('mousedown', (event) => {
        event.preventDefault();
        console.log('mouse is down');
        isMonitored = true;
        initMouseX = event.clientX;
        ssContainer.addEventListener('mousemove', (e) => {
            let currentMouseX = e.clientX;
            if (isMonitored) {
                distance = currentMouseX - initMouseX;
                let trans = 'translateX(' + distance + 'px)';
                for (i = 0; i < slides.length; i++) {
                    if (slides[i].style.display == "block") {
                        currSlide = i + 1;
                    }
                }

                slides[currSlide - 1].style.transform = trans;
                if (currentMouseX - initMouseX < -200) {
                    initMouseX = currentMouseX;
                    plusSlides(1);
                    currSlide += 1;
                    if (currSlide > 3) { currSlide = 1 }
                }
                if (currentMouseX - initMouseX > 200) {
                    initMouseX = currentMouseX;
                    plusSlides(-1);
                    currSlide -= 1;
                    if (currSlide < 1) { currSlide = 3 }
                }
            }
        });
        ssContainer.addEventListener('mouseup', (e) => {
            isMonitored = false;
            slides[currSlide - 1].style.transform = "";
        });

        ssContainer.addEventListener('mouseleave', (e) => {
            isMonitored = false;
            slides[currSlide - 1].style.transform = "";
        });


    });

    ssContainer.addEventListener('mouseup', (evt) => { evt.preventDefault(); console.log('mouse is up'); });
}