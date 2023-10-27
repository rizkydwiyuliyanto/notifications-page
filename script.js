const notifParent = document.getElementById("notif");
const notification = document.getElementById("notification")
const read_all = document.getElementById("read-all");
const followingText = (action) => {
    let result = "";
    switch (action) {
        case "reaction_post_notif":
            result = "reacted to your recent post"
            break
        case "join_group_notif":
            result = "has joined your group"
            break
        case "followed_notif":
            result = "followed you"
            break
        case "private_message_notif":
            result = "sent you a private message"
            break
        case "commented_picture_notif":
            result = "commented your picture"
            break
        default:
            result = "left the group"
    }
    return result;
}
const setText = (id, notifAction) => {
    return notifAction.find(x => {
        return x.id_notif === id;
    })
}
let data;
const showNotif = () => {
    const { notif } = data;
    let countUnreadNotif = 0
    notif.forEach((x, idx) => {
        const divItemParent = document.createElement("div");
        let { avatar, id_notif, user, action, read, time } = x;
        const divItem = document.createElement("div");
        divItemParent.classList.add("item-parent");
        if (!read) {
            divItemParent.classList.add("bg-light-blue");
        }
        let actionText = followingText(action);
        const notifValue = setText(id_notif, data[action]);
        if (!read) {
            countUnreadNotif += 1
        }
        divItem.innerHTML = `
            <div class="item">
                <div class="avatar">
                    <img src="${avatar}" alt=avatar-${idx}/>
                </div>
                <div class="test">
                    <p>
                        <span class="user">${user}</span>
                        <span class="action">${actionText}</span>
                        ${action !== "private_message_notif" && !action.includes("picture") ? `<span class="text ${action.includes("group") && "group"}">${notifValue.text}</span>` : ""}
                        <span class="${!read && "unread"}"></span>
                    </p>
                    <span class="time">${time}</span>
                     ${action === "private_message_notif" ? `<span class="message">${notifValue.text}</span>` : ""}
                </div>
                ${action.includes("picture") ? `<img src=${notifValue.text} class="image_message" alt=image-${idx}/>` : ""}
            </div>
        `
        divItemParent.appendChild(divItem)
        notifParent.appendChild(divItemParent)
    })
    const spanNotiv = document.createElement("span")
    spanNotiv.innerText = countUnreadNotif;
    spanNotiv.classList.add("notif-count")
    notification.appendChild(spanNotiv)
}
read_all.onclick = () => {
    const unreadNotif = document.querySelectorAll(".unread");
    const notif = document.querySelector(".notif-count")
    if (unreadNotif.length > 0) {
        notif.innerText = "0"
        unreadNotif.forEach(elem => {
            elem.classList.remove('unread')
        })
    }

}
fetch('./notif.JSON')
    .then((response) => response.json())
    .then((json) => {
        data = json
        showNotif()
    });