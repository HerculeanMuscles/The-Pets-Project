let adopt = document.getElementById("adopt_card");

let generateadopt =()=>{
    return (adopt.innerHTML = adoptItemsData.map((x)=>{
        let {id, name, pnumber, email, img, description} = x;
        return `
            <div id=adopt-id-${id} class="pro">
                <img src=${img} alt="" srcset="">
                <div class="desc">
                    <div>${name}</div>
                    <div>Phone no: ${pnumber}</div>
                    <div>Email: ${email}</div>
                    <h5>${description}</h5>
                </div>
            </div>
        `
    }).join(""));
}

generateadopt();