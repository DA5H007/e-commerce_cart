
// ADD TO CART BUTTON HANDLING
const addToCart = document.getElementsByClassName('product-add');
const itemsExist = [];
for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener('click', e => {
        const title = e.target.parentElement.getElementsByClassName('product-title')[0];
        if (itemsExist.includes(title.innerText))
            alert('Item Already in Cart')
        else {
            itemsExist.push(title.innerText);
            const price = e.target.parentElement.getElementsByClassName('product-price')[0];
            const img = e.target.parentElement.getElementsByClassName('product-img')[0];

            // CREATING NEW CART ITEM
            const newItem = document.createElement('div');
            newItem.innerHTML = `
                <div class="flex gap-1 justify-between items-center border-slate-700 border-b-2 py-4
                    text-base sm:text-xl">
                    <div class="flex flex-col sm:flex-row gap-3 items-center w-4/12 justify-center">
                        <img src="${img.src}" class="w-16 sm:w-24">
                        <p class="">${title.innerText}</p>
                    </div>
                    <p class="cart-price w-3/12">${price.innerText}</p>
                    <div class="w-4/12 flex flex-col sm:flex-row items-center gap-3 justify-center">
                        <input type="number" class="cart-quantity w-10 bg-gray-300 border-2 border-blue-500
                            outline-none focus:border-2 focus:border-blue-900">
                        <button class="cart-remove bg-red-500 hover:bg-red-600 duration-300 text-slate-100 
                            rounded-md h-8 w-20 text-base tracking-wide">Remove</button>
                    </div>
                </div>
            `
            newItem.getElementsByClassName('cart-quantity')[0].value = 1;
            document.getElementById('cart').appendChild(newItem);
            updateCartTotal();

            // HANDLING QUANTITY CHANGE OF CART
            const input = document.getElementsByClassName('cart-quantity');
            for (let i = 0; i < input.length; i++) {
                input[i].addEventListener('change', e => {
                    if (isNaN(e.target.value) || e.target.value < 1)
                        e.target.value = 1;
                    else
                        updateCartTotal();
                })
            }

            // HANDLING REMOVE BUTTON
            const remove = document.getElementsByClassName('cart-remove');
            for (let i = 0; i < remove.length; i++) {
                remove[i].addEventListener('click', e => {
                    e.target.parentElement.parentElement.remove();
                    updateCartTotal();
                })
            }
        }
    })
}



// Function to Update Total Value of Cart
const updateCartTotal = () => {
    const price = document.getElementsByClassName('cart-price');
    const quantity = document.getElementsByClassName('cart-quantity');
    let total = 0;
    for (let i = 0; i < price.length; i++) {
        total += parseInt(price[i].innerText.replace('₹', '')) * quantity[i].value;
    }
    document.getElementsByClassName('total')[0].innerText = 'Total ₹' + total;
}