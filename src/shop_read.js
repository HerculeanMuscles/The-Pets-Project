let shop = document.getElementById("product");

let cart = JSON.parse(localStorage.getItem("data")) || [];

let generateshop =()=>{
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id, name, price, img} = x;
        return `
        <div id=product-id-${id} class="pro" >
            <img src=${img} alt="" srcset="">
            <div class="desc">
                <span>${name}</span>
                <h4>$ ${price}</h4>
                <a>
                    <div onclick="addtocart(${id})" class="cart">
                        <div id=${id}></div>
                        <i class="fa-solid fa-cart-plus"></i>
                    </div>
                </a>
            </div>
        </div>
        `
    }).join(""));
}

generateshop();

let addtocart = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        cart.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item += 1
    }

    localStorage.setItem("data", JSON.stringify(cart));

    calculation();
};


let calculation = () => {
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((x,y)=>x+y,0);

}

calculation();
