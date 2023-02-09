document.addEventListener("DOMContentLoaded", function() {});

titleList = document.getElementById("list-panel")

fetch("http://localhost:3000/books")
.then(res => res.json())
.then(books => {
    renderBookTitles(books)
    renderBook(books[0])
})

function renderBookTitles(books){
    books.forEach(book => {
      title = document.createElement("li")
      title.textContent = book.title
      title.addEventListener("click", () => renderBook(book))
      titleList.appendChild(title)
    })
}

function renderBook(book){
    showPanel = document.getElementById("show-panel")
    showPanel.textContent = ""

    thumbnail = document.createElement("img")
    thumbnail.src = book.img_url

    title = document.createElement("h3")
    title.textContent = book.title

    subtitle = document.createElement("h4")
    subtitle.textContent = book.subtitle

    author = document.createElement("h4")
    author.textContent = book.author

    description = document.createElement("p")
    description.textContent = book.description

    userList = document.createElement("ul")
    userList.id = "user-list"
    book.users.forEach(user => {
        userLi = document.createElement("li")
        userLi.textContent = user.username
        userList.appendChild(userLi)
    })

    likeButton = document.createElement("button")
    likeButton.textContent = "LIKE"
    likeButton.addEventListener("click", () => addUserLike(book))

    showPanel.append(thumbnail, title, subtitle, author, description, userList, likeButton)
}

function addUserLike(book) {
    newUser = {id: 11, username: "Quinn"}
    updatedUsers = [...book.users, newUser]

    console.log(updatedUsers)

    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({users: updatedUsers})
    })

    userList = document.getElementById("user-list")
    newLi = document.createElement("li")
    newLi.textContent = newUser.username
    userList.appendChild(newLi)

}