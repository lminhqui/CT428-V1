function refreshCard() {
    let seller = document.getElementById('seller')
    let Cart = JSON.parse(localStorage.getItem('Cart'))
    Cart.forEach((item) => {
        let price = parseInt(item.obj.price)
        let discount = parseInt(item.obj.discount)
        seller.innerHTML += `<div class="item-product-cart">
                                <div class="item-inner">
                                    <div class="row content-cart">
                                        <div class="product-cart-item-1">
                                            <div class="item-product-inner">
                                                <div class="item-product-img-checkbox">
                                                    <label for="" class="img-checkbox">
                                                        <input type="checkbox" class="check">
                                                    </label>
                                                </div>
                                                <div class="img-product">
                                                    <a href="#" class="intended-img">
                                                        <img src="${
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
                                                price - (price * discount) / 100
                                            }</span>đ
                                            <del class="discout-price">${price}</del>đ
                                        </div>
                                        <div class="product-cart-item-3">
                                            <div class="qty">
                                                <div class="btn-qty">
                                                    <span class="qty-decrese">
                                                        <i class="fas fa-minus"></i>
                                                    </span>
                                                    <input type="tel" class="qty-input" value="1">
                                                    <span class="qty-increse">
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
                                                price - (price * discount) / 100
                                            }</span><span>đ</span></div>
                                        </div>
                                        <div class="product-cart-item-5">
                                            <i class="far fa-trash-alt remove"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    })
}
