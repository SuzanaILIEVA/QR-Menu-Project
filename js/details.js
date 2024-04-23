import { calculatePrice, elements } from "./helpers.js";
import { menu } from "./db.js";



console.log(window.location)

// URL'deki parametreleri yonetebilmek icin URLSearchParams class'indan ornek olusturduk 
//ornegi olustururken kendi url'imizdeki parametreleri gonderdik
const searchParams = new URLSearchParams(window.location.search)
const paramId = searchParams.get("id")  // get methodu ile URL'deki parametresine eristik
 // menu icindeki id'sini bildigimiz elemana find yontemi ile  ulasicaz
const product =  menu.find((item) =>item.id === Number( paramId) ) // number yonyemi ile tiplerini esitledik

console.log(product)

// buldugumuz urune gore arayuzu ekrana basma 
elements.outlet.innerHTML = `
<div class="d-flex justify-content-between align-items-center">
    <a href="/" ><i class="bi bi-house fs-1"></i></a>
    <div>anasayfa / ${product.category} /  ${product.title.toLocaleLowerCase()}</div>
</div>
    <h3 class="text-center my-2 shadow p-2 rounded-1">${product.title}</h3>
<div class="d-flex align-items-center justify-content-center">
    <img 
    src="${product.img}" 
    style="max-width: 500px" 
    class="img-fluid shadow rounded">
</div>
<div>
    <h4 class="my-2">Ürünün Kategorisi: <span class="text-success">${product.category}</span></h4>
    <h4 class="my-2">Ürünün Fiyatı: <span class="text-success">${calculatePrice(product.price)}₺</span></h4>
</div>
    <p class="lead fs-4 fw-normal">
    ${product.desc}
    </p>
`

