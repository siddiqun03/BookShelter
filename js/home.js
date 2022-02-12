// * Variables:
let elSearchInput = document.querySelector(".searchInput");
const elTotalBook = document.querySelector(".total-book");
let elBooksList = document.querySelector(".books-list");
let mainArr;
let searchValue = "";
const API_KEY = `https://www.googleapis.com/books/v1/volumes?q=`;
// * -----------

// * modal:
const elModalBox = document.querySelector(".modall");
const elModalHeader = document.querySelector(".modal-header");
const elOverlay = document.querySelector(".overlay");
const elAuthor = document.querySelector(".authorSpan");
const elPublished = document.querySelector(".PublishedSpan");
const elPublishers = document.querySelector(".PublishersSpan");
const elCategories = document.querySelector(".CategoriesSpan");
const pages = document.querySelector(".Pages-CountSpan");
let modalImg = document.querySelector(".modalImg");
// * -----------

// * Bookmark:
const elBookmarkList = document.querySelector(".bookmark-list");
const bookmarkArr = [];
// * ---------

// * Log Out:
const clearToken = () => {
  window.localStorage.removeItem("token");
  window.location.replace("index.html");
};

// * close modal:
const closeModal = () => {
  elModalBox.classList.add("hidden");
  elOverlay.classList.add("hidden");
};

// * Functions:
// * Get date func:
const getDate = (date) => new Date(date).getFullYear();

// * async func:
const getBooksApi = async function (book) {
  let response = await fetch(API_KEY + book);
  let date = await response.json();
  elTotalBook.textContent = `Showing 10 Result(${date.totalItems || 0})`;
  mainArr = date.items;
  console.log(mainArr);
  renderBooks(date.items, elBooksList);
};
// * Render function:
const renderBooks = (arr, elemente) => {
  elBooksList.innerHTML = null;

  // * For each array:
  arr?.forEach((element) => {
    // * create element:
    let booksItem = document.createElement("li");

    // * set atribute:
    booksItem.setAttribute("class", "books-item");

    // * equal inner html:
    booksItem.innerHTML = `<div class="img-box">
        <img class="book-img" src="${
          element.volumeInfo.imageLinks?.thumbnail
        }" alt="" width="201" height="202"/>
    </div>
    <h3 class="book-heading">${element.volumeInfo.title}</h3>
    <h4 class="book-creator">${element.volumeInfo.authors?.join(", ")}</h4>
    <p class="book-creator book-year">${getDate(
      element.volumeInfo.publishedDate
    )}</p>
    <div class="book-info-box">
      <button class="bookmarkBtn" data-bookmark=${element.id}>Bookmark</button>
      <button class="moreInfoBtn" data-info=${element.id}>More info</button>
    </div>
    <button class="book-read">Read</button>`;

    // * Append item to list:
    elemente.appendChild(booksItem);
  });
};

// * search on time:
elSearchInput.addEventListener("keyup", () => {
  searchValue = elSearchInput.value;
  getBooksApi(searchValue);
});
// * Modal open:
elBooksList.addEventListener("click", (evt) => {
  if (evt.target.matches(".moreInfoBtn")) {
    mainArr.forEach((element) => {
      if (element.id == evt.target.dataset.info) {
        elModalBox.classList.remove("hidden");
        elOverlay.classList.remove("hidden");
        elModalHeader.textContent = element.volumeInfo?.title;
        modalImg.src = element.volumeInfo.imageLinks?.thumbnail;
        elAuthor.textContent = element.volumeInfo.authors?.join(", ");
        elPublished.textContent = getDate(element.volumeInfo.publishedDate);
        elPublishers.textContent = element.volumeInfo.publisher;
        elCategories.textContent = element.volumeInfo.categories.join(", ");
      }
    });
  }
});

// * Create bookmark:
elBooksList.addEventListener("click", (evt) => {
  if (evt.target.matches(".bookmarkBtn")) {
    mainArr.forEach((element) => {
      if (element.id == evt.target.dataset.bookmark) {
        elBookmarkList.innerHTML = null;
        bookmarkArr.push({
          id: element.id,
          title: element.volumeInfo.title,
          author: element.volumeInfo.authors?.join(", "),
        });

        // * ------------

        bookmarkArr.forEach((element) => {
          // * Create item for bookmark:
          let bookItem = document.createElement("li");

          //  * set atribute book items:
          bookItem.setAttribute("class", "bookmark-item");

          //  * Append bookmark to bookmark list:
          elBookmarkList.appendChild(bookItem);

          bookItem.innerHTML = `
                  <div class="b-item-left">
                    <h3 class="item-heading">${(elModalHeader.textContent =
                      element.title)}</h3>
                    <p class="book-desc">${(elAuthor.textContent =
                      element.author)}</p>
                  </div>
                  <div class="b-item-right">
                    <button class="readBook"></button>
                    <button class="removeBook"></button>
                  </div>`;
        });
      }
    });
  }
});
