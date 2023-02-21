const form = document.getElementById("order-form")

form.addEventListener("submit", async function(event) {
	event.preventDefault();

    const queryString = new URLSearchParams(window.location.search); 
    const username = queryString.get('username')

    const reqBody = {
        "type": document.getElementById("type").value,
        "price": document.getElementById("price").valueAsNumber,
        "quantity": document.getElementById("quantity").valueAsNumber,
        "esopType": document.getElementById("esopType").value
    }

    const orderResponse = await fetch(`http://localhost:8000/user/${username}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(reqBody)
    });
    
    const content = await orderResponse.json();

    if(content.hasOwnProperty("orderId"))
        alert("Order placed Successfully!!")  
    else{
        if(content.hasOwnProperty("errors"))
            alert(content["errors"].join("\n"))
        else    
            alert(content)
    }
        
	
});


function typeCheck(orderType) {
    if (orderType.value == "BUY") {
        document.getElementById("esopTypeCheck").style.visibility = "hidden";
    } else {
        document.getElementById("esopTypeCheck").style.visibility = "visible";
    }
}


  