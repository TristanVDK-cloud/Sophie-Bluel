async function fetchWorks() {
    const reponse = await fetch("http://localhost:5678/api/works/");
    const works = await reponse.json();

    const titles = works.map(work => work.title)
    // console.log(titles);
    // console.log(works);
    displayWorks(works);
}

function displayWorks(workList) {
    const gallery = document.querySelector(".gallery");

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
fetchWorks();