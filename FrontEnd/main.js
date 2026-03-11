async function fetchWorks() {
    const reponse = await fetch("http://localhost:5678/api/works/");
    return await reponse.json();
}

async function fetchCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories")
    return await reponse.json();
}

async function init () {
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
    filters.appendChild(btnTous);

    btnTous.addEventListener("click", () => {
        displayWorks(works);
    });

    categories.forEach(categorie => {
        const btn = document.createElement("button");
        btn.textContent = categorie.name
        filters.appendChild(btn);

        btn.addEventListener("click", () => {
            const worksFilter = works.filter(work => work.categoryId === categorie.id);
            displayWorks(worksFilter);
        });
    });
}

init();
fetchWorks();
fetchCategories();


