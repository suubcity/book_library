"use strict";

let bookLibrary = [];

//#region querySelectors

const MAIN_PAGE_CONTAINER = document.querySelector("#mainPageContainer");

const ADD_BOOK_BUTTON = document.querySelector("#addBookButton");

let deleteBookButtons;
function updateDeleteButtonQuerySelector() {
  deleteBookButtons = document.querySelectorAll(".deleteButton");
}

let readBookButtons;
function updateReadButtonQuerySelector() {
  readBookButtons = document.querySelectorAll(".readButton");
}

const FORM_CONTAINER = document.querySelector("#formContainer");

const CLOSE_FORM_DIV = document.querySelector("#closeFormDiv");

const TITLE_TEXT_INPUT = document.querySelector("#titleTextInput");

const AUTHOR_TEXT_INPUT = document.querySelector("#authorTextInput");

const PAGES_TEXT_INPUT = document.querySelector("#pagesNumberInput");

const READ_RADIO = document.getElementsByName("readRadio");

const SAVE_BOOK_BUTTON = document.querySelector("#saveBookButton");

//#endregion

//#region eventListeners

ADD_BOOK_BUTTON.addEventListener("click", () => {
  toggleDisplayFlex(FORM_CONTAINER);
  toggleDisplayNone(FORM_CONTAINER);
  toggleBlur(MAIN_PAGE_CONTAINER);
  TITLE_TEXT_INPUT.focus();
});

CLOSE_FORM_DIV.addEventListener("click", () => {
  toggleDisplayFlex(FORM_CONTAINER);
  toggleDisplayNone(FORM_CONTAINER);
  toggleBlur(MAIN_PAGE_CONTAINER);
  clearForm();
});

SAVE_BOOK_BUTTON.addEventListener("click", () => {
  if (checkFormComplete()) {
    toggleDisplayFlex(FORM_CONTAINER);
    toggleDisplayNone(FORM_CONTAINER);
    toggleBlur(MAIN_PAGE_CONTAINER);
    addNewBookToLibrary(getTitle(), getAuthor(), getPages(), getRead());
    updatePage();
  }
});

function addDeleteBookEventListener() {
  deleteBookButtons.forEach((item, index) => {
    item.addEventListener("click", () => {
      deleteBook(index);
      updatePage();
    });
  });
}

function addReadBookButtonsEventListener() {
  readBookButtons.forEach((item, index) => {
    item.addEventListener("click", () => bookLibrary[index].toggleRead());
  });
}

//#endregion

//#region toggleFunctions

function toggleDisplayFlex(area) {
  area.classList.toggle("displayFlex");
}

function toggleBlur(area) {
  area.classList.toggle("blurred");
}

function toggleDisplayNone(area) {
  area.classList.toggle("displayNone");
}

//#endregion

//#region getFormDataFunctions
function getTitle() {
  return titleTextInput.value;
}
function getAuthor() {
  return authorTextInput.value;
}
function getPages() {
  return pagesNumberInput.value;
}
function getRead() {
  return READ_RADIO[0].checked;
}

//#endregion

//#region bookFunctions

function addNewBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  pushBookToArray(newBook, bookLibrary);
}

//constructor function
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function pushBookToArray(book, location) {
  location.push(book);
}

Book.prototype.toggleRead = function () {
  if (this.read === true) {
    this.read = false;
  } else {
    this.read = true;
  }
  updatePage();
};

function deleteBook(index) {
  bookLibrary.splice(index, 1);
}

//#endregion

//#region pageFunctions

function updatePage() {
  let bookList = getBookList();
  let cleanedBookList = cleanUpBookList(bookList);
  MAIN_PAGE_CONTAINER.innerHTML = cleanedBookList;
  //query selectors updated here because it must be done after javascript creates the dom elements.
  updateDeleteButtonQuerySelector();
  updateReadButtonQuerySelector();
  addDeleteBookEventListener();
  addReadBookButtonsEventListener();
  clearForm();
}

//this getBookList function also adds the html needed for each book to display correctly. Including adding delete and toggle read buttons.
function getBookList() {
  let bookList = "";
  bookLibrary.forEach((book, index) => {
    bookList += `<div class="book" id="book${index}">${Object.entries(
      book
    )}<div><button  class="readButton bookButton">Toggle Read</button><button class="deleteButton bookButton">Delete Book</button></div></div>`;
  });
  return bookList;
}

function cleanUpBookList(bookList) {
  bookList = bookList.replace(/title,/g, "Title - ");
  bookList = bookList.replace(/,author,/g, "<br>Author - ");
  bookList = bookList.replace(/,pages,/g, "<br>Pages - ");
  bookList = bookList.replace(/,read,/g, "<br>Read - ");
  bookList = bookList.replace(/true/g, "Yes");
  bookList = bookList.replace(/false/g, "No");
  return bookList;
}

function checkFormComplete() {
  if (titleTextInput.value && authorTextInput.value && pagesNumberInput.value) {
    return true;
  }
  return false;
}

function clearForm() {
  titleTextInput.value = "";
  authorTextInput.value = "";
  pagesNumberInput.value = "";
  READ_RADIO[0].checked = false;
  READ_RADIO[1].checked = false;
}

//#endregion

addNewBookToLibrary("Harry Potter", "JK Rowling", 334, true);
addNewBookToLibrary("High Output Management", "Andrew S. Grove", 634, false);
addNewBookToLibrary("The Beach", "Alex Garland", 345, false);
addNewBookToLibrary(
  "Influence: The Psychology of Persuasion",
  "Robert B. Cialdini",
  764,
  true
);
addNewBookToLibrary("Midnight Sun", "Stephenie Meyer", 233, true);
addNewBookToLibrary("Untamed", "Glennon Doyle", 333, false);

updatePage();
