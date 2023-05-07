let cart = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((x,y)=>x+y,0);

}

calculation();