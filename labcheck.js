const cardsItems = document.querySelectorAll(".cards-wrapper");
cardsItems.forEach(cardItem => {
cardItem.addEventListener("mouseover", () => {
   console.log(cardItem.childNodes[1].classList);
     cardItem.childNodes[1].classList.add('.img-darken');
})

cardItem.addEventListener('mouseout' , () => {
    cardItem.childNodes[1].classList.remove('.img-darken');
})
});

