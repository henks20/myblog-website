'use strict';

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  authorSelector: '.post .post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors.list',
};
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#author-cloud-link').innerHTML),
};

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();


function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const hrefAttribute = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(hrefAttribute);
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
    const linkHTMLData = { name: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  return Math.floor(((count - params.min) / (params.max - params.min)) * opt.cloudClassCount + 1);
}


function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(opt.articleSelector);

  for (let article of articles) {
    const wrapper = article.querySelector(opt.articleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTMLData = { name: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + linkHTML;
      if (!{}.hasOwnProperty.call(allTags, tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    wrapper.innerHTML = html;
  }

  const tagList = document.querySelector('.tags');
  const allTagsData = { tags: [] };
  const tagsParams = calculateTagsParams(allTags);

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let tag of activeTags) {
    tag.classList.remove('active');
  }

  const selectedTagGroup = document.querySelectorAll('a[href="' + href + '"]');

  for (let tag of selectedTagGroup) {
    tag.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const links = document.querySelectorAll('.list-horizontal a');
  const tags = document.querySelectorAll('.tags a');

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }

  for (let tag of tags) {
    tag.addEventListener('click', tagClickHandler);
  }
}

function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }

  return params;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  return Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
}

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(opt.articleSelector);

  for (let article of articles) {
    const wrapper = article.querySelector(opt.authorSelector);
    const articleAuthor = article.getAttribute('data-author');
    if (!{}.hasOwnProperty.call(allAuthors, articleAuthor)) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    const linkHTMLData = { name: articleAuthor };
    const html = templates.authorLink(linkHTMLData);
    wrapper.innerHTML = html;
  }

  const allAuthorsData = { tags: [] };
  const authorList = document.querySelector('.authors');
  const authorsParams = calculateAuthorsParams(allAuthors);

  for (let author in allAuthors) {
    allAuthorsData.tags.push({
      author: author,
      count: allAuthors[author],
      className: calculateAuthorClass(allAuthors[author], authorsParams)
    });
  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let author of activeAuthors) {
    author.classList.remove('active');
  }

  const selectedAuthorGroup = document.querySelectorAll('a[href="' + href + '"]');

  for (let author of selectedAuthorGroup) {
    author.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authors = document.querySelectorAll('.post-author a');
  const authorsCloud = document.querySelectorAll('.authors a');

  for (let author of authors) {
    author.addEventListener('click', authorClickHandler);
  }
  for (let author of authorsCloud) {
    author.addEventListener('click', authorClickHandler);
  }
}

