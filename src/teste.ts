import { faker } from "@faker-js/faker";
import { v4 as randomUUID } from "uuid"; // npm i --save-dev @types/uuid

// Todas as classes começam com letra maiúscula

class Post {
  // criando atributos e definindo eles como privados, pois atributos declarados privados não podem ser acessados e modificados
  private _userName: string; // usar o underscore (underline) para nomear atributos privados
  private _description: string; // atributo privado
  private _createdAt: Date = new Date(); // atributo privado
  private _numberOfLikes: number = 0; // atributo privado
  private _id: string = randomUUID();
  private _isLiked: boolean = false;
  private _avatarUrl: string;
  private _imageUrl: string;

  // criando um construtor para "montar" o objeto post
  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string
  ) {
    this._userName = userName; // inicialização da propriedade userName
    this._description = description; // inicialização da propriedade titulo
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl; // inicialização do número de curtidas com 0
    this._isLiked;
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
                  alt="${this._userName}"
                  srcset=""
                />
              </div>
              <span>${this._userName}</span>
            </div>
            <div id="btn-follow" class="follow-options" onclick="follow()">
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
              <div id="btn-like" onclick="like()">
                <i class="fa fa-heart-o"></i>
              </div>

              <div>
                <i class="fa fa-comment-o"></i>
              </div>

              <div>
                <i class="fa fa-send-o"></i>
              </div>
            </div>
            <div id="btn-save" onclick="save()">
              <i class="fa fa-bookmark-o"></i>
            </div>`;

    const postLike = document.createElement("div");
    postLike.className = "post-likes";
    postLike.innerHTML = ` <i class="fa fa-heart"></i>
            <span id="like-count">0</span> likes`;

    const postDescription = document.createElement("div");
    postDescription.className = "post-description";
    postDescription.innerHTML = `<div class="user_name">username</div>
            <div class="description">
              your title here <span class="hash-tag">#hashtag</span>
            </div>`;

    postContainer.append(
      postHeader,
      postImage,
      postIcons,
      postLike,
      postDescription
    );
    document.body.appendChild(postContainer);

    return postContainer;
  }

  like() {
    this._isLiked = !this._isLiked;

    // incrementa o número de likes
    if (this._isLiked) {
      this._numberOfLikes += 1;
    } else {
      // decrementa o número de likes
      this._numberOfLikes -= 1;
    }
  }
}

const posts: Post[] = [];

for (let i = 1; i <= 15; i++) {
  const userName = faker.person.firstName();
  const avatarURL = faker.image.avatar();
  const imageUrl = faker.image.urlLoremFlickr();
  const description = faker.lorem.word();

  const post = new Post(userName, avatarURL, imageUrl, description);

  posts.push(post);
  post.render();
}

console.log(posts);