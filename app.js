const baseURL = `https://galvanize-read.herokuapp.com/`
const localURL = `http://localhost:1995/`


$(document).ready(function() {



  $.get(baseURL + `books`)
  .then(bookTable)

  $('.add-book-save').click((event) => {
    event.preventDefault()

    let data = {
      title: $('#add-title').val(),
      genre: $('#add-genre').val(),
      description: $('#add-description').val(),
      url: $('#add-url').val()
    }

    $.post(baseURL + `books/new`, data)
      .then(newPost => {
        $.get(baseURL + `books`)
        .then(bookTable)
      })
  })

  $('.put-book-save').click((event) => {
    event.preventDefault()
    let id = event.target.name

    let data = {
      title: $('#edit-title').val(),
      genre: $('#edit-genre').val(),
      description: $('#edit-description').val(),
      url: $('#edit-photo').val()
    }

    $.ajax({
      url: baseURL +`books/${parseInt(id)}/edit`,
      method: 'PUT',
      data: data,
      success: function(data) {
        $.get(baseURL + `books`)
        .then(bookTable)
      }
    });
  })

  function bookTable(data) {
    const reads = data.book

    $('.book-card-row').empty()
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
      `<div class="col-sm-6">
        <div class="card-deck">
          <div class="card book-card">
            <img class="card-img-top author-image" src="${photo}" alt="Card image cap">
            <div class="card-body">
              <h4 class="card-title">${title}</h4>
              <p class="card-text">${name()}</p>
              <p class="card-text">${genre}</p>
              <p class="card-text">${info}</p>
              <div class='buttons'>
              <button id="${id}" type="button" class="btn btn-secondary edit-button-book" data-toggle="modal" data-target="#postModalBook">Edit</button>
              <button id="${id}" type="button" class="btn btn-secondary delete-button-book">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>`
      );
    }
    $('.edit-button-book').click((event) => {
      event.preventDefault()
      let target = event.target.id;
      $.get(baseURL + `books/${target}`)
      .then((editBForm) => {
        let title = editBForm.book[0].title
        let genre = editBForm.book[0].genre
        let description = editBForm.book[0].description
        let photo = editBForm.book[0].url
        let id = editBForm.book[0].id

        let $title = $('#edit-title').val(`${title}`)
        let $genre = $('#edit-genre').val(`${genre}`)
        let $description = $('#edit-description').val(`${description}`)
        let $photo = $('#edit-photo').val(`${photo}`)
        $('#saveButton').attr('name', id)
      })
    })
    $('.delete-button-book').click((event) => {
      event.preventDefault()
      let target = event.target.id;

      $.ajax({
        url: baseURL + `books/${target}/edit`,
        method: 'DELETE',
        success: function(data) {
          $.get(baseURL + `books`)
          .then(bookTable)
        }
      });
    })
  }

  $.get(baseURL + `authors`)
  .then(authorTable)

  $('.put-author-save').click((event) => {
    event.preventDefault()
    let id = event.target.name

    let data = {
      first: $('#edit-first').val(),
      last: $('#edit-last').val(),
      biography: $('#edit-bio').val(),
      url: $('#edit-photo').val()
    }

    $.ajax({
      url: baseURL +`authors/${parseInt(id)}/edit`,
      method: 'PUT',
      data: data,
      success: function(data) {
        $.get(baseURL + `authors`)
        .then(authorTable)
      }
    });
  })

  $('.add-author-save').click((event) => {
    event.preventDefault()

    let data = {
      first: $('#add-first').val(),
      last: $('#add-last').val(),
      biography: $('#add-bio').val(),
      url: $('#add-url').val()
    }

    $.post(baseURL + `authors/new`, data)
      .then(newPost => {
        $.get(baseURL + `authors`)
        .then(authorTable)
      })
  })

  function authorTable(data) {
    const reads = data.author

    $('.author-card-row').empty()
    for (var i = 0; i < reads.length; i++) {
      let id = reads[i].id
      let first = reads[i].first
      let last = reads[i].last
      let biography = reads[i].biography
      let photo = reads[i].url
      let book = reads[i].book
      function bookTitle(books) {
        const arr = []
        for (var i = 0; i < book.length; i++) {
          let first = book[i].title
          arr.push(`${first}`)
        }
        return arr.join(' ,')
      }
      $('.author-card-row').append(
      `<div class="col-sm-6">
        <div class="card-deck">
          <div class="card author-card">
            <img class="card-img-top author-image" src="${photo}" alt="Card image cap">
            <div class="card-body">
              <h4 class="card-title">${first} ${last}</h4>
              <p class="card-text">${biography}</p>
              <p class="card-text">${bookTitle()}</p>
              <div class='buttons'>
              <button id="${id}" type="button" class="btn btn-secondary edit-button-author"  data-toggle="modal" data-target="#postModalAuthor">Edit</button>
              <button id="${id}" type="button" class="btn btn-secondary delete-button-author">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>`
      );
    }
    $('.edit-button-author').click((event) => {
      event.preventDefault()
      let target = event.target.id;
      $.get(baseURL + `authors/${target}`)
      .then((editAForm) => {
        let first = editAForm.author[0].first
        let last = editAForm.author[0].last
        let biography = editAForm.author[0].biography
        let photo = editAForm.author[0].url
        let id = editAForm.author[0].id

        let $first = $('#edit-first').val(`${first}`)
        let $last = $('#edit-last').val(`${last}`)
        let $bio = $('#edit-bio').val(`${biography}`)
        let $photo = $('#edit-photo').val(`${photo}`)
        $('#saveButton').attr('name', id)
      })
    })
    $('.delete-button-author').click((event) => {
      event.preventDefault()
      let target = event.target.id;

      $.ajax({
        url: baseURL + `authors/${target}/edit`,
        method: 'DELETE',
        success: function(data) {
          $.get(baseURL + `authors`)
          .then(authorTable)
        }
      });
    })
  }
})
