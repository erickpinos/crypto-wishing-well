var balance1 = 0;

//console.log(balance1);

function getResult(address) {
	var apikey = "9R1SBAHHRX5138FBZWPWP9W8JRFRFV73AJ"; 
	var ethnetwork = "rinkeby";
	var result = null;
    var scriptUrl = "https://" + ethnetwork + ".etherscan.io/api?module=account&action=balance&address=" + address + "&tag=latest&apikey="+ apikey;
     $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data.result;
            // console.log("data");
            // console.log(data.result);
        } 
     });
//     console.log("Get Result");
//     console.log(result);
     return result;
}

function checkPending() {
	var address1 = "0xc669d3A20F921713F16Bce59D4Ac0241047EC6b2";
	var address2 = "0xf73d1b277786819f38C5a7f6e88E9e4c249Fa1C6";
	var address3 = "0x9E8cfEe0D8578E85Ab5b48f4239830213CDa983a";
	var address4 = "0x2ed10bDd772B53E1f6be46Fbe0998327753FE158";

	result1 = checkPendingForAddress(address1);
	result2 = checkPendingForAddress(address2);
	result3 = checkPendingForAddress(address3);
	result4 = checkPendingForAddress(address4);

	console.log("totals");

	var total = 0;

	if (result1 != -1) {
		total=total+1;
		console.log(total)
	}

	if (result2 != -1) {
		total=total+1;
		console.log(total)
	}

	if (result3 != -1) {
		total=total+1;
		console.log(total)
	}

	if (result4 != -1) {
		total=total+1;
		console.log(total)
	}

	if (total == 1) {
		$('#pendingNothing').hide();
		$('#pendingStatus').show();
		document.getElementById("pendingMessage").innerHTML = "Ethereum Transaction Incoming!!!";		
	} else if (total >= 2) {
		$('#pendingNothing').hide();
		$('#pendingStatus').show();
		document.getElementById("pendingMessage").innerHTML = "Multiple Ethereum Transactions Incoming!!!";
	} else {
		$('#pendingNothing').show();
		$('#pendingStatus').hide();
	}

}

function checkPendingForAddress(address) {
	var ethnetwork = "rinkeby";
	var result = null;
    var scriptUrl = "https://" + ethnetwork + ".etherscan.io/address/" + address;
    $.ajax({
    	url: scriptUrl,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
// 	    	console.log(data);
//  		result = data.getElementsbyClassName("i");
			result = data.indexOf("pending");
//            console.log(result);
    	}
	});
//	console.log("checkPendingForAddresResult")
//	console.log(result);
    return result;

}

function updateChart() {
//window.onload = function() {
		var address1 = "0xc669d3A20F921713F16Bce59D4Ac0241047EC6b2";
		var address2 = "0xf73d1b277786819f38C5a7f6e88E9e4c249Fa1C6";
		var address3 = "0x9E8cfEe0D8578E85Ab5b48f4239830213CDa983a";
		var address4 = "0x2ed10bDd772B53E1f6be46Fbe0998327753FE158";

		var balance1 = getResult(address1);
		var balance2 = getResult(address2);
		var balance3 = getResult(address3);
		var balance4 = getResult(address4);

		  // console.log("start");
		  // console.log("balance1");
		  // console.log(balance1);
		  // console.log("balance2");
		  // console.log(balance2);
		  // console.log("balance3");
		  // console.log(balance3);
		  // console.log("balance4");
		  // console.log(balance4);
 		 //  console.log("end");

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
//    	backgroundColor: "#D8D6CB",
//    	backgroundColor: "#FF6C61",
    	backgroundColor: "#f0f0f0",
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
				{ label: "Water.org 0xc6",  y: percentage1, legendText: "Water.org - " + ether1 + " ETH"}, 
				{ label: "UNICEF 0xf7",    y: percentage2, legendText: "UNICEF - " + ether2  + " ETH"}, 
				{ label: "World Wildlife Fund 0x9E",   y: percentage3,  legendText: "World Wildlife Fund - " + ether3 + " ETH"}, 
				{ label: "Black Girls Code 0x2e",       y: percentage4,  legendText: "Black Girls Code - " + ether4 + " ETH"}, 
			] 
		} 
		]
          });

          chart.render();
}

$(document).ready(
 function() {
	updateChart();
	checkPending();
 setInterval(function() {
	updateChart();	
	checkPending();
//  $('#sample').text('Test');
 }, 10000);  //Delay here = 5 seconds 
});