const formInput = document.getElementById("forminput");
const formButton = document.getElementById("formbutton");
const userList = document.getElementById("user");
const clearBtn = document.getElementById("clearbutton");
const body = document.querySelector("body");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");
const overlay = document.getElementById("overlay");

const API = "https://randomuser.me/api/?results=9";

const soundFiles = {
  themeChange: "./audio/audio_light-on.mp3",
  deleteSound: "./audio/audio_light-off.mp3",
  deleteBtn: "./audio/deleteSound.mp3",
};

function playSound(sound) {
  const audio = new Audio(soundFiles[sound]);
  audio.play();
}

function fetchUsers() {
  overlay.classList.remove("hidden");
  fetch(API)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      userList.innerHTML = "";

      data.results.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.classList.add("useritem");

        userItem.dataset.userid = user.id.value;
        userItem.dataset.username = user.name.first;
        userItem.dataset.useremail = user.email;

        const userImg = document.createElement("img");
        userImg.classList.add("userimg");
        userImg.src = user.picture.large;
        userImg.alt = `${user.name.first} ${user.name.last} Profile Picture`;

        const userinfo = document.createElement("div");
        userinfo.classList.add("userinfo");

        const userName = document.createElement("h3");
        userName.classList.add("username");
        userName.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;

        const userEmail = document.createElement("p");
        userEmail.classList.add("useremail");
        userEmail.innerHTML = `<i class="fa-solid fa-envelope"></i> ${user.email}`;

        const userAge = document.createElement("p");
        userAge.classList.add("userage");
        userAge.innerHTML = `<i class="fa-solid fa-cake-candles"></i> ${user.dob.age} years old.`;

        const userLocation = document.createElement("p");
        userLocation.classList.add("userlocation");
        userLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${user.location.city}, ${user.location.country}`;

        const userGender = document.createElement("p");
        userGender.classList.add("usergender");
        userGender.innerHTML = `<i class="fa-solid fa-person"></i> ${user.gender}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("userdelete--btn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

        deleteBtn.addEventListener("click", () => {
          userList.removeChild(userItem);
          playSound("deleteBtn");
        });
        // Unusual dynamic action on deleteBtn
        deleteBtn.addEventListener("mouseenter", () => {
          deleteBtn.style.backgroundColor = "#ff7f50";
          deleteBtn.style.transform = "rotate(180deg)";
        });

        deleteBtn.addEventListener("mouseleave", () => {
          deleteBtn.style.backgroundColor = "";
          deleteBtn.style.transform = "";
        });

        userItem.appendChild(userImg);
        userinfo.appendChild(userName);
        userinfo.appendChild(userAge);
        userinfo.appendChild(userLocation);
        userinfo.appendChild(userGender);
        userinfo.appendChild(userEmail);
        userItem.appendChild(userinfo);
        userItem.appendChild(deleteBtn);
        userList.appendChild(userItem);

        userItem.addEventListener("mouseenter", () => {
          userItem.style.boxShadow = "0 0 10px rgba(255, 127, 80, 0.5)";
          userImg.style.transform = "scale(1.1)";
        });

        userItem.addEventListener("mouseleave", () => {
          userItem.style.boxShadow = "";
          userImg.style.transform = "";
        });
      });
      overlay.classList.add("hidden");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      overlay.classList.add("hidden");
    });
}

formButton.addEventListener("click", fetchUsers);
clearBtn.addEventListener("click", () => {
  userList.innerHTML = "";
});
darkBtn.addEventListener("click", () => {
  body.classList.add("dark-mode");
  lightBtn.classList.remove("hidden");
  darkBtn.classList.add("hidden");
  playSound("deleteSound");
});

lightBtn.addEventListener("click", () => {
  body.classList.remove("dark-mode");
  darkBtn.classList.remove("hidden");
  lightBtn.classList.add("hidden");
  playSound("themeChange");
});

fetchUsers();
