const moreList = $$(".container-left__more-list");
const moreBtn = $$(".container-left__more");
const lessFavBtn = $$(".container-left__less");
const newPostBtns = $$(".new-post-btn");
const closeNewPostBtn = $(".post-box__head-close");
const textAreaBox = $(".post-box__content-textarea");
const postBtn = $(".post-box__btn");
const imgPostBox = $(".post-box__content-img>img");
const newfContainer = $(".container-newsfeed-list");
const newfWall = $(".main-right__newsfeed");
const myWall = $(".my-wall");

const newfeeds = JSON.parse(localStorage.getItem("newfeeds")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];
const comments = JSON.parse(localStorage.getItem("comments")) || [];

//xem thêm, ấn bớt item layout trái
for (let i = 0; i < moreBtn.length; i++) {
    moreBtn[i].onclick = function () {
        this.style.display = "none";
        moreList[i].style.display = "block";
        lessFavBtn[i].style.display = "flex";
    };
    lessFavBtn[i].onclick = function () {
        this.style.display = "none";
        moreList[i].style.display = "none";
        moreBtn[i].style.display = "flex";
    };
}

//number to short number
const compactNumber = (value) => {
    const suffixes = ["", "k", "m", "b", "t"];
    if (("" + value).length <= 3) {
        return "" + value;
    }
    const suffixNum = Math.floor(("" + value).length / 3);
    let shortValue = parseFloat(
        suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value.toPrecision(2)
    );
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
};

//render danh sách liên hệ
const userOnline = (() => {
    const uersOnl = [
        {
            path: "./assets/img/Home/user-1.jpg",
            name: "Nguyễn Thị Hiền Vy",
        },
        {
            path: "./assets/img/Home/user-2.jpg",
            name: "Dương Hoàng Phi Long",
        },
        {
            path: "./assets/img/Home/user-3.jpg",
            name: "An Lê",
        },
        {
            path: "./assets/img/Home/user-4.png",
            name: "Nhật Hào",
        },
        {
            path: "./assets/img/Home/user-5.jpg",
            name: "Thành Luân",
        },
        {
            path: "./assets/img/Home/user-6.jpg",
            name: "Phát Võ",
        },
        {
            path: "./assets/img/Home/user-7.jpg",
            name: "Thành An",
        },
        {
            path: "./assets/img/Home/user-4.png",
            name: "Văn An",
        },
    ];

    return {
        render() {
            const htmls = uersOnl
                .map((user) => {
                    return `
                <li class="container-right__connect-item">
                    <div class="container-right__connect-item-avatar">
                        <img src="${user.path}" alt="" class="container-right__connect-item-img">
                    </div>
                    <span class="container-right__connect-item-name">${user.name}</span>
                </li>
                `;
                })
                .join("");
            $(".container-right__connect-list").innerHTML = htmls;
        },
    };
})().render();

//lấy id từ storage
let id;
const x = users.find((user, index) => {
    id = index;
    return user.isLogin;
});

