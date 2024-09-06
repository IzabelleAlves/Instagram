import { faker } from "@faker-js/faker";
import { v4 as randomUUID } from "uuid"; // npm i --save-dev @types/uuid

// Todas as classes começam com letra maiúscula

class Post {
  // criando atributos e definindo eles como privados, pois atributos declarados privados não podem ser acessados e modificados
  private _userName: string; // usar o underscore (underline) para nomear atributos privados
  private _description: string; // atributo privado
  private _createdAt: Date = new Date(); // atributo privado
  private _numberOfLikes: number = 0; // atributo privado
  private _hashtag: string;
  private _id: string = randomUUID();
  private _isLiked: boolean = false;
  private _isFollowed: boolean = false;
  private _isSaved: boolean = false;
  private _avatarUrl: string;
  private _imageUrl: string;

  // criando um construtor para "montar" o objeto post
  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string,
    hashtag: string
  ) {
    this._userName = userName; // inicialização da propriedade userName
    this._description = description; // inicialização da propriedade titulo
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl; // inicialização do número de curtidas com 0
    this._hashtag = hashtag;
  }

  render() {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";

    // header
    const postHeader = document.createElement("div");
    postHeader.className = "post-header";
    postHeader.innerHTML = `
          <div class="avatar-user">
              <div class="avatar">
                <img
                  src="${this._avatarUrl}"
                  alt=""
                  srcset=""
                />
              </div>
              <span>${this._userName}</span>
            </div>
            <div id="btn-follow-${this._id}" class="follow-options">
              <div class="follow">Follow</div>
              <div>...</div>
            </div>`;

    // imagem
    const postImage = document.createElement("div");
    postImage.className = "post-image";
    postImage.innerHTML = `<img
              src="${this._imageUrl}"
              alt="${this._description}"
              srcset=""
            />`;

    const postIcons = document.createElement("div");
    postIcons.className = "post-icons";
    postIcons.innerHTML = `<div>
              <div id="btn-like-${this._id}">
                <i class="fa fa-heart-o"></i>
              </div>

              <div>
                <i class="fa fa-comment-o"></i>
              </div>

              <div>
                <i class="fa fa-send-o"></i>
              </div>
            </div>
            <div id="btn-save-${this._id}">
              <i class="fa fa-bookmark-o"></i>
            </div>`;

    const postLike = document.createElement("div");
    postLike.className = "post-likes";
    postLike.innerHTML = ` <i class="fa fa-heart"></i>
            <span id="like-count-${this._id}">0</span> likes`;

    const postDescription = document.createElement("div");
    postDescription.className = "post-description";
    postDescription.innerHTML = `<div class="user_name">username</div>
            <div class="description">
              ${this._description} <span class="hash-tag">${this._hashtag}</span>
            </div>`;

    postContainer.append(
      postHeader,
      postImage,
      postIcons,
      postLike,
      postDescription
    );

    const mainContainer = document.getElementById("container-position");
    if (mainContainer) {
      mainContainer.appendChild(postContainer);
    }

    const likeButton = document.querySelector(`#btn-like-${this._id}`)
    if (likeButton){
      likeButton.addEventListener("click", () => this.like());
    }

    const saveButton = document.querySelector(`#btn-save-${this._id}`);
    if (saveButton) {
      saveButton.addEventListener("click", () => this.save());
    }

    const followButton = document.querySelector(`#btn-follow-${this._id}`);
    if (followButton) {
      followButton.addEventListener("click", () => this.follow());
    }
    
    return postContainer;
  }

  like() {

    const button = document.getElementById(`btn-like-${this._id}`);
    const icon = button?.querySelector("i");

    let likeCountElement = document.getElementById(`like-count-${this._id}`);

    if (!icon || !likeCountElement) return;

    icon.classList.toggle("fa-heart");
    icon.classList.toggle("liked");
    icon.classList.toggle("fa-heart-o");

    this._numberOfLikes += this._isLiked ? -1 : 1;
    likeCountElement.innerText = this._numberOfLikes.toString();

    this._isLiked = !this._isLiked;
  }

  save() {
    const button = document.getElementById(`btn-save-${this._id}`);
    const icon = button?.querySelector("i");

    if (!icon) return;

    icon.classList.toggle("fa-bookmark");
    icon.classList.toggle("saved");
    icon.classList.toggle("fa-bookmark-o");

    this._isSaved = !this._isSaved;
  }

  follow() {
    const button = document.querySelector(`#btn-follow-${this._id}`);
    const icon = button?.querySelector("div");

    if (!icon) return;

    icon.classList.toggle("followed-style");
    icon.innerHTML = this._isFollowed ? "Follow" : "Following";

    this._isFollowed = !this._isFollowed;
  }
}

const posts: Post[] = [];

for (let i = 1; i <= 15; i++) {
  const userName = faker.person.firstName();
  const avatarURL = faker.image.avatar();
  const imageUrl = faker.image.urlLoremFlickr();
  const description = faker.lorem.word();
  const hashtagWord = faker.lorem.word();

  const post = new Post(userName, avatarURL, imageUrl, description, hashtagWord);

  post.render();
  posts.push(post);
}

// console.log(posts);