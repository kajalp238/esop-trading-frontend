
const fetchOrderHistory = async function(event){

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username')

    const orderHistoryResponse = await fetch(`http://localhost:8000/user/${username}/order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const orderHistory = await orderHistoryResponse.json();

    if(orderHistory.hasOwnProperty("errors"))
        alert(orderHistory["errors"])
    else
        createOrderHistoryTable(orderHistory)

}

const createOrderHistoryTable = (orderHistory) =>{

    const historyTable = document.getElementsByClassName("main-table")[0]

    for(orderRecord = 0; orderRecord < orderHistory.length; orderRecord++){

        var tr = document.createElement('tr');
        var esopType = "-"
        if(orderHistory[orderRecord].hasOwnProperty("esopType")){
            esopType = orderHistory[orderRecord]["esopType"]
        }

        const filledOrderTable = createFilledOrderTable(orderHistory)
        
        let tableString = `
            <td>${orderHistory[orderRecord]["orderId"]}</td>
            <td>${orderHistory[orderRecord]["quantity"]}</td>
            <td>${orderHistory[orderRecord]["price"]}</td>
            <td>${orderHistory[orderRecord]["type"]}</td>
            <td>${esopType}</td>
            <td>${orderHistory[orderRecord]["status"]}</td>
            <td>${filledOrderTable}</td>`

        tr.innerHTML = tableString    
        historyTable.appendChild(tr)

    }
}

const createFilledOrderTable = (orderHistory) => {

    var filledOrderTable = "-"
    if(orderHistory[orderRecord].hasOwnProperty("filled")){

        const ordersFilled = orderHistory[orderRecord]["filled"]
        filledOrderTable= `<table class="sub-table">`

        for(i = 0; i <orderHistory[orderRecord]["filled"].length; i++ ){
            filledOrderTable += `<tr>
                <td>${ordersFilled[i]["quantity"]}</td>
                <td>${ordersFilled[i]["price"]}</td>
                <td>${ordersFilled[i]["esopType"]}</td>
            </tr>`
        } 

        filledOrderTable += "</table>"
    }

    return filledOrderTable

}    


