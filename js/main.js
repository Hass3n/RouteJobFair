/***************** fetch customer and transcation Data******************* */

let tbody=document.querySelector('tbody');
let search=document.querySelector('input');


// get transaction Data
async function getTransactionData(key,cvalue)
{
    if(key ==='customer_id')
    {

        let urlData=await fetch(`http://localhost:3000/transactions?${key}=${cvalue}`);
        let urlJson=await urlData.json();
       
        console.log('data here',urlJson);

        displayCustomer(urlJson);
        createChart(urlJson);


    }

    else
    {
       
        
        let urlData=await fetch(`http://localhost:3000/transactions?${key}=${cvalue}`);
        let urlJson=await urlData.json();
       
     
            displayCustomer(urlJson);
             createChart(urlJson);





  

    }




}

getTransactionData('amount','');


// display Data
 async function displayCustomer(tData,key='transcation')
{
    let box=``;
    for(let i=0;i<tData.length;i++)
    {
        box+=`     <tr>
              <th scope="row">${tData[i]['id']}</th>
              <td>${ await getCustomerData(tData[i]['customer_id'])}</td>
              <td>${tData[i]['date']}</td>
              <td>${tData[i]['amount']}</td>
            </tr>`
    }
    tbody.innerHTML=box;
}


// get customer Data
async function getCustomerData(id)
{
    let urlData=await fetch(`http://localhost:3000/customers/${id}`);
    let urlJson=await urlData.json();

    return urlJson['name']
   
}


/********************* search************************* */

searchData();
function searchData()
{

   search.addEventListener('input',function(e){

     if(e.target.value.length>0)
         {

            if(isNaN(parseInt(e.target.value)))
                {
         
         
         
                 filterData('customers',e.target.value)
                }
         
                else
                {
                  getTransactionData('amount',e.target.value)
         
         
                }
         }
         else
         {
            getTransactionData('amount','');

         }
    

   })
}


// get transaction Data
async function filterData(key,input)
{
    let urlData=await fetch(`http://localhost:3000/${key}?name=${input}`);
    let urlJson=await urlData.json();
   
    if(Array.isArray(urlJson) && urlJson.length>0)
    {
            getTransactionData('customer_id',urlJson[0].id)

      
    }
   
}






/*********************Graph********************* */

let secgraph=document.querySelector('#graph')
// Assuming 'chart' is the variable where you store your Chart instance
let chart;
let x=[];
let y=[];
// Function to create a new chart
function createChart(urlJson) {

    console.log('inner',urlJson.length);
  // Check if a chart instance already exists
  x=[];
  y=[];

  for(let i=0;i<urlJson.length;i++)
  {
    x.push(urlJson[i]['date']);
    y.push(urlJson[i]['amount'])
  }
  console.log('x',y);
  if (chart) {
    // Destroy the existing chart before creating a new one
    chart.destroy();
  }

  // Get the context of the canvas element we want to select
  const ctx = document.getElementById('myCharts').getContext('2d');

  // Create a new Chart instance
  chart = new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', etc.
    data:{
        labels: x,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: y,
        }]
      },
    options: {
      // Your chart options go here
    }
  });

  secgraph.classList.replace('d-none','d-block');
}





