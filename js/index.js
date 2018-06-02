var balance1 = 0;
var lastDonationCharity = null;

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
    // console.log("Get Result");
    // console.log(result);
     return result;
}

function getTransactions(address) {
	console.log("running getTransactions");
	var apikey = "9R1SBAHHRX5138FBZWPWP9W8JRFRFV73AJ"; 
	var ethnetwork = "rinkeby";
	var scriptUrl = "https://" + ethnetwork + ".etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=99999999&sort=asc&apikey=" + apikey;
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
	// console.log("Result");
	// console.log(result);
	// console.log("Results 1");
	// console.log(result[0]);
	// console.log(result[0].timeStamp);
	var key = "timeStamp";
	var array = result.map(a => a.timeStamp);
	console.log("Array");
	console.log(array);

	var lastTransaction = Math.max.apply(Math,array);
//	var lastTransaction = max(array);
	console.log(lastTransaction) 
	// console.log("end of getTransactions");
	return lastTransaction;
}

function getLastDonationCharity(tx1, tx2, tx3, tx4) {
	var list = [0,tx1,tx2,tx3,tx4];
	return list.indexOf(Math.max.apply(Math,list));
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

	if (result1 >= 1) {
		lastDonationCharity = "Water.org";
	}

	if (result2 >= 1) {

	}

	var total = 0;
	var results = [result1, result2, result3, result4]

    for (var i =0; i < results.length; i++) {
    	total += results[i]
    } 

//	console.log("total");
//	console.log(total);

	var pendingMessage = null;
	if (total <= 0) {
		pendingMessage = " Send some ETH to a charity below :)";
		$('#pendingHeart').hide();
	} else if (total == 1) {
		pendingMessage = total + " Ethereum Transaction Incoming!!!";
		$('#pendingHeart').show();
	} else {
		pendingMessage = total + " Ethereum Transactions Incoming!!!";		
		$('#pendingHeart').show();
	}
	document.getElementById("pendingMessage").innerHTML = pendingMessage;
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
            var regexp = "(pending)"
			result = String(data).match(regexp);

			if (result == null) {
				result = 0;
    		} else {
    			result = result.length/2;
    		}
//			console.log("result");
//			console.log(result);
//          console.log(result);
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

		var tx1 = getTransactions(address1);
		var tx2 = getTransactions(address2);
		var tx3 = getTransactions(address3);
		var tx4 = getTransactions(address4);
		
		var lastCharityIndex = getLastDonationCharity(tx1,tx2,tx3,tx4);
		console.log("lastcharity");
		console.log(lastCharityIndex);

		if (lastCharityIndex == 1) {
		  document.getElementById("last-donation-name").innerHTML = "Water.org";
		} else if (lastCharityIndex ==2) {
		  document.getElementById("last-donation-name").innerHTML = "UNICEF";
		} else if (lastCharityIndex ==3) {
		  document.getElementById("last-donation-name").innerHTML = "World Wildlife Fund";
		} else if (lastCharityIndex ==4) {
		  document.getElementById("last-donation-name").innerHTML = "Black Girls Code";
		};

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

 		  document.getElementById("total_ETH").innerHTML = sum;

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