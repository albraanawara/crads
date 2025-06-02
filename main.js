let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let ads =document.getElementById("ads");
let discount =document.getElementById("discount");
let total =document.getElementById("total");
let count =document.getElementById("count");
let category =document.getElementById("category");
let submit =document.getElementById("submit");
let mood ="create";
let tmb;

//get total
function gettotal(){
    if (price.value !=""){
        let rasult =(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=rasult;
        total.style.background="rgb(0, 255, 60)";
        total.style.color="rgb(0,0,0)";
    }else{
        total.innerHTML="";
        total.style.background="rgb(36, 108, 253)";
    }
};
//create product 

let datapro;
if(localStorage.product!=null){
    datapro= JSON.parse(localStorage.product);
}else{
    datapro=[];
}
submit.onclick =function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    };
    if(title.value!=""&&price.value!=""&&category.value!=""&&newpro.count<=100 ){
    //count
    if(mood==="create"){
    if(newpro.count>1){
        for(i=0;i < newpro.count;i++){
            datapro.push(newpro); 

        }
    }else{
        datapro.push(newpro);  
    } 
   
}else{
    datapro[ tmb  ]=newpro;
    mood="create";
    submit.innerHTML="create";
    count.style.display="block";

}
cleardata();
    }
//save localstorage

localStorage.setItem("product" , JSON.stringify(datapro));
console.log(newpro);

showdata();
}
// clear inputs

function cleardata(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    total.style.background="rgb(36, 108, 253)";
    count.value="";
    category.value="";
};
//read

function showdata(){
    let table='';
    for(i=0;i<datapro.length;i++){
    table +=` 
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick=" updatedata( ${i} )" id="update">update</button></td>
                <td><button onclick =" deleteData( ${i} )" id="delete">delete</button></td>
            </tr>`
    }
    document.getElementById("tbody").innerHTML=table;
    let btndelete=document.getElementById("deleteall");
    if(datapro.length > 0){
        btndelete.innerHTML=`
        <button onclick ="deleteAll() ">Delete All (${datapro.length})</button>
        
        `
    }else{
        btndelete.innerHTML=''
    }
};
showdata();
//delete

function deleteData(i){
    datapro.splice(i,1);
    localStorage.product =JSON.stringify(datapro);
    showdata();

};
// delete all

function deleteAll(){
    if(confirm("هل أنت متأكد أنك تريد حذف كل المنتجات؟")){
    localStorage.clear();
    datapro.splice(0);
    showdata();
    }
};
//update data 
function updatedata(i){
title.value=datapro[i].title;
price.value=datapro[i].price;
taxes.value=datapro[i].taxes;
ads.value=datapro[i].ads;
discount.value=datapro[i].discount;
gettotal();
count.style.display="none";
category.value=datapro[i].category;
submit.innerHTML="update";
mood="update"
tmb=i;
scroll({
    top:0,
    behavior:"smooth",   
}
    
);

};
//search
let searchmood ="title";
function getsearchmood(id){
    let search =document.getElementById("search");
    if(id=="search by title" ){
        searchmood ="title" ;
    }else{
        searchmood ="category" ; 
    }
    search.placeholder="search by  "+ searchmood;
    search.focus();
    search.value="";
    showdata();
};



function searchdata(value){
    let table='';
    for (let i = 0; i < datapro.length; i++) {
        if(searchmood=="title"){
            if(datapro[i].title.includes(value)){
                table +=` 
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick=" updatedata( ${i} )" id="update">update</button></td>
                <td><button onclick =" deleteData( ${i} )" id="delete">delete</button></td>
            </tr>`


            }

        }else{
            if(datapro[i].category.includes(value)){
                table +=` 
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick=" updatedata( ${i} )" id="update">update</button></td>
                <td><button onclick =" deleteData( ${i} )" id="delete">delete</button></td>
            </tr>`


            }

        }
        
    }
    document.getElementById("tbody").innerHTML=table;
};
//btn scroll
let btnscroll=document.getElementById("btnscroll");
window.onscroll =function(){
    if(scrollY>= 400){
        btnscroll.style.display="block";
    }else{
        btnscroll.style.display="none";

    }
}
btnscroll.onclick =function(){
    scroll({
        top:0,
        left:0,
        behavior:"smooth",
    })
}
//btn light-mood
let toggleBtn = document.getElementById('toggle-theme');
toggleBtn.onclick = function() {
    document.body.classList.toggle('light-mode');
    toggleBtn.classList.add('rotate');

    setTimeout(() => {
        toggleBtn.classList.remove('rotate');
    }, 500); // مدة الأنيميشن 0.5 ثانية

    if (document.body.classList.contains('light-mode')) {
        toggleBtn.innerHTML = '🌙';
    } else {
        toggleBtn.innerHTML = '🌞';
    }
}


