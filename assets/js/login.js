const navSignUp = $('.form-signup__btn')
const closeBtn = $('.sign-up__close')
const signUpForm = $('.sign-up__action')
const loginForm = $('.form-login > form')
const firstName = $('.sign-up__first-name')
const lastName = $('.sign-up__last-name')
const phone = $('.sign-up__phone')
const password = $('.sign-up__pw')
const userName = $('#TK')
const userPassword = $('#PW')

//show signup
navSignUp.onclick = () => {
    overplay.style.display = 'flex'
}

//close signup
closeBtn.onclick = () => {
    overplay.style.display = 'none'
}

function clearInput() {
    firstName.value = lastName.value = phone.value = password.value = null
}

//darkmode
if (obj.mode == 'dark'){
    $('.app').classList.add('dark')
} else {
    $('.app').classList.remove('dark')
}

//save info when submit sign up form
signUpForm.onsubmit = (e) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const firstNameVal = firstName.value.trim()
    const lastNameVal = lastName.value.trim()
    const fullName = firstNameVal + " " + lastNameVal
    const phoneVal = phone.value.trim()
    const passwordVal = password.value.trim()
    const gender = $('input[name="gender"]:checked').id
    let avatar
    gender == 'male' ? avatar = "./assets/img/avatar-nam.jpg" : avatar = "./assets/img/avatar-nu.jpg"

    const checkUser = users.filter((user) => {
        return phoneVal == user.phone
    })

    if (checkUser.length === 0) {
        
        const obj = {
            id: users.length,
            firstName: firstNameVal,
            lastName: lastNameVal,
            fullName: fullName.trim(),
            phone: phoneVal,
            password: passwordVal,
            avatar,
            postLiked: [],
            cmtLiked: [],
            isLogin: true,
            onl: 0,
        }
        users.push(obj)
        clearInput()
        localStorage.setItem('users', JSON.stringify(users))
    } else {
        e.preventDefault()
        cuteAlert({
            type: "error",
            title: "Lỗi",
            message: "Sdt hoặc email đã tồn tại!",
            buttonText: "Okay"
        })
    }
}

//check login form
loginForm.onsubmit = (e) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const name = userName.value.trim()
    const pw = userPassword.value.trim()
    
    let id
    
    const checkUser = users.find((user, index) => {
        id = index;
        return name == user.phone && pw == user.password
    })
    
    if(checkUser){
        users.forEach(user => {
            user.isLogin = false;
        })
        users[id].isLogin = true;
        localStorage.setItem('users', JSON.stringify(users))
    } else {
        e.preventDefault()
        cuteAlert({
            type: "error",
            title: "Lỗi",
            message: "Sai tên tài khoản hoặc mật khẩu!",
            buttonText: "Okay"
        })
    }
    
}

