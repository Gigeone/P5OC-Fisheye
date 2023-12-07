export class Media {
  constructor(data) {
    if (data.image) {
      return new CustomImage(data);
    } else if (data.video) {
      return new Video(data);
    } else {
      throw "Unknown type format";
    }
  }
}

class CustomImage {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }

  imageRenderHTML() {
    return `
    <article>
      <img id="easy" src="/assets/${this.photographerId}/${this.image}" aria-label="${this.title}" alt="${this.title}" tabindex="6">
      <div class="description">
        <h2 class="title">${this.title}</h2>
        <div class="compteur">
          <p class="like" tabindex="7">${this.likes}</p>
          <i class="fa-solid fa-heart icon" tabindex="8"></i>
        </div>
      </div>
    </article>
  `;
  }
}

class Video {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.video = data.video;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }

  videoRenderHTML() {
    return `
    <article>
      <video width="300" id="easy" aria-label="${this.title}" tabindex="6">
        <source src="../../assets/${this.photographerId}/${this.video}" type="video/mp4" alt="${this.title}">
      </video>
      <div class="description">
        <h2 class="title">${this.title}</h2>
        <div class="compteur" >
          <p class="like" tabindex="7">${this.likes}</p>
          <i class="fa-solid fa-heart icon" tabindex="8"></i>
        </div>
      </div>
    </article>
  `;
  }
}
