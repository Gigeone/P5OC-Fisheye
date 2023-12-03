import { Media } from "../constructor/constructorMedia.js";

export class MediaFactory {
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
      console.error(
        "Erreur lors du chargement des données des photographes : " + error
      );
      return null;
    }
  }

  async createMedias() {
    const responseData = await this.fetchData();
    if (responseData?.media) {
      return responseData.media.map((mediaData) => new Media(mediaData));
    } else {
      return [];
    }
  }
}
