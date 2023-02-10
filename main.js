// Cart

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-icon');

cartIcon.onclick = () =>{
    cart.classList.add('active');
}

closeCart.onclick = () =>{
    cart.classList.remove('active');
}


// working

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else{
    ready();
}

// making function

function ready(){
    let removeCartButtons = document.getElementsByClassName('trash-icon')
    console.log(removeCartButtons)
    for(let i = 0;i < removeCartButtons.length; i++){
        let button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for(let i = 0; i< quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }

    // add cart
    let addCart = document.getElementsByClassName('add-cart')
    for(let i = 0; i < addCart.length; i++){
        let button = addCart[i];
        button.addEventListener('click', addCartClicked)
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// Buy
function buyButtonClicked(){
    alert('Đạt hàng thành công !!!');
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Remove items
function removeCartItem(event){
    let buttonClicked = event.target 
    buttonClicked.parentElement.remove()
    updateTotal();
}

// 
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal();
}

function addCartClicked(event){
    let button = event.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    // console.log(title, price, productImg)
    updateTotal();
}

function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(let i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("Bạn đã thêm sản phẩm này vào giỏ hàng");
        return;
        }
    }
    let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="fa-solid fa-trash trash-icon"></i> `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('trash-icon')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// update total
function updateTotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for(let i = 0;i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("đ", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 1000)/ 1000;
    document.getElementsByClassName('total-price')[0].innerText = total*1000 + 'đ';
}