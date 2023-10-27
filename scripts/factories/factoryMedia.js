class  MediaFactory {

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

  async createMedias() {
      const data = await this.fetchData();
      console.log(data.media);
      if (data && data.media) {
          return data.media.map(data => new Media(data));
      } else {
          return [];
      }
  }

}