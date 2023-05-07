let adopt = document.getElementById("adopt_card");

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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.collection("adopt").get().then((querySnapshot) => {
  const adoptItemsData = [];
  querySnapshot.forEach((doc) => {
    const item = doc.data();
    adoptItemsData.push(item);
  });
  const mappedadoptItemsData = adoptItemsData.map(item => {
    return {
      name: item.name,
      pnumber: item.pnumber,
      email: item.email,
      description: item.description,
      img: item.img
    }
  });

  let generateadopt =()=>{
      return (adopt.innerHTML = mappedadoptItemsData.map((x)=>{
          let { name, pnumber, email, img, description} = x;
          return `
          <div class="pro">
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
});
