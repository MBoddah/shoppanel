function initSort() {

    const sortSelector = document.querySelector('.sort-selector');

    sortSelector.addEventListener('change', () => {
        let goodsToSort = Array.from(viewedGoods.values());
        let key = sortSelector.value;
        sortGoods(goodsToSort, key);
        console.log(viewedGoods)
    });

    function sortGoods(goods, key) {
        goods.forEach(item => {
            item.remove();
        });
        viewedGoods.clear();

        if ((key == 'pricedown')||(key == 'rate')||(key == 'discount')) {
            if (key == 'pricedown') {
                key = 'price';
            }
            goods.sort(compare);
            goods.reverse()
        } else {
            goods.sort(compare);
        }

        goods.forEach(item => {
            item.render();
        });

        function compare(a, b) {
            if (+a[key] > +b[key]) return 1;
            if (+a[key] == +b[key]) return 0;
            if (+a[key] < +b[key]) return -1;
        }; 
    };
};
