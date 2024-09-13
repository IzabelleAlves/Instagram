import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid"; // npm i --save-dev @types/uuid

class Profile {
  private _imageUrl: string;

  constructor(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  profilePhotos() {
    const photos = document.createElement("div");
    photos.className = "image-blocks";
    photos.innerHTML = `<div class="photo-overlay">
        <img src="${this._imageUrl}" alt="" />
        <div class="overlay-content">
          <button class="like-btn">
          <i class="fa fa-heart" aria-hidden="true"></i>
          </button>
          <button class="comment-btn">
          <i class="fa fa-comment" aria-hidden="true"></i>
          </button>
        </div>
      </div>  
    `;

    const getPhotos = document.getElementById("container-profile");
    if (getPhotos) {
      getPhotos.appendChild(photos);
    }
    return photos;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const postedPhotos: Profile[] = [];

  for (let i = 1; i <= 15; i++) {
    const imageUrl = faker.image.urlLoremFlickr();

    const feed = new Profile(imageUrl);
    postedPhotos.push(feed);

    feed.profilePhotos();
  }
});