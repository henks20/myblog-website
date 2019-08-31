"use strict";

// *** TEST Button ***
// function titleClickHandler() {
//   const links = document.querySelectorAll(".titles a");
//   console.log(links);
// }
// const buttonTest = document.getElementById("button-test");
// buttonTest.addEventListener("click", titleClickHandler);

// *** Loop example ***
// function titleClickHandler() {
//   console.log("Link was clicked!");
// }
// const links = document.querySelectorAll(".titles a");
// for (let link of links) {
//   link.addEventListener("click", titleClickHandler);
// }

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");
  // console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [DONE] add class 'active' to the clicked link */
  // console.log("clickedElement:", clickedElement);
  // console.log("clickedElement (with plus): " + clickedElement);
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");
  // Inny sposob
  // const activeArticles = document.querySelectorAll(".posts .post.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const hrefAttribute = clickedElement.getAttribute("href");
  // console.log(hrefAttribute);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(hrefAttribute);
  // console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add("active");
}

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
