import { MediaFactory } from "../factories/factoryMedia.js";
import { PhotographerFactory } from "../factories/factoryPhotographer.js";

document.addEventListener("DOMContentLoaded", async () => {
  const photographersId = new URL(location.href).searchParams.get("id");
  console.log(photographersId);

  const displayPhotographerHeader = async (photographersId) => {
    try {
      const header = document.querySelector(".photograph-header");
      const factory = new PhotographerFactory();
      const photographers = await factory.createPhotographers(photographersId);
      const photographer = photographers.find(
        (p) => p.id === parseInt(photographersId, 10)
      );
      if (!photographer) {
        throw new Error("Photographer not found");
      }
      header.innerHTML += photographer.headerRenderHTML();
      priceFunc(photographer);
    } catch (error) {
      console.error("Error displaying photographer header: " + error);
    }
  };

  displayPhotographerHeader(photographersId);

  const fetchAndDisplayMedia = async (photographerId) => {
    try {
      const mediaFactory = new MediaFactory();
      console.log(mediaFactory);
      const mediaData = await mediaFactory.createMedias();
      console.log(mediaData);
      const filteredData = mediaData.filter(
        (media) => media.photographerId === parseInt(photographerId, 10)
      );
      filteredData.sort((a, b) => b.likes - a.likes);
      const totalLikes = filteredData
        .map((media) => media.likes)
        .reduce((total, likes) => total + likes);
      displayMediasId(filteredData);
      likeMedia(totalLikes);
      sortData(filteredData, totalLikes);
    } catch (error) {
      console.error("Error fetching and displaying media: " + error);
    }
  };

  fetchAndDisplayMedia(photographersId);

  /**
   * Display media IDs in the DOM.
   * @param {Array} medias - Array of media objects.
   */
  const displayMediasId = async (medias) => {
    // Get the container for the media elements.
    const mediasContainer = document.querySelector(".medias-container");
    // Clear the container.
    mediasContainer.innerHTML = "";
    // Loop through each media object.
    medias.forEach((media) => {
      // If the media has an image, render it and append to the container.
      if (media.image) {
        let mediaCardDOM = media.imageRenderHTML();
        mediasContainer.insertAdjacentHTML("beforeend", mediaCardDOM);
      }
      // If the media has a video, render it and append to the container.
      else if (media.video) {
        let mediaCardDOM = media.videoRenderHTML();
        mediasContainer.insertAdjacentHTML("beforeend", mediaCardDOM);
      }
    });
    // Initialize the lightbox model.
    lightboxModel();
  };

  /**
   * Function to handle the lightbox model
   */
  const lightboxModel = () => {
    const body = document.querySelector("body");
    const modal = document.querySelector("#lightbox_container");
    const main = document.querySelector("main");
    const cross = document.querySelector("#cross");
    const nextBtn = document.querySelector("#d");
    const prevBtn = document.querySelector("#g");
    const header = document.querySelector(".titre");
    const articles = document.querySelectorAll("article");
    const container = document.querySelector(".media_container_lightbox");
    let currentArticleIndex = 0;

    const openModal = (media, title, index) => {
      main.setAttribute("aria-hidden", "true");
      modal.setAttribute("aria-hidden", "false");
      body.classList.add("noscroll");
      media = media.cloneNode(true);
      console.log(media);
      modal.style.display = "block";
      container.innerHTML = "";
      container.appendChild(media);
      header.innerHTML = title.innerHTML;
      media.setAttribute("aria-label", header.innerHTML);
      currentArticleIndex = index;
      // Enable controls for all videos in the media container lightbox
      let videos = document.querySelectorAll(".media_container_lightbox video");
      videos.forEach((video) => {
        video.setAttribute("controls", "true");
      });
    };

    // Add event listeners to each article
    articles.forEach((article, index) => {
      let media = article.querySelector("#easy");
      const title = article.querySelector(".title");

      // Add click event listener to open the modal
      media.addEventListener("click", () => {
        openModal(media, title, index);
        cross.focus();
      });
      // Add keyup event listener to open the modal when Enter key is pressed
      media.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          openModal(media, title, index);
          cross.focus();
        }
      });
    });

    // Function to close the modal
    const closeModal = () => {
      modal.style.display = "none";
    };

    // Add click event listener to close the modal
    cross.addEventListener("click", closeModal);

    // Add keyup event listener to close the modal when Enter key is pressed
    cross.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        closeModal();
      }
    });

    //Function to show the next media
    const showNextMedia = () => {
      if (currentArticleIndex === articles.length - 1) {
        currentArticleIndex = -1;
      }

      let nextMedia = articles[currentArticleIndex + 1]
        .querySelector("#easy")
        .cloneNode(true);
      container.innerHTML = "";
      container.appendChild(nextMedia);

      const nextTitle =
        articles[currentArticleIndex + 1].querySelector("h2").innerHTML;
      header.innerHTML = nextTitle;

      currentArticleIndex++;
      // Enable controls for all videos in the media container lightbox
      let videos = document.querySelectorAll(".media_container_lightbox video");
      videos.forEach((video) => {
        video.setAttribute("controls", "true");
      });
    };

    // Add click event listener to show the next media
    nextBtn.addEventListener("click", showNextMedia);
    // Add keyup event listener to show the next media when ArrowRight key is pressed
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight") {
        showNextMedia();
      }
    });

    // Function to show the previous media
    const showPreviousMedia = () => {
      if (currentArticleIndex === 0) {
        currentArticleIndex = articles.length;
      }
      let previousMedia = articles[currentArticleIndex - 1]
        .querySelector("#easy")
        .cloneNode(true);
      container.innerHTML = "";
      container.appendChild(previousMedia);
      const previousTitle =
        articles[currentArticleIndex - 1].querySelector("h2").innerHTML;
      header.innerHTML = previousTitle;
      currentArticleIndex--;
      // Enable controls for all videos in the media container lightbox
      let videos = document.querySelectorAll(".media_container_lightbox video");
      videos.forEach((video) => {
        video.setAttribute("controls", "true");
      });
    };

    // Add click event listener to show the previous media
    prevBtn.addEventListener("click", showPreviousMedia);
    // Add keyup event listener to show the previous media when ArrowLeft key is pressed
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") {
        showPreviousMedia();
      }
    });
  };

  /**
   * This function appends the price of a photo to an HTML element.
   * @param {Object} getPhoto - The photo object containing the price.
   */
  const priceFunc = (getPhoto) => {
    // Select the HTML element with class "prix"
    let priceElement = document.querySelector(".prix");

    // Append the price of the photo to the HTML element
    priceElement.innerHTML += getPhoto.price + "€/jour";
  };

  /**
   * Function to increment likes and update total likes.
   * @param {number} totalLikes - The total number of likes.
   */
  const likeMedia = (totalLikes) => {
    // Get all elements with class 'like'
    let likeElements = document.querySelectorAll(".like");
    // Get all elements with class 'icon'
    const icons = document.querySelectorAll(".icon");
    // Get the element with tag 'span'
    let totalLikesElement = document.querySelector("span");
    // Update total likes
    totalLikesElement.innerHTML = totalLikes;

    // Add event listeners to icons
    for (let i = 0; i < icons.length; i++) {
      icons[i].addEventListener(
        "click",
        // Increment or decrement likes and total likes
        (e) => {
          if (e.target.classList.contains("liked")) {
            likeElements[i].innerHTML--;
            totalLikesElement.innerHTML--;
            e.target.classList.remove("liked");
          } else {
            likeElements[i].innerHTML++;
            totalLikesElement.innerHTML++;
            e.target.classList.add("liked");
          }
        }
      );
      icons[i].addEventListener(
        "keyup",
        // Increment or decrement likes and total likes
        (e) => {
          if (e.key === "Enter") {
            if (e.target.classList.contains("liked")) {
              likeElements[i].innerHTML--;
              totalLikesElement.innerHTML--;
              e.target.classList.remove("liked");
            } else {
              likeElements[i].innerHTML++;
              totalLikesElement.innerHTML++;
              e.target.classList.add("liked");
            }
          }
        }
      );
    }
  };

  /**
   * Sorts the media list based on the selected value
   * @param {Array} mediaList - The list of media objects
   * @param {number} totalLikes - The total number of likes
   */
  const sortData = (mediaList, totalLikes) => {
    // Get the select element
    const valueSelect = document.querySelector("select");

    // Add event listener to the select element
    valueSelect.addEventListener("change", function () {
      // Get the selected value
      const selectedValue = valueSelect.options[this.selectedIndex].value;

      // Sort the media list based on the selected value
      mediaList.sort((a, b) => {
        if (selectedValue === "Titre") {
          // Sort by title
          return a.title.localeCompare(b.title);
        } else if (selectedValue === "Date") {
          // Sort by date
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          // Sort by likes
          return b.likes - a.likes;
        }
      });

      // Display the sorted media IDs
      displayMediasId(mediaList);

      // Like the media
      likeMedia(totalLikes);
    });
  };
});

// function to keep the focus in the modal

const focusableElements = '[tabindex]:not([tabindex="-1"])';
const lightboxModal = document.querySelector("#lightbox_container"); // select the modal by it's id

const firstFocusableElement =
  lightboxModal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

const focusableContent = lightboxModal.querySelectorAll(focusableElements);

const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
document.addEventListener("keydown", function (e) {
  let isTabPressed = e.key === "Tab" || e.keyCode === 9;

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();
