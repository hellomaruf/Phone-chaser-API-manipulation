const loadPhone = async (inputValue = "13") => {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
  );
  let data = await res.json();
  let phones = data.data;
  displayCard(phones);
};
loadPhone();
function displayCard(phones) {
  let cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  let showAllBtn = document.getElementById("show-all-btn");
  let cardLength = phones.length;
  if (cardLength > 12) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }
  // show only 12 cards when search btn clicked***********
  phones = phones.slice(0, 12);
  phones.forEach((element) => {
    // console.log(element);
    let div = document.createElement("div");
    div.classList = "card bg-base-100 shadow-md";
    div.innerHTML = `
    <figure>
          <img
            src="${element.image}"
            alt="Shoes"
            class="p-6"
          />
        </figure>
        <div class="card-body text-center">
          <h2 class="font-semibold text-xl text-center">${element.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions w-full">
            <button onclick="handleShowDetailsBtn('${element.slug}')" class="btn w-full bg-blue-500 text-white hover:bg-blue-400">
              Show Details
            </button>
          </div>
        </div>
    `;
    cardContainer.appendChild(div);
  });
  spinnerLoad(false);
}

function searchBtn() {
  spinnerLoad(true);
  let inputField = document.getElementById("input-field");
  let inputValue = inputField.value;
  inputField.value = "";
  loadPhone(inputValue);
}
// add spinner **************
let spinnerLoad = (isLoading) => {
  let loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

// play with show details button*********
let handleShowDetailsBtn = async (id) => {
  let res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  let data = await res.json();
  console.log(data.data);
  displayDataInModal(data.data);
};

const displayDataInModal = (data) => {
  show_details_modal.showModal();
  let modalImgTitle = document.getElementById("modal-img-title");
  let phoneSpecification = document.getElementById("phone-specification");

  modalImgTitle.innerHTML = `
  <img class="text-center" src='${data.image}' alt="" srcset="">
  <h3 class="font-bold text-2xl pt-3">${data.name}</h3>

  `;

  phoneSpecification.innerHTML = `
  <p class="pb-4"><span class = "font-semibold">Storage: </span>${data.mainFeatures.storage}</p>
  <p class="pb-4"><span class = "font-semibold">Display Size : </span>${data.mainFeatures.displaySize}</p>
  <p class="pb-4"><span class = "font-semibold">Chipset : </span>${data.mainFeatures.chipSet}</p>
  <p class="pb-4"><span class = "font-semibold">Memory : </span>${data.mainFeatures.memory}</p>
  <p class="pb-4"><span class = "font-semibold">Slug : </span>${data.slug}</p>
  <p class="pb-4"><span class = "font-semibold">Release data : </span>${data.releaseDate}</p>
  <p class="pb-4"><span class = "font-semibold">Brand : </span>${data.brand}</p>
  <p class="pb-4"><span class = "font-semibold">GPS : </span>${data.others.GPS}</p>
  `;
};
