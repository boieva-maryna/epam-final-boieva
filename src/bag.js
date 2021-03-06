let shoppingBag=JSON.parse(localStorage.getItem('shopping-bag'));
updateBagView(shoppingBag);
function addToShoppingBag(product){
    if(shoppingBag!==null){
        let fl=false;
        for(let i=0;i<shoppingBag.length;i++){
            if(shoppingBag[i].id===product.id&&shoppingBag[i].color===product.color&&shoppingBag[i].size===product.size){
                fl=true;
                shoppingBag[i].quantity+=1;
            }
        }
        if(!fl){
            product.quantity=1;
            shoppingBag.push(product);
        }
    }
    else {
        shoppingBag=[];
        product.quantity=1;
        shoppingBag.push(product);
    }
    localStorage.setItem('shopping-bag',JSON.stringify(shoppingBag));
    updateBagView(shoppingBag);
}
function deleteFromShoppingBag(product,quantity){
    if(quantity<0||quantity==undefined) quantity=1;
    for(let i=0;i<shoppingBag.length;i++){
        if(shoppingBag[i].id===product.id&&shoppingBag[i].size===product.size&&shoppingBag[i].color===product.color){
            shoppingBag[i].quantity-=quantity;
            if(shoppingBag[i].quantity===0) shoppingBag.splice(i,1);
            break;
        }
    }
    updateBagView(shoppingBag);
    localStorage.setItem('shopping-bag',JSON.stringify(shoppingBag));
}
function getBagSum(shoppingBag){
    let count=0;
    for(let i=0;i<shoppingBag.length;i++){
        count+=shoppingBag[i].price*shoppingBag[i].quantity;
    }
    return count.toFixed(2);
}
function getBagQuantity(shoppingBag){
    let quantity=0;
    for(let i=0;i<shoppingBag.length;i++){
        quantity+=shoppingBag[i].quantity;
    }
    return quantity;
}
function updateBagView(shoppingBag){
    if(shoppingBag!=null){
        let discount=checkDiscount(shoppingBag);
        let sum=(getBagSum(shoppingBag) - discount);
        document.getElementById('bagSum').innerHTML="£"+sum;
        document.getElementById('bagNumber').innerHTML=getBagQuantity(shoppingBag);
        if(document.getElementById('total')){
            document.getElementById('discount').innerHTML=discount>0?"Applied discount :£"+discount:"";
            document.getElementById('total').innerHTML="£"+sum;
        }
    }
    else {
        document.getElementById('bagSum').innerHTML=0;
        document.getElementById('bagNumber').innerHTML=0;
        if(document.getElementById('total')){
            document.getElementById('discount').innerHTML="";
            document.getElementById('total').innerHTML="£"+0;
        }
    }
}
function checkDiscount(shoppingBag){
    //в корзине должен быть товар из bestOffer.left и bestOffer.right
        let left,right=0;
        for(let i=0;i<window.bestOffer.left.length;i++){
            left=shoppingBag.map(val=>val.id).indexOf(window.bestOffer.left[i]);
            if(left!=-1) break;
        }
        for(let i=0;i<window.bestOffer.right.length;i++){
            right=shoppingBag.map(val=>val.id).indexOf(window.bestOffer.right[i]);
            if(right!=-1) break;
        }
        if(left!==-1&&right!==-1) {
            return window.bestOffer.discount;
        }
    return 0;
}
function emptyBag(){
    shoppingBag=null;
    localStorage.removeItem('shopping-bag');
    console.log(shoppingBag);
    updateBagView(shoppingBag);
}