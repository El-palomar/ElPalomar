const botonMenu = document.querySelector("#menu");
const menuItems = document.querySelector("#menu-items");

let abierto = false;
botonMenu.addEventListener("click", () => {
    if (!abierto) {
        menuItems.classList.add("abierto");
        menuItems.style.height = menuItems.scrollHeight + "px";
    } else {
        menuItems.style.height = "0px";
        menuItems.addEventListener("transitionend",() => {
                menuItems.classList.remove("abierto");
            },{ once: true });}
        abierto = !abierto;
    });