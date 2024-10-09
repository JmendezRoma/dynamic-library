import { selectorSectionBooks, allBooks } from "./index.js";

const selectorFilterGenre = document.getElementById("genreSelector");

export default async function filterGender() {
  try {
    if (allBooks) {
      selectorFilterGenre.addEventListener("change", (event) => {
        const selectedValueGenre = event.target.value;

        selectorSectionBooks.innerHTML = "";
        let genreFilter = allBooks.library.filter((book) => {
          return book.book.genre === selectedValueGenre;
        });

        genreFilter.forEach((element) => {
          const bookTitle = element.book.title;
          const bookCover = element.book.cover;

          const bookElment = document.createElement("div");
          const bookImg = document.createElement("img");
          const bookTitleElement = document.createElement("p");

          bookImg.src = bookCover;
          bookImg.style.width = "100px";
          bookImg.style.height = "120px";
          bookTitleElement.textContent = bookTitle;

          bookElment.appendChild(bookImg);
          bookElment.appendChild(bookTitleElement);

          selectorSectionBooks.appendChild(bookElment);
        });
      });
    }
  } catch (error) {
    console.error(`Error filterGender(): ${error}`);
  }
}
