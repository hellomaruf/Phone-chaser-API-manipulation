const loadPhone = async () => {
  let res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  let data = await res.json();
  let phones = data.data;
  displayCard(phones);
};
function displayCard(phones) {
  let cardContainer = document.getElementById("card-container");

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
          <h2 class="font-semibold text-xl text-center">Shoes!</h2>
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
loadPhone();
