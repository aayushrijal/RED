$(".newSheet").click(function(){
		$("#wholeBody").toggleClass("section1");
		});
$("#newSpreadSheet").click(function(){
	$("#internalFirst").load("spreadsheet.html");	
});
$("#button1").click(function(){
	table_name=$("#text1").val();
	$("#internalFirst").load("internalFirst.html");
});


