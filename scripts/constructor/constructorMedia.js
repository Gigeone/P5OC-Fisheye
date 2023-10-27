class Media {

  constructor (data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }


  mediaRenderHTML(){
    return `
                <article>
                <img id="easy" src="../../assets/${this.photographerId}/${this.image}" aria-label="${this.title}" alt="${this.title} "tabindex="6">
                    <div class="description">
                        <h2 class="title">${this.title}</h2>
                        <div class="compteur" tabindex="6">
                            <p class="like">${this.likes}</p>
                            <i class="fa-solid fa-heart icon"></i>
                        </div>
                    </div>
                </article>
                `

}



}

