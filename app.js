const baseURL = `https://galvanize-read.herokuapp.com/`
const localURL = `http://localhost:1995/`


$(document).ready(function() {
  $.get(localURL + `books`)
  .then(bookTable)

  function bookTable(data) {
    const reads = data.book

    for (var i = 0; i < reads.length; i++) {
      let id = reads[i].id
      let title = reads[i].title
      let info = reads[i].description
      let genre = reads[i].genre
      let photo = reads[i].url
      let author = reads[i].author
      function name(authors) {
        const arr = []
        for (var i = 0; i < author.length; i++) {
          let first = author[i].first
          let last = author[i].last
          arr.push(`${first} ${last}`)
        }
        return arr.join(', ')
      }
      $('.book-card-row').append(
      `<div class="card book-card">
          <img class='book-image' src="${photo}">
          <h3 class="card-text">${title}</h3>
          <p>${name()}</p>
          <p>${info}</p>
        </div>`
      );
    }
  }

  $.get(localURL + `authors`)
  .then(authorTable)

  function authorTable(data) {
    const reads = data.author

    for (var i = 0; i < reads.length; i++) {
      let id = reads[i].id
      let first = reads[i].first
      let last = reads[i].last
      let biography = reads[i].biography
      let photo = reads[i].url
      let author = reads[i].author
      // function name(authors) {
      //   for (var i = 0; i < author.length; i++) {
      //     let first = author[i].first
      //     let last = author[i].last
      //     return `${first} ${last}`
      //   }
      // }
      $('.book-card-row').append(
      `<div class="card book-card">
          <img class='book-image' src="${photo}">
          <h3 class="card-text">${first} ${last}</h3>
          <p></p>
          <p>${biography}</p>
        </div>`
      );
    }
  }
})
