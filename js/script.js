const loadPhone = async (inputValue) => {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
  );
  let data = await res.json();
  let phones = data.data;
  displayCard(phones);
};
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
  // show only ten cards when search btn clicked***********
  phones = phones.slice(0, 12);
  phones.forEach((element) => {
    console.log(element);
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
            <button class="btn w-full bg-blue-500 text-white hover:bg-blue-400">
              Show Details
            </button>
          </div>
        </div>
    `;
    cardContainer.appendChild(div);
  });
}

function searchBtn() {
  let inputField = document.getElementById("input-field");
  let inputValue = inputField.value;
  inputField.value = "";
  loadPhone(inputValue);
}
