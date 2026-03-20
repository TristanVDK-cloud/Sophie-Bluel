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

async function deleteWork(id, token) {
    const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/JSON",
            "Authorization": `Bearer ${token}`
        }
    });

    if (reponse.ok) {
        console.log("Suppression réussie");
        window.location.reload();
    } else {
        alert("Erreur lors de la suppression");
    }
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

        trashBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const id = work.id
            const token = window.localStorage.getItem("token")

            if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
                deleteWork(id, token);
            }
        })
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