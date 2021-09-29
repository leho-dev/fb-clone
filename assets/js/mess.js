

const app = (() => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const messengers = JSON.parse(localStorage.getItem('messengers')) || []

    let id
    const x = users.find((user, index) => {
        id = index
        return user.isLogin
    })

    const randomMess = [
        "Đây là tin nhắn bot tự động số 1",
        "Đây là tin nhắn bot tự động số 2",
        "Đây là tin nhắn bot tự động số 3",
        "Đây là tin nhắn bot tự động số 4",
        "Đây là tin nhắn bot tự động số 5",
        "Đây là tin nhắn bot tự động số 6",
        "Đây là tin nhắn bot tự động số 7",
        "Đây là tin nhắn bot tự động số 8",
        "Đây là tin nhắn bot tự động số 9",
        "Đây là tin nhắn tự động may mắn! Chỉ với xác suất 10%! Have a nice day!"
    ]

    return {
        idUser: x ? id : null,
        idUserMess: null,
        showInfoUser(){
            const darkBtns = $$('.header-switch__box ')
            if (obj.mode == 'dark'){
                $('.app').classList.add('dark')
                darkBtns.forEach(dark => {
                    dark.classList.add('dark')
                })
            } else {
                $('.app').classList.remove('dark')
                darkBtns.forEach(dark => {
                    dark.classList.remove('dark')
                })
            }

            const bg = users[id].bg ? users[id].bg :
            "./assets/img/wall/profile-bg.png"

            $$('.avt').forEach((item) => {
                item.src = users[id].avatar
            })
            $$('.full-name').forEach(item => {
                item.innerHTML = users[id].fullName
            })
            $$('.last-name').forEach(item => {
                item.innerHTML = users[id].lastName
            })
        },
        renderUsers(){
            const htmls = users.map((user, index) => {
                if (user.id !== this.idUser) {
                    const mess = messengers.find(mess => mess.idUser === user.id && mess.endMess)
                    if (mess) {
                        return `
                        <li class="container-left__item" data-index=${user.id}>
                            <div class="container-left__item-avatar">
                                <img src="${user.avatar}" alt="" class="container-left__item-avatar-img">
                            </div>
                            <div class="container-left__item-info">
                                <div class="container-left__item-info-name">
                                    ${user.fullName}
                                </div>
                                <div class="container-left__item-info-sub">
                                    <div class="container-left__item-info-last-mess">
                                        ${mess.content}
                                    </div>
                                    ·
                                    <div class="container-left__item-info-time">
                                        1 phút
                                    </div>
                                </div>
                            </div>
                            <div class="container-left__item-see ${mess.Author ? '' : 'seen'}">
                                <div class="container-left__item-see-img">
                                    <img src="${user.avatar}" alt="">
                                </div>
                                <div class="container-left__item-see-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                            </div>
                        </li>
                        `
                    }
                }
            }).join('')
            $('.container-left__list').innerHTML = htmls
            this.showInfoUser()
            this.activeUser()
        },
        renderMess(id){
            $$('.avt-mess').forEach((avt) => avt.src = users[id].avatar) 
            $$('.name-mess').forEach(name => name.innerHTML = users[id].fullName) 
            $$('.online').forEach(onl => {
                if (users[id].onl) {
                    onl.innerHTML = 'Hoạt động ' + users[id].onl + ' giờ trước'
                } else {
                    onl.innerHTML = 'Đang hoạt động'
                }
            })

            const messUser = messengers.filter(mess => {
                return mess.idUser == id && !(mess.deleted)
            })
            const htmls = messUser.map((mess, index) => {
                return `
                <li class=" ${mess.Author ? 'isUser' : ''} container-main__item ${mess.isReact ? 'isReaction' : null}" data-index="${mess.id}">
                    <div class="container-main__item-avt">
                        <img src="${users[id].avatar}" alt="" class="container-main__item-avt__img">
                    </div>
                    <div class="container-main__item-content">
                        <div class="container-main__item-text">
                            ${mess.content}
                        </div>
                        <div class="container-main__item-reaction">
                            <div class="container-main__item-reaction-icon">
                                <i style="color: #ff504b" class="fas fa-heart"></i>
                            </div>
                        </div>
                    </div>
                    <div data-index="${mess.id}" class="container-main__item-group">
                        <div class="container-main__item-group-btn reaction-btn">
                            <i style="color: #ff504b" class="fas fa-heart"></i>
                        </div>
                        <div class="container-main__item-group-btn delete-btn">
                            <i class="fad fa-trash-alt"></i>
                        </div>
                    </div>
                </li>
                `
            }).join('')
            if (htmls) {
                $('.container-main__list').innerHTML = htmls
            } else {
                $('.container-main__list').innerHTML = ''
            }
        },
        newMess(content, idUser, Author = true){
            messengers.forEach((mess, idnex) => {
                if (mess.idUser == idUser) {
                    mess.endMess = false
                }
            })
            const obj = {
                id: messengers.length,
                idUser,
                Author,
                content,
                deleted: false,
                isReact: false,
                endMess: true,
            }

            messengers.push(obj)
            localStorage.setItem('messengers', JSON.stringify(messengers))
            this.renderMess(idUser)
            this.renderUsers()
        },
        activeUser(){
            if (this.idUserMess != null) {
                const userList = $$('.container-left__item')
                userList.forEach((user, index) => {
                    if (user.dataset.index == this.idUserMess) {
                        user.classList.add('active')
                    }
                })
            }
        },
        handle(){
            const _this= this
            //đăng xuất
            $('.nav-logout').onclick = function(){
                users.forEach((user) => {
                    user.isLogin = false
                })
                localStorage.setItem('users', JSON.stringify(users))
            }

            //tính chiều cao 
            const leftLayoutHeight = $('.container-left').clientHeight
            const leftLayoutTopHeight = $('.container-left__head').clientHeight
            const leftLayoutList = $('.container-left__list')
            const mainLayoutTopHeight = $('.container-main__head').clientHeight
            const mainLayoutBotHeight = $('.container-main__bottom').clientHeight
            const mainLayoutBodyHeight = $('.container-main__body')
            const mainLayoutHeight = $('.container-main').clientHeight
            leftLayoutList.style.height = leftLayoutHeight - leftLayoutTopHeight + 'px'
            mainLayoutBodyHeight.style.height = mainLayoutHeight - mainLayoutTopHeight - mainLayoutBotHeight + 'px'


            //onclick mở layout phải
            const dropdownBtns = $$('.dropdown-head')
            dropdownBtns.forEach((dropdownBtn) => {
                dropdownBtn.onclick = () => {
                    if (dropdownBtn.nextElementSibling) {
                        dropdownBtn.nextElementSibling.classList.toggle('active')
                    }
                }
            })

            //render user đầu tiên
            const userFilter = users.filter(user => {
                return user.id !== this.idUser
            })
            if (!this.idUserMess) {
                this.idUserMess = userFilter[0].id
                this.renderMess(this.idUserMess)
                $$('.container-left__item')[0].classList.add('active')
                mainLayoutScroll()
            }

            //show mess
            const listUsers = $('.container-left__list')
            listUsers.onclick = (e) => {
                const userItem = e.target.closest('.container-left__item')

                if (userItem) {
                    const id = Number.parseInt(userItem.dataset.index)
                    this.idUserMess = id
                    this.renderMess(this.idUserMess)
                    const itemActive = $('.container-left__item.active')
                    if (itemActive) {
                        itemActive.classList.remove('active')
                    }
                    userItem.classList.add('active')
                    mainLayoutScroll()
                }   
            }

            //main-mess
            const mainMess = $('.container-main__list')
            mainMess.onclick = (e) => {
                const reactBtn = e.target.closest('.reaction-btn')
                const deleteBtn = e.target.closest('.delete-btn')

                checkF = (btn, action) => {
                    const id = Number.parseInt(btn.parentElement.dataset.index)
                    const mess = messengers.find(mess => mess.id == id)
                    
                    messengers.forEach((mess, index) => {
                        if (mess.id == id) {
                            if (mess[action]) {
                                mess[action] = 0
                            } else {
                                mess[action] = 1
                            }
                        }
                    })
                    localStorage.setItem('messengers', JSON.stringify(messengers))
                    this.renderMess(mess.idUser)
                }

                if(reactBtn) {
                    checkF(reactBtn, 'isReact')
                }

                if (deleteBtn) {
                    cuteAlert({
                        type: "question",
                        title: "Xoá ?",
                        message: "Bạn chắc chắn muốn xoá tin nhắn này?",
                        confirmText: "Xoá",
                        cancelText: "Huỷ"
                    }).then((e)=> {
                        if (e){
                            checkF(deleteBtn, 'deleted')

                            const idDelete = Number.parseInt(deleteBtn.parentElement.dataset.index)
                            const messDelete = messengers.find(mess => mess.id == idDelete)
                            const messUsers = messengers.filter(mess => mess.idUser == messDelete.idUser && !mess.deleted)
                            messUsers.sort(function(a, b) {return a.id - b.id})
                            if (messUsers.length != 0) {
                                messengers.forEach((mess, index) => {
                                    if (mess.id == messUsers[messUsers.length - 1].id) {
                                        messengers[index].endMess = true;
                                    }
                                })
                                localStorage.setItem('messengers', JSON.stringify(messengers))
                                _this.renderUsers()                            
                            }
                        }
                    })
                }
            }

            //input
            const iconLeft = $('.container-main__bottom-left')
            const iconRight = $('.container-main__bottom-right')
            const inputMess = $('.container-main__bottom-search-input')

            inputMess.oninput = function(){
                const value = this.value.trim()
                if (value){
                    iconLeft.classList.add('active')
                    iconRight.classList.add('active')
                } else {
                    iconLeft.classList.remove('active')
                    iconRight.classList.remove('active')
                }
            }

            //show/hide right layout
            const moreBtn = $('.more-info-btn')
            moreBtn.onclick = () => {
                $('.container-right').classList.toggle('active')
            }

            //icon list
            const iconBtn = $('.container-main__bottom-search__icon')
            const iconList = $('.container-main__bottom-search__list-icon')
            const iconItems = $$('.container-main__bottom-icon-item')
            iconBtn.onclick = function(){
                iconList.classList.toggle('active')
            }
            iconItems.forEach(item => {
                item.onclick = function(){
                    const value = item.innerHTML
                    const id = _this.idUserMess
                    
                    _this.newMess(value, id)
                    mainLayoutScroll()
                    addMessRandom()
                }
            })

            inputMess.onblur = function(){
                const value = this.value.trim()
                if (value){
                    iconLeft.classList.add('active')
                    iconRight.classList.add('active')
                } else {
                    iconLeft.classList.remove('active')
                    iconRight.classList.remove('active')
                }
            }
            

            //send mess
            const sendBtn = $('.container-main__bottom-send')
            const thumbUp = $('.container-main__bottom-thumb-up')

            addMess = () => {
                const value = inputMess.value.trim()
                const id = this.idUserMess
                
                if (value) {
                    this.newMess(value, id)
                    inputMess.focus()
                    inputMess.value = null
                    mainLayoutScroll()
                    addMessRandom()
                }
            }

            function mainLayoutScroll() {
                const listHeight = $('.container-main__list').clientHeight +
                $('.container-main__list--no-content').clientHeight
                const mainLayoutBody = $('.container-main__body')
                mainLayoutBody.scroll({
                    top: listHeight,
                })
            }

            function addMessRandom(){
                return new Promise(function(resolve){
                    setTimeout(function(){
                        resolve(addMessRand())
                    }, 2000)
                })
            }

            addMessRand = () => {
                const rand = Math.floor(Math.random() * randomMess.length)
                const itemActive = $('.container-left__item.active')
                const id = this.idUserMess
                const value = randomMess[rand]

                this.newMess(value, id, 0)
                mainLayoutScroll()
            }
            

            thumbUp.onclick = () => {
                const value = `<i class="fas fa-thumbs-up"></i>`
                const id = this.idUserMess
                
                this.newMess(value, id)
                mainLayoutScroll()
                addMessRandom()
            }
            
            sendBtn.onclick = () => {
                addMess()
            }

            window.onkeyup = (e) => {
                if (e.which === 13) {
                    addMess()
                }
            }

            //window onclick
            window.onclick = (e) => {
                const rightLayoutTarget = e.target.closest('.container-right')
                const moreBtn = e.target.closest('.more-info-btn')
                const rightLayout = $('.container-right')
                if (!rightLayoutTarget && rightLayout.classList.contains('active') && !moreBtn) {
                    rightLayout.classList.remove('active')
                }
                
            }

        },
        start(){
            this.renderUsers()
            this.handle()
        }
    }
})().start()