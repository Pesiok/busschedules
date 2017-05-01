"use strict";

//priv variables
let translated = 0;
let slideCounter = 0;

class Slider {
    constructor(slider, slides) {
        this.slider = slider;
        this.slides = slides;
        this.translateValue = 100 / slides.length;
    }

    slide(value) {
        const currentSlide = this.slides[slideCounter];
        const nextSlide = this.slides[slideCounter + 1];
        const prevSlide = this.slides[slideCounter - 1];

        switch(value) {
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
                this.slides.forEach((element, index) => {
                    if (index == 0) {
                        element.classList.add("selection__content--active");
                    } else {
                        element.classList.remove("selection__content--active");
                    }
                });
            }
            break;
            default: {
                console.log("Incorrect input value");
            }
        }

        this.slider.style.transform = `translateX(${translated}%)`;
    }

}

export default Slider;