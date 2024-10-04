// fetch video categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategoris(data.categories))
    .catch((error) => console.log(error));
};

// fetch videos
const loadVideos = () => {
  // corrected function name
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => showVideos(data.videos))
    .catch((error) => console.log(error));
};

// fetch load category videos
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => showVideos(data.category))
    .catch((error) => console.log(error));
};
// create the categories button
const showCategoris = (categories) => {
  const btnContainer = document.querySelector("#btn-container");
  categories.forEach((item) => {
    // console.log(item);
    const categoryBtn = document.createElement("div");
    categoryBtn.innerHTML = `
    <button onclick="loadCategoryVideos(${item.category_id})" class ="btn">${item.category}</button>
    `;
    btnContainer.append(categoryBtn);
  });
};

// create videos container
const showVideos = (videos) => {
  const videoContainer = document.querySelector("#video-container");
  videoContainer.innerHTML = ''
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100";
    card.innerHTML = `
  <figure class="h-[200px] relative">
  <img
  class="w-full h-full object-cover"
    src=${video.thumbnail}
    alt="videos thumbnail"/>

    ${
      video.others.posted_date?.length === 0
        ? ""
        : `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1" >${video.others.posted_date}</span>`
    }

  </figure>
  <div class="flex gap-2 py-2">
    <div>
      <img
      class="w-10 h-10 rounded-full object-cover"
    src=${video.authors[0].profile_picture}
    alt="videos thumbnail"/>

    </div>
    <div>
    <h2>${video.title}</h2>
    <div class ="flex items-center gap-2">
    <p>${video.authors[0].profile_name}</p>
   ${
     video.authors[0].verified === true
       ? `<img class="w-4" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/> `
       : ""
   }
    </div>
    </div>
  </div>
    `;
    videoContainer.append(card);
  });
};

loadCategories();
loadVideos();
