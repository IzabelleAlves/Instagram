import { faker } from "@faker-js/faker";
import { v4 as randomUUID } from "uuid"; // npm i --save-dev @types/uuid

class Story {
private _avatarUrl: string;
  private _userName: string;

  constructor(avatarStory: string, userName: string) {
    this._avatarUrl = avatarStory;
    this._userName = userName;
  }

  createStoryBar() {
    const storyBar = document.createElement("div");
    storyBar.className = "story-bar"; // Adicione uma classe para estilização

    storyBar.innerHTML = `
      <div class="story">
          <div class="storyImage">
          <img
            src="https://cdn.pixabay.com/photo/2018/11/13/22/01/instagram-3814080_640.png"
          /> 
          </div>

      </div>
    `;

    // Adiciona a barra de stories ao contêiner da barra inicial

    const barraInicial = document.getElementById("barraInicial");
    if (barraInicial) {
      barraInicial.appendChild(storyBar);
    }
  }
}
// Crie a barra de stories quando a página carregar
const stories: Story[] = [];

for (let i = 1; i <= 10; i++) {
  const userName = faker.person.firstName();
  const avatarUrl = faker.image.avatar();

  const story = new Story(userName, avatarUrl);
  story.createStoryBar();
  stories.push(story);
}