//Hide the menu with a button
const menuButton = document.querySelector(".menu-button");
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
}

//Resize
function handleResize(){
    const menu = document.querySelector(".menu");
    if (window.innerWidth < 1000){
        menu.classList.remove("hide");
    }
    else{
        menu.classList.add("hide");
    }
}
handleResize();

//Viewer
function viewerTemplate(pic, alt){
    return `<div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${pic}" alt="${alt}">
    </div>`;
}

function viewHandler(event){
    const clickedPic = event.target;
    const srcParts = clickedPic.src.split("-");
    const fullImageSrc =  `${srcParts[0]}-full.jpeg`;
    const altText = clickedPic.alt || "Image";

    const viewerHTML = viewerTemplate(fullImageSrc, altText);
    document.body.insertAdjacentHTML("afterbegin", viewerHTML);

    document.querySelector(".close-viewer").addEventListener("click", closeViewer);
}

function closeViewer(){
    const viewer = document.querySelector(".viewer");
    if(viewer){
        viewer.remove();
    }
}

//Event Listeners
menuButton.addEventListener("click", toggleMenu);
window.addEventListener("resize", handleResize);

document.querySelectorAll("img").forEach(img=> {
    img.addEventListener("click", viewHandler);
});