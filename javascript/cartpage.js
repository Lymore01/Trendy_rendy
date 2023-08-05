var removeCartItemsbtns = document.getElementsByClassName("btn-danger")
console.log(removeCartItemsbtns)
    for (var i = 0; i < removeCartItemsbtns.length; i++) {
        var button = removeCartItemsbtns[i]
        button.addEventListener("click", removeCartItems)
    }
function removeCartItems(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()

}

// document.getElementsByClassName('add-cart-button')[0].addEventListener('click',()=>{
//     console.log('add to cart clicked')
// })