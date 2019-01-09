// // Get JSON data from .json file
// var epRequest = new XMLHttpRequest();
// epRequest.open('GET', 'testfile.json');
// epRequest.onload = function() {
// 	var epResponse = epRequest.responseText;
// 	var epistles = JSON.parse(epResponse);
// };
// epRequest.send();


var sideList = document.getElementById('faighleathanach');
var glossList = document.getElementById('gluaiseanna');
// var curep;
// var curfol;
// var curpg;
// var curglnum;
// var curgl;


// Get JSON data from file and call functions to insert it into the HTML code
function processJSON(){
	var epRequest = new XMLHttpRequest();
	epRequest.open('GET', 'glosses.json');
	epRequest.onload = function() {
	var epResponse = epRequest.responseText;
	var epistles = JSON.parse(epResponse);
	epSidebar(epistles);
	epBody(epistles);
	};
	epRequest.send();
}


// Insert Epistles in sidebar
function epSidebar(data){
	var epList = "";
	var epCount = 1;
	for (i=0; i<data.length; i++){
		var epName = data[i].epistle;
		var classFinder = "<li><a class='litir' href='#epist" + epCount + "'>" + epCount + ". " + epName + "</a></li>";
		epList += classFinder;
		epCount++;
		var fols = data[i].folios;		for (j=0; j<fols.length; j++){
			var foName = fols[j].folio;
			var foIdSplit = foName.split(" ");
			var foId = "<li class='arthaobh'><a href='#fol" + foIdSplit.join("") + "'>" + foName + "</a></li>";
			epList += foId;
		}
	}
	sideList.innerHTML = epList;
}


// Insert Glosses in body
function epBody(data){
	var epistList = "";
	var epistCount = 1;
	for (i=0; i<data.length; i++){
		var epistName = data[i].epistle;
		// curep = epistName;
		var setId = "<h2 id='epist" + epistCount + "'>" + epistName + "</h2>";
		epistList += setId;
		epistCount++;
		var fols = data[i].folios;
		for (j=0; j<fols.length; j++){
			var folName = fols[j].folio;
			// curfol = folName;
			var folIdSplit = folName.split(" ");
			var folId = "<h3 id='fol" + folIdSplit.join("") + "'>" + folName + "</h3>";
			epistList += folId;
			var glosses = fols[j].glosses;
			for (k=0; k<glosses.length; k++){
				var glossNum = glosses[k].glossNo;
				var glossTxt = glosses[k].glossText;
				var glossPage = glosses[k].tphPage;
				// curglnum = glossNum;
				// curgl = glossTxt;
				// curpg = glossPage;
				epistList += "<ul class='gluaiseannabileoige'><li class='uimhir'>" + glossNum + ".</li><li class='anghluais'>" + glossTxt + "</li></ul>";
				// epistList += "<ul class='gluaiseannabileoige'><li class='uimhir'><a class='eolas' href='#' onClick='sendInfo()'>" + glossNum + ".</a></li><li class='anghluais'>" + glossTxt + "</li></ul>";
			}
		}
	}
	glossList.innerHTML = epistList;
}


// Create alert box containing gloss information
// function sendInfo(){
// 	alert("Epistle: " + curep + "\nFolio: " + curfol +
// 		  "\nThesaurus Palaeohibernicus (V.1): p. " + curpg +
// 		  "\nGloss: " + curglnum + ". " + curgl);
// }


// Insert date in footer and year in copyright claim
function upDate(){
	var footDate = document.getElementsByTagName('footer');
	var copyDate = document.getElementById('coipcheart');
	var copyDate = document.getElementById('coipcheart_Eng');
	const monthNames = ["January", "February", "March", "April",
		"May", "June", "July", "August", "September", "October",
		"November", "December"];
	var d = new Date();
	var thisDay = d.getDate();
	var thisMonth = monthNames[d.getMonth()]
	var thisYear = d.getFullYear();
	footDate[0].innerHTML = "<p>Adrian Doyle, <em>Würzburg Irish Glosses</em> (2018), &lt;www.wurzburg.ie> [accessed " + thisDay + " " + thisMonth + " " + thisYear + "]</p>";
	copyDate.innerHTML = "<p id=\"coipcheart\"><em>Cóipcheart © " + thisYear + " Ollscoil na hÉireann, Gaillimh</em></p>";
	copyDate.innerHTML = "<p id=\"coipcheart_Eng\"><em>Copyright © " + thisYear + " National University of Ireland, Galway</em></p>";
}


// Call all functions
function callFuncs(){
	processJSON();
	upDate();
}
window.onload = callFuncs
