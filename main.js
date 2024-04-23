import { buttonsData, menu } from "./js/db.js";
import { calculatePrice, elements } from "./js/helpers.js";

const renderMenuItems = (menuItems) => {
  /* dizideki her bir obje icin bir elemani temsil eden HTML elemani olusturur
    bu HTML'i bir diziye aktarir*/
  let menuHTML = menuItems.map(
    (item) =>
      `
        <a href="/productDetail.html?id=${
          item.id
        }" id="card" class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2">
        <img src="${item.img}" class="rounded shadow"  />
      <div>
        <div class="d-flex justify-content-between">
          <h5>${item.title}</h5>
          <p class="text-success fw-bold">${calculatePrice(item.price)} ₺</p>
        </div>
        <p class="lead fw-normal">
          ${item.desc}
        </p>
      </div>
    </a>`
  );

  /*** suslu parantez ve return ilede yapilabilir 2.yol olarak */
  //      let menuHTML = menuItems.map((item) =>{
  //      return`
  //      <a href="productDetail.html?id=2" id="card" class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2">
  //      <img src="${item.img}" class="rounded shadow"  />
  //      <div>
  //      <div class="d-flex justify-content-between">
  //        <h5>${item.title}</h5>
  //        <p class="text-success fw-bold">${item.price} ₺</p>
  //      </div>
  //      <p class="lead fw-normal">
  //        ${item.desc}
  //      </p>
  //    </div>
  //  </a>`
  //   })

  menuHTML = menuHTML.join("");
  elements.menuArea.innerHTML = menuHTML;
};

// tiklanilan butona gore o butonun kategorisine ait urunleri listeler
const searchCategory = (e) => {
  const category = e.target.dataset.category;
  // tum dizi elemanlarindan kategori degeri butonun kategori degeri ile eslesenleri
  // getirir ve bir dizi seklinde degiskene aktarir.
  const filteredMenu = menu.filter((item) => item.category === category);
  //hepsi secilirse butun menuyu ekrana aktarir
  if (category == "undefined") {
    return;
  } else if (category === "all") {
    renderMenuItems(menu);
  } else {
    //filtrelenen elemanlari ekrana aktarmasi icin menu dizisinden
    // olusturdugumuz filtredMenu dizisini ekrana aktarir
    renderMenuItems(filteredMenu);
  }

  //sectigimiz kategorinin butonunu aktiflestirebilmek icin category'i parametre olarak gonderdik
  renderButtons(category);
};

// ekrana butonlari basma
const renderButtons = (active) => {
  elements.buttonsArea.innerHTML = ""; // eski butonlari ekrandan sil

  //yeni butonlar olusturma
  buttonsData.forEach((btn) => {
    console.log(btn);
    const buttonEle = document.createElement("button"); // HTML yeni buton olustuma

    buttonEle.className = "btn btn-outline-dark filter-btn"; // butonlara class ekleme
    buttonEle.textContent = btn.text; // icerisindeki yaziyi degistirme
    buttonEle.dataset.category = btn.value; // hangi category oldugunu butonEle ekledik

    // eger active kategorisi ile btn value'su eslesirse ona farkli class ekler
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }
    //HTML'e gonderme
    elements.buttonsArea.appendChild(buttonEle);
  });
};

//!olay izleyicileri
// sayfa yuklendiginde ekrana renderMenuItems ve renderButtons fonksiyonlarini calistirir.
document.addEventListener("DOMContentLoaded", () => {
  renderMenuItems(menu), renderButtons("all");
}); //2.yol arrow fonksiyonu ile  veya ()=>{} olmadan sadece virgullerle ayirarakta yapabiliriz.
// document.addEventListener("DOMContentLoaded", renderButtons("all"))  //1.yol butonlar html'den sildigimizde kayboldular sayfa yuklenince gelmeleri icin cagirdik
elements.buttonsArea.addEventListener("click", searchCategory);
