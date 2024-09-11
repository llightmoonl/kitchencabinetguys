const menuBurger = document.querySelector(".header__burger");
const headerContent = document.querySelector(".header");
let isMenuPopup = false;

const arrowIcon = `<svg width="10" height="12" viewBox="0 0 10 12">
    <path d="M3.33333 10.5832L7.5 5.99984L3.33333 1.4165L2.59375 2.23005L6.02083 5.99984L2.59375 9.76963L3.33333 10.5832Z"/>
</svg>`;

const menuElements = [
    {
        Services: {
            "Cabinet Refacing": "/refacing",
            "Cabinet Doors Replacement": "/doors",
            "Thermofoil Cabinet Door Repair": "/thermofoil",
            "Decorative Wall Panels": "/decorative",
            "View All Services": "/services",
        },
    },
    {
        Commercial: {
            "Cabinet Refacing": "/refacing",
            "Cabinet Doors Replacement": "/doors",
            "Thermofoil Cabinet Door Repair": "/thermofoil",
            "Decorative Wall Panels": "/decorative",
            "View All Commercial": "/commercial",
        },
    },
    { Gallery: "/gallery" },
    {
        "About Us": {
            "Cabinet Refacing": "/refacing",
            "Cabinet Doors Replacement": "/doors",
            "Thermofoil Cabinet Door Repair": "/thermofoil",
            "Decorative Wall Panels": "/decorative",
            "More about": "/about",
        },
    },
    {
        "Areas We Serve": {
            "Cabinet Refacing": "/refacing",
            "Cabinet Doors Replacement": "/doors",
            "Thermofoil Cabinet Door Repair": "/thermofoil",
            "Decorative Wall Panels": "/decorative",
            "View All Services": "/serve",
        },
    },
    { "Contact Us": "/contact" },
];

const createElementMenu = (variant, [...classes], element, tag, innerHTML, attributeName, attributeValue) => {
    let newElement = "";

    switch (variant) {
        case "new":
            newElement = document.createElement("div");
            break;
        case "current":
            if (element) {
                newElement = element.appendChild(document.createElement(tag));
            }
            break;
        default:
            console.error("Недопустимый аргумент");
            break;
    }

    classes.length ? newElement.classList.add(...classes) : "";
    newElement.innerHTML = innerHTML ? innerHTML : "";
    attributeName && attributeValue ? newElement.setAttribute(attributeName, attributeValue) : "";

    return newElement;
};

const menuPopup = () => {
    const menuPopup = createElementMenu("new", ["menu-popup"]);
    const menuPopupList = createElementMenu("current", ["menu-popup__list"], menuPopup, "ul");

    for (let i = 0; i < menuElements.length; i++) {
        const menuKeyElement = Object.keys(menuElements[i])[0];
        const elementList = createElementMenu("current", ["menu-popup__element"], menuPopupList, "li");
        const elementLink = createElementMenu("current", [], elementList, "a", menuKeyElement);

        if (typeof menuElements[i][menuKeyElement] === "object") {
            elementList.insertAdjacentHTML("beforeend", arrowIcon);
            elementLink.addEventListener("click", () => {
                const submenuElementKeys = Object.keys(menuElements[i][menuKeyElement]);
                const submenuElementValues = Object.values(menuElements[i][menuKeyElement]);

                const submenuPopup = createElementMenu("new", ["submenu-popup"]);
                const backButtonSubmenu = createElementMenu(
                    "current",
                    ["submenu-popup__button-back"],
                    submenuPopup,
                    "a"
                );
                backButtonSubmenu.insertAdjacentHTML("beforeend", arrowIcon);

                const backButtonSubmenuText = createElementMenu(
                    "current",
                    [],
                    backButtonSubmenu,
                    "div",
                    "Back to the menu"
                );

                backButtonSubmenu.addEventListener("click", () => {
                    menuPopup.querySelector(".submenu-popup").remove();
                });

                const submenuContent = createElementMenu("current", ["submenu-popup__content"], submenuPopup, "div");
                const submenuPopupList = createElementMenu("current", ["submenu-popup__list"], submenuContent, "ul");

                for (let j = 0; j < submenuElementValues.length - 1; j++) {
                    const submenuElementList = createElementMenu(
                        "current",
                        ["submenu-popup__element"],
                        submenuPopupList,
                        "li"
                    );
                    const submenuElementLink = createElementMenu(
                        "current",
                        [],
                        submenuElementList,
                        "a",
                        submenuElementKeys[j],
                        "src",
                        submenuElementValues[j]
                    );
                }

                const viewSubmenu = createElementMenu(
                    "current",
                    ["submenu-popup__view"],
                    submenuContent,
                    "a",
                    submenuElementKeys[submenuElementValues.length - 1],
                    "src",
                    submenuElementValues[submenuElementValues.length - 1]
                );
                const buttonSubmenu = createElementMenu(
                    "current",
                    ["button", "submenu-popup__button"],
                    submenuPopup,
                    "button",
                    "Get Your Free Estimate"
                );
                menuPopup.insertAdjacentElement("beforeend", submenuPopup);
            });
        } else {
            elementLink.setAttribute("src", menuElements[i][menuKeyElement]);
        }
    }

    const buttonMenu = createElementMenu(
        "current",
        ["button", "menu-popup__button"],
        menuPopup,
        "button",
        "Get Your Free Estimate"
    );

    return menuPopup;
};

menuBurger.addEventListener("click", () => {
    if (!isMenuPopup) {
        menuBurger.classList.add("header__burger_active");
        document.body.style.overflowY = "hidden";
        headerContent.insertAdjacentElement("beforeend", menuPopup());
        headerContent.style.borderRadius = "0px";
        isMenuPopup = true;
    } else {
        menuBurger.classList.remove("header__burger_active");
        document.body.style.removeProperty("overflow-y");
        headerContent.querySelector(".menu-popup").remove();
        headerContent.style.removeProperty("border-radius");
        isMenuPopup = false;
    }
});
