import { getCookie } from '/js/admin/function.js'

document
    .getElementById('avatar')
    .addEventListener('change', function fileupload(event) {
        let files = Array.from(event.target.files)
        let avatar = document.getElementById('avatar')
        var img = document.getElementById('temp_img')
        let list_img = files.reduce((pre, cur) => {
            return `${pre}<img id = 'temp_img' src = "${URL.createObjectURL(
                cur
            )}" alt = "" height = "100px" >`
        }, ``)
        let img_list = document.getElementById('img_list')
        img_list.innerHTML = list_img
        console.log(list_img)
    })
document.getElementById('btn-add-category').addEventListener('click', () => {
    const modal_manage = document.getElementById('modal-manage')
    modal_manage.getElementsByClassName('modal-header')[0].innerHTML = 'Thêm'
    modal_manage.getElementsByClassName('modal-body')[0].style.display = 'block'
    modal_manage.getElementsByClassName('modal-body')[0].innerHTML = `
                                <label for="">Thêm Loại Hàng Hóa</label>
                                <input type="text" class="form-control CategoryName" name="CategoryName" id="input_add_product" aria-describedby="helpId" placeholder="">
                                <br>
                                <span class="btn btn-success btn_add_product" >Thêm</span>`
    $('#modal-manage').modal('show')
    const btn_add_product =
        modal_manage.getElementsByClassName('btn_add_product')[0]
    btn_add_product.addEventListener('click', () => {
        const categoryname =
            modal_manage.getElementsByClassName('CategoryName')[0].value

        fetch('/admin/productCategory/create', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Cookie: document.cookie,
            },
            body: JSON.stringify({ categoryname: categoryname }),
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
        }, 1000)
    })
})
document.getElementById('btn-change-category').addEventListener('click', () => {
    const modal_manage = document.getElementById('modal-manage')
    const category_id = document.getElementById('selected-category').value
    modal_manage.getElementsByClassName('modal-header')[0].innerHTML = 'Sửa'
    modal_manage.getElementsByClassName('modal-body')[0].style.display = 'block'
    modal_manage.getElementsByClassName('modal-body')[0].innerHTML = `
                                <label for="">Sửa Loại Hàng Hóa</label>
                                <input type="text" class="form-control CategoryName" name="CategoryName" id="input_add_product" aria-describedby="helpId" placeholder="">
                                <br>
                                <span class="btn btn-success btn_add_product" >Sửa</span>`
    $('#modal-manage').modal('show')
    const btn_add_product =
        modal_manage.getElementsByClassName('btn_add_product')[0]
    btn_add_product.addEventListener('click', () => {
        const categoryid = document.getElementById('selected-category').value
        const categoryname =
            modal_manage.getElementsByClassName('CategoryName')[0].value
        console.log(categoryname)
        fetch('/admin/productCategory/' + categoryid, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Cookie: document.cookie,
            },
            body: JSON.stringify({ categoryname: categoryname }),
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
        }, 1000)
    })
})
document.getElementById('btn-delete-category').addEventListener('click', () => {
    const modal_manage = document.getElementById('modal-manage')
    const categoryid = document.getElementById('selected-category').value
    modal_manage.getElementsByClassName('modal-header')[0].innerHTML =
        'Xóa Loại Hàng Hóa'
    modal_manage.getElementsByClassName('modal-body')[0].style.display = 'block'
    modal_manage.getElementsByClassName('modal-body')[0].innerHTML = `
                             
                                <span class="btn btn-danger btn_add_product" >Xóa</span>`
    $('#modal-manage').modal('show')
    const btn_add_product =
        modal_manage.getElementsByClassName('btn_add_product')[0]
    btn_add_product.addEventListener('click', () => {
        fetch('/admin/productCategory/delete/' + categoryid, {
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
        }, 1000)
    })
})
//----------------------------------------
document.getElementById('btn-add-provider').addEventListener('click', () => {
    const modal_manage = document.getElementById('modal-manage')
    modal_manage.getElementsByClassName('modal-header')[0].innerHTML = 'Thêm'
    modal_manage.getElementsByClassName('modal-body')[0].style.display = 'block'
    modal_manage.getElementsByClassName('modal-body')[0].innerHTML = `
                                <label for="">Thêm Nhà Cung Cấp Hàng Hóa</label>
                                <input type="text" class="form-control ProviderName" name="ProviderName" id="input_add_product" aria-describedby="helpId" placeholder="">
                                <br>
                                <span class="btn btn-success btn_add_product" >Thêm</span>`
    $('#modal-manage').modal('show')
    const btn_add_product =
        modal_manage.getElementsByClassName('btn_add_product')[0]
    btn_add_product.addEventListener('click', () => {
        const Providername =
            modal_manage.getElementsByClassName('ProviderName')[0].value

        fetch('/admin/productProvider/create', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Cookie: document.cookie,
            },
            body: JSON.stringify({ Providername: Providername }),
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
        }, 1000)
    })
})
document.getElementById('btn-change-provider').addEventListener('click', () => {
    const modal_manage = document.getElementById('modal-manage')
    const providerid = document.getElementById('selected-provider').value
    modal_manage.getElementsByClassName('modal-header')[0].innerHTML = 'Sửa'
    modal_manage.getElementsByClassName('modal-body')[0].style.display = 'block'
    modal_manage.getElementsByClassName('modal-body')[0].innerHTML = `
                                <label for="">Sửa Nhà Cung Cấp Hàng Hóa</label>
                                <input type="text" class="form-control ProviderName" name="ProviderName" id="input_add_product" aria-describedby="helpId" placeholder="">
                                <br>
                                <span class="btn btn-success btn_add_product" >Sửa</span>`
    $('#modal-manage').modal('show')
    const btn_add_product =
        modal_manage.getElementsByClassName('btn_add_product')[0]
    btn_add_product.addEventListener('click', () => {
        const providername =
            modal_manage.getElementsByClassName('ProviderName')[0].value

        fetch('/admin/productProvider/' + providerid, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Cookie: document.cookie,
            },
            body: JSON.stringify({ providername: providername }),
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
        }, 1000)
    })
})
document.getElementById('btn-delete-provider').addEventListener('click', () => {
    const modal_manage = document.getElementById('modal-manage')
    const providerid = document.getElementById('selected-provider').value
    modal_manage.getElementsByClassName('modal-header')[0].innerHTML =
        'Xóa Nhà Cung Cấp   Hàng Hóa'
    modal_manage.getElementsByClassName('modal-body')[0].style.display = 'block'
    modal_manage.getElementsByClassName('modal-body')[0].innerHTML = `
                             
                                <span class="btn btn-danger btn_add_product" >Xóa</span>`
    $('#modal-manage').modal('show')
    const btn_add_product =
        modal_manage.getElementsByClassName('btn_add_product')[0]
    btn_add_product.addEventListener('click', () => {
        fetch('/admin/productProvider/delete/' + providerid, {
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
        }, 1000)
    })
})
//----------------------------------------
console.log(getCookie('_id'))
document.getElementById('btn-add-provider').addEventListener('click', () => {
    const exampleModalLong = $('#exampleModalLong')
})
