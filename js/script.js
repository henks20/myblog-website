"use strict";

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}

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

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";

function generateTitleLinks() {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute("id");
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    // const linkHTML = '<li><a href="#"><span></span></a></li>';
    // const linkHTML = '<li><a href="#' + '"><span>' + '</span></a></li>';
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    /* insert link into titleList */
    // Inny sposob
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    titleList.insertAdjacentHTML("beforebegin", linkHTML);
  }
}

generateTitleLinks();
