window.onload = () => {

    let headerLinks = document.querySelectorAll(".navigation  a");
    let pictureBlock = document.querySelector(".portfolio__picture");
    let contactForm = document.querySelector(".get-quote__form");
    let formSubmit = contactForm.querySelector(".form__submit");
    let popUp = document.querySelector(".get-quote__pop-up");
    let popUpBtn = popUp.querySelector(".pop-up__btn");
    let hamburger = document.querySelector(".header__hamburger");
    

    
    let onScroll = event => {
        let curPos = window.scrollY + 105;
        let allSections = document.querySelectorAll("section");

        allSections.forEach( el => {
            if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
                headerLinks.forEach( a => {
                    a.classList.remove("navigation__active");
                    if(el.getAttribute("id") === a.getAttribute("href").substring(1)){
                        a.classList.add("navigation__active");

                    }
                })
            }
        })
    


    }
    document.addEventListener("scroll",onScroll);

    addTagsClickHandler();

    
    pictureBlock.addEventListener("click", event => {
        pictureBlock.querySelectorAll("img").forEach( img => {
            img.classList.remove("picture__active");
        })
        if(event.target.classList.contains("picture")){
            event.target.classList.add("picture__active");
        }
        
    })
    
    contactForm.addEventListener("submit", event => {
        event.preventDefault();
        let inputSubject = contactForm.querySelector(".form__input--subject").value;
        let inputDesc = contactForm.querySelector(".form__input--desc").value;
        let popUpTheme = popUp.querySelector(".pop-up__theme");
        let popUpDesc = popUp.querySelector(".pop-up__desc");
    
        
            popUp.style.display = "block";
            popUpTheme.textContent = `Тема: ${inputSubject}`;
            popUpDesc.textContent = `Описание: ${inputDesc}`;
        if(inputSubject.length == 0){
            popUpTheme.textContent = "Без темы";
        }
        if(inputDesc.length == 0){
            popUpDesc.textContent = "Без описания";
        }
       

    })
    popUpBtn.addEventListener("click", () => {
        popUp.style.display = "none";
        contactForm.reset();
        
    })

    // /////////////slider 
    let itemsSlider = document.querySelectorAll(" .slider-block__imgs");
    let slider = document.querySelector(".slider-block")

    let arrowLeft = document.querySelector(".slider-block__arrow--left");
    let arrowRight = document.querySelector(".slider-block__arrow--right");

    let currentItem = 0;
    let isEnabled = true;
    
    let changeCurrentItem =  function(n) {
        currentItem = (n + itemsSlider.length) % itemsSlider.length;
    }
    let  hideItem = function(direction) {
        isEnabled = false;
        itemsSlider[currentItem].classList.add(direction);
        itemsSlider[currentItem].addEventListener("animationend", function() {
            this.classList.remove("active", direction);
        })
    }
    let showItem = function(direction) {
        itemsSlider[currentItem].classList.add("next", direction);
        itemsSlider[currentItem].addEventListener("animationend", function() {
            if(currentItem == 1) {
               slider.classList.add("slider-block--blue");
            }else{
                slider.classList.remove("slider-block--blue");
            }
            this.classList.remove("next", direction);
            this.classList.add("active");
            isEnabled = true;
        })
    }
    let previousItem = function(n) {
        hideItem("to-right");
        changeCurrentItem(n - 1);
        showItem("from-left");
    }
    let nextItem = function(n) {
        hideItem("to-left");
        changeCurrentItem(n + 1);
        showItem("from-right");
    }
    arrowRight.addEventListener("click", function() {
       if(isEnabled){
            nextItem(currentItem);
       }
    })
    arrowLeft.addEventListener("click", function() {
       if(isEnabled){
           previousItem(currentItem);
       }
    })


    //noactive-phone 
    itemsSlider[0].addEventListener("click",event => {
        if(event.target.classList.contains("iphone-vertical")){
            document.querySelector(".iphone-vertical--active").classList.toggle("iphone-vertical--noactive");
        }
        if(event.target.classList.contains("iphone-horizontal")){
            document.querySelector(".iphone-horizontal--active").classList.toggle("iphone-horizontal--noactive");
        }
    })


    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("hamburger--rotate");
        document.querySelector(".header__navigation").classList.toggle("header__navigation--show");
        document.querySelector(".logo").classList.toggle("logo--show");
        document.querySelector(".overlay--hide").classList.toggle("overlay");
    });

}




let addTagsClickHandler = () => {
    document.querySelector(".portfolio__tags").addEventListener("click", (event) => {
        if(event.target.classList.contains("tag")){
            document.querySelectorAll(".portfolio__tags .tag").forEach(tag => {
                tag.classList.remove("tag--selected");
                tag.classList.add("tag--bordered");
            })

            event.target.classList.add("tag--selected");
            event.target.classList.remove("tag--bordered");

            if(event.target.innerText !== "All"){
                document.querySelectorAll(".portfolio__picture .picture").forEach(img => {
                    img.style.order = `${getRandomInt(0,12)}`;
                })
            }else {
                document.querySelectorAll(".portfolio__picture .picture").forEach(img => {
                    img.style.order = 1;
                })
            }
        }
    });
};


let getRandomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}
