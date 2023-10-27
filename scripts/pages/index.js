
document.addEventListener("DOMContentLoaded", async () => {
    const photographerFactory = new PhotographerFactory();
    const photographers = await photographerFactory.createPhotographers();
    console.log(photographers);
    const photographersSection = document.querySelector(".photographer_section");
    // Afficher les cartes des photographes
    photographers.forEach(photographer => {
        let userCardDOM = photographer.renderHTML();
        photographersSection.insertAdjacentHTML('beforeend', userCardDOM);
    });
});
