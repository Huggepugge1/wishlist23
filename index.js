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
                const front = document.createElement("div");
                front.className = "wish-front";
                div.appendChild(front);
                const cover = document.createElement("div");
                cover.className = "wish-cover";
                div.appendChild(cover);
                const back = document.createElement("div");
                back.className = "wish-back";

                const header = document.createElement("h3");
                header.appendChild(document.createTextNode(element[0]))
                cover.appendChild(header);
                
                if (element[1].description !== undefined) {
                    const desc = document.createElement("p");
                    desc.innerHTML = element[1].description;
                    back.appendChild(desc);
                }
                
                if (element[1].link !== undefined) {
                    div.addEventListener("click", () => window.location.href = element[1].link);
                    const click_me = document.createElement("p");
                    click_me.innerHTML = "(Klicka för att köpa)";
                    back.appendChild(click_me);
                }

                if (element[1].image !== undefined) {
                    front.style.backgroundImage = `url(${element[1].image})`;
                }


                div.appendChild(back);
                wishlist.appendChild(div);
            })
    });
}

document.querySelectorAll(".nav-button")
    .forEach(element => element.addEventListener("click", changeWishlist));