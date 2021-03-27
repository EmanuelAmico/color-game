//COLOR GAME

/* let colors = ["rgb(240, 14, 128)", "rgb(120, 45, 169)", "rgb(2, 144, 28)", "rgb(48, 14, 8)", "rgb(245, 1, 12)", "rgb(40, 1, 28)"] */

function changeColors(color) {
    for (let i = 0; i < colorsSquares.length; i++) {
        colorsSquares[i].style.backgroundColor = color
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

function restartGame() {
    document.querySelector("#reset").textContent="New Colors"
    document.querySelector("#mensaje").textContent=""
    document.querySelector("h1").style.backgroundColor = ""

    let squares = document.querySelectorAll(".square")

    if(difficulty ==="easy"){
        colors = generateRandomColors(3)
        for(let i=0; i<6; i++){
            if(!colors[i]){
                squares[i].style.display = "none"
            }
        }
    }else{
        colors = generateRandomColors(6)
        for(let i=0; i<6; i++){
            if(squares[i].style.display === "none"){
                squares[i].style.display = "block"
            }
        }

    }

    pickedColor = pickColor()
    document.querySelector("#colorDisplay").textContent = pickedColor.toUpperCase()

    colorsSquares = document.querySelectorAll(".square")

    for (let i = 0; i < colorsSquares.length; i++) {
        colorsSquares[i].style.backgroundColor = colors[i]
        colorsSquares[i].addEventListener("click", function () {
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

//-----------------------------------------------------------------------------//

let colors = generateRandomColors(6)

let pickedColor = pickColor()
document.querySelector("#colorDisplay").textContent = pickedColor.toUpperCase()

let colorsSquares = document.querySelectorAll(".square")

let difficulty = "hard"

for (let i = 0; i < colorsSquares.length; i++) {
    colorsSquares[i].style.backgroundColor = colors[i]
    colorsSquares[i].addEventListener("click", function () {
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

document.querySelector("#reset").addEventListener("click", restartGame)

document.querySelector("#easy").addEventListener("click", function(){
    this.classList.remove("btn-outline-light")
    this.classList.add("btn-light")
    document.querySelector("#selected").classList.remove("btn-light")
    document.querySelector("#selected").classList.add("btn-outline-light")
    difficulty = "easy"
    restartGame()
})

document.querySelector("#selected").addEventListener("click", function(){
    this.classList.remove("btn-outline-light")
    this.classList.add("btn-light")
    document.querySelector("#easy").classList.remove("btn-light")
    document.querySelector("#easy").classList.add("btn-outline-light")
    difficulty = "hard"
    restartGame()
})


