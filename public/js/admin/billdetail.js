document.getElementById('btn-handle-bill').addEventListener('click', () => {
    const modal_manage = document.getElementById('modal-manage')
    const bill_id = document.getElementById('bill-id').value
    modal_manage.getElementsByClassName('modal-header')[0].innerHTML =
        'Xử lý đơn hàng'
    modal_manage.getElementsByClassName('modal-body')[0].style.display = 'block'
    modal_manage.getElementsByClassName(
        'modal-body'
    )[0].innerHTML = `<span class="btn btn-success btn_add_product" >Xử lý</span>`
    $('#modal-manage').modal('show')
    const btn_add_product =
        modal_manage.getElementsByClassName('btn_add_product')[0]
    btn_add_product.addEventListener('click', () => {
        fetch('/admin/bill/xuly?id=' + bill_id, {
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
                modal_manage.getElementsByClassName('modal-body')[0].innerHTML =
                    data.message
            })
            .catch()
        setTimeout(() => {
            location.reload()
        }, 2000)
    })
})
