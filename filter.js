function initFilter() {
    const typeSelector = document.querySelector('.type-selector');
    const vendorSelector = document.querySelector('.vendor-selector');
    const filterButton = document.querySelector('.accept-filters');
    const minPriceSelector = document.querySelector('#min-price');
    const maxPriceSelector = document.querySelector('#max-price');

    filterButton.addEventListener('click', () => {
        let filterProps = {                                          //create object with needed props
            price : {}                                               //create price object inside wich includes min and max value
        }; 

        if (typeSelector.value) {                                     //check if type selected
            filterProps.type = typeSelector.value;                    //add to filter type prop then
        };

        if (vendorSelector.value) {                                   //check if vendor selected
            filterProps.vendor = vendorSelector.value;                //add to filter vender prop then
        };

        if ((isNaN(+minPriceSelector.value))||(!minPriceSelector.value)) {  //check if min price hasnt typed or it hasnt numeric type
            filterProps.price.minPrice = '0';                               //define null then
        } else {
            filterProps.price.minPrice = minPriceSelector.value;            //else define types value
        }

        if ((isNaN(+maxPriceSelector.value) )||(!maxPriceSelector.value)) { //check if max price hasnt typed or it hasnt numeric type
            filterProps.price.maxPrice = '99999999';                        //define 9999999999 then
        } else {
            filterProps.price.maxPrice = maxPriceSelector.value;            //else define typed value
        }

        allGoods.forEach( item => {                 //render hiden goods
            if (!item.isViewed) {
                item.render();
            }
        })

        allGoods.forEach( item => {
            for (let key in filterProps) {          //for each good and each filter prop
                if ((item[key] != filterProps[key])&&(typeof filterProps[key] != 'object')&&(item.isViewed)) {  //check if prop isnt obj and if good hasnt prop and its viewed 
                    item.remove();                  //remove good then
                }
            }

            if (filterProps.price) {                //remove goods with wrong price if it needed
                if (((+item.salePrice || +item.price) < +filterProps.price.minPrice)||((+item.salePrice || +item.price) > +filterProps.price.maxPrice)) { 
                    if (item.isViewed) {
                        item.remove();
                    }
                }
            }

            if (document.querySelector('#check-sales').checked) {       //remove item wich has no discount
                if ((!item.discount)&&(item.isViewed)) {
                    item.remove();
                }
            }
        });
        
        if (viewedGoods.size == 0) {
            alert('Товары не найдены');
        }
    });
    
    typeSelector.addEventListener('change', () => {         //shows only good types which selectod vendor has
        let viewedVendors = [];

        if (vendorSelector.value) {
            vendorSelector.innerHTML = `
            <option value="${vendorSelector.value}">${vendorSelector.value}</option>
            <option value="">Все производители</option>
            `
        } else {
            vendorSelector.innerHTML = '<option value="">Все производители</option>';
        }

        allGoods.forEach( item => {
            if (((!typeSelector.value)||(item.type == typeSelector.value))&&((viewedVendors.indexOf(item.vendor) == -1))) {
                vendorSelector.innerHTML += `
                <option value="${item.vendor}">${item.vendor}</option>`;
                viewedVendors.push(item.vendor);
            }
        });
    });

    vendorSelector.addEventListener('change', () => {       //shows only vendors which produce selectod good types
        let viewedTypes = [];
        if (typeSelector.value) {
            typeSelector.innerHTML = `
            <option value="${typeSelector.value}">${typeSelector.value}</option>
            <option value="">Все категории</option>
            `
        } else {
            typeSelector.innerHTML = '<option value="">Все категории</option>';
        }
        allGoods.forEach( item => {
            if (((!vendorSelector.value)||(item.vendor == vendorSelector.value))&&((viewedTypes.indexOf(item.type) == -1))) {
                typeSelector.innerHTML += `
                <option value="${item.type}">${item.type}</option>`;
                viewedTypes.push(item.type);
            }
        });
    });
}