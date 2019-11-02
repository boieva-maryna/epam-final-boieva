let currentItem=localStorage.getItem('current-item');
if(currentItem!=null){
    let item=window.catalog.filter((el)=>el.id==currentItem)[0];
    document.getElementById('preview').innerHTML=`<img src="${item.preview[0]}">`;
    for(let i=0;i<document.querySelectorAll('.thumbnail__img').length;i++){
        document.querySelectorAll('.thumbnail__img')[i].innerHTML=`<img src="${item.preview[i]}">`;
    };
    document.getElementById('productsDetails').innerHTML=`
    <h2 class="small-heading product-details__title">${item.title}</h2>
    <p class="cursive product-details__description">${item.description}</p>
    <p class="product-details__price price">£${item.price}</p>
    ${item.sizes.length>0 ? `<div class="product-details__buttons product-details__buttons--size">
        <span class="product-details__option">Size</span>
        ${item.sizes.map((size,index)=>{
            if(index===0) return `<a href="#" class="button" data-product_details="size:${size}" data-checked="true">${size}</a>`;
            else return `<a href="#" class="button" data-product_details="size:${size}">${size}</a>`;
        }).join("")}
    </div>` :""}
    ${item.colors.length>0 ? `<div class="product-details__buttons product-details__buttons--color">
        <span class="product-details__option">Color</span>
        ${item.colors.map((color,index)=>{
            if(index===0) return `<a href="#" class="button" data-product_details="color:${color}" data-checked="true">${color}</a>`;
            else return `<a href="#" class="button" data-product_details="size:${color}">${color}</a>`;
        }).join("")}
    </div>` :""}
    <a href="shopping-bag.html" class="button button--big" id="addToBag">Add to bag</a>
    `;
}
document.getElementById('productGallery').addEventListener('click',function(e){
    if(e.target.parentNode.parentNode.className=="thumbnail") switchPhoto(e.target);
},false);
function switchPhoto(elem){
    document.querySelector('[data-active="true"]').setAttribute('data-active',false);
    document.querySelector('.preview__img').firstElementChild.setAttribute('src',elem.getAttribute('src'));
    elem.parentNode.parentNode.setAttribute('data-active',true);
}
document.getElementById('addToBag').addEventListener("click",function(e){
    e.preventDefault();
    let details=document.querySelectorAll('[data-checked="true"]');
    let product={};
    for(let i=0;i<details.length;i++){
        let detail=details[i].getAttribute('data-product_details');
        product[detail.split(':')[0]]=detail.split(":")[1];
    }
    addToShoppingBag(product);
});