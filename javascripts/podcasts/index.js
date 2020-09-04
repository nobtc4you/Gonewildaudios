import {tags} from "../tags.js"
console.log(tags)

const topTags = document.getElementById("toptags")

let arrayTag = []
let i = 0

while (i < 9) {
    const n = Math.floor(Math.random() * 10)
    const random = tags[n]
    if(!arrayTag.includes(random) ) {
        arrayTag.push(random);
        i++
        console.log(arrayTag)
    }

}

arrayTag.forEach(tag => {
    const button = document.createElement("a")
    button.className = "tagView"
    button.setAttribute("src", "#")
    button.innerHTML = "# "+ tag
    topTags.appendChild(button)

})