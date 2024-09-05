// follow

let isFollowed = false;

function follow() {
  const button = document.getElementById("btn-follow");
  const icon = button?.children[0];

  if (!icon) return;

  if (isFollowed) {
    icon.classList.remove("followed-style");
    icon.innerHTML = "Follow";
  } else {
    icon.classList.add("followed-style");
    icon.innerHTML = "Following";
  }

  isFollowed = !isFollowed;
}

// like

let isLiked = false;
let likeCount = 0;

function like() {
  // to get the element by id
  const button = document.getElementById("btn-like");
  const icon = button?.children[0];

  let likeCountElement = document.getElementById("like-count");

  // make a condition to verify if icon isn't undefined or null
  if (!icon || !likeCountElement) return;

  // to remove the filled heart and add an empty heart
  if (isLiked) {
    icon.classList.remove("fa-heart");
    icon.classList.remove("liked");
    icon.classList.add("fa-heart-o");

    likeCount--;
  } else {
    // to add an filled heart and remove the empty heart
    icon.classList.add("fa-heart");
    icon.classList.add("liked");
    icon.classList.remove("fa-heart-o");

    likeCount++;
  }

  likeCountElement.innerText = likeCount.toString();

  isLiked = !isLiked;
}

// bookmark

let isSaved = false;

function save() {
  const button = document.getElementById("btn-save");
  const icon = button?.children[0];

  if (!icon) return;

  if (isSaved) {
    icon.classList.remove("fa-bookmark");
    icon.classList.remove("saved");
    icon.classList.add("fa-bookmark-o");
  } else {
    icon.classList.add("fa-bookmark");
    icon.classList.add("saved");
    icon.classList.remove("fa-bookmark-o");
  }

  isSaved = !isSaved;
}