const app = (() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    return {
        idUser: x ? id : null,
        editMode: false,
        showInfoUser() {
            const darkBtns = $$(".header-switch__box ");
            if (obj.mode == "dark") {
                $(".app").classList.add("dark");
                darkBtns.forEach((dark) => {
                    dark.classList.add("dark");
                });
            } else {
                $(".app").classList.remove("dark");
                darkBtns.forEach((dark) => {
                    dark.classList.remove("dark");
                });
            }

            const bg = users[id].bg
                ? users[id].bg
                : "./assets/img/wall/profile-bg.png";

            $$(".avt").forEach((item) => {
                item.src = users[id].avatar;
            });
            $$(".full-name").forEach((item) => {
                item.innerHTML = users[id].fullName;
            });
            $$(".last-name").forEach((item) => {
                item.innerHTML = users[id].lastName;
            });
            $(".my-wall__top-bg-img").src = bg;
        },
        render() {
            let htmls = "";
            newfeeds.forEach((newfeed) => {
                const condition =
                    $(".my-wall").style.display === "block"
                        ? newfeed.idUser == this.idUser
                        : true;
                if (!newfeed.deleted && condition) {
                    const user = users.find((user) => {
                        return newfeed.idUser === user.id;
                    });
                    const cmts = comments.filter((comment) => {
                        return (
                            comment.idPost === newfeed.id &&
                            !comment.sub &&
                            !comment.deleted
                        );
                    });

                    htmls += `
                    <div class="newsfeed" data-index="${newfeed.id}">
                        <div class="newsfeed__info">
                            <div class="newsfeed__info-profile">
                                <img class="newsfeed__-profile-avt" src="${
                                    user.avatar
                                }">
                                <div class="newsfeed__info-profile-more">
                                    <span class="newsfeed__info-name checked">
                                        ${user.fullName}
                                    </span>
                                    <div class="newsfeed__info-time">
                                        ${newfeed.time} phút trước
                                        <i class="fas fa-globe-europe"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="newsfeed__info-setting more-dots">
                                <i class="fas fa-ellipsis-h"></i>
                                <ul class="newsfeed__info-setting-list" data-index=${
                                    newfeed.id
                                }>
                                    <li class="newsfeed__info-setting-item">
                                        <div class="newsfeed__info-setting-item__img">
                                            <i class="fas fa-cloud-download"></i>
                                        </div>
                                        <div class="newsfeed__info-setting-item__content">
                                            <p class="newsfeed__info-setting-item__text">
                                                Lưu bài viết
                                            </p>
                                            <p class="newsfeed__info-setting-item__title">
                                                Thêm danh sách vào mục đã lưu.
                                            </p>
                                        </div>
                                    </li>
                                    <div>
                                    <li class="newsfeed__info-setting-item">
                                        <div class="newsfeed__info-setting-item__img">
                                            <i class="fas fa-link"></i>
                                        </div>
                                        <div class="newsfeed__info-setting-item__content">
                                            <p class="newsfeed__info-setting-item__text">
                                                Nhúng
                                            </p>
                                        </div> 
                                    </li>
                                    <li class="newsfeed__info-setting-item">
                                        <div class="newsfeed__info-setting-item__img">
                                            <i class="far fa-bell"></i>
                                        </div>
                                        <div class="newsfeed__info-setting-item__content">
                                            <p class="newsfeed__info-setting-item__text">
                                                Bật thông báo về bài viết.
                                            </p>
                                        </div>
                                    </li>
                                    <li 
                                    style="display: ${
                                        user.id === this.idUser
                                            ? "flex"
                                            : "none"
                                    }"
                                    class="newsfeed__info-setting-item edit-post" >
                                        <div class="newsfeed__info-setting-item__img">
                                            <i class="fas fa-history"></i>
                                        </div>
                                        <div class="newsfeed__info-setting-item__content">
                                            <p class="newsfeed__info-setting-item__text">
                                                Chỉnh sửa bài viết
                                            </p>
                                        </div>
                                    </li>
                                    <li style="display: ${
                                        user.id === this.idUser
                                            ? "flex"
                                            : "none"
                                    }" class="newsfeed__info-setting-item delete-post">
                                        <div class="newsfeed__info-setting-item__img">
                                            <i class="fas fa-trash-alt"></i>
                                        </div>
                                        <div class="newsfeed__info-setting-item__content">
                                            <p class="newsfeed__info-setting-item__text">
                                                Chuyển vào thùng rác
                                            </p>
                                            <p class="newsfeed__info-setting-item__title">
                                                Các mục trong thùng rác sẽ bị xoá sau 30 ngày.
                                            </p>
                                        </div>
                                    </li>
                                    </div>
                                    <li class="newsfeed__info-setting-item">
                                        <div class="newsfeed__info-setting-item__img">
                                            <i class="fas fa-ban"></i>
                                        </div>
                                        <div class="newsfeed__info-setting-item__content">
                                            <p class="newsfeed__info-setting-item__text">
                                                Ẩn bài viết
                                            </p>
                                            <p class="newsfeed__info-setting-item__title">
                                                Ẩn bớt các bài viết tương tự
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
    
                        <div class="newsfeed__content">
                            <p class="newsfeed__content-text">
                                ${newfeed.content}
                            </p>
                            <img style="display: ${
                                newfeed.bg ? "block" : "none"
                            }" src="${
                        newfeed.bg
                    }" alt="" class="newsfeed__content-img">
                        </div>
    
                        <div class="newsfeed__respond">
                            <div title="${newfeed.like}" style="display: ${
                        newfeed.like ? "flex" : "none"
                    }" class="newsfeed__respond-react" >
                                <div class="newsfeed__respond-react-icon">
                                    <i class="fas fa-thumbs-up"></i>
                                </div>
                                <span class="newsfeed__respond-react-total">${compactNumber(
                                    newfeed.like
                                )}</span>
                            </div>
                            <div style="display: ${
                                cmts.length ? "flex" : "none"
                            }" class="newsfeed__respond-right">
                                <span>${cmts.length} bình luận</span>
                                <span>${newfeed.share} lượt chia sẻ</span>
                            </div>
                        </div>
    
                        <ul data-index="${
                            newfeed.id
                        }" class="newsfeed__action" >
                            <li class="newsfeed__action-item ${
                                users[this.idUser].postLiked.includes(
                                    newfeed.id.toString()
                                )
                                    ? "active"
                                    : ""
                            } reaction">
                                <i class="fas fa-thumbs-up newsfeed__action-item-icon"></i>
                                <span class="newsfeed__action-item-text">Thích</span>
                            </li>
                            <li class="newsfeed__action-item comment-action">
                                <i class="far fa-comment-alt newsfeed__action-item-icon"></i>
                                <span class="newsfeed__action-item-text">Bình luận</span>
                            </li>
                            <li class="newsfeed__action-item">
                                <i class="fas fa-share newsfeed__action-item-icon"></i>
                                <span class="newsfeed__action-item-text">Chia sẻ</span>
                            </li>
                        </ul>
    
                        <div class="newsfeed__comment">
                            <div class="newsfeed__comment-user">
                                <img src="" alt="" class="nav-wall newsfeed__comment-img avt">
                                <div class="newsfeed__comment-box">
                                    <input data-index=${
                                        newfeed.id
                                    } type="text" placeholder="Viết bình luận ..." class="newsfeed__comment-input">
                                    <div class="newsfeed__comment-box-right">
                                        <div class="newsfeed__comment-box-icon test">
                                            <i class="far fa-laugh-beam"></i>
                                        </div>
                                        <div class="newsfeed__comment-box-icon">
                                            <i class="fas fa-camera"></i>
                                        </div>
                                        <div class="newsfeed__comment-box-icon">
                                            <i class="far fa-sticky-note"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: ${
                                cmts.length ? "block" : "none"
                            }" class="newsfeed__commented-box">
                                <div class="commented-switch">
                                    <div class="show-hide-cmt commented-switch__text">
                                        <span>Thu gọn</span>
                                    </div>
                                    <div class="commented-switch__text">
                                        Phù hợp nhất
                                        <i class="fad fa-caret-down"></i>
                                    </div>
                                </div>
                                <div class="commented-box active">
                                    ${cmts
                                        .map((cmt) => {
                                            const userCmt = users.find(
                                                (user) => {
                                                    return (
                                                        cmt.idUser === user.id
                                                    );
                                                }
                                            );
                                            const cmtSubs = comments.filter(
                                                (comment) => {
                                                    return (
                                                        comment.parentIdCmt ===
                                                            cmt.id &&
                                                        comment.sub &&
                                                        !comment.deleted
                                                    );
                                                }
                                            );

                                            return `
                                            <div class="commented-box__item">
                                                <div class="commented-box__item-user">
                                                    <div class="commented-box__item-avatar">
                                                        <img src="${
                                                            userCmt.avatar
                                                        }"  alt="">
                                                    </div>
                                                    <div class="commented-box__item-info">
                                                        <div class="wrap">
                                                            <div class="comented-box__item-content">
                                                                <div class="comented-box__item-name">
                                                                    ${
                                                                        userCmt.fullName
                                                                    }
                                                                </div>
                                                                <div class="comented-box__item-text">
                                                                    ${
                                                                        cmt.content
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="commented-box__item-reaction" data-index="${
                                                            cmt.id
                                                        }">
                                                            <span class=" ${
                                                                users[
                                                                    this.idUser
                                                                ].cmtLiked.includes(
                                                                    cmt.id.toString()
                                                                )
                                                                    ? "active"
                                                                    : ""
                                                            } commented-box__item-reaction--like">Thích</span>
                                                            •
                                                            <span class="commented-box__item-reaction--respond">Phản hồi</span>
                                                        </div>
                                                        <div style="display: ${
                                                            cmt.like
                                                                ? "flex"
                                                                : "none"
                                                        }" class="commented-count-reaction">
                                                            <i class="fas fa-thumbs-up"></i>
                                                            <span>${
                                                                cmt.like
                                                            }</span>
                                                        </div>
                                                    </div>
                                                    <div data-index="${
                                                        cmt.id
                                                    }" class="commented-box__item-delete" style="display: ${
                                                this.idUser == cmt.idUser
                                                    ? "block"
                                                    : "none"
                                            }" >
                                                        <i class="fad fa-trash-alt"></i>
                                                    </div>
                                                </div>
    
                                                <div style="display: ${
                                                    cmtSubs.length
                                                        ? "block"
                                                        : "none"
                                                }" class="commented-box__item-respond-list">
                                                    ${cmtSubs
                                                        .map((cmt2, index) => {
                                                            let cmtsub = "";
                                                            const user =
                                                                users.find(
                                                                    (user) => {
                                                                        return (
                                                                            cmt2.idUser ===
                                                                            user.id
                                                                        );
                                                                    }
                                                                );

                                                            return `
                                                            <div class="commented-box__item-user sub">
                                                                <div class="commented-box__item-avatar">
                                                                    <img src="${
                                                                        user.avatar
                                                                    }" alt="">
                                                                </div>
                                                                <div class="commented-box__item-info">
                                                                    <div class="wrap">
                                                                        <div class="comented-box__item-content">
                                                                            <div class="comented-box__item-name">
                                                                                ${
                                                                                    user.fullName
                                                                                }
                                                                            </div>
                                                                            <div class="comented-box__item-text">
                                                                                ${
                                                                                    cmt2.content
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div data-id="${
                                                                        cmt2.id
                                                                    }"  data-index="${
                                                                cmt.id
                                                            }"  class="commented-box__item-reaction">
                                                                        <span class="commented-box__item-reaction--like ${
                                                                            users[
                                                                                this
                                                                                    .idUser
                                                                            ].cmtLiked.includes(
                                                                                cmt2.id.toString()
                                                                            )
                                                                                ? "active"
                                                                                : ""
                                                                        }">Thích</span>
                                                                        •
                                                                        <span class="commented-box__item-reaction--respond">Phản hồi</span>
                                                                    </div>
                                                                    <div style="display : ${
                                                                        cmt2.like
                                                                            ? "block"
                                                                            : "none"
                                                                    }" class="commented-count-reaction">
                                                                        <i class="fas fa-thumbs-up"></i>
                                                                        <span>${compactNumber(
                                                                            cmt2.like
                                                                        )}</span>
                                                                    </div>
                                                                </div>
                                                                <div style="display: ${
                                                                    this
                                                                        .idUser ==
                                                                    cmt2.idUser
                                                                        ? "block"
                                                                        : "none"
                                                                }" data-index="${
                                                                cmt2.id
                                                            }" class="commented-box__item-delete">
                                                                    <i class="fad fa-trash-alt"></i>
                                                                </div>
                                                            </div>
                                                            `;
                                                        })
                                                        .join("")}
                                                </div>
    
                                            </div>
                                            `;
                                        })
                                        .join("")}
    
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }
            });
            const component =
                $(".my-wall").style.display === "block"
                    ? newfWall
                    : newfContainer;
            if (htmls) {
            } else {
                htmls = `
                    <div class="newfeed-list--no-tus">
                        Hiện chưa có bài viết nào.
                    </div>
                `;
            }
            component.innerHTML = htmls;
            this.showInfoUser();
        },
        newPost(content, bg) {
            const obj = {
                id: newfeeds.length,
                idUser: this.idUser,
                time: 0,
                bg: bg,
                content: content,
                like: 0,
                cmt: 0,
                share: 0,
                deleted: false,
            };

            newfeeds.unshift(obj);
            localStorage.setItem("newfeeds", JSON.stringify(newfeeds));
            this.render();
        },
        newCmt(content, idPost) {
            const obj = {
                id: comments.length,
                idUser: this.idUser,
                idPost: idPost,
                content: content,
                like: 0,
                deleted: false,
            };

            comments.unshift(obj);
            localStorage.setItem("comments", JSON.stringify(comments));
            this.render();
        },
        newSubCmt(content, idPost, idParentCmt) {
            const obj = {
                id: comments.length,
                idUser: this.idUser,
                idPost: idPost,
                content: content,
                like: 0,
                sub: true,
                deleted: false,
                parentIdCmt: idParentCmt,
            };

            comments.unshift(obj);
            localStorage.setItem("comments", JSON.stringify(comments));
            this.render();
        },
        renderMess() {
            const messengers =
                JSON.parse(localStorage.getItem("messengers")) || [];
            const htmls = messengers
                .map((mess) => {
                    if (mess.idUser != this.idUser && mess.endMess) {
                        const user = users.find(
                            (user) => user.id === mess.idUser
                        );
                        return `
                    <li class="mess-item">
                        <div class="mess-item__active">
                            <img src="${user.avatar}" alt="" class="mess-item__avatar">
                        </div>
                        <div class="mess-list__info">
                            <div class="mess-item__info-name">
                                ${user.fullName}
                            </div>
                            <div class="mess-item__info-text">
                                <div>
                                    ${mess.content}
                                </div>
                                <i class="fas fa-circle"></i> 
                                <span>
                                    1 phút
                                </span> 
                            </div>
                        </div>
                    </li>
                    `;
                    }
                })
                .join("");
            $(".mess-list").innerHTML = htmls;
        },
        handle() {
            const _this = this;

            //container <-> wall
            const showWall = () => {
                $(".nav-left-layout").style.display = "none";
                $(".container").style.display = "none";
                $(".my-wall").style.display = "block";
                $$(".header-main__item").forEach((item) => {
                    item.classList.remove("active");
                });
            };

            const showHome = () => {
                if (window.innerWidth < 1240) {
                    $(".nav-left-layout").style.display = "flex";
                }
                $(".my-wall").style.display = "none";
                $(".container").style.display = "flex";
                $(".home-btn").classList.add("active");
            };

            window.onresize = () => {
                if (window.innerWidth >= 1240) {
                    $(".nav-left-layout").style.display = "none";
                }
            };

            $$(".nav-wall").forEach((item) => {
                item.onclick = () => {
                    showWall();
                    _this.render();
                };
            });

            $$(".nav-home").forEach((item) => {
                item.onclick = () => {
                    showHome();
                    _this.render();
                };
            });

            //reload
            $(".header-left__logo").onclick = () => {
                if ($(".container").style.display == "none") {
                    showHome();
                } else {
                    location.reload();
                }
            };

            //overplay
            function closeOverplay() {
                overplay.style.display = "none";
                document.body.style.overflow = "auto";
            }
            function showOverplay() {
                overplay.style.display = "flex";
                document.body.style.overflow = "hidden";
            }

            //đăng xuất
            $(".nav-logout").onclick = function () {
                users.forEach((user) => {
                    user.isLogin = false;
                });
                localStorage.setItem("users", JSON.stringify(users));
                this.querySelector("a").setAttribute("href", "index.html");
                this.querySelector("a").click();
            };

            //mở đóng box
            function showBox() {
                showOverplay();
                checkSubmit();
            }
            newPostBtns.forEach((newPostBtn) => {
                newPostBtn.onclick = function () {
                    showBox();
                };
            });

            closeNewPostBtn.onclick = () => {
                closeOverplay();
            };

            //clear post box
            function clearNewPost() {
                textAreaBox.value = null;
                imgPostBox.src = "";
            }

            //like
            const newfeedLists = $$(".newf-list");
            newfeedLists.forEach((item) => {
                item.onclick = (e) => {
                    const likeBtn = e.target.closest(
                        ".newsfeed__action-item.reaction"
                    );
                    const cmtBtn = e.target.closest(".comment-action");
                    const likeCmtBtn = e.target.closest(
                        ".commented-box__item-reaction--like"
                    );
                    const respCmtBtn = e.target.closest(
                        ".commented-box__item-reaction--respond"
                    );
                    const moreBtn = e.target.closest(".newsfeed__info-setting");
                    const editPost = e.target.closest(".edit-post");
                    const delPost = e.target.closest(".delete-post");
                    const showHideCmt = e.target.closest(".show-hide-cmt");
                    const deleteCmt = e.target.closest(
                        ".commented-box__item-delete"
                    );

                    checkLiked = (btn, action, arr, id) => {
                        if (btn.classList.contains("active")) {
                            btn.classList.remove("active");
                            arr.find((item) => item.id == id).like -= 1;
                            users[this.idUser][action].forEach(
                                (item, index) => {
                                    if (item == id) {
                                        users[this.idUser][action].splice(
                                            index,
                                            1
                                        );
                                    }
                                }
                            );
                        } else {
                            btn.classList.add("active");
                            arr.find((item) => item.id == id).like += 1;
                            users[this.idUser][action].includes(id)
                                ? null
                                : users[this.idUser][action].push(id);
                        }
                    };

                    if (likeBtn) {
                        const id = likeBtn.parentElement.dataset.index;
                        checkLiked(likeBtn, "postLiked", newfeeds, id);
                        this.render();
                        localStorage.setItem(
                            "newfeeds",
                            JSON.stringify(newfeeds)
                        );
                        localStorage.setItem("users", JSON.stringify(users));
                    }

                    if (likeCmtBtn) {
                        const id =
                            likeCmtBtn.parentElement.dataset.id ||
                            likeCmtBtn.parentElement.dataset.index;
                        checkLiked(likeCmtBtn, "cmtLiked", comments, id);
                        this.render();
                        localStorage.setItem(
                            "comments",
                            JSON.stringify(comments)
                        );
                        localStorage.setItem("users", JSON.stringify(users));
                    }

                    if (respCmtBtn) {
                        respCmtBtn.classList.toggle("active");
                        const cmtBox =
                            respCmtBtn.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
                                ".newsfeed__comment-input"
                            );
                        cmtBox.focus();
                    }

                    if (moreBtn) {
                        const moreList = moreBtn.querySelector(
                            ".newsfeed__info-setting-list"
                        );
                        moreList.classList.toggle("active");
                    }

                    if (cmtBtn) {
                        const inp =
                            cmtBtn.parentElement.parentElement.querySelector(
                                ".newsfeed__comment-input"
                            );
                        inp.focus();
                    }

                    if (delPost) {
                        const id = Number.parseInt(
                            delPost.parentElement.parentElement.dataset.index
                        );
                        cuteAlert({
                            type: "question",
                            title: "Xoá bài viết?",
                            message: "Bạn chắc chắn muốn xoá bài viết này?",
                            confirmText: "Xoá",
                            cancelText: "Huỷ",
                        }).then((e) => {
                            if (e) {
                                newfeeds.forEach((newfeed, index) => {
                                    if (newfeed.id == id) {
                                        newfeeds[index].deleted = true;
                                    }
                                });
                                localStorage.setItem(
                                    "newfeeds",
                                    JSON.stringify(newfeeds)
                                );
                                this.render();
                            }
                        });
                    }

                    if (editPost) {
                        _this.editMode = true;
                        editPost.classList.add("active");
                        const id = Number.parseInt(
                            editPost.parentElement.parentElement.dataset.index
                        );
                        newfeeds.forEach((newfeed, index) => {
                            if (newfeed.id == id) {
                                textAreaBox.value = newfeed.content;
                                imgPostBox.src = newfeed.bg;
                            }
                        });
                        showBox();
                    }

                    if (showHideCmt) {
                        const boxCmt =
                            showHideCmt.parentElement.parentElement.querySelector(
                                ".commented-box"
                            );
                        if (boxCmt.classList.contains("active")) {
                            showHideCmt.querySelector("span").innerHTML =
                                "Xem thêm";
                            boxCmt.classList.remove("active");
                        } else {
                            showHideCmt.querySelector("span").innerHTML =
                                "Thu gọn";
                            boxCmt.classList.add("active");
                        }
                    }

                    if (deleteCmt) {
                        const id = deleteCmt.dataset.index;
                        cuteAlert({
                            type: "question",
                            title: "Xoá bình luận?",
                            message: "Bạn chắc chắn muốn xoá bình luận này?",
                            confirmText: "Xoá",
                            cancelText: "Huỷ",
                        }).then((e) => {
                            if (e) {
                                comments.forEach((comment, index) => {
                                    if (
                                        comment.id == id ||
                                        comment.parentIdCmt == id
                                    ) {
                                        comments[index].deleted = true;
                                    }
                                });
                                localStorage.setItem(
                                    "comments",
                                    JSON.stringify(comments)
                                );
                                this.render();
                            }
                        });
                    }
                };
            });

            //check có đăng bài được hay không
            function checkSubmit() {
                const value = textAreaBox.value;
                if (value || imgPostBox.style.display != "none") {
                    postBtn.classList.add("btn-active");
                } else {
                    postBtn.classList.remove("btn-active");
                }
            }

            //upload file
            const uploadFile = $$(".uploadfile");
            const inputUpload = $(".input-upload");
            const deleteImg = $(".post-box__content-img span");

            uploadFile.forEach((item) => {
                item.onclick = () => {
                    inputUpload.click();
                    inputUpload.onchange = function (e) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = function () {
                            // The file's text will be printed here
                            imgPostBox.src = this.result;
                            imgPostBox.style.display = "block";
                            deleteImg.style.display = "block";
                            checkSubmit();
                            if (item.classList.contains("single")) {
                                showBox();
                            }
                        };
                        reader.readAsDataURL(file);
                    };
                };
            });

            deleteImg.onclick = () => {
                imgPostBox.src = "";
                imgPostBox.style.display = "none";
                deleteImg.style.display = "none";
                checkSubmit();
            };

            //check xem có text hay không
            textAreaBox.oninput = function () {
                checkSubmit();
            };

            //đăng bài
            postBtn.onclick = () => {
                if (_this.editMode) {
                    const editPost = $(".edit-post.active");
                    if (editPost) {
                        const id = Number.parseInt(
                            editPost.parentElement.parentElement.dataset.index
                        );
                        const content = textAreaBox.value.trim();
                        const bg = imgPostBox.src;

                        newfeeds.forEach((newfeed, index) => {
                            if (newfeed.id == id) {
                                newfeed.content = content;
                                newfeed.bg = bg;
                            }
                        });

                        localStorage.setItem(
                            "newfeeds",
                            JSON.stringify(newfeeds)
                        );
                        _this.render();
                        _this.editMode = false;
                        $(".post-box__btn.btn-disable").classList.remove(
                            "btn-active"
                        );
                    }
                } else if (postBtn.classList.contains("btn-active")) {
                    const content = textAreaBox.value.trim();
                    const bg = imgPostBox.src;
                    this.newPost(content, bg);
                    $(".post-box__btn.btn-disable").classList.remove(
                        "btn-active"
                    );
                }
                closeOverplay();
                clearNewPost();
            };

            //window scroll
            window.onscroll = (e) => {
                //sticky
                if (myWall.style.display != "none") {
                    const moreList = $(".my-wall__head-more");
                    const height = $(".my-wall__top").offsetHeight;
                    const wallFriends = $(".my-wall__main-left");
                    const wallFriendsBottom =
                        wallFriends.getBoundingClientRect().bottom;

                    const scrollTop =
                        window.scrollY || document.documentElement.scrollTop;
                    if (scrollTop > height) {
                        Object.assign(moreList.style, {
                            position: "fixed",
                            top: "var(--header-height)",
                            background: "var(--white-color)",
                            width: "100vw",
                            zIndex: "2",
                            textAlign: "center",
                            justifyContent: "center",
                            borderRadius: "0 0 40px 40px",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        });
                    } else {
                        Object.assign(moreList.style, {
                            position: "relative",
                            top: "0",
                            boxShadow: "none",
                        });
                    }

                    if (wallFriendsBottom < window.innerHeight) {
                        const heightSticky =
                            window.innerHeight - wallFriends.offsetHeight;
                        Object.assign(wallFriends.style, {
                            position: "sticky",
                            top: heightSticky + "px",
                        });
                    }
                }
            };

            //cmt
            window.onkeyup = (e) => {
                const responds = $$(
                    ".commented-box__item-reaction--respond.active"
                );
                responds.forEach((resp) => {
                    const inpBox =
                        resp.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
                            ".newsfeed__comment-input"
                        );
                    const idParent = Number.parseInt(
                        resp.parentElement.dataset.index
                    );
                    const content = inpBox.value.trim();
                    const idPost = Number.parseInt(inpBox.dataset.index);
                    console.log(idPost, idParent);
                    if (content) {
                        if (e.keyCode === 13) {
                            this.newSubCmt(content, idPost, idParent);
                        }
                    }
                });

                const inpCmts = document.querySelectorAll(
                    ".newsfeed__comment-input"
                );
                inpCmts.forEach((inp, index) => {
                    if (e.keyCode == 13) {
                        const idPost = Number.parseInt(inp.dataset.index);
                        const content = inp.value.trim();

                        if (content) {
                            this.newCmt(content, idPost);
                            inp.focus();
                            inp.value = null;
                        }
                    }
                });
            };

            //resp
            $(".nav-left-layout").onclick = function () {
                $(".container-left").classList.toggle("active");
                this.classList.toggle("active");
            };
        },
        start() {
            this.renderMess();
            this.render();
            this.handle();
        },
    };
})().start();
