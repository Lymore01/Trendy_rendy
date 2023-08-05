document.getElementsByClassName('register-form-btn')[0].addEventListener('click',()=>{
    document.getElementsByClassName('log-form')[0].style.display="none"
    document.getElementsByClassName('reg-form')[0].style.display="block"
})
document.getElementsByClassName('login-form-btn')[0].addEventListener('click',()=>{
    document.getElementsByClassName('reg-form')[0].style.display="none"
    document.getElementsByClassName('log-form')[0].style.display="block"
    
})
