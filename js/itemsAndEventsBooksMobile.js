import { selectorSectionBooks, selectorContainerReadList } from "./index.js";

function itemsAndEventsBooksMobile(displayBooks) {
  let dragElement = null;
  displayBooks = Array.from(displayBooks);

  try {
    for (let element of displayBooks) {
      const imgs = document.createElement("img");

      const bookCover = element.book.cover;
      imgs.src = bookCover;
      imgs.style.width = "100px";
      imgs.style.height = "120px";

      console.log(element);

      const bookElement = document.createElement("div");

      bookElement.appendChild(imgs);

      selectorSectionBooks.appendChild(bookElement);

      imgs.setAttribute("id", "book");

      imgs.addEventListener("touchstart", (event) => startDrag(event));
      imgs.addEventListener("touchmove", (event) => moveDrag(event));
      imgs.addEventListener("touchend", (event) => endDrag(event));
    }

    function startDrag(event) {
      dragElement = event.target;
      dragElement.style.opacity = "0.5";
    }

    function moveDrag(event) {
      event.preventDefault();
      const touch = event.touches[0];
      dragElement.style.position = "absolute";
      dragElement.style.left = `${touch.clientX}px`;
      dragElement.style.top = `${touch.clientY}px`;
    }

    function endDrag(event) {
      dragElement.style.opacity = "1";
      if (isOverDropZone(event)) {
        selectorContainerReadList.appendChild(dragElement);
      }
      dragElement = null;
    }

    function isOverDropZone(event) {
      const touch = event.changedTouches[0];
      const dropZone = selectorContainerReadList.getBoundingClientRect();
      return (
        touch.clientX > dropZone.left &&
        touch.clientX < dropZone.right &&
        touch.clientY > dropZone.top &&
        touch.clientX < dropZone.bottom
      );
    }
  } catch (error) {
    console.error(`Error itemsAndEventsBooks(): ${error}`);
  }
}

export default itemsAndEventsBooksMobile;
