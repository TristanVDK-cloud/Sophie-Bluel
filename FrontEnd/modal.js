function openModal(event, works) {
    event.preventDefault();
    const modal = document.querySelector("#modal1");
    modal.style.display = "flex";
    modal.removeAttribute('aria-hidden');

    displayModalGallery(works);
}

function stopPropagation(event) {
    event.stopPropagation();
}

function closeModal() {
    const modal = document.querySelector("#modal1");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', true);
}

function displayModalGallery(works) {
    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = "";

    works.forEach(work => {
        const figure = document.createElement("figure");
        const imgWork = document.createElement("img");
        const trashBtn = document.createElement("button");
        const icon = document.createElement("i");
        figure.classList.add("modal-figure")
        imgWork.src = work.imageUrl;
        imgWork.alt = work.title;
        trashBtn.classList.add("delete-btn");
        trashBtn.dataset.id = work.id;
        icon.classList.add("fa-solid", "fa-trash-can");

        figure.appendChild(imgWork);
        figure.appendChild(trashBtn);
        modalGallery.appendChild(figure);
        trashBtn.appendChild(icon)
    });
}

const closeBtn = document.querySelector(".js-modal-close");
if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
}

const modalContainer = document.querySelector("#modal1");
if (modalContainer) {
    modalContainer.addEventListener("click", closeModal)
}

const modalWrapper = document.querySelector(".modal-wrapper");
if (modalWrapper) {
    modalWrapper.addEventListener("click", stopPropagation);
}

closeModal();