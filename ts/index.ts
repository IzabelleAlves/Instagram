import { faker } from "@faker-js/faker";
import { v4 as randomUUID } from "uuid"; // npm i --save-dev @types/uuid

class Post {
  private _userName: string;
  private _description: string;
  private _createdAt: Date = new Date();
  private _numberOfLikes: number = 0;
  private _hashtag: string;
  private _id: string = randomUUID();
  private _isLiked: boolean = false;
  private _isFollowed: boolean = false;
  private _isSaved: boolean = false;
  private _avatarUrl: string;
  private _imageUrl: string;

  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string,
    hashtag: string
  ) {
    this._userName = userName;
    this._description = description;
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl;
    this._hashtag = hashtag;
  }

  render() {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";

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
      </div>
    `;

    const postImage = document.createElement("div");
    postImage.className = "post-image";
    postImage.innerHTML = `<img
      src="${this._imageUrl}"
      alt="${this._description}"
      srcset=""
    />`;

    const postIcons = document.createElement("div");
    postIcons.className = "post-icons";
    postIcons.innerHTML = `
      <div>
        <div id="btn-like-${this._id}">
          <i class="heart fa fa-heart-o"></i>
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
      </div>
    `;

    const postLike = document.createElement("div");
    postLike.className = "post-likes";
    postLike.innerHTML = `<i class="fa fa-heart"></i>
      <span id="like-count-${this._id}">0</span> likes`;

    const postDescription = document.createElement("div");
    postDescription.className = "post-description";
    postDescription.innerHTML = `
      <div class="user_name">${this._userName}</div>
      <div class="description">
        ${this._description} <span class="hash-tag">#${this._hashtag}</span>
      </div>
    `;

    const postComments = document.createElement("div");
    postComments.className = "post-comments";
    postComments.innerHTML = `
              <div class="comments-list" id="comments-list-${this._id}"></div>
                <div class="comment-input">
                  <textarea id="comment-input-${this._id}" placeholder="Add a comment..." rows="3"></textarea>
                  <div class="post-comment" id="comment-submit-${this._id}">Post</div>
                </div>
            `;

    postContainer.append(
      postHeader,
      postImage,
      postIcons,
      postLike,
      postDescription,
      postComments
    );

    const mainContainer = document.getElementById("container-position");
    if (mainContainer) {
      mainContainer.appendChild(postContainer);
    }

    const likeButton = document.querySelector(`#btn-like-${this._id}`);
    if (likeButton) {
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

    const commentInput = document.getElementById(
      `comment-input-${this._id}`
    ) as HTMLTextAreaElement;
    const commentButton = document.getElementById(`comment-submit-${this._id}`);

    if (commentInput && commentButton) {
      // Adicione um evento de input para o textarea
      commentInput.addEventListener("input", () => {
        // Verifique o valor do textarea
        if (commentInput.value.trim() === "") {
          // Esconda o botão se o textarea estiver vazio
          commentButton.classList.add("hidden");
        } else {
          // Mostre o botão se o textarea contiver algum texto
          commentButton.classList.remove("hidden");
        }
      });

      // Adicione o evento de clique no botão de postagem
      commentButton.addEventListener("click", () => this.addComment());
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

  icon.classList.add("pulse");
  setTimeout(() => {
    icon.classList.remove("pulse");
  }, 600);
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

  addComment() {
    const commentInput = document.getElementById(`comment-input-${this._id}`) as HTMLInputElement;
    const commentsList = document.getElementById(`comments-list-${this._id}`);
    if (!commentInput || !commentsList) return;

    const commentText = commentInput.value.trim();
    if (commentText) {
      // Cria um novo elemento de comentário
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      // Adiciona a foto do avatar ao comentário
      commentElement.innerHTML = `
        <div class="comment-header">
          <div class="comment-avatar">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQFlR2o9nmgq3A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713298906900?e=1731542400&v=beta&t=pfQ1tCOeS3wGRqrmi0f8NGj1pWFhaWimriLgSjTfcSE" alt="${this._userName}'s avatar"/>
          </div>
          <span class="comment-user">maria_</span>
        </div>
        <div class="comment-text">${commentText}</div>
      `;

      // Adiciona o comentário à lista de comentários
      commentsList.appendChild(commentElement);

      // Limpa o campo de entrada de comentário
      commentInput.value = "";
    }
  }
}

const posts: Post[] = [];

for (let i = 1; i <= 15; i++) {
  const userName = faker.person.firstName();
  const avatarURL = faker.image.avatar();
  const imageUrl = faker.image.urlLoremFlickr();
  const description = faker.lorem.sentences(2);
  const hashtagWord = faker.lorem.word();

  const post = new Post(userName, avatarURL, imageUrl, description, hashtagWord);
  post.render();
  posts.push(post);
}
