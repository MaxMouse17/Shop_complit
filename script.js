"use strict";

class Api{
    constructor(){
        this.baseUrl= 'https://raw.githubusercontent.com';
       
}  
 _get(path){
      return fetch(`${this.baseUrl}${path}`,{
            // mode:"no-cors",
              method:"GET"
          }) 
    
}

 _post(path){
        return fetch(`${this.baseUrl}${path}`,{
          mode:"no-cors",
          method:"POST"

})
            }


getPosts(){
    return this._get("/MaxMouse17/shopper/master/goods.json")
    .then(res=>{
    	console.log(res)
    return res.json();

}) 
      .catch(err=>{
        console.error(err);
        return Promise.resolve([])
    })
         }


}// END OF API

const CardGoods  = document.querySelector("#Card_goods");
CardGoods.innerHTML ="";
const CartOne =document.querySelector("#Cart_one");
CartOne.innerHTML ="";
const api = new Api();


function shopfront(){
api.getPosts()
 .then(res=>{
	
	let output="";

for( let k in res){
	output+='<div  class ="Card_one" >';
	output+='<img src= "'+ res[k].image+'" >';
	output+=`<h2> ${res[k]['name']} </h2>`;
	output+=`<p> Цена:  ${res[k]['cost']} ₽  </p>`;
	output+=`<button type="button" id= "${k}" class="AddToCart" 
	  onclick="Func_Add (this)"> Добавить в корзину </button>`;
	output+=`</div>`;
}
CardGoods.innerHTML =output;

}) 
}
//
shopfront();

//Массив Cart - корзина покупок. Будет содержать 
//идентификационный номер товара и соответствующее данному 
//номеру количество покупок.
/* вся остальная информация по товару может
быть получена из массива goods.json */
let Cart = {};
function Func_Add(obj){
	let k =obj.id ;
//console.log(k);
if (Cart[k]==undefined)
	Cart[k]=1;
  else Cart[k]++;
  console.log(Cart);
  ViewCartOne();
 
} 

	
function ViewCartOne(){
  //console.log(Cart);
  api.getPosts()
    .then(data=>{

	let output="";
	let total=0;

	for( let k in data){
       if (Cart[k]>=1) {
       		
		total+=Cart[k]*data[k]['cost'];

		output+=` <p ><br> ${data[k]['name']}`;
		output+=` ${data[k]['cost']*Cart[k]} ₽ `;
		output+=`<button class="minus" data-min="${k}" onclick="MinusGoods(this)"> - </button>`;
		output+=`${Cart[k]}`;
		output+=`<button class="plus" data-pl="${k}" onclick="PlusGoods(this)" > + </button></p>`;
                          	  }}
        output+=`<p><br> Общая стоимость: ${total} '₽' `;
        output+=`<button class="btn btn-outline-danger" class="Buy" > Купить </button>`;
 		CartOne.innerHTML=output;

 	} ) 
}
 function MinusGoods(obj){
 	let n=obj.getAttribute("data-min");
 //	console.log(n);
   if (Cart[n]==1)
   	  delete Cart[n];
   	   else
   	   	Cart[n]--;
   	   ViewCartOne();  }
 
 function PlusGoods(obj){
 	let m=obj.getAttribute("data-pl");
 	Cart[m]++;
 	ViewCartOne(); 
 	}
 


