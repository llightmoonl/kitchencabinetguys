let currentComment = document.querySelector(".comments__element_active");

const testimonialsContent = document.querySelector(".testimonials__content");
const buttonComments = document.querySelector(".comments__arrows");

testimonialsContent.addEventListener("click", (event) => {
    if (event.target.className === "arrow arrow_next") {
        currentComment.classList.remove("comments__element_active");
        currentComment = currentComment.nextElementSibling
            ? currentComment.nextElementSibling
            : currentComment.parentElement.firstElementChild;
        currentComment.classList.add("comments__element_active");
        console.log(currentComment);
    }
    if (event.target.className === "arrow arrow_prev") {
        currentComment.classList.remove("comments__element_active");
        currentComment = currentComment.previousElementSibling
            ? currentComment.previousElementSibling
            : currentComment.parentElement.lastElementChild;
        currentComment.classList.add("comments__element_active");
    }
});
