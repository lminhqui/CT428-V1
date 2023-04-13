$(window).scroll(function () {
    let header__bottom = document.getElementsByClassName('header--bottom')[0]
    if (window.pageYOffset > 30) {
        header__bottom.style.position = 'fixed'
        header__bottom.style.top = '0px'
    } else {
        header__bottom.style.top = '0px'
        header__bottom.style.position = 'relative'
    }
})
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.goToTop').fadeIn()
        } else {
            $('.goToTop').fadeOut()
        }
    })

    // scroll body to 0px on click
    $('.goToTop').click(function () {
        $('body,html').animate(
            {
                scrollTop: 0,
            },
            1000
        )
        return false
    })
})
$(document).ready(function () {
    $('#phone-menu').click(function () {
        $('#phone-menu-data').slideToggle('slow')
    })
})
// facebook chat
var chatbox = document.getElementById('fb-customer-chat')
chatbox.setAttribute('page_id', '223488363019229')
chatbox.setAttribute('attribution', 'biz_inbox')
window.fbAsyncInit = function () {
    FB.init({
        xfbml: true,
        version: 'v11.0',
    })
}
;(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) return
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js'
    fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')
document.getElementById('search_btn').addEventListener('click', () => {
    const search_value = document.getElementById('search_input').value
    window.location = `/product?name=${search_value}`
})
