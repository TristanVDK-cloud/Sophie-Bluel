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
    document.querySelector("#form-add-photo").reset();
    previewImg.src = "#"; previewImg.classList.add("hidden");
    document.querySelector(".container-add-img i").classList.remove("hidden");
    document.querySelector(".label-file").classList.remove("hidden");
    document.querySelector(".container-add-img p").classList.remove("hidden");
    document.querySelector("#btn-validate").classList.remove("active");
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

function showAddView() {
    document.getElementById("modal-view-gallery").classList.add("hidden");
    document.getElementById("modal-view-add").classList.remove("hidden")
}

function showGalleryView() {
    document.getElementById("modal-view-gallery").classList.remove("hidden");
    document.getElementById("modal-view-add").classList.add("hidden");
}

document.querySelector(".btn-add-view").addEventListener("click", showAddView);
document.querySelector(".js-modal-back").addEventListener("click", showGalleryView);

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

function displayCategoriesInForm(categories) {
    const select = document.querySelector("#category");
    select.innerHTML = '<option value=""></option>';

    categories.forEach(categorie => {
        const option = document.createElement("option");
        option.value = categorie.id;
        option.innerText = categorie.name;
        select.appendChild(option);
    });
}

const inputFile = document.querySelector("#file");
const previewImg = document.querySelector("#preview-img");
const containerAddImg = document.querySelector(".container-add-img");

inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            previewImg.src = event.target.result;
            previewImg.classList.remove("hidden");

            document.querySelector(".container-add-img i").classList.add("hidden");
            document.querySelector(".label-file").classList.add("hidden");
            document.querySelector(".container-add-img p").classList.add("hidden");
        }
        reader.readAsDataURL(file);
    }
});

const inputTitle = document.querySelector("#title");
const inputCategory = document.querySelector("#category");
const btnValidate = document.querySelector("#btn-validate")

function checkForm() {
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const file = document.querySelector("#file").files[0];


    if (title !== "" && category !== "" && file !== undefined) {
        btnValidate.classList.add("active");
    } else {
        btnValidate.classList.remove("active");
    }
}

inputTitle.addEventListener("input", checkForm);
inputCategory.addEventListener("change", checkForm);
inputFile.addEventListener("change", checkForm);

const formAddPhoto = document.querySelector("#form-add-photo");

formAddPhoto.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!btnValidate.classList.contains("active")) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    const token = window.localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", inputTitle.value);
    formData.append("category", inputCategory.value);

    const reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    if (reponse.ok) {
        alert("Projet ajouté avec succès !")
        window.location.reload();
    } else {
        alert("Erreur lors de l'ajout du projet");
    }
});

closeModal();