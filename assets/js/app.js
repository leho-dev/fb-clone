const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const overplay = $('.overplay')
const itemsHeaderRight = $$('.header-right__item')
const newNotifyList = $('.notify-content__new-list')
const oldNotifyList = $('.notify-content__before-list')

const obj = JSON.parse(localStorage.getItem('obj')) || {}

//close overplay
if (overplay) {
    overplay.onclick = (e) => {
        if (!(e.target.closest('.overplay-body'))) {
            overplay.style.display = 'none'
            document.body.style.overflow = 'auto'
        }
    }
}

//dark mode
const darkBtns = $$('.header-switch__box ')
const appComponent = $('.app')

if (darkBtns && appComponent) {
    darkBtns.forEach(dark => {
        dark.onclick = function() {
            if(this.classList.contains('dark')) {
                this.classList.remove('dark')
                appComponent.classList.remove('dark')
                obj.mode = 'light'
            } else {
                this.classList.add('dark')
                appComponent.classList.add('dark')
                obj.mode = 'dark'
            }
    
            localStorage.setItem('obj', JSON.stringify(obj))
        }
    })
}

//show, hide menu sub header right
if (itemsHeaderRight.length != 0) {
    
    itemsHeaderRight.forEach(item => {
        item.onclick = () => {
            const toggle = $('.nav-left-layout')
            const itemActive = $('.header-right__item.active')
            item.classList.toggle('active')
            if(toggle) {
                const containerLeft = $('.container-left')
                toggle.classList.remove('active')
                if (containerLeft) {
                    containerLeft.classList.remove('active')
                }
            }
            if (itemActive) {
                itemActive.classList.remove('active')
            }
        }
    })

    const titleNewNotify = $('.new-notify__title')

    if (titleNewNotify) {
        //show thông báo
        const notifiesHeader = (() => {
    
            const notifies = [
                {
                    id: 0,
                    path: "./assets/img/Home/avatar-notify-1.jpg",
                    content: `Quản trị viên đã cập nhật phần mô tả của nhóm
                    <span>Gentle ∆</span>
                    . `,
                    time: 3,
                    seen: false,
                },
                {
                    id: 1,
                    path: "./assets/img/Home/avatar-notify-2.jpg",
                    content: `<span>Lộc Quang Trịnh</span>
                    và
                    <span>Nam Trần</span>
                    cũng đã bình luận về bài viết của
                    <span>Quốc Trịnh</span>
                    .`,
                    time: 13,
                    seen: false,
                },
                {
                    id: 2,
                    path: "./assets/img/Home/avatar-notify-3.jpg",
                    content: `<span>Quốc Trịnh</span>
                    đã nhắc đến bạn trong một bình luận.`,
                    time: 20,
                    seen: false,
                },
                {
                    id: 3,
                    path: "./assets/img/Home/avatar-notify-4.jpg",
                    content: `<span>Titan Gaming</span>
                    có 22 lượt xem mới.`,
                    time: 23,
                    seen: false,
                },
                {
                    id: 4,
                    path: "./assets/img/Home/avatar-notify-5.jpg",
                    content: `<span>Linh Trang</span>
                    đã bình luận về một ảnh bạn đang theo dõi trong
                    <span>Ngôi Sao Lấp Lánh Offical</span>
                    .`,
                    time: 30,
                    seen: true,
                },
                {
                    id: 5,
                    path: "./assets/img/Home/avatar-notify-6.jpg",
                    content: `<span>Lê Phước</span>
                    đã bình luận về trạng thái bạn chia sẻ.`,
                    time: 45,
                    seen: true,
                },
                {
                    id: 6,
                    path: "./assets/img/Home/avatar-notify-7.jpg",
                    content: `<span>Nguyễn Quốc Siêu</span>
                    đã bình luận về liên kết bạn chia sẻ.`,
                    time: 52,
                    seen: true,
                },
            ]
    
            return {
                render(arr, component){
                    const htmls = arr.map((notify, index) => {
                        return `
                        <li data-index="${notify.id}" class="notify-content__item ${notify.seen ? 'seen' : null}">
                            <img src="${notify.path}" alt="" class="notify-content__item-avatar">
                            <div class="notify-content__item-content">
                                <div class="notify-content__item-content-text">
                                    ${notify.content}
                                </div>
                                <p " class="notify-content__item-time">
                                    ${notify.time} phút trước
                                </p>
                            </div>
                            <i class="fas fa-circle"></i>
                        </li>
                        `
                    })
                    .join('')
                    component.innerHTML = htmls
                },
                renderNotify(){
                    const titleNewNotify = $('.new-notify__title')
                    const countNotify = $('.header-right__item-count')
                    const newNotifies = notifies.filter(notify => !notify.seen)
                    const oldNotifies = notifies.filter(notify => notify.seen)
                    
                    if (titleNewNotify) {
    
                    }
                    //kiểm tra có còn thông báo mới hay không
                    if (newNotifies.length === 0) {
                        titleNewNotify.style.display = 'none'
                        countNotify.style.display = 'none'
                    } else {
                        titleNewNotify.style.display = 'block'
                        countNotify.innerHTML = newNotifies.length
                        countNotify.style.display = 'flex'
                    }
    
                    this.render(newNotifies, newNotifyList)
                    this.render(oldNotifies, oldNotifyList)
    
                },
                handle(){
    
                    //clicked vào thông báo mới
                    newNotifyList.onclick = (e) => {
                        const itemNew = e.target.closest('.notify-content__item')
                        if (itemNew) {
                            const id = itemNew.dataset.index
                            notifies[id].seen = true
                            this.renderNotify()
                        }
                    }
    
                    setInterval(() => {
                        notifies.forEach(notify => {
                            notify.time += 1;
                        })
                        this.renderNotify()
                    }, 60000)
                },
                start(){
                    this.renderNotify()
                    this.handle()
                }
            }
        })().start()
    }
}

