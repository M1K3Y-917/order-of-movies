const form = document.querySelector("form");
const input = document.querySelector(".input");
const movieContainer = document.querySelector(".movie");
const child = document.querySelector("div");
const cta = document.querySelector(".cta");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const value = input.value.toLowerCase();
  input.value = "";
  input.blur();
  movieContainer.textContent = "";
  movieContainer.insertAdjacentHTML(
    "afterbegin",
    '<span class="loading loading-spinner text-accent loading-lg"></span>'
  );

  const req = await fetch(
    `https://tsngtgnrmikcoivmqnbr.supabase.co/rest/v1/order of movies`,
    {
      headers: {
        apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbmd0Z25ybWlrY29pdm1xbmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzQ4MDUsImV4cCI6MjA0ODkxMDgwNX0.aGf0ArZJ-TM2LNlhsDndaYa0NcWUhsX1l_QDgngqAQM`,
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbmd0Z25ybWlrY29pdm1xbmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzQ4MDUsImV4cCI6MjA0ODkxMDgwNX0.aGf0ArZJ-TM2LNlhsDndaYa0NcWUhsX1l_QDgngqAQM`,
      },
    }
  );

  const data = await req.json();

  const has = data.some((data) => data.movie.toLowerCase() === value);
  if (has) {
    const [movie] = data.filter((data) => data.movie.toLowerCase() === value);
    const movieOrder = await movie.order.split(",");

    const request = await fetch(
      `https://www.omdbapi.com/?apikey=12285a27&t=${movieOrder[0]}`
    );
    const imgdata = await request.json();
    movieContainer.textContent = "";
    movieContainer.insertAdjacentHTML(
      "afterbegin",
      ` <div class="card bg-base-100 w-96 shadow-xl ">
            <figure>
                <img class='img h-2/6' src="${imgdata.Poster}" alt="${movie.movie}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title block text-lg font-bold text-neutral tracking-wide">Order of <span
                        class="text-accent uppercase">${movie.movie}</span>
                    movies</h2>

                <div class="card-actions justify-center">
                    <ul class="steps steps-vertical">
                  

                    </ul>
                </div>
            </div>
        </div>`
    );
    movieOrder.forEach((movie) => {
      document
        .querySelector(".steps")
        .insertAdjacentHTML(
          "beforeend",
          `<li class="step step-accent font-medium">${movie}</li>`
        );
    });
  } else {
    if (value === "supa") {
      movieContainer.innerHTML = `<div class=" text-white flex flex-col items-center  space-y-10 p-5">
            <!-- Hero Section -->
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-3 text-neutral header">Your Ultimate Guide to Movie Timelines ⌛
                </h1>
                <p class="text-lg md:text-xl text-gray-400">Find the perfect order to watch your favorite franchises!
                </p>
            </div>
            <button class="btn btn-active   text-base-100 font-medium  cta">Search for a franchise</button>
        </div>`;

      document.querySelector("html").style.backgroundColor = "#171717";
      document.querySelector(".navbar").style.backgroundColor = "#171717";
      document.querySelector(".navbar").style.borderBottom =
        "0.5px solid #6B6B6B";
      document.querySelector(".header").style.color = "#FFFFFF";
      document.querySelector(".logo").style.color = "#FFFFFF";
      document.querySelector(".cta").style.backgroundColor = "#3ECF8E";
      document.querySelector(".search").style.color = "#3ECF8E";
    } else {
      movieContainer.textContent = "";
      movieContainer.insertAdjacentHTML(
        "afterbegin",
        `<div role="alert" class="alert alert-error bg-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Failed to fetch data for "${value}". Try checking the spelling</span>
</div>`
      );
    }
  }
});

cta.addEventListener("click", function () {
  input.focus();
});
/* <li class="step step-accent font-medium">antman</li>
<li class="step step-accent font-medium">antman</li>
<li class="step step-accent font-medium">antman</li> */
