
const orderHistory = async function(event){

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username')

    const orderHistoryResponse = await fetch(`http://localhost:8000/user/${username}/order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const content = await orderHistoryResponse.json();

    const historyTable = document.getElementsByClassName("main-table")[0]

    for(orderRecord = 0; orderRecord < content.length; orderRecord++){

        var tr = document.createElement('tr');
        var esopType = "-"
        if(content[orderRecord].hasOwnProperty("esopType")){
            esopType = content[orderRecord]["esopType"]
        }

        var filledOrder = "-"
        if(content[orderRecord]["filled"].length > 0){
            filledOrder= `<table class="sub-table">`
            for(i = 0; i <content[orderRecord]["filled"].length; i++ ){
                filledOrder += `<tr>
                    <td>${content[orderRecord]["filled"][i]["quantity"]}</td>
                    <td>${content[orderRecord]["filled"][i]["price"]}</td>
                    <td>${content[orderRecord]["filled"][i]["esopType"]}</td>
                </tr>`
            } 
            filledOrder += "</table>"
        }
        
        let tableString = `
            <td>${content[orderRecord]["orderId"]}</td>
            <td>${content[orderRecord]["price"]}</td>
            <td>${content[orderRecord]["quantity"]}</td>
            <td>${content[orderRecord]["type"]}</td>
            <td>${esopType}</td>
            <td>${content[orderRecord]["status"]}</td>
            <td>${filledOrder}</td>`
        tr.innerHTML = tableString    
    
        historyTable.appendChild(tr)

        console.log(tableString)

    }
  
    console.log(content);

}