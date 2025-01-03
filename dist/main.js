"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";

const bookListSection = document.getElementById("book-list");
const bookDetailsSection = document.getElementById("book-details");
const bookRow = document.querySelector(".book-row");
const backButton = document.getElementById("back-to-list");
const searchBar = document.getElementById("search-bar");
const detailsTitle = document.getElementById("details-title");
const detailsAuthor = document.getElementById("details-author");
const detailsYear = document.getElementById("details-year");
const detailsPages = document.getElementById("details-pages");
const detailsAudience = document.getElementById("details-audience");
const detailsOtherInfo = document.getElementById("details-other-info");
const detailsCoverImage = document.getElementById("details-cover-image");

const bookCovers = {
    1: "Bilder/cover1.jpg",
    2: "Bilder/cover2.jpg",
    3: "Bilder/cover3.jpg",
    4: "Bilder/cover4.jpg",
    5: "Bilder/cover5.jpg",
    6: "Bilder/cover6.jpg",
    7: "Bilder/cover7.jpg",
    8: "Bilder/cover8.jpg"
};

let allBooks = [];

document.addEventListener("DOMContentLoaded", init);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_URL);
            const books = yield response.json();
            allBooks = books;
            displayBooks(books);
        }
        catch (error) {
            console.error("Error fetching books:", error);
        }
    });
}

function displayBooks(books) {
 
    bookRow.innerHTML = "";

    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        const coverImage = bookCovers[book.id] || "Bilder/default-cover.jpg";
        bookCard.innerHTML = `
        <img src="${coverImage}" alt="${book.title} omslag">
        <h3>${book.title}</h3>
        <p>Författare: ${book.author}</p>
      `;

        bookCard.addEventListener("click", () => showBookDetails(book, coverImage));

        bookRow.appendChild(bookCard);
    });
}

function showBookDetails(book, coverImage) {
    var _a, _b;
    detailsTitle.textContent = book.title;
    detailsAuthor.textContent = book.author;
    detailsYear.textContent = ((_a = book.year) === null || _a === void 0 ? void 0 : _a.toString()) || "Ingen information tillgänglig";
    detailsPages.textContent = ((_b = book.pages) === null || _b === void 0 ? void 0 : _b.toString()) || "Ingen information tillgänglig";
    detailsAudience.textContent = book.audience || "Ingen information tillgänglig";
    detailsOtherInfo.textContent = book.otherInfo || "Ingen övrig information finns att visa.";
    detailsCoverImage.src = coverImage;

    bookListSection.classList.add("hidden");
    bookDetailsSection.classList.remove("hidden");
    searchBar.classList.add("hidden");
}

backButton.addEventListener("click", () => {
    bookListSection.classList.remove("hidden");
    bookDetailsSection.classList.add("hidden");
    searchBar.classList.remove("hidden");
});

searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();

    const filteredBooks = allBooks.filter((book) => book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query));
    displayBooks(filteredBooks);
});
