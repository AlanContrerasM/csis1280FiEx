//Question 1
//button bookcar, do not let submit, without names...
const btnBookCar = document.getElementById("bookcar");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");

let chosenCategory;
let chosenOptions = [];
let finalPrice;

btnBookCar.addEventListener("click", (e)=>{
//first let's validate the names text fields,
    let valid = true;
    //restart chosenOptions
    chosenOptions = [];

    if(fname.value=="" && lname.value==""){
        alert("You must submit both a First and Last Name");
        valid = false;
    }else if(fname.value==""){
        alert("You must submit a First Name");
        valid = false;
    }else if(lname.value==""){
        alert("You must submit a Last Name");
        valid = false;
    }

    if(valid){
        doPriceAndOptions();
        showPurchase()
    }

})

function doPriceAndOptions(){
    const categoryRadios = document.querySelectorAll("#category input");
    const optionsCheck = document.querySelectorAll("#optionbox input");
    finalPrice = 0;

    //first the categorys
    categoryRadios.forEach((radio)=>{
        if(radio.checked){
            chosenCategory = document.querySelector(`label[for="${radio.id}"]`).textContent;
            finalPrice += Number(radio.value);
        }
    })

    //now the options.
    //we will basically do the samething we did for radios but for checkbox
    optionsCheck.forEach((option)=>{
        if(option.checked){
            chosenOptions.push(document.querySelector(`label[for="${option.id}"]`).textContent);
            console.log("adding " +  option.id + ": " + option.value);
            finalPrice += Number(option.value);
        }
    })
    console.log(chosenCategory);
    console.table(chosenOptions);
    console.log(finalPrice);
}

function showPurchase(){
    const rentaldetails = document.getElementById("rentaldetails");
    const payMethod = document.getElementById("payment");
    let message = "";
    console.log(fname.value);
    message += `Thank you ${fname.value} ${lname.value} for choosing us. <br>`
    message += "Your rental details are:<br>";
    message += `Category is: ${chosenCategory}<br>`;
    message += `Options selected are:`;
    chosenOptions.forEach((option)=>{
        message += `${option}<br>`
    })
    message += `Total Price is: $${finalPrice}<br>`;
    message += `The selected payment method is: ${payMethod.value}`;
    
    rentaldetails.innerHTML = message;
}



//Question 2

const selectBox = document.getElementById("selectedItems");
const btnAddItem = document.getElementById("additem");
const btnRemoveItem = document.getElementById("removeitem");
const inputItem = document.getElementById("item");
const minutes = document.getElementById("minutes");
const amountDisplay = document.getElementById("amount");

//when user presses add item
btnAddItem.addEventListener("click", (e)=>{
    if(inputItem.value == ""){
        alert("You need to enter a name for the item");
    }else if(isDuplicate(inputItem.value)){
        alert("Item is duplicate");
    }else{
        const newOption = document.createElement("option");
        newOption.innerText = inputItem.value;
        selectBox.appendChild(newOption);
    }


})

btnRemoveItem.addEventListener("click", (e)=>{
    if(selectBox.selectedIndex == -1){
        alert("OOPS!!There are no items to delete");
    }else{
        selectBox.remove(selectBox.selectedIndex);
    }

})

function isDuplicate(item){
    let duplicate = false;
    console.log(selectBox.options);
    Array.from(selectBox.options).forEach((option)=>{
        if(item == option.text){
            console.log(item, "exists already");
            duplicate = true;
        }
    })

    return duplicate;
}

minutes.addEventListener("blur", (e)=>{
    let total = Number(e.target.value) * selectBox.length;

    amountDisplay.value = total;
    


})


//Question 3
const startShow = document.getElementById("start");
const stopShow = document.getElementById("stop");
const slidePlaceHolder = document.getElementById("slide");
const slideCaption = document.getElementById("caption");
const imagesArr = document.querySelectorAll("#slides img");

let show;

startShow.addEventListener("click", (e)=>{
    slidePlaceHolder.style.display = "none";
    let i = 0;
    //displaying first image
    imagesArr[i].style.display = "block";
    slideCaption.textContent = imagesArr[i].getAttribute("alt");
    console.log(i, imagesArr.length);
    i++;
    show = setInterval(function(){
        //clearing current image
        imagesArr.forEach((img)=>{
            img.style.display = "none";
        })
        //checking if index must be updated
        if(i >= imagesArr.length){
            i = 0;
        }

        imagesArr[i].style.display = "block";
        slideCaption.textContent = imagesArr[i].getAttribute("alt");
        console.log(i, imagesArr.length);
        i++;
        
        


    }, 1050)
    


})

stopShow.addEventListener("click", (e)=>{
    clearInterval(show);
    imagesArr.forEach((img)=>{
        img.style.display = "none";
    })

    slidePlaceHolder.style.display = "block";
    slideCaption.textContent = "Tulip Festival";

})

