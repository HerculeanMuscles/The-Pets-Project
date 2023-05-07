    // Submit Data to Firestore
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCdxgD2PVNLohexqk9vxNsOxeQD0DOFa3M",
        authDomain: "devfinal-e54c9.firebaseapp.com",
        databaseURL: "https://devfinal-e54c9-default-rtdb.firebaseio.com",
        projectId: "devfinal-e54c9",
        storageBucket: "devfinal-e54c9.appspot.com",
        messagingSenderId: "258136195811",
        appId: "1:258136195811:web:2321a05f4178b46a7cfbd6",
        measurementId: "G-P2JF39S3J3"
        };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

let user_cart_item = document.getElementById("user-cart-item");
let user_cart_total = document.getElementById("cart-add");

let cart = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((x,y)=>x+y,0);

}

calculation();

let generateCartItem = () => {
    if(cart.length !==0){
        return (user_cart_item.innerHTML = 
            cart.map((x) => {
                console.log(x);
                let {id, item} = x;
                let search = shopItemsData.find((y)=>y.id === id)||[];
                let {name, price, img} = search;
            return `
                <tr>

                    <td><i onclick="removeItem(${id})" class="fa-regular fa-circle-xmark"></i><a href="#"></a></td>
                    
                    <td><img src=${img} alt=""></td>
                    
                    <td>${name}</td>

                    <td>$ ${price}</td>

                    <td>

                    <div class="edit-details">
                    <i onclick= "decrement(${id})" class="fa-solid fa-minus"></i>
                    <div id=${id}>
                    ${item}
                    </div>
                    <i onclick= "increment(${id})" class="fa-solid fa-plus"></i>
                    </div>

                    </td>

                    <td>$ ${item * search.price}</td>

                </tr>
            `
        }
        ).join(""));
    }
    else {
        return (user_cart_item.innerHTML=
            `
            <tr> 
            <td><div>Cart is empty</div></td>
            <td><a href="shop.html">
            <button class="normal button">Shop here</button>
            </a></td>
            </tr>
            
        `    
            );

    }

}

generateCartItem();

let increment = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        cart.push({
            id:selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    generateCartItem();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(cart));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if(search.item === 0) return;
     else {
        search.item -= 1;
    }

    update(selectedItem.id);
    cart = cart.filter((x) => x.item !== 0);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
    let search = cart.find((x) => x.id === id);

    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    cart = cart.filter((x) => x.id !== selectedItem.id);
    generateCartItem();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(cart));
    
}

let clearCart = ()=> {
    cart = [];
    generateCartItem();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(cart));
}

function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the form values
    const name = document.getElementById("u_name").value;
    const email = document.getElementById("u_email").value;
    const address = document.getElementById("u_address").value;
    const number = document.getElementById("u_number").value;
    const comment = document.getElementById("u_comment").value;

    if(cart.length !==0){
        // It is used to calculate the total price
        // it is used here to store it in the database
        let amount = cart.map((x)=> {
            let {item,id} = x;
            let search = shopItemsData.find((y)=>y.id === id)||[];
            return item * search.price + " $";
        })
        .reduce((x, y) => x + y, 0);

        // This is used to store the product names
        // with the amount of items that the customer wants
        let product = cart.map((x)=> {
            let {item,id} = x;
            let search = shopItemsData.find((y)=>y.id === id)||[];
            let {name} = search;
            return name + " : " + item + " | ";
        })
        .reduce((x, y) => x + y,);

    // Create a new document in the "contacts" collection with the form data
    db.collection("user_details").add({
      name: name,
      email: email,
      address: address,
      number: number,
      comment: comment,
      total: amount,
      products:product,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      alert("Thank you for shopping with us!");
      clearCart();
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

    // Clear the form inputs
    document.getElementById("formuser-payment-address").reset();

  }}

let totalAmount = ()=> {
    if(cart.length !==0){
        let amount = cart.map((x)=> {
            let {item,id} = x;
            let search = shopItemsData.find((y)=>y.id === id)||[];

            return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
        console.log(amount)
        return (user_cart_total.innerHTML = `
        <div id="subtotal">
        <h3>Cart Total</h3>
        <table>
           
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>$ ${amount}</strong></td>
            </tr>

        </table>
        <input type="submit" value="Submit" id="buttonstl" onclick="handleSubmit(event)">
        <button onclick="clearCart()" id="clear-items" class="normal">Clear</button>
        </div>
        `); 
    } else return(user_cart_total.innerHTML = `
    `); ;
}
totalAmount();

