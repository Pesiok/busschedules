"use strict";

class Slider {
    constructor(elements, transitionTime = 300) {
        //const variables
        this.elements = elements;
        this.translateValue = 100 / elements.slides.length;
        this.delay = transitionTime;
        //working variables
        this.translated = 0;
        this.slideCounter = 0;
        this.toggled = false;
    }

    slide(value) {
        const currentSlide = this.elements.slides[this.slideCounter];
        const nextSlide = this.elements.slides[this.slideCounter + 1];
        const prevSlide = this.elements.slides[this.slideCounter - 1];

        switch(value) {
            case "start": {
                this.toggleButtons();
                this.slide("next");
            }
            break;
            case "next": {
                this.translated -= this.translateValue;
                nextSlide.classList.add("selection__content--active");

                setTimeout(() => currentSlide.classList.remove("selection__content--active"), this.delay);
                this.slideCounter++;
                
            }
            break;
            case "prev": {
                this.translated += this.translateValue;
                prevSlide.classList.add("selection__content--active");
                setTimeout(() => currentSlide.classList.remove("selection__content--active"), this.delay);
                this.slideCounter--;
                if (this.slideCounter === 0) this.toggleButtons();
                
            }
            break;
            case "reset": {
                //reseting to the initial state of the slider
                this.translated = 0;
                this.slideCounter = 0;
                this.elements.slides.forEach((element, index) => {
                    if (index == 0) {
                        setTimeout(() => element.classList.add("selection__content--active"), this.delay);
                    } else {
                        setTimeout(() => element.classList.remove("selection__content--active"), this.delay);
                    }
                });
                this.toggleButtons();
            }
            break;
            default: {
                console.log(`Input "${value}" is incorrect!`);
            }
        }
        //translate slides in the slider
        this.elements.slider.style.transform = `translateX(${this.translated}%)`;
    }

    toggleButtons(delay = 250) {
        const backBtn = this.elements.back,
        resetBtn = this.elements.reset;

        // show Buttons: first = active, second = show
        // hide Buttons: first = show, second = active
        const first  = this.toggled ? "show" : "active",
        second = this.toggled ? "active" : "show";

        backBtn.classList.toggle(`slider-navigation__button--${first}`);
        resetBtn.classList.toggle(`slider-navigation__button--${first}`);

        setTimeout(() => {
            backBtn.classList.toggle(`slider-navigation__button--${second}`);
            resetBtn.classList.toggle(`slider-navigation__button--${second}`);
        }, delay);

        //changing value to the opposite
        this.toggled = !this.toggled;
    }

}

export default Slider;