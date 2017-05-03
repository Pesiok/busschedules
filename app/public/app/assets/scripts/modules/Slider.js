"use strict";

//priv variables
let translated = 0;
let slideCounter = 0;

class Slider {
    constructor(slider, slides, transitionTime = 300) {
        this.slider = slider;
        this.slides = slides;
        this.translateValue = 100 / slides.length;
        this.delay = transitionTime;
    }

    slide(value) {
        const currentSlide = this.slides[slideCounter];
        const nextSlide = this.slides[slideCounter + 1];
        const prevSlide = this.slides[slideCounter - 1];

        switch(value) {
            case "next": {
                translated -= this.translateValue;
                nextSlide.classList.add("selection__content--active");
                setTimeout(() => currentSlide.classList.remove("selection__content--active"), this.delay);
                slideCounter++;
                
            }
            break;
            case "prev": {
                translated += this.translateValue;
                prevSlide.classList.add("selection__content--active");
                setTimeout(() => currentSlide.classList.remove("selection__content--active"), this.delay);
                slideCounter--;
                
            }
            break;
            case "reset": {
                translated = 0;
                slideCounter = 0;
                this.slides.forEach((element, index) => {
                    if (index == 0) {
                        setTimeout(() => element.classList.add("selection__content--active"), this.delay);
                    } else {
                        setTimeout(() => element.classList.remove("selection__content--active"), this.delay);
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