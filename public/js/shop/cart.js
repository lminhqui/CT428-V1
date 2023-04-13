
refreshCard()
function qty_inputChange(event, id) {
    let quantity = parseInt(event.target.value)
    updateCard(quantity, id)
}
function sumtotal_cart() {
    let Cartstr = localStorage.getItem('Cart')
    let Cart
    let prices = 0
    let discounts = 0
    if (!Cartstr) Cart = []
    else {
        Cart = [].concat(JSON.parse(Cartstr))
    }
    Cart.forEach((item) => {
        let price = parseInt(item.obj.price)
        let quantity = parseInt(item.quantity)
        let discount = parseInt(item.obj.discount)
        prices += price * quantity
        discounts += ((price * discount) / 100) * quantity
    })
    return { prices: prices, discounts: discounts }
}

function addtoCart(obj, id) {
    let Cartstr = localStorage.getItem('Cart')
    let Cart
    if (!Cartstr) Cart = []
    else {
        Cart = [].concat(JSON.parse(Cartstr))
    }
    let flag = false
    for (let index = 0; index < Cart.length; index++) {
        const element = Cart[index]
        if (element.id == id) {
            flag = true
            element.quantity += 1
        }
    }
    if (!flag) {
        Cart.push({ id: id, obj: obj, quantity: 1 })
    }
    localStorage.removeItem('Cart')
    localStorage.setItem('Cart', JSON.stringify(Cart))
    refreshCard()
}
async function increseCart(id) {
    let qty_input = document.getElementById('qty-input-' + id)
    qty_input.value = parseInt(qty_input.value) + 1
    updateCard(parseInt(qty_input.value), id)
}
async function decreseCart(id) {
    let qty_input = document.getElementById('qty-input-' + id)
    qty_input.value = parseInt(qty_input.value) - 1
    updateCard(parseInt(qty_input.value), id)
}
async function updateCard(quantity, id) {
    let Cart = JSON.parse(localStorage.getItem('Cart'))
    await Cart.forEach((item) => {
        if (item.id == id) {
            if (quantity >= 0) item.quantity = quantity
        }
    })
    localStorage.removeItem('Cart')
    localStorage.setItem('Cart', JSON.stringify(Cart))
    refreshCard()
}

async function removeCart(id) {
    let Cart = JSON.parse(localStorage.getItem('Cart'))
    await Cart.forEach((item) => {
        if (item.id == id) {
            let pos = Cart.indexOf(item)
            Cart.splice(pos, 1)
        }
    })
    localStorage.removeItem('Cart')
    localStorage.setItem('Cart', JSON.stringify(Cart))
    refreshCard()
}
function removeAllCart() {
    localStorage.removeItem('Cart')
    refreshCard()
}

async function refreshCard() {
    let seller = document.getElementById('seller')
    let Cart = JSON.parse(localStorage.getItem('Cart'))
    seller.innerHTML = ''

    if (Cart)
        await Cart.forEach((item) => {
            let price = parseInt(item.obj.price)
            let discount = (parseInt(item.obj.discount) * price) / 100
            let quantity = parseInt(item.quantity)
            seller.innerHTML += `<div class="item-product-cart">
                                <div class="item-inner">
                                    <div class="row content-cart">
                                        <div class="product-cart-item-1">
                                            <div class="item-product-inner">
                                                <div class="item-product-img-checkbox">
                                                   
                                                </div>
                                                <div class="img-product">
                                                    <a href="#" class="intended-img">
                                                        <img height='50px' src="${
                                                            item.obj.img
                                                        }"
                                                            alt="Nước Rửa Tay Lifebuoy 500g Sữa Dưỡng ẩm Giúp Chăm Sóc Và Bảo Vệ Khỏi 99.9% Vi Khuẩn Trên Tay">
                                                    </a>
                                                </div>
                                                <div class="content-product">
                                                    <a href="#" class="intended-content">
                                                        ${item.obj.name}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-cart-item-2">
                                            <span class="real-price">${
                                                price - discount
                                            }</span>đ
                                            <del class="discout-price">${price}</del>đ
                                        </div>
                                        <div class="product-cart-item-3">
                                            <div class="qty">
                                                <div class="btn-qty">
                                                    <span class="qty-decrese" onclick="decreseCart('${
                                                        item.id
                                                    }')">
                                                        <i class="fas fa-minus" ></i>
                                                    </span>
                                                    <input type="tel" class="qty-input" id="qty-input-${
                                                        item.id
                                                    }" onchange="qty_inputChange(event,${
                item.id
            })" value=${quantity}>
                                                    <span class="qty-increse" onclick="increseCart('${
                                                        item.id
                                                    }')">
                                                        <i class="fas fa-plus"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <span class="qty-limit">
                                                Chỉ còn 2 sản phẩm
                                            </span>
                                        </div>
                                        <div class="product-cart-item-4">
                                            <div class="final-price"><span class='final-price-value'>${
                                                price * quantity -
                                                discount * quantity
                                            }</span><span>đ</span></div>
                                        </div>
                                        <div class="product-cart-item-5">
                                            <i class="far fa-trash-alt remove" onclick="removeCart('${
                                                item.id
                                            }')"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        })
    let { prices, discounts } = sumtotal_cart() ? sumtotal_cart() : 0
    document.getElementById('prices-value-discount').innerText = discounts + 'đ'
    document.getElementById('prices-value-before').innerText = prices + 'đ'
    document.getElementById('prices-value-final').innerText =
        prices - discounts + 'đ'
}
document
    .getElementById('checkout_form')
    .addEventListener('submit', async (event) => {
        event.preventDefault()
        console.log(event.target)
        fetch(`/cart/checkout`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Cookie: document.cookie,
            },
            body: JSON.stringify({
                items: JSON.parse(localStorage.getItem('Cart')),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if ((data.code = 200)) window.location.replace(data.link)
            })
    })
