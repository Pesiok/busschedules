"use strict";
//elements
const selectionSlider = document.querySelector(".selection__slider");
const slideContents = [...document.querySelectorAll(".selection__content")];
//variables
let translated = 0;
let slideCounter = 0;

class Slider {
    constructor(translateValue = 25) {
        this.translateValue = translateValue;
    }

    slide(value) {
        const currentSlide = slideContents[slideCounter];
        const nextSlide = slideContents[slideCounter + 1];
        const prevSlide = slideContents[slideCounter - 1];

        switch (value) {
            case "next": {
                translated -= this.translateValue;
                nextSlide.classList.add("selection__content--active");
                currentSlide.classList.remove("selection__content--active");
                slideCounter++;
                
            }
            break;
            case "prev": {
                translated += this.translateValue;
                prevSlide.classList.add("selection__content--active");
                currentSlide.classList.remove("selection__content--active");
                slideCounter--;
                
            }
            break;
            case "reset": {
                translated = 0;
                slideCounter = 0;
                slideContents.forEach((element, index) => {
                    if (index == 0) {
                        element.classList.add("selection__content--active");
                    } else {
                        element.classList.remove("selection__content--active");
                    }
                });
            }
        }

        selectionSlider.style.transform = `translateX(${translated}%)`;
    }

}

export default Slider;