window.onclick = function(e){

    //tắt submenu khi click ngoài vùng
    if (itemsHeaderRight.length != 0) {
        const menuSub = e.target.closest('.header-right__item') || e.target.closest('.header-right__item-more')
        if(!menuSub) {
            itemsHeaderRight.forEach(item => {
                item.classList.remove('active')
            })
        }
    }

    //vẫn là sub menu nhưng là của newfeed :v
    if ($('.newsfeed__info-setting-list')) {
        if (!(e.target.closest('.newsfeed__info-setting-list.active')) 
        && !(e.target.closest('.newsfeed__info-setting.more-dots'))) {
            $$('.newsfeed__info-setting-list.active').forEach(item => {
                item.classList.remove('active')
            })
        }
    }
}

// storage
const F = (() => {
    const users = [
        {
            id: 0,
            firstName: "Thăng",
            lastName: "Fly",
            fullName: "Thăng Fly",
            phone: "0123123123",
            password: "123",
            avatar: "./assets/img/Home/thangfly.jpg",
            bg: "./assets/img/Home/thangfly-bg.jpg",
            postLiked: ["1", "2"],
            cmtLiked: ["0"],
            isLogin: false,
            onl: 0,
        },
        {
            id: 1,
            firstName: "",
            lastName: "FAP TV",
            fullName: "FAP TV",
            phone: "0123123124",
            password: "123",
            avatar: "./assets/img/Home/faptv.jpg",
            postLiked: ["0"],
            cmtLiked: ["1"],
            isLogin: false,
            onl: 0,
        }
    ]

    const newfeeds = [
        {
            id: 0,
            idUser: 0,
            time: 1,
            bg: "./assets/img/Home/thangfly-bg.jpg",
            content: "Đời người ngắn lắm ...",
            like: 6800,
            cmt: 55,
            share: 121,
            deleted: false,
        },
        {
            id: 1,
            idUser: 1,
            time: 4,
            bg: "./assets/img/Home/faptv-bg.jpg",
            content: "Thời đi học ai mà không có mối tình đầu phải không?",
            like: 2300,
            cmt: 52,
            share: 82,
            deleted: false,
        },
        {
            id: 2,
            idUser: 1,
            time: 7,
            bg: "./assets/img/Home/meow-bg.jpg",
            content: "Dạo này bị chai pin rồi nên sạc mấy tiếng chưa đầy 🙄 Nào đầy pin thì kiu Trẫm dậy nha Sen 😍.",
            like: 1200,
            cmt: 42,
            share: 21,
            deleted: false,
        },
    ]

    const comments = [
        {
            id: 0,
            idUser: 0,
            idPost: 1,
            content: "Thật là dễ thương!",
            like: 252,
            sub: false,
            deleted: false,
        },
        {
            id: 1,
            idUser: 1,
            idPost: 1,
            content: "Thật là dễ thương 2!",
            like: 134,
            sub: false,
            deleted: false,
        },
        {
            id: 2,
            idUser: 1,
            idPost: 0,
            content: "Thật là dễ thương 3! Mong mọi điều tốt đẹp sẽ đến với bạn sớm nhất có thể. Cảm ơn vì tất cả :3",
            like: 152,
            sub: false,
            deleted: false,
        },
        {
            id: 3,
            idUser: 0,
            idPost: 1,
            content: "Cảm ơn rất nhiều!",
            like: 12,
            sub: true,
            deleted: false,
            parentIdCmt: 1,
        },
        {
            id: 4,
            idUser: 1,
            idPost: 1,
            content: "Cảm ơn rất nhiều 2!",
            like: 11,
            sub: true,
            deleted: false,
            parentIdCmt: 0,
        },
    ]

    const obj = {
        mode: "light",
    }

    const messengers = [
        {
            id: 0,
            idUser: 0,
            Author: true,
            content: "Đây là tin nhắn 1",
            deleted: false,
            isReact: true,
            endMess: false,
        },
        {
            id: 1,
            idUser: 0,
            Author: false,
            content: "Đây là tin nhắn 2",
            deleted: false,
            isReact: false,
            endMess: true,
        },
        {
            id: 2,
            idUser: 1,
            Author: true,
            content: "Đây là tin nhắn 3",
            deleted: false,
            isReact: true,
            endMess: false,
        },
        {
            id: 3,
            idUser: 1,
            Author: false,
            content: "Đây là tin nhắn 4",
            deleted: false,
            isReact: false,
            endMess: true,
        },
        {
            id: 4,
            idUser: 2,
            Author: false,
            content: "Đây là tin nhắn 5",
            deleted: false,
            isReact: true,
            endMess: false,
        },
        {
            id: 5,
            idUser: 2,
            Author: true,
            content: "Đây là tin nhắn 6",
            deleted: false,
            isReact: true,
            endMess: true,
        }
    ]

    return {

        setStorage(){
            localStorage.getItem('users') ? null :
            localStorage.setItem('users', JSON.stringify(users))

            localStorage.getItem('newfeeds') ? null :
            localStorage.setItem('newfeeds', JSON.stringify(newfeeds))

            localStorage.getItem('comments') ? null :
            localStorage.setItem('comments', JSON.stringify(comments))

            localStorage.getItem('obj') ? null :
            localStorage.setItem('obj', JSON.stringify(obj))

            localStorage.getItem('messengers') ? null :
            localStorage.setItem('messengers', JSON.stringify(messengers))
        }
    }
})().setStorage()





