var destination = "0xadff6699b5eece3f4e6d476ea8e427d386841002";
var balance1 = 0;
var lastDonationCharity = null;
var network = "api";
var apiKey = "9R1SBAHHRX5138FBZWPWP9W8JRFRFV73AJ"; 

//console.log(balance1);

function getResult(address) {
	var result = null;
    var scriptUrl = "https://" + network + ".etherscan.io/api?module=account&action=balance&address=" + address + "&tag=latest&apikey="+ apiKey;
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

// Gets the token contract address from the token contract symbol.
// TODO: swap out with a real database.
function getTokenAddress(tokenName) {
	
	var result = null;

	if (tokenName == "TEST") {
		result = "0x875664e580eea9d5313f056d0c2a43af431c660f";
	} else if (tokenName == "DAI") {
		result = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
	}

	return result;
}

// Gets the token balance of an address.
// TODO: Change tokenDecimal to be pulled from the query instead of manually set.
function getTokenBalance(address, tokenName) {

	var result = null;

	tokenAddress = getTokenAddress(tokenName);

    var scriptUrl = "https://" + network + ".etherscan.io/api?module=account&action=tokenbalance&contractaddress=" + tokenAddress + "&address=" + address + "&tag=latest&apikey="+ apiKey;
     $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data.result;
        } 
     });

    // Result has 18 decimals, so we will move the decimal place.
    var tokenDecimal = 18;
    result = result / (10 ** tokenDecimal);

	return result;
}

// Gets the transfer events in an address for a specific token.
function getTokenTransactions(address, tokenName) {

	var scriptUrl = "https://" + network + ".etherscan.io/api?module=account&action=tokentx&contractaddress=" + tokenAddress + "&address=" + address + "&tag=latest&apikey="+ apiKey;
     $.ajax({
    	url: scriptUrl,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data.result;
        } 
     });

	return result;
}

// Gets the number of transactions in an address for a specific token.
function getNumOfTransactions(address, tokenName) {
	txs = getTokenTransactions(address, tokenName);
	result =  txs.length;
   	return result;
}

// Gets the most recent transaction in a list of transactions
function getLastTransaction(transactions) {

   	var key = "timeStamp";
//	var transactionsArray = transactions.map(a => a.timeStamp);
//	var lastTransaction = Math.max.apply(Math,transactionsArray);
	var lastTransaction = transactions[transactions.length-1];
	return lastTransaction;
}

// Gets the from field f a particular transaction
function getFrom(transaction) {
}



function getTransactions(address) {
	console.log("running getTransactions");
	var scriptUrl = "https://" + network + ".etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=99999999&sort=asc&apikey=" + apiKey;
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
	result = checkPendingForAddress(destination);

	var pendingMessage = null;

	if (result <= 0) {
		pendingMessage = "Live Free & DAI Hard";
		$('#pending-heart').hide();
	} else if (result == 1) {
		pendingMessage = result + " DAI Transactions Incoming!!!";
		$('#pending-heart').hide();
	} else {
		pendingMessage = result + " DAI Transactions Incoming!!!";		
		$('#pending-heart').hide();
	}
	document.getElementById("pending-message").innerHTML = pendingMessage;
}

function checkPendingForAddress(address) {
	var result = null;
	var scriptUrl = "https:/rinkeby.etherscan.io/address/" + address;
    $.ajax({
    	url: scriptUrl,
        type: 'GET',
        dataType: 'html',
        xhrFields: {
    	withCredentials: false
	  	},
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

function checkPendingMultiple() {
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
		$('#pending-heart').hide();
	} else if (total == 1) {
		pendingMessage = total + " Ethereum Transaction Incoming!!!";
		$('#pending-heart').show();
	} else {
		pendingMessage = total + " Ethereum Transactions Incoming!!!";		
		$('#pending-heart').show();
	}
	document.getElementById("pending-message").innerHTML = pendingMessage;
}

function checkPendingForAddressMultiple(address) {
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

		var address = destination;
		var balance = getTokenBalance(address, "DAI");
		var tx = getTokenTransactions(address, "DAI");
		var txLast = getLastTransaction(tx);
		var sender = txLast.from;
		var numOfTransactions = getNumOfTransactions(address, "DAI");
		balance = Math.round(balance);
		console.log("tx");
		console.log(tx);

		console.log("txLast");
		console.log(txLast);

 		document.getElementById("total-donations").innerHTML = balance;
//  		document.getElementById("last-donor-name").innerHTML = sender;
//  		document.getElementById("num-of-transactions").innerHTML = numOfTransactions;
}


function updateChartMultiple() {
//window.onload = function() {

//Charity Addresses
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

 		  document.getElementById("total-donated").innerHTML = sum;
 		  document.getElementById("rank_1").innerHTML = sum;

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