const API_KEY = 'AIzaSyBAvTKbNWfW8xDJbvBvtW5iqlihHM5Lf4c';
const url = 'https://www.googleapis.com/books/v1/volumes';

const form = document.querySelector('.search-container');




function renderResults(data) {
  const renderArr = data.map(book => {
    const title = book.volumeInfo.title;
    const author =
      book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'None';

    const image =
      book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : 'https://i.stack.imgur.com/y9DpT.jpg';

    const snippet =
      book.searchInfo ? book.searchInfo.textSnippet : 'No Description Available';

    return (
      `<div class="result-card">
        <div class="card-header">
          <h2 class="title">${title}</h2>
          <h4 class="author">${author}</h4>
        </div>
        <div class="card-image">
          <img src="${image}" alt="book-image">
        </div>
        <div class="card-content">
          <p class="description">${snippet}</p>
        </div>
        <div class="card-link">
          <a href="${book.volumeInfo.canonicalVolumeLink}" target="_blank">Learn More</a>
        </div>
      </div>`
    );
  });

  const resultsContainer = document.querySelector('.results-container');
  resultsContainer.innerHTML = renderArr.join('');
}

async function getBooks(searchTerm) {
  const response = await fetch(`${url}?q=${searchTerm}&key=${API_KEY}`);
  const results = await response.json();
  renderResults(results.items);
}




// getBooks(term);


form.addEventListener('submit', e => {
  e.preventDefault();

  const search = document.querySelector('.search-bar');
  getBooks(search.value)
  search.value = "";
});
