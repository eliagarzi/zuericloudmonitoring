const body = document.querySelector("body")

let serviceidentifier = "spong";
let element = document.createElement("div");
element.classList.add(`service-status__element--${serviceidentifier}`);

body.appendChild(element)