$(".newSheet").click(function(){
		$("#wholeBody").toggleClass("section1");
		});
$("#newSpreadSheet").click(function(){
	$("#firstPage").hide();
	$("#internalFirst").load("spreadsheet.html");	
});
$("#newGraph").click(function(){
	plotArea();
});
$("#newMarkSheet").click(function(){
	$("#internalFirst").load("internalFirst.html");	
	$.getScript("js/marksheet.js");
	$("#firstPage").hide();
	for(i=0;i<1000;i++);
	setTimeout(function(){
		handsontable.loadData(markSheet);
	},20);
	});
$("#button1").click(function(){
	table_name=$("#text1").val();
	$("#internalFirst").load("internalFirst.html");
	setTimeout(function(){	
	handsontable.loadData([["Name","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5"],[],[],[],[],[" "]]);
	},5);
});
$(".icon").click(function(){
	$("#wholeBody").removeClass("section1");
	});
$("#import").click(function(){
	$("#firstPage").hide();
	$("#internalFirst").load("import.html");	
});
$("#downloadPdf").click(function(){
		$.ajax({
			url: "download_marksheet.php",
			dataType: 'json',
                    	type: 'POST',
			data: {"data": dataToPrint,"table_name":table_name,"full_marks":fullMarksAttained}
		});
	});
