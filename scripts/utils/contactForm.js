const photographersId = new URL(location.href).searchParams.get("id");
console.log(photographersId);

const displayPhotographerName= async (photographersId) => {
    const photographerFactory = new PhotographerFactory();
    console.log(photographerFactory );
    const photographersFact = await photographerFactory.createPhotographers(photographersId);
    console.log(photographersFact );
    const photographer = photographersFact.find(p => p.id === parseInt(photographersId, 10))
    console.log(photographer);
    const name = document.querySelector(".name");
    name.innerHTML = `${photographer.name}`;
}

displayPhotographerName(photographersId);


function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const form = document.querySelector("form")
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // pour eviter le rechargement de la page au submit
    console.log(form.checkValidity());
    if (form.checkValidity()) {
        closeModal()
        // setTimeout(alert("good"), 5000);
        form.reset(); // reste du form si validé
    
    }
  }