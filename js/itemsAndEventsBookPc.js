import { selectorSectionBooks, selectorContainerReadList } from "./index.js";

let currentDraggedId = "";

function itemsAndEventsBooksPc(displayBooks) {
  try {
    displayBooks = Array.from(displayBooks);
    console.log(displayBooks);

    displayBooks.forEach((element, index) => {
      const imgs = document.createElement("img");

      const bookCover = element.book.cover;
      imgs.src = bookCover;
      imgs.style.width = "100px";
      imgs.style.height = "120px";

      const bookElement = document.createElement("div");

      bookElement.appendChild(imgs);

      selectorSectionBooks.appendChild(bookElement);

      const safeBookId = `book-${index}`;
      console.log(safeBookId);

      imgs.setAttribute("id", safeBookId);
      imgs.setAttribute("draggable", "true");
      imgs.addEventListener("dragstart", (event) => {
        console.log(`Evento dragstart detectado para: ${safeBookId}`);
        startDrag(event, safeBookId);
      });
    });
    function startDrag(event, id) {
      event.dataTransfer.setData("text/plain", id);
      currentDraggedId = id;
      console.log(`Dragging- ${id}`);
    }

    selectorContainerReadList.addEventListener("dragover", (event) =>
      enableDrop(event)
    );

    selectorContainerReadList.addEventListener("drop", (event) =>
      dragBookReadList(event)
    );

    function enableDrop(event) {
      event.preventDefault();
      //console.log(event);
    }

    selectorSectionBooks.addEventListener("dragover", (event) =>
      enableDrop(event)
    );

    selectorSectionBooks.addEventListener("drop", (event) =>
      dragBookContainerBooks(event)
    );

    function dragBookContainerBooks(event) {
      event.preventDefault();

      console.log(event);
      let data = event.dataTransfer.getData("text/plain");
      console.log(data);

      let draggedElement = document.getElementById(data);

      if (draggedElement) {
        // Si el libro existe, moverlo al contenedor de libros
        console.log(`Found element- ${draggedElement}`);
        selectorSectionBooks.appendChild(draggedElement);
        console.log(currentDraggedId);
      } else {
        console.error(`No se encontró el elemento con ID- ${data}`);
      }
    }

    function dragBookReadList(event) {
      event.preventDefault();
      console.log(event);

      let data = event.dataTransfer.getData("text/plain");
      console.log(data);

      let draggedElement = document.getElementById(data);

      if (draggedElement) {
        // Si el libro existe, moverlo a la lista de lectura
        console.log(`Found element- ${draggedElement}`);
        selectorContainerReadList.appendChild(draggedElement);
      } else {
        console.error(`No se encontró el elemento con ID- ${data}`);
      }
    }
  } catch (error) {
    console.error(`Error itemsAndEventsBooks()- ${error}`);
  }
}

export default itemsAndEventsBooksPc;
