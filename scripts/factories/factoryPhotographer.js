import { Photographer } from "../constructor/constructorPhotographer.js";

export class PhotographerFactory {
  async fetchData() {
    try {
      const response = await fetch("././data/photographers.json");
      if (!response.ok) {
        throw new Error("La requête Fetch a échoué.");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(
        "Erreur lors du chargement des données des photographes : " + error
      );
      return null;
    }
  }

  async createPhotographers() {
    const { photographers } = await this.fetchData();
    return photographers
      ? photographers.map((data) => new Photographer(data))
      : [];
  }
}
