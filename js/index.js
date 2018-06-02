var balance1 = 0;

console.log(balance1);

/*
function getResult(){
		return $.get("https://api.etherscan.io/api?module=account&action=balance&address=0xb215cfebb90d91b1d2f499843800d3105b1366fc&tag=latest&apikey=9R1SBAHHRX5138FBZWPWP9W8JRFRFV73AJ", function(data, status){
//			alert("Ethereum Balance: " + data.result);
	        document.getElementById("address1").innerHTML = data.result;
	        balance1 = data.result;
//	        console.log(balance1);
			console.log(data);
			return data;
	   	});

	};

*/

function getResult()
{
     var result = null;
     var scriptUrl = "https://api.etherscan.io/api?module=account&action=balance&address=0xb215cfebb90d91b1d2f499843800d3105b1366fc&tag=latest&apikey=9R1SBAHHRX5138FBZWPWP9W8JRFRFV73AJ";
     $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data.result;
            console.log("data");
            console.log(data.result);
        } 
     });
     return result;
}

function updateChart() {
		  var balance1 = getResult();
		  console.log("balance1")
		  console.log(balance1);
          var chart = new CanvasJS.Chart("chartContainer", {
title: { 
			text: "Worldwide Smartphone sales by brand - 2012",
			fontSize: 24
		}, 
		axisY: { 
			title: "Products in %" 
		}, 
		legend :{ 
			verticalAlign: "center", 
			horizontalAlign: "right" 
		}, 
		data: [ 
		{ 
			type: "pie", 
			showInLegend: true, 
			toolTipContent: "{label} <br/> {y} %", 
			indexLabel: "{y} %", 
			dataPoints: [ 
				{ label: "Samsung",  y: balance1, legendText: "Samsung"}, 
				{ label: "Apple",    y: 955088378703198085, legendText: "Apple"  }, 
				{ label: "Huawei",   y: 955088378703198085,  legendText: "Huawei" }, 
				{ label: "LG",       y: 955088378703198085,  legendText: "LG Electronics"}, 
				{ label: "Lenovo",   y: 955088378703198085,  legendText: "Lenovo" }, 
				{ label: "Others",   y: 955088378703198085, legendText: "Others" } 
			] 
		} 
		] 
          });

          chart.render();
      }
/* CSS Pie Chart Code by Sean @ http://www.ohsean.net */