const changeWishlist = (element) => {
    const name = element.srcElement.innerHTML;
    let wishlist = document.querySelector("#wishlist");
    while (document.querySelectorAll(".wish").length > 0)
        wishlist.removeChild(wishlist.firstChild);

    const json = fetch("./wishlist.json")
        .then((res) => res.json())

    json.then(data => {
        Object.entries(data[name])
            .forEach((element) => {
                const div = document.createElement("div");
                div.className = "wish";
                const cover = document.createElement("div");
                cover.className = "cover";
                div.appendChild(cover);

                const header = document.createElement("h3");
                header.appendChild(document.createTextNode(element[0]))
                cover.appendChild(header);

                if (element[1].link !== undefined) {
                    div.addEventListener("click", () => window.location.href = element[1].link);
                }

                if (element[1].image !== undefined) {
                    div.style.backgroundImage = `url(${element[1].image})`;
                }

                wishlist.appendChild(div);
            })
    });
}

document.querySelectorAll(".nav-button")
    .forEach(element => element.addEventListener("click", changeWishlist));