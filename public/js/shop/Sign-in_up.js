import { submit } from '/js/shop/submit.js'

const signUpButton = document.getElementById('signUp')
const signInButton = document.getElementById('signIn')
const container = document.getElementById('signIU-container')
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active')
})

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active')
})
document.addEventListener('DOMContentLoaded', function () {
    let signUpform = document.getElementById('signUp-form')

    signUpform.addEventListener('submit', async (event) => {
        event.preventDefault()
        let code = await submit(event)
        if (code == 200)
            setTimeout(() => {
                window.location.replace('/')    
            }, 1000)
    })
    let signInform = document.getElementById('signIn-form')
    signInform.addEventListener('submit', async (event) => {
        event.preventDefault()
        let code = await submit(event)
        if (code == 200)
            setTimeout(() => {
                window.location.replace('/')
            }, 1000)
    })
})
