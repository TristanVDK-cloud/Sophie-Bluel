const token = window.localStorage.getItem("token")

if (token) {
    document.querySelector(".edition-mode").style.display = "flex";
    document.querySelector(".edition-mode").style.display = "gap: 5px";
    document.querySelector(".js-modal").style.display = "flex";
    const filters = document.querySelector(".filters");
    filters.style.display = "none";
    const logout = document.querySelector(".login");
    logout.innerText = "Logout";
    logout.addEventListener("click", () => {
        window.localStorage.removeItem("token");
        window.location.href = "login.html";
    })
}

async function fetchWorks() {
    const reponse = await fetch("http://localhost:5678/api/works/");
    return await reponse.json();
}

async function fetchCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories")
    return await reponse.json();
}

async function init() {
    const works = await fetchWorks();
    const categories = await fetchCategories();

    displayWorks(works);
    displayCategories(categories, works);
}

function displayWorks(workList) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    workList.forEach(work => {
        const figure = document.createElement("figure");
        const imgWork = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        imgWork.src = work.imageUrl;
        imgWork.alt = work.title;
        figcaption.innerText = work.title;

        figure.appendChild(imgWork);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

function displayCategories(categories, works) {
    const filters = document.querySelector(".filters");
    const btnTous = document.createElement("button")
    btnTous.innerText = "Tous";
    btnTous.classList.add("filter-selected");
    filters.appendChild(btnTous);

    function updateSelectedButton(clickedButton) {
        const currentActive = document.querySelector(".filter-selected");
        if (currentActive) {
            currentActive.classList.remove("filter-selected");
        }
        clickedButton.classList.add("filter-selected");
    }

    btnTous.addEventListener("click", (event) => {
        updateSelectedButton(event.target);
        displayWorks(works);
    });

    categories.forEach(categorie => {
        const btn = document.createElement("button");
        btn.textContent = categorie.name
        filters.appendChild(btn);

        btn.addEventListener("click", (event) => {
            updateSelectedButton(event.target);
            const worksFilter = works.filter(work => work.categoryId === categorie.id);
            displayWorks(worksFilter);
        });
    });
}

init();