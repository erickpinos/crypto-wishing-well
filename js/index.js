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

function getResult(address)
{
     var result = null;
     var scriptUrl = "https://rinkeby.etherscan.io/api?module=account&action=balance&address=" + address + "&tag=latest&apikey=9R1SBAHHRX5138FBZWPWP9W8JRFRFV73AJ";
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

		var address1 = "0xc669d3A20F921713F16Bce59D4Ac0241047EC6b2";
		var address2 = "0xf73d1b277786819f38C5a7f6e88E9e4c249Fa1C6";
		var address3 = "0x9E8cfEe0D8578E85Ab5b48f4239830213CDa983a";
		var address4 = "0x2ed10bDd772B53E1f6be46Fbe0998327753FE158";

		  var balance1 = getResult(address1);
		  var balance2 = getResult(address2);
		  var balance3 = getResult(address3);
		  var balance4 = getResult(address4);

		  console.log("start");
		  console.log("balance1")
		  console.log(balance1);
		  console.log("balance2")
		  console.log(balance2);
		  console.log("balance3")
		  console.log(balance3);
		  console.log("balance4")
		  console.log(balance4);
 		  console.log("end")

 		  var ether1 = balance1/1000000000000000000;
 		  var ether2 = balance2/1000000000000000000;
 		  var ether3 = balance3/1000000000000000000;
 		  var ether4 = balance4/1000000000000000000;

 		  var sum = ether1 + ether2 + ether3 + ether4;

 		  var percentage1 = ether1/sum*100;
 		  var percentage2 = ether2/sum*100;
 		  var percentage3 = ether3/sum*100;
 		  var percentage4 = ether4/sum*100;


        CanvasJS.addColorSet("greenShades",
                [//colorSet Array
                "#64B1E5",
                "#0099FF",
                "#000000",
                "#D90472",
                ]);

          var chart = new CanvasJS.Chart("chartContainer", {
		colorSet:  "greenShades",
		title: { 
			text: "Charities",
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
				{ label: "Water.org",  y: percentage1, legendText: "Water.org" + ether1 }, 
				{ label: "UNICEF",    y: percentage2, legendText: "UNICEF" + ether2  }, 
				{ label: "World Wildlife Fund",   y: percentage3,  legendText: "World Wildlife Fund" + ether3 }, 
				{ label: "Black Girls Code",       y: percentage4,  legendText: "Black Girls Code" + ether4 }, 
			] 
		} 
		]
          });

          chart.render();
      }

/* CSS Pie Chart Code by Sean @ http://www.ohsean.net */