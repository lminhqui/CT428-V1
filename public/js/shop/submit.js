async function submit(event) {
    let formData = new FormData(event.target)
    console.log(formData.values())
    let data= Object.fromEntries(formData)
    let resp = await fetch(event.target.action, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data), // event.target is the form
    })
    let msg = await resp.json() // or resp.text() or whatever the server sends
    let ModalLabel = document.getElementById('ModalLabel')
    let modal_header = document.getElementsByClassName('modal-header')
    if (msg.code == 200) {
        modal_header[0].style.color = 'white '
        modal_header[0].style.backgroundColor = 'green'
        ModalLabel.innerText = 'Thành công'
    } else {
        modal_header[0].style.color = 'white'
        modal_header[0].style.backgroundColor = 'red'
        ModalLabel.innerText = 'Lỗi'
    }
    let modalMsg = document.getElementById('modalMsg')
    modalMsg.innerText = msg.message

    $('#Modal').modal('show')
    return msg.code
}
export { submit }
