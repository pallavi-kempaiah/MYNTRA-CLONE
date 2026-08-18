const convenienceFee=99;
let BagItemObjects;
onload();
function onload(){
  LoadBagItems();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
  let bagsummaryelement=document.querySelector('.bag-summary');
  let totalitems=BagItemObjects.length;
  let totalmrp=0;
  let totaldiscount=0;
  BagItemObjects.forEach(BagItems =>{
    totalmrp+=BagItems.original_price;
    totaldiscount+=BagItems.original_price-BagItems.current_price;
  });
    let finalpayment= totalmrp - totaldiscount + convenienceFee;
;
  bagsummaryelement.innerHTML=`<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalitems} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalmrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹ ${totaldiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹ ${finalpayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}
function LoadBagItems(){
     console.log(BagItems) ;
      BagItemObjects= BagItems.map(itemid => {
      for (let i=0;i<items.length;i++){
        if(itemid==items[i].id){
          return items[i];
        }
      }
     });
     console.log(BagItemObjects);
}
function displayBagItems(){

    let containerElement = document.querySelector('.bag-items-container');
    let innerhtml=``;
    BagItemObjects.forEach(BagItems => {
      innerhtml+= GenerateItemHtml(BagItems);
    });
    containerElement.innerHTML=innerhtml;
}
function removeFromBag(itemid){
  BagItems= BagItems.filter(bagitemid => bagitemid != itemid)
   localStorage.setItem('BagItems',JSON.stringify(BagItems));
   LoadBagItems();
   displayBagIcon();
   displayBagItems();
   displayBagSummary();
}
function GenerateItemHtml(item){
    return `
         <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">${item.current_price}</span>
                <span class="original-price">${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item. delivery_date} </span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
          </div>
`;
}