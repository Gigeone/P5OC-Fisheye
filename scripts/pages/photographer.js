document.addEventListener("DOMContentLoaded", async () => {
    const photographersId = new URL(location.href).searchParams.get("id");
    console.log(photographersId);

    
    const displayPhotgrapherId = async (photographersId) => {
        const photographerHeader = document.querySelector(".photograph-header");
        const photographerFactory = new PhotographerFactory();
        console.log(photographerFactory );
        const photographersFact = await photographerFactory.createPhotographers(photographersId);
        console.log(photographersFact );
        const photographer = photographersFact.find(p => p.id === parseInt(photographersId, 10))
        console.log(photographer);
        // const photographFac = photographerFactory(photographers);
        const getPhotographCardDOM = photographer.headerRenderHTML();
        photographerHeader.innerHTML += getPhotographCardDOM;
    }

    displayPhotgrapherId(photographersId);

    const displayMediasId = async (photographersId) => {
        const mediasContainer = document.querySelector(".medias-container");
        const mediasFactory = new MediaFactory();
        console.log(mediasFactory );
        const mediaFact = await mediasFactory.createMedias();
        console.log(mediaFact );
        const medias = mediaFact.filter(media => media.photographerId === parseInt(photographersId, 10))
        console.log(medias);
        medias.forEach(media => {
            let mediaCardDOM = media.mediaRenderHTML();
            mediasContainer.insertAdjacentHTML('beforeend', mediaCardDOM);
        });
        // const photographFac = photographerFactory(photographers);
        // const getMediaCardDOM = medias.mediaRenderHTML();
        // mediasContainer .innerHTML += getMediaCardDOM;
    }

    displayMediasId (photographersId)


    



    // const photographerFactory = new PhotographerFactory();
    // const photographers = await photographerFactory.createPhotographers();
    // console.log(photographers);
    // const photographersSection = document.querySelector(".photographer_section");
    // // Afficher les cartes des photographes
    // photographers.forEach(photographer => {
    //     let userCardDOM = photographer.headerRenderHTML();
    //     photographersSection.innerHTML += userCardDOM;
    // });
});

// const photographersId = new URL(location.href).searchParams.get("id");
// console.log(photographersId);