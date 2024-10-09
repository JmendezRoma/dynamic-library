import itemsAndEventsBooksMobile from "./itemsAndEventsBooksMobile.js";
import itemsAndEventsBooksPc from "./itemsAndEventsBookPc.js";

function initialize(allBooks, limit) {
  if (window.matchMedia("(max-width: 768px)").matches) {
    itemsAndEventsBooksMobile(allBooks, limit); // Configurar eventos para móviles
    console.log("iniciando eventos para moviles");
  } else {
    itemsAndEventsBooksPc(allBooks, limit); // Configurar eventos para escritorio
    console.log("iniciando eventos para pc");
  }
}

export default initialize;
