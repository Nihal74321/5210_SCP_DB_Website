import * as shorten from "./word-shortener.js"

const name_input = document.getElementById('f-i-name')
const class_input = document.getElementById('f-i-class')
const desc_input = document.getElementById('f-i-desc')
const cont_input = document.getElementById('f-i-cont')

const name_receiver = document.querySelector('.f-p-name')
const class_receiver = document.querySelector('.f-p-class')
const desc_receiver = document.querySelector('.f-p-desc')
const cont_receiver = document.querySelector('.f-p-cont')

const name_review = document.querySelector('.f-finish-name')
const class_review = document.querySelector('.f-finish-class')

name_input.addEventListener("focusout", ()=> {
    if(name_input.value === ""){
        name_receiver.textContent = "Your SCP's name"
        name_review.textContent = "SCP Name"
    } else {
        name_receiver.textContent = name_input.value
        name_review.textContent = name_input.value

    }
})
class_input.addEventListener("focusout", ()=> {
    if(class_input.value === ""){
        class_receiver.textContent = "Your SCP's class"
        class_review.textContent = "Class"
    } else {
        class_receiver.textContent = class_input.value
        class_review.textContent = class_input.value

    }
})
desc_input.addEventListener("focusout", ()=> {
    if(desc_input.value === ""){
        desc_receiver.textContent = "Your Description goes here."
    } else {
        desc_receiver.textContent = shorten.shortenWord(desc_input.value, 80)
    }
})
cont_input.addEventListener("focusout", ()=> {
    if(cont_input.value === ""){
        cont_receiver.textContent = "Your Containment Procedures go here."
    } else {
        cont_receiver.textContent = shorten.shortenWord(cont_input.value, 80)
    }
})