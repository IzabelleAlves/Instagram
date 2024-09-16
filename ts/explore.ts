import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid"; // npm i --save-dev @types/uuid

class Explore {
  private _userName: string; // usar o underscore (underline) para nomear atributos privados
  private _description: string; // atributo privado
  private _createdAt: Date = new Date(); // atributo privado
  private _numberOfLikes: number = 0; // atributo privado
  private _id: string = uuidv4();
  private _isLiked: boolean = false;
  private _avatarUrl: string;
  private _imageUrl: string;
  private _hashtag: string;
  private _isFollowed: boolean = false;
  private _isSaved: boolean = false;

  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string,
    hashtag: string,
  ) {
    this._userName = userName; 
    this._description = description; 
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl; 
    this._hashtag = hashtag;
  }

  renderExplore() {
    const explore = document.createElement("div");
    explore.className = "image-blocks";
    explore.innerHTML = `<div class="photo-overlay">
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

    const findExplore = document.getElementById("container-principal");
    if (findExplore) {
      findExplore.appendChild(explore);
    } else {
      console.error("Element with ID 'container-principal' not found.");
    }

    return explore;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const explores: Explore[] = [];

  for (let i = 1; i <= 15; i++) {
    const imageUrl = faker.image.urlLoremFlickr();

    const explore = new Explore(
      "", 
      "",
      imageUrl,
      "", 
      ""
    );
    explores.push(explore);

    explore.renderExplore();
  }
});