let product_img_item = document.getElementsByClassName('product-img-item')
for (let index = 0; index < product_img_item.length; index++) {
    const element = product_img_item[index]
    element.addEventListener('mouseenter', (e) => {
        console.log(e.target.src)
        document.getElementById('product-img').src = e.target.src
    })
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
}
document.getElementById('buynow_btn').addEventListener('click', () => {
    product_addtocart()
    setTimeout(() => {
        window.location.replace(`/cart`)
    }, 1000)
})
let modal_header = document.getElementsByClassName('modal-header')
let modalMsg = document.getElementById('modalMsg')
let closemodal = document.getElementById('closemodal')
modalMsg.innerText = "Đã thêm vào giỏ hàng thành công"
document.getElementById('addtocart_btn').addEventListener('click', () => {
    let resultevent = product_addtocart()
    modal_header[0].style.color = 'white '
    modal_header[0].style.backgroundColor = 'green'
    ModalLabel.innerText = 'Thành công'
    $('#Modal').modal('show') 
    setTimeout(() => {
        closemodal.click()
    }, 2000)
})

async function product_addtocart() {
    let product_id = document.getElementById('product_id').value
    console.log(document.getElementById('product_id').value)
    let resultevent
    fetch(`/product/findOne?id=${product_id}`, {
        method: 'get',
        headers: {
            'content-type': 'application/json',
            Cookie: document.cookie,
        },
    })
        .then((response) =>resultevent= response.json())
        .then((data) => {
            addtoCart(
                {
                    img: data.img[0],
                    name: data.name,
                    price: data.price,
                    discount: 0,
                },
                product_id
            )

            console.log(data)
        })
        return resultevent
}
let product = {}