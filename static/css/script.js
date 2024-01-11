let products = {
  data: [
    {
      productName: "MOMENTUM платье",
      category: "Платья",
      price: "495",
      image: '../../static/css/imgProduct/1.webp',
      model: "505795.html",
    },
    {
      productName: "FLOWERS блуза",
      category: "Блузыирубашки",
      price: "295",
      image: "../../static/css/imgProduct/2.webp",
      model: "605796.html",
    },
    {
      productName: "FLOWERS пальто",
      category: "Верхняяодежда",
      price: "99",
      image: "../../static/css/imgProduct/3.webp",
      model: "705796.html",
    },
    {
      productName: "ECLIPSE платье",
      category: "Платья",
      price: "29",
      image: "../../static/css/imgProduct/4.webp",
      model: "505796",
    },
    {
      productName: "ECLIPSE пиджак",
      category: "Пиджакиикостюмы",
      price: "129",
      image: "../../static/css/imgProduct/5.webp",
    },
    {
      productName: "MOMENTUM костюм",
      category: "Пиджакиикостюмы",
      price: "89",
      image: "../../static/css/imgProduct/6.webp",
    },
    {
      productName: "MONDEY куртка оверсайз",
      category: "Верхняяодежда",
      price: "189",
      image: "../../static/css/imgProduct/7.webp",
    },
    {
      productName: "DOLL платье с перчатками",
      category: "Платья",
      price: "49",
      image: "../../static/css/imgProduct/8.webp",
    },
  ],
};

for (let i of products.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide");
  //image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  //img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  //price
  let price = document.createElement("h6");
  price.innerText = "$" + i.price;
  container.appendChild(price);

  card.appendChild(container);
  document.getElementById("products").appendChild(card);
  // function goToPage()
  // {
  //   var url = document.getElementById('id_Элемента');
  //   document.location.href = url.value;
  // }
  // if (i.model) {
  //   window.location.href = 'https://darinastepanova.github.io/irpo/'+i.model;
  // }
  var a = document.createElement('a');
      var linkText = document.createTextNode("Купить");
      a.appendChild(linkText);
      a.title = "Купить";
      a.href = "https://darinastepanova.github.io/irpo/" + i.model;
      container.appendChild(a);
}

//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "Все") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("Все");
};