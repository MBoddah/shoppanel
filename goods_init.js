function initGoods() {

    class good {
        constructor(imgSrc, type, vendor, model, price, props, parentSelector, itemClass, marks, rate, discount) {
            this.imgSrc = imgSrc;
            this.alt = type + '' + vendor;
            this.type = type;
            this.vendor = vendor;
            this.model = model;
            this.price = price;
            this.props = props;
            this.parent = document.querySelector(parentSelector);
            this.itemClass = itemClass;
            this.itemId =   (this.vendor + this.model).replace(/[^A-Za-zА-Яа-яЁё]/g, "");
            this.isCarted = false;
            this.marks = +marks;
            this.rate = +rate;
            this.discount = discount;
        }

        render() {
            const item = document.createElement('div');
            item.classList.add(this.itemClass);
            item.id = this.itemId;

            if (this.discount) {            //rener goods on sale
                item.innerHTML = `
                <div class="img-box">
                    <img src=${this.imgSrc} alt=${this.alt} class="item-img">
                </div>
                <div class="item-text">
                    <h2 class="item-model-font">${this.model}</h2>
                    <div class="sale-block">
                        <h4 class="old-price">${this.price}</h4>
                        <h3 class="discount">-${this.discount}</h3>
                    </div>
                    <h3 class="item-price">${this.price - this.discount}</h3>
                </div>
                <button class="into-cart-but">В корзину</button>`
            } else {                                                      //render another goods
                item.innerHTML = `
                <div class="img-box">
                    <img src=${this.imgSrc} alt=${this.alt} class="item-img">
                </div>
                <div class="item-text">
                    <h2 class="item-model-font">${this.model}</h2>
                    <h3 class="item-price">${this.price}</h3>
                </div>
                <button class="into-cart-but">В корзину</button>`
            }
            
            this.parent.append(item);
            this.isViewed = true;
            this.dom = this.parent.querySelector(`#${this.itemId}`);
            this.scaleInit()
            this.starInit();
            item.querySelector('.into-cart-but').addEventListener('click', this.addToCart);
            viewedGoods.set(this.itemId, this);
        }

        remove() {
            const item = document.querySelector('#'+this.itemId);
            item.remove();  
            this.isViewed = false;
            viewedGoods.delete(this.itemId)
        }

        addToCart(e) {
            const counter = document.querySelector('.goods-counter');
            if (!this.isCarted) {
                cartedGoods.set(e.target.parentElement.id, this)
                e.target.classList.toggle('but-active');
                this.isCarted = true;
                this.innerHTML = 'В корзине';
            } else {
                cartedGoods.delete(e.target.parentElement.id, this)
                e.target.classList.toggle('but-active');
                this.isCarted = false;
                this.innerHTML = 'В корзину';
            }

            if (cartedGoods.size != 0) {
                counter.classList.remove('hide-div');
                counter.innerHTML = cartedGoods.size;
            } else {
                counter.classList.add('hide-div');
                counter.innerHTML = '';
            }
        }

        scaleInit() {
            let wrap = document.createElement('div');
            this.dom.append(wrap);
            wrap.classList.add('star-wrap');

            for (let i = 1; i <= 5; i++) {
                wrap.innerHTML += `<div class="star" id="star-${i}"></div>`;
            }
        }

        getNumber(event) {
            return event.target.id.substr(-1, 1);
        }

        starInit() {
            const stars = this.dom.querySelectorAll('.star');

            stars.forEach( star=> {
                star.classList.add('star');

                star.addEventListener('mouseover', (e)=> {
                    let number = +this.getNumber(e);

                    for (let i = 0; i < number; i++) {
                        stars[i].classList.add('star-hovered');
                    }
                });

                star.addEventListener('mouseout', (e)=> {
                    let number = +this.getNumber(e);

                    for (let i = 0; i < number; i++) {
                        stars[i].classList.remove('star-hovered');
                    }
                });

                star.addEventListener('click', (e)=> {
                    let number = +this.getNumber(e);

                    for (let i = 0; i < number; i++) {
                        stars[i].classList.add('star-active');
                    }

                    for (let i = number; i < 5; i++) {
                        stars[i].classList.remove('star-active');
                    }
                    console.log(this.rate)
                    console.log(this.marks)
                    this.rate = ((this.rate * this.marks) + number) / (this.marks + 1);
                    this.marks++;
                    console.log(this.rate)
                    console.log(this.marks)

                });
            })
        }
    }

    allGoods.push(new good(
        'img/huaweilap.jpg',
        'Ноутбуки',
        'Huawei',
        'Huawei MateBook D14 Nbl-WAQ9R Space Grey',
        '51990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '5',
        '4.4',
        ''
    ));

    allGoods.push(new good(
        'img/applelap.jpg',
        'Ноутбуки',
        'Apple',
        'Apple MacBook Air 13 i5 1.8/8Gb/128SSD',
        '74990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '22',
        '4.8',
        ''
    ));

    allGoods.push(new good(
        'img/samsungtv.jpg',
        'Телевизоры',
        'Samsung',
        'Samsung UE55TU7170U',
        '44990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '10',
        '4.0',
        '7000'
    ));

    allGoods.push(new good(
        'img/hplap.jpg',
        'Ноутбуки',
        'HP',
        'HP 15-db1277ur 286T6EA',
        '42990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '17',
        '4.1',
        '5000'
    ));

    allGoods.push(new good(
        'img/lgtv.jpg',
        'Телевизоры',
        'LG',
        '49NANO816NA',
        '59990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '5',
        '2.4',
        ''
    ));

    allGoods.push(new good(
        'img/applephone.jpg',
        'Смартфоны',
        'Apple',
        'Apple iPhone 12 128GB Green (MGJF3RU/A)',
        '84990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '32',
        '4.9',
        '4000'
    ));

    allGoods.push(new good(
        'img/sonytv.jpg',
        'Телевизоры',
        'Sony',
        'Sony KD-55XH9077',
        '99990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '11',
        '4.2',
        '12000'
    ));


    allGoods.push(new good(
        'img/samsungphone.jpg',
        'Смартфоны',
        'Samsung',
        'Samsung Galaxy A51',
        '19990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '10',
        '4.5',
        ''
    ));

    allGoods.push(new good(
        'img/sonyheadphones.jpg',
        'Наушники',
        'Sony',
        'Sony WI-C310 Gold',
        '1990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '1',
        '3.0',
        ''
    ));

    allGoods.push(new good(
        'img/huaweiphone.jpg',
        'Смартфоны',
        'Huawei',
        'Huawei Y8p Breathing Crystal (AQM-LX1)',
        '14990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '2',
        '5.0',
        '1500'
    ));

    allGoods.push(new good(
        'img/appleheadphones.jpg',
        'Наушники',
        'Apple',
        'Apple AirPods w/Charging Case (MV7N2RU/A)',
        '12990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '23',
        '4.7',
        ''
    ));

    allGoods.push(new good(
        'img/hpscreen.jpg',
        'Мониторы',
        'HP',
        'HP X24c (9FM22AA)',
        '13990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '2',
        '3.0',
        ''
    ));

    allGoods.push(new good(
        'img/huaweiheadphones.jpg',
        'Наушники',
        'Huawei',
        'Huawei Freebuds 3i Ceramic White (Walrus-CT025)',
        '7990',
        'SOMEPROPS',
        '.good-list',
        'good-card',
        '3',
        '4.9',
        '1000'
    ));

    allGoods.push(new good(
        'img/lgscreen.jpg',
        'Мониторы',
        'LG',
        'LG 24MK600M-B',
        '10990',
        'SOMEPROPS',
        '.good-list',
        '7',
        '4.2',
        'good-card',
        ''
    ));

    allGoods.forEach(item => {
        item.render();
    });
}