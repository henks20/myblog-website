'use strict';
const
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

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
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
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
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag]
    };
    if (tags[tag] < params.min) {
      params.min = tags[tag]
    };
    // *** II sposób ***
    // params.max = tags[tag] > params.max ? tags[tag] : params.max;
    // params.min = tags[tag] < params.min ? tags[tag] : params.min;
    // *** III sposób ***
    // params.max = Math.max(tags[tag], params.max);
    // params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  // *** I Sposób ***
  // const normalizedCount = count - params.min;
  // const normalizedMax = params.max - params.min;
  // const percentage = normalizedCount / normalizedMax;
  // const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  // *** II sposób ***
  // classNumber = Math.floor( 0.5 * 5 + 1 );
  // classNumber = Math.floor( 0.5 * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( 4 / 8 ) * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( (6 - 2) / (10 - 2) ) * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( (count - 2) / (10 - 2) ) * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( (count - 2) / (params.max - 2) ) * optCloudClassCount + 1 );
  // classNumber = Math.floor( ( (count - params.min) / (params.max - 2) ) * optCloudClassCount + 1 );
  return Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
}


function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  const tagsParams = calculateTagsParams(allTags);
  /*[NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTags HTML */
    const tagLinkHTML = '<li class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '"><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') </a></li>';
    allTagsHTML += tagLinkHTML;
    /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let tag of activeTags) {
    /* remove class active */
    tag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const selectedTagGroup = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tag of selectedTagGroup) {
    /* add class active */
    tag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.list-horizontal a');
  const tags = document.querySelectorAll('.tags a');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
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
  return Math.floor(percentage * (optCloudClassCount - 1) + 1);
}

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapper = article.querySelector(optAuthorSelector);
    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    const html = '<a href="#author-' + articleAuthor + '">by ' + articleAuthor + '</a>';
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  let allAuthorsHTML = '';
  const authorList = document.querySelector('.authors');
  const authorsParams = calculateAuthorsParams(allAuthors);
  for (let author in allAuthors) {
    const authorLinkHTML = '<li class="author-size-' + calculateAuthorClass(allAuthors[author], authorsParams) + '"><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') </a></li>';
    allAuthorsHTML += authorLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
}

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (let author of activeAuthors) {
    /* remove class active */
    author.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const selectedAuthorGroup = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let author of selectedAuthorGroup) {
    /* add class active */
    author.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const authors = document.querySelectorAll('.post-author a');
  const authorsCloud = document.querySelectorAll('.authors a')
  /* START LOOP: for each link */
  for (let author of authors) {
    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
  for (let author of authorsCloud) {
    author.addEventListener('click', authorClickHandler);
  }
}

