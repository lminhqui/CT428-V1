import { submit } from '/js/shop/submit.js'
document
    .getElementById('Account--navbar--icon')
    .addEventListener('click', () => {
        let Account_navbar = document.getElementById('Account--navbar')
        let blur_account = document.getElementById('blur_account')

        Account_navbar.classList.add('Account--navbar-active')
        blur_account.classList.remove('hidden')
    })

document.addEventListener('DOMContentLoaded', function () {
    let updateacc = document.getElementById('updateacc')
    updateacc.addEventListener('submit', async (event) => {
        event.preventDefault()
        console.log(event)
        let code = await submit(event)
        if (code == 200)
            setTimeout(() => {
                window.location.replace('/account')
            }, 1000)
    })
})