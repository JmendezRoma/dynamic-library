import { allBooks, displayBooks, bookDisplayed } from "./index.js";

async function filterPages() {
  try {
    const selectorFilterpages = document.getElementById("filterPages");
    const selectorRangeValueDisplay = document.getElementById("rangeValue");

    // Cuando se cambia el valor del input range
    selectorFilterpages.addEventListener("input", () => {
      const selectedPages = parseInt(selectorFilterpages.value, 10);
      selectorRangeValueDisplay.textContent = selectedPages;

      // Filtrar libros por el número de páginas
      const filteredBooks = allBooks.library.filter((element) => {
        return element.book.pages >= selectedPages;
      });

      // Limitar la cantidad de libros que se muestran
      const booksToDisplay = filteredBooks.slice(0, bookDisplayed);

      // Mostrar los libros filtrados con el límite definido
      displayBooks({ library: booksToDisplay }, booksToDisplay.length);
    });
  } catch (error) {
    console.error(`Error en filterPages(): ${error}`);
  }
}

export default filterPages;
