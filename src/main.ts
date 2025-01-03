interface Book {
    id: number;
    title: string;
    author: string;
    year?: number;
    pages?: number;
    audience?: string;
    otherInfo?: string;
  }
  
  const API_URL: string = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
  
  const bookListSection = document.getElementById("book-list") as HTMLElement;
  const bookDetailsSection = document.getElementById("book-details") as HTMLElement;
  const bookRow = document.querySelector(".book-row") as HTMLDivElement;
  const backButton = document.getElementById("back-to-list") as HTMLButtonElement;
  const searchBar = document.getElementById("search-bar") as HTMLInputElement;
  
  const detailsTitle = document.getElementById("details-title") as HTMLElement;
  const detailsAuthor = document.getElementById("details-author") as HTMLElement;
  const detailsYear = document.getElementById("details-year") as HTMLElement;
  const detailsPages = document.getElementById("details-pages") as HTMLElement;
  const detailsAudience = document.getElementById("details-audience") as HTMLElement;
  const detailsOtherInfo = document.getElementById("details-other-info") as HTMLElement;
  const detailsCoverImage = document.getElementById("details-cover-image") as HTMLImageElement;
  
  const bookCovers: Record<number, string> = {
    1: "Bilder/cover1.jpg",
    2: "Bilder/cover2.jpg",
    3: "Bilder/cover3.jpg",
    4: "Bilder/cover4.jpg",
    5: "Bilder/cover5.jpg",
    6: "Bilder/cover6.jpg",
    7: "Bilder/cover7.jpg",
    8: "Bilder/cover8.jpg"
  };
  
  let allBooks: Book[] = [];
  
  document.addEventListener("DOMContentLoaded", init);
  
  async function init(): Promise<void> {
    try {
      const response = await fetch(API_URL);
      const books: Book[] = await response.json();
      allBooks = books;
      displayBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  
  function displayBooks(books: Book[]): void {
    bookRow.innerHTML = "";
  
    books.forEach((book: Book) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";
  
      const coverImage: string = bookCovers[book.id] || "Bilder/default-cover.jpg";
  
      bookCard.innerHTML = `
        <img src="${coverImage}" alt="${book.title} omslag">
        <h3>${book.title}</h3>
        <p>Författare: ${book.author}</p>
      `;
  
      bookCard.addEventListener("click", () => showBookDetails(book, coverImage));
  
      bookRow.appendChild(bookCard);
    });
  }
  
  function showBookDetails(book: Book, coverImage: string): void {
    detailsTitle.textContent = book.title;
    detailsAuthor.textContent = book.author;
    detailsYear.textContent = book.year?.toString() || "Ingen information tillgänglig";
    detailsPages.textContent = book.pages?.toString() || "Ingen information tillgänglig";
    detailsAudience.textContent = book.audience || "Ingen information tillgänglig";
    detailsOtherInfo.textContent = book.otherInfo || "Ingen övrig information finns att visa.";
    detailsCoverImage.src = coverImage;
  
    bookListSection.classList.add("hidden");
    bookDetailsSection.classList.remove("hidden");
    searchBar.classList.add("hidden");
  }
  
  backButton.addEventListener("click", (): void => {
    bookListSection.classList.remove("hidden");
    bookDetailsSection.classList.add("hidden");
    searchBar.classList.remove("hidden");
  });
  
  searchBar.addEventListener("input", (): void => {
    const query = searchBar.value.toLowerCase();
  
    const filteredBooks = allBooks.filter((book: Book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  
    displayBooks(filteredBooks);
  });
  