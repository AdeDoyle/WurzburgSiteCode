
// Create variables for the containers into which the sidebar and glosses will be put
var sideList = document.getElementById('faighleathanach');
var glossList = document.getElementById('gluaiseanna');


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
	var curFol = "start";
	for (i=0; i<data.length; i++){
		var epName = data[i].epistle;
		var classFinder = "<li><a class='litir' href='#epist" + epCount + "'>" + epCount + ". " + epName + "</a></li>";
		epList += classFinder;
		epCount++;
		var fols = data[i].folios;
		for (j=0; j<fols.length; j++){
			var foName = fols[j].folio;
			var foIdSplit = foName.split(" ");
			var checkFol = foIdSplit.join("");
			if (!(checkFol == curFol)){
				curFol = checkFol;
				var foId = "<li class='arthaobh'><a href='#fol" + checkFol + ".1'>" + foName + "</a></li>";
			}else{
				var foId = "<li class='arthaobh'><a href='#fol" + checkFol + ".2'>" + foName + "</a></li>";
			}
			epList += foId;
		}
	}
	if (sideList !== null) {sideList.innerHTML = epList;}
}


// Insert Glosses in body
function epBody(data) {
	var epistList = "";
	var epistCount = 1;
	var curFo = "start";
	for (i=0; i<data.length; i++) {
		var epistName = data[i].epistle;
		var setId = "<h2 id='epist" + epistCount + "'>" + epistName + "</h2>";
		epistList += setId;
		epistCount++;
		var fols = data[i].folios;
		for (j=0; j<fols.length; j++) {
			var folName = fols[j].folio;
			var folIdSplit = folName.split(" ");
			var checkFo = folIdSplit.join("")
			if (!(checkFo == curFo)) {
				curFo = checkFo;
				var folId = "<h3 id='fol" + checkFo + ".1'>" + folName + "</h3>";
			}else{
				var folId = "<h3 id='fol" + checkFo + ".2'>" + folName + "</h3>";
			}
			epistList += folId;
			var glosses = fols[j].glosses;
			for (k=0; k<glosses.length; k++) {
				var glossHand = glosses[k].glossHand;
				var glossNum = glosses[k].glossNo;
				var glossTxt = glosses[k].glossText;
				var glid = folIdSplit.join("") + glossNum;
				var glossFNs = glosses[k].glossFNs;
				var glossANs = glosses[k].newNotes;
				var glossTrans = glosses[k].glossTrans;
				var glossPage = glosses[k].tphPage;
				var lineNum = glosses[k].latLine;
				var lat = glosses[k].latin;
				var lem = glosses[k].lemma;
				var lemLen = lem.length;
				var lemPos = glosses[k].lemPos;
				var lemEnd = parseInt(lemPos) + lemLen;
				var blem = "<strong><u>" + lem + "</u></strong>";
				var latLem = lat.substr(0, lemPos) + blem + lat.substr(lemEnd);
				var tokens = glosses[k].glossTokens2;
				epistList += "<ul id='" + glid + "' class='gluaiseannabileoige'><li class='uimhir'>" + glossNum + ".</li><li class='anghluais'>" + glossTxt + "</li></ul>";
				epistList += "<div id='" + glid + "info' class='boscafaisneise'>";
				if (glossFNs.includes("<sup>")) {
					epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>Gloss:</li><li class='line'>" + glossFNs + "</li></ul>";
				}
				epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>Translation:</li><li class='line'>" + glossTrans + "</li></ul>";
				epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>Scribe:</li><li class='line'>" + glossHand + "</li></ul>";
				epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>Page:</li><li class='line'>" + glossPage + ".</li></ul>";
				epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>Verse Info:</li><li class='line'>" + lineNum + ".</li></ul>";
				epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>Verse Latin:</li><li class='anlaidin'><em>" + latLem + "</em></li></ul>";
				var fns = glosses[k].footnotes;
				if (fns) {
					epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>Footnotes: </li></ul>";
					for (l=0; l<fns.length; l++) {
						var fn = fns[l];
						if (l==0) {
							epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>" + fn.substr(0, 1) + ".</li><li class='line'>" + fn.substr(2) + "</li></ul>";
						} else if (l>0) {
							epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>" + fn.substr(0, 1) + ".</li><li class='line'>" + fn.substr(2) + "</li></ul>";
						}
					}
				}
				if (glossANs) {
					epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'><br></li><li class='line'><br></li></ul>";
					epistList += "<ul class='faisneisgluaiseanna'><li class='faisneis'>Site Notes:</li><li class='line'>" + glossANs + "</li></ul>";
				}
				epistList += "<ul class='faisneisfocail'><li class='faisneis'></li><li class='toktitle'><br></li><li class='toktitle'><br></li><li class='toktitle'><br></li></ul>";
				epistList += "<ul class='faisneisfocail'><li class='faisneis'></li><li class='toktitle'>Token</li><li class='toktitle'>Headword</li><li class='toktitle'>Part-of-speech</li></ul>";
				epistList += "<ul class='faisneisfocail'><li class='faisneis'></li><li class='toktitle'><br></li><li class='toktitle'><br></li><li class='toktitle'><br></li></ul>";
				for (l=0; l<tokens.length; l++) {
					var token = tokens[l];
					var tok_inst = token[0];
					var tok_head = token[2];
					var tok_pos = token[1];
					var tok_num = l + 1
					if (tok_pos == "<Latin>") {
						tok_inst = "<em>" + tok_inst + "</em>";
						tok_head = "";
						tok_pos = "<strong>*Latin word</strong>";
					} else if (tok_pos == "<Latin CCONJ>") {
						tok_inst = "<em>" + tok_inst + "</em>";
						tok_head = "";
						tok_pos = "<strong>*Latin word</strong>";
					} else if (tok_pos == "<unknown>") {
						tok_pos = "<strong>*missing POS</strong>";
					}
					if (tok_head == "<unknown>") {
						tok_head = "<strong>*missing headword</strong>";
					}
					epistList += "<ul class='faisneisfocail'><li class='faisneis'>" + tok_num + ".</li><li class='tok'>" + tok_inst + "</li><li class='head'>" + tok_head + "</li><li class='pos'>" + tok_pos + "</li></ul>";
				}
				epistList += "</div>";
			}
		}
	}
	if (glossList !== null) {
		glossList.innerHTML = epistList;
		attachEvents();
	}
}


