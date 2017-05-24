"use strict";

class Slider {
    constructor(elements, blockCssClass, navigationCssClass = null, transitionTime = 300) {
        //const variables
        this.elements = elements;
        this.blockCssClass = blockCssClass;
        this.navigationCssClass = navigationCssClass;
        this.translateValue = 100 / elements.slides.length;
        this.delay = transitionTime;
        //working variables
        this.translated = 0;
        this.slideCounter = 0;
        this.areBtnsToggled = false;
        this.isSliderReseted = true;
    }

    slide(value) {
        const currentSlide = this.elements.slides[this.slideCounter];
        const nextSlide = this.elements.slides[this.slideCounter + 1];
        const prevSlide = this.elements.slides[this.slideCounter - 1];

        switch(value) {
            case "start": {
                this.isSliderReseted = false;
                if (this.navigationCssClass) this.toggleButtons();
                this.slide("next");
            }
            break;
            case "next": {
                this.translated -= this.translateValue;
                nextSlide.classList.add(`${this.blockCssClass}__content--active`);

                setTimeout(() => currentSlide.classList.remove(`${this.blockCssClass}__content--active`), this.delay);
                this.slideCounter++;
                
            }
            break;
            case "prev": {
                this.translated += this.translateValue;
                prevSlide.classList.add(`${this.blockCssClass}__content--active`);
                setTimeout(() => currentSlide.classList.remove(`${this.blockCssClass}__content--active`), this.delay);
                this.slideCounter--;

                if (this.slideCounter === 0) {
                    if (this.navigationCssClass) this.toggleButtons();
                    this.isSliderReseted = true;
                }
                
            }
            break;
            case "reset": {
                //reseting to the initial state of the slider
                this.isSliderReseted = true;
                this.translated = 0;
                this.slideCounter = 0;
                this.elements.slides.forEach((element, index) => {
                    if (index == 0) {
                        setTimeout(() => element.classList.add(`${this.blockCssClass}__content--active`), this.delay);
                    } else {
                        setTimeout(() => element.classList.remove(`${this.blockCssClass}__content--active`), this.delay);
                    }
                });
                if (this.navigationCssClass) this.toggleButtons();
            }
            break;
            default: {
                console.log(`whaa input "${value}" is incorrect!`);
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
        const first  = this.areBtnsToggled ? "show" : "active",
        second = this.areBtnsToggled? "active" : "show",
        navigationClass = this.navigationCssClass;

        if (backBtn) backBtn.classList.toggle(`${navigationClass}__button--${first}`);
        if (resetBtn) resetBtn.classList.toggle(`${navigationClass}__button--${first}`);

        setTimeout(() => {
            if (backBtn) backBtn.classList.toggle(`${navigationClass}__button--${second}`);
            if (resetBtn) resetBtn.classList.toggle(`${navigationClass}__button--${second}`);
        }, delay);

        //changing value to the opposite
        this.areBtnsToggled = !this.areBtnsToggled;
    }

}

export default Slider;