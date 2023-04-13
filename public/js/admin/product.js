let btn_delete_products = document.getElementsByClassName('btn-delete-product')
for (let index = 0; index < btn_delete_products.length; index++) {
    const element = btn_delete_products[index]
    element.addEventListener('click', (e) => {
        const modal_manage = document.getElementById('modal-manage')
        modal_manage.getElementsByClassName('modal-header')[0].innerHTML =
            'Xóa hàng hóa'
        modal_manage.getElementsByClassName('modal-body')[0].style.display =
            'block'
        modal_manage.getElementsByClassName('modal-body')[0].innerHTML = `
                                    
                                    <span class="btn btn-danger btn_add_product" >Xóa</span>`
        $('#modal-manage').modal('show')
        const btn_add_product =
            modal_manage.getElementsByClassName('btn_add_product')[0]
        btn_add_product.addEventListener('click', () => {
            fetch(`/admin/product/delete?id=${e.target.dataset.id}`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    Cookie: document.cookie,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    modal_manage.getElementsByClassName(
                        'modal-header'
                    )[0].innerHTML = 'Thông Báo'
                    modal_manage.getElementsByClassName(
                        'modal-body'
                    )[0].innerHTML = data.message
                })
                .catch()

            setTimeout(() => {
                location.reload()
            }, 2000)
        })
    })
}