// Insert date in footer and year in copyright claim
function upDate(){
	var footDate = document.getElementsByTagName('footer');
	var copyDate = document.getElementById('coipcheart');
	var copyDate_Eng = document.getElementById('coipcheart_Eng');
	const monthNames = ["January", "February", "March", "April",
		"May", "June", "July", "August", "September", "October",
		"November", "December"];
	var d = new Date();
	var thisDay = d.getDate();
	var thisMonth = monthNames[d.getMonth()];
	var thisYear = d.getFullYear();
	footDate[0].innerHTML = "<p>Adrian Doyle, <em>Würzburg Irish Glosses</em> (2018), &lt;www.wuerzburg.ie> [accessed " + thisDay + " " + thisMonth + " " + thisYear + "]</p>";
	if (copyDate !== null) {copyDate.innerHTML = "<p id=\"coipcheart\"><em>Cóipcheart © " + thisYear + " Ollscoil na hÉireann, Gaillimh</em></p>";}
	if (copyDate_Eng !== null) {copyDate_Eng.innerHTML = "<p id=\"coipcheart_Eng\"><em>Copyright © " + thisYear + " National University of Ireland, Galway</em></p>";}
}


// Allows toggling of gloss info box for each gloss
function attachEvents(){
	let outerUL = document.querySelectorAll('.gluaiseannabileoige')

	function handleClick() {
    	this.classList.toggle('open');
	}

	outerUL.forEach(ul => {
    	ul.addEventListener('click', handleClick);
	})
}


// Call all functions
function callFuncs(){
	processJSON();
	upDate();
}
window.onload = callFuncs
