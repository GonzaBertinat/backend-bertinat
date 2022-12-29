const verifyPasswords = () => {
    const password1 = document.querySelector('#password');
    const password2 = document.querySelector('#password_repeat');

    if(password1.value === password2.value){
        return true;
    }

    const mensaje = document.querySelector('.mensaje_error');
    mensaje.style.display = 'block';
    return false;
}