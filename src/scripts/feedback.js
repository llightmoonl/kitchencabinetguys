const feedbackInfo = document.querySelector(".feedback__information");
const feedbackForm = document.querySelector(".feedback__form");
const feedbackContent = document.querySelector(".feedback__content");
const feedbackSelect = document.querySelector(".feedback__select");

const validtaionFormFeedback = (input) => {
    switch (input.id) {
        case "first__name":
            input.style.backgroundColor =
                !/^([A-Za-z]+)$/gi.exec(input.value) && input.value.length != 0 ? "#d73333" : "#ffffff";
            break;
        case "last__name":
            input.style.backgroundColor =
                !/^([A-Za-z]+)$/gi.exec(input.value) && input.value.length != 0 ? "#d73333" : "#ffffff";
            break;
        case "email":
            input.style.backgroundColor =
                !/([A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z])/gi.exec(input.value) && input.value.length != 0
                    ? "#d73333"
                    : "#ffffff";
            break;
        case "phone":
            input.style.backgroundColor =
                !/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/gi.exec(input.value) && input.value.length != 0
                    ? "#d73333"
                    : "#ffffff";
            break;
        case "address":
            input.style.backgroundColor =
                !(input.value.length >= 10 && input.value.length <= 140) && input.value.length != 0
                    ? "#d73333"
                    : "#ffffff";
            break;
        case "service":
            input.style.backgroundColor =
                !(input.value.length >= 10 && input.value.length <= 140) && input.value.length != 0
                    ? "#d73333"
                    : "#ffffff";
            break;
        case "message":
            input.style.backgroundColor =
                !(input.value.length >= 10) && input.value.length != 0 ? "#d73333" : "#ffffff";
            break;
    }
};

const isEmptyFormFeedback = (input) => {
    Array(...input.form)
        .filter((value) => value.tagName === "INPUT" || value.tagName === "TEXTAREA")
        .map((value) => {
            if (value.value.length === 0) {
                value.style.backgroundColor = "#d73333";
                setTimeout(() => {
                    value.style.backgroundColor = "#ffffff";
                }, 1500);
            }
        });
};

const countRightInputValidation = (input) => {
    return Array(...input.form)
        .filter((value) => value.tagName === "INPUT" || value.tagName === "TEXTAREA")
        .filter((value) => value.style.backgroundColor === "rgb(255, 255, 255)" || value.style.backgroundColor === "")
        .length;
};

const responseFeedbackInformation = () => {
    return `
    <div class = "feedback__information feedback__submitted">
        <h2 class="feedback__headline">Thank you!</h2>
        <p class="feedback__text text-m">
            Your message has been submitted
        </p>
    </div>
    `;
};

const requestFeedback = async (query) => {
    const response = await fetch("/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(query),
    });

    return await response.json();
};

const editContentFeedback = (addItem, position, textItem, removeItem = "") => {
    if (removeItem) {
        removeItem.remove();
    }
    addItem.insertAdjacentHTML(position, textItem);
};

window.addEventListener("click", (event) => {
    if (!feedbackSelect.contains(event.target)) {
        {
            feedbackSelect.children[0].style.borderRadius = "16px";
            feedbackSelect.children[2].style.display = "none";
        }
    }
});

feedbackForm.addEventListener("focusout", (event) => {
    event.preventDefault();

    validtaionFormFeedback(event.target);
});

feedbackForm.addEventListener("focusin", (event) => {
    event.preventDefault();

    if (event.target.id === "select__service") {
        const selectList = feedbackSelect.children[2];

        event.target.style.borderRadius = "16px 16px 0px 0px";
        selectList.style.display = "block";
    }
});

feedbackSelect.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        feedbackSelect.children[0].value = event.target.innerHTML;
        feedbackSelect.children[0].style.borderRadius = "16px";
        feedbackSelect.children[2].style.display = "none";
    }
});

feedbackForm.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.tagName === "BUTTON") {
        validtaionFormFeedback(event.target);
        isEmptyFormFeedback(event.target);

        if (countRightInputValidation(event.target) === 7) {
            const queryFeedback = {
                firstName: event.target.form[0].value,
                lastName: event.target.form[1].value,
                email: event.target.form[2].value,
                phone: event.target.form[3].value,
                address: event.target.form[4].value,
                services: event.target.form[5].value,
                message: event.target.form[6].value,
            };
            localStorage.setItem("queryFeedback", queryFeedback);

            editContentFeedback(feedbackContent, "beforeend", responseFeedbackInformation(), feedbackInfo);
            requestFeedback(queryFeedback);
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("queryFeedback")) {
        editContentFeedback(feedbackContent, "beforeend", responseFeedbackInformation(), feedbackInfo);
    }
});
