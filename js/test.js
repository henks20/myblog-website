// *** TEST Button ***
function titleClickHandler() {
  const links = document.querySelectorAll(".titles a");
  console.log(links);
}
const buttonTest = document.getElementById("button-test");
buttonTest.addEventListener("click", titleClickHandler);

// *** Loop example ***
function titleClickHandler() {
  console.log("Link was clicked!");
}
const links = document.querySelectorAll(".titles a");
for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
