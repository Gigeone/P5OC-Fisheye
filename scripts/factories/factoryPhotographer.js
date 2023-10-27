// import {fetchPhotographers} from "../utils/api.js"

class  PhotographerFactory {

    async fetchData() {
        try {
            const response = await fetch("../../data/photographers.json");
            if (!response.ok) {
                throw new Error("La requête Fetch a échoué.");
            }
            const data = await response.json();
            console.log(data);
            return data;
            
        } catch (error) {
            console.error("Erreur lors du chargement des données des photographes : " + error);
            return null;
        }
    }

    async createPhotographers() {
        const data = await this.fetchData();
        console.log(data.photographers);
        if (data && data.photographers) {
            return data.photographers.map(data => new Photographer(data));
        } else {
            return [];
        }
    }

}


