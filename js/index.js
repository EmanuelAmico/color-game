function changeColors(color) {
    squares = document.querySelectorAll(".square")
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color
    }
}

function pickColor() {
    let i = Math.floor(Math.random() * colors.length)
    return colors[i]
}

function randomColor() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

function generateRandomColors(arrayLengthDesired) {
    let newArray = []
    for (let i = 0; i < arrayLengthDesired; i++) {
        newArray.push(randomColor())
    }
    return newArray
}

let restartGame = (difficultyMode = "hard") => {
    document.querySelector("#reset").textContent = "New Colors"
    document.querySelector("#mensaje").textContent = ""
    document.querySelector("h1").style.backgroundColor = ""

    difficulty = difficultyMode

    let squares = document.querySelectorAll(".square")

    if (difficulty === "easy") {
        colors = generateRandomColors(3)
        for (let i = 0; i < 6; i++) {
            if (!colors[i]) {
                squares[i].style.display = "none"
            }
        }
    } else {
        colors = generateRandomColors(6)
        for (let i = 0; i < 6; i++) {
            if (squares[i].style.display === "none") {
                squares[i].style.display = "block"
            }
        }

    }

    pickedColor = pickColor()
    document.querySelector("#colorDisplay").textContent = pickedColor.toUpperCase()

    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i]
        squares[i].addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor
            if (clickedColor !== pickedColor) {
                this.style.backgroundColor = document.body.style.backgroundColor
                document.querySelector("#mensaje").textContent = "Try Again!"
            } else {
                document.querySelector("#mensaje").textContent = "Correct!"
                document.querySelector("h1").style.backgroundColor = clickedColor
                changeColors(clickedColor)
                document.querySelector("#reset").textContent = "Play Again?"
            }
        })
    }
}

function listenButtons() {
    document.querySelector("#reset").addEventListener("click", function(){
        restartGame(difficulty)
    })

    document.querySelector("#easy").addEventListener("click", function () {
        this.classList.remove("btn-outline-light")
        this.classList.add("btn-light")
        document.querySelector("#hard").classList.remove("btn-light")
        document.querySelector("#hard").classList.add("btn-outline-light")
        restartGame("easy")
    })

    document.querySelector("#hard").addEventListener("click", function () {
        this.classList.remove("btn-outline-light")
        this.classList.add("btn-light")
        document.querySelector("#easy").classList.remove("btn-light")
        document.querySelector("#easy").classList.add("btn-outline-light")
        restartGame("hard")
    })
}

function init(){
    restartGame()
    listenButtons()
}

//-----------------------------------------------------------------------------//

let difficulty
let colors
let pickedColor

init()
