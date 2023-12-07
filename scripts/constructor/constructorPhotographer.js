export class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  renderHTML() {
    const picture = `././assets/photographers/${this.portrait}`;
    return `
    <article>
      <a href="photographer.html?id=${this.id}" aria-label="${this.name}">
        <img src="${picture}" alt="${this.name}">
        <h2>${this.name}</h2>
      </a>
      <h3>${this.country}, ${this.city}</h3>
      <p class="slogan">${this.tagline}</p>
      <p class="tarif">${this.price}€/jour</p>
    </article>
  `;
  }

  headerRenderHTML() {
    const picture = `/assets/photographers/${this.portrait}`;
    return `
    <div class="Photograph_detail" tabindex="2">
      <h2>${this.name}</h2>
      <h3>${this.country}, ${this.city}</h3>
      <p>${this.tagline}</p>
    </div>
    <button class="contact_button" tabindex="3">Contactez-moi</button>
    <img src="${picture}" aria-label="${this.name}" alt="${this.name}" tabindex="4">
  `;
  }
}
