import initialize from "./initialize.js";
import itemsAndEventsBooksMobile from "./itemsAndEventsBooksMobile.js";
import itemsAndEventsBooksPc from "./itemsAndEventsBookPc.js";
import filterPages from "./filterPages.js";
import filterGender from "./filterGenre.js";

const booksJSONPath = "../JSON/books.json";
export const selectorContainerReadList = document.getElementById("readList");
export const selectorSectionBooks = document.getElementById("books");
export let allBooks;
export let bookDisplayed = 6;

export default async function FetchAndParse() {
  try {
    const response = await fetch(booksJSONPath);
    if (!response.ok) {
      throw new Error(`Https error: ${response.status}`);
    }
    const booksParse = await response.json();
    allBooks = booksParse;
    return allBooks;
  } catch (error) {
    console.error("error en fetch o .json");
  }
}

/*
 *  IIFE (Immediately Invoked Function Expression)
 */
window.addEventListener("DOMContentLoaded", async () => {
  const allBooks = await FetchAndParse();
  console.log(allBooks);
  if (allBooks) {
    initialize(allBooks);
    filterPages(allBooks);
    filterGender(allBooks);
    displayBooks(allBooks, bookDisplayed);
  }
});

export function displayBooks(bookData, limit) {
  selectorSectionBooks.innerHTML = "";
  const booksToDisplay = bookData.library.slice(0, limit);
  console.log("mostrando libros. ", bookDisplayed);

  if (window.matchMedia("(max-width: 768px)").matches) {
    itemsAndEventsBooksMobile(booksToDisplay); // Para móvil
  } else {
    itemsAndEventsBooksPc(booksToDisplay); // Para PC
  }
}

window.addEventListener("resize", () => {
  if (allBooks) {
    displayBooks(allBooks, bookDisplayed);
  }
});
window.addEventListener("resize", () => {
  if (allBooks) {
    initialize(allBooks); // Re-inicializa los eventos al cambiar el tamaño de la ventana
  }
});
