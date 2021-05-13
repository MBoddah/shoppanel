function initSlider() {
    class sliderItem {
        constructor(imgSrc, alt, parentSelector, itemClass) {
            this.imgSrc = imgSrc;
            this.alt = alt;
            this.parent = document.querySelector(parentSelector);
            this.itemClass = itemClass;
        }

        render() {
            const item = document.createElement('div');
            item.classList.add(this.itemClass);
            item.innerHTML = `
                <img src=${this.imgSrc} class="slider-card-img slider-card-shown" alt=${this.alt}>
            `
            this.parent.append(item);
        }
    }

    new sliderItem(
        'img/ad1.jpg',
        'Хорошее предложение!',
        '.slider-wrapper',
        'slider-card'
    ).render();

    new sliderItem(
        'img/ad2.jpg',
        'Хорошее предложение!',
        '.slider-wrapper',
        'slider-card'
    ).render();

    new sliderItem(
        'img/ad3.jpg',
        'Хорошее предложение',
        '.slider-wrapper',
        'slider-card'
    ).render();

    new sliderItem(
        'img/ad4.jpg',
        'Хорошее предложение',
        '.slider-wrapper',
        'slider-card'
    ).render();

    const slides = document.querySelectorAll('.slider-card');
    const leftButton = document.querySelector('.slider-button-left');
    const rightButton = document.querySelector('.slider-button-right');
    const sliderDotWrapper = document.querySelector('.slider-dots-wrapper');
    const slidesCount = slides.length - 1;
    let sliderDots = [];
    let viewedSlide = 0; 
    let previousSlide = 0;

    for (let i = 0; i <= slidesCount; i++) {                                //Add dots for each slide
        const sliderDot = document.createElement('a');
        sliderDot.classList.add('slider-dot');
        sliderDot.id = 'slider-dot-' + i;
        sliderDotWrapper.append(sliderDot);
        sliderDot.setAttribute('role', 'button');
        sliderDots.push(sliderDot);

        sliderDot.addEventListener('click', () => {
            showSlide(i, slides);                                           //Move slides
            previousSlide = lightDots(i, sliderDots);                       //Highlight dot, get previous slide index
            if (i > previousSlide) {                                        //Check if slides move to right
                lightArrows(i, slidesCount, rightButton, leftButton);
            } else {    
                if (i < previousSlide) {                                    //Else slides move to left
                    lightArrows(i, slidesCount, leftButton, rightButton);
                }
            }
            viewedSlide = i;    
        })
    }

    document.getElementById('slider-dot-0').classList.toggle('slider-toggled-dot');     //Highlight first dot

    leftButton.addEventListener('click', () => {
        viewedSlide--;
        showSlide(viewedSlide, slides);
        lightDots(viewedSlide, sliderDots);
        lightArrows(viewedSlide, slidesCount, leftButton, rightButton);
    })

    rightButton.addEventListener('click', () => {
        viewedSlide++;
        showSlide(viewedSlide, slides);
        lightDots(viewedSlide, sliderDots);
        lightArrows(viewedSlide, slidesCount, rightButton, leftButton);
    })

    function showSlide(slideIndex, slides) {                            //Move all slides
        slides.forEach(slide => {
            slide.style.transform = `translateX(-${slideIndex}00%)`; 
        })
    }

    function lightDots(slideIndex, dots) {                              //Highlight new dot, return index of previous one
        let previousDotIndex;
        dots.forEach( (dot, index) => {
            if ( dot.classList.contains('slider-toggled-dot') ) {       //Turn off highlight of previous dot
                dot.classList.toggle('slider-toggled-dot');
                previousDotIndex = index;
            }
        })
        dots[slideIndex].classList.toggle('slider-toggled-dot');      //Highlight of viewed dot
        return previousDotIndex;
    }

    function lightArrows(slideIndex, slidesCount, clickedArrow, anotherArrow) {
        let outsideIndex;
        if (clickedArrow.classList.contains('slider-button-left')) {         //Check if left button is clicked
            outsideIndex = 0;
        } else {
            if (clickedArrow.classList.contains('slider-button-right')) {    //Check if right button is clicked
                outsideIndex = slidesCount;
            }
        }
        if (slideIndex == outsideIndex) {                                    //Hide button if viewed outside slide
            clickedArrow.classList.toggle('slider-button-show');
        } 
        if ( !anotherArrow.classList.contains('slider-button-show')) {       //Show another button if one has been clicked
            anotherArrow.classList.toggle('slider-button-show');
        }
    }
}