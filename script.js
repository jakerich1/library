//Declaration and event listener for form toggle
const newBook = document.querySelector("#add")
newBook.addEventListener("click", function () {
  displayForm()
})

//Declaration for new book submission
const submit = document.querySelector("#submit")
submit.addEventListener("click", function () {
  submitForm()
})


let myLibrary = [{
    title: "Harry Potter",
    author: "J K Rowling",
    pages: 350,
    read: true,
  },
  {
    title: "Lord of the Rings",
    author: "J. R. R. Tolkien",
    pages: 750,
    read: false,
  },
  {
    title: "Gormenghast",
    author: "Mervyn Peake",
    pages: 700,
    read: true,
  }
];

displayLibrary()

class Book {

  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

}

function addBookToLibrary(title, author, pages, read) {

  const book = new Book(title, author, pages, read)
  myLibrary.push(book)
  displayLibrary()

}



function displayLibrary() {

  const cardArea = document.querySelector("section")
  cardArea.innerHTML = ''
  myLibrary.forEach((element, index) => {
    writeCard(element, cardArea, index)
  });

}



function writeCard(element, cardArea, index) {

  const authorDetail = `Author - ${element.author}`
  const pagesDetail = `Total pages - ${element.pages}`
  let readDetail = ``
  if (element.read) {
    readDetail = `Book read`
  } else {
    readDetail = `Book not yet read`
  }

  //Card declaration
  let card = document.createElement("div")
  card.classList.add("card")

  //text nodes
  const titleText = document.createTextNode(element.title)
  const authorText = document.createTextNode(authorDetail)
  const pagesText = document.createTextNode(pagesDetail)
  const readText = document.createTextNode(readDetail)
  const deleteBook = document.createTextNode("X")

  //text node containers
  let titleCont = document.createElement("h2")
  let authorCont = document.createElement("p")
  let pagesCont = document.createElement("p")
  let readCont = document.createElement("div")
  let delCont = document.createElement("div")

  readCont.classList.add("pill")
  if (element.read) {
    readCont.classList.add("greenPill")
  } else {
    readCont.classList.add("redPill")
  }
  readCont.dataset.key = index
  readCont.addEventListener("click", function (event) {
    changeRead(event.target.dataset.key)
  })

  //declaration and logic for the card deletion button
  delCont.classList.add("remove")
  delCont.dataset.key = index
  delCont.addEventListener("click", function (event) {
    deleteCard(event.target.dataset.key)
  })

  //append text nodes to containers
  titleCont.appendChild(titleText)
  authorCont.appendChild(authorText)
  pagesCont.appendChild(pagesText)
  readCont.appendChild(readText)
  delCont.appendChild(deleteBook)

  //append containers to card
  card.appendChild(titleCont)
  card.appendChild(authorCont)
  card.appendChild(pagesCont)
  card.appendChild(readCont)
  card.appendChild(delCont)

  cardArea.appendChild(card)

}



function displayForm() {
  const form = document.getElementById("addForm")
  form.classList.toggle("hidden")
}



function submitForm() {

  //Get values from form inputs
  const titleInput = document.querySelector("#titleIn").value
  const authorInput = document.querySelector("#authorIn").value
  const pageCount = document.querySelector("#pageIn").value
  const readYes = document.querySelector("#readYes").checked
  const readNo = document.querySelector("#readNo").checked

  //check if radio options are not checked
  let emptyRadio = false
  if (!readYes && !readNo) {
    emptyRadio = true
  }

  //check if any of the form elements are empty
  if (titleInput == "" || authorInput == "" || pageCount == "" || emptyRadio) {
    console.log("Missing input")
  } else {
    let read = (readYes == true) ? true : false
    addBookToLibrary(titleInput, authorInput, pageCount, read)
  }

}


function deleteCard(index) {
  myLibrary.splice(index, 1)
  displayLibrary()
}


function changeRead(index) {
  myLibrary[index].read = !myLibrary[index].read
  displayLibrary()
}