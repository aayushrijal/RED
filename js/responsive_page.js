var tableData=new Array();
var $egg;
$(".newSheet").click(function(){
		$("#wholeBody").toggleClass("section1");
		});
$("#newSpreadSheet").click(function(){
	$("#container").hide(1000);		
	$("#firstPage").hide();
	$("#internalFirst").load("spreadsheet.html");	
});
$("#newGraph").click(function(){
	//tableData=handsontable.getData();
	$("#container").hide();		
	//$("#firstPage").hide();
	$egg=$.get("graphselect.html");
	setTimeout(function(){
	$("#internalFirst").prepend($egg.responseText);
	},100);
});
$("#newMarkSheet").click(function(){
	$.ajax({
                url: "list_tables.php",
		dataType: 'json',
                type: 'GET',
                success: function (daTable) {
			$("#historyContent").children().remove();
			for(i=0;i<daTable.table_list.length;i++){
				$("#historyContent").append('<button class="sheetlist" id="'+daTable.table_list[i]+'"><img src="icons/sheets.png" width="100" height="100"><label>'+daTable.table_list[i]+'</label></button>');
							}
			sheetType="studentlist";
			$(".sheetlist").click(function(e){	
							sheetClick(e);
							});	

			}
	});
});
$(".sheetlist").click(function(e){	
		sheetClick(e);
	});
	/*$("#internalFirst").load("internalFirst.html");	
	$.getScript("js/marksheet.js");
	$("#firstPage").hide();
	for(i=0;i<1000;i++);
	setTimeout(function(){
		handsontable.loadData(markSheet);
	},30);*/
	//});
$("#button1").click(function(){
	table_name=$("#text1").val();
	$("#internalFirst").load("internalFirst.html");
	setTimeout(function(){	
	handsontable.loadData([["Name","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5"],[],[],[],[],[" "]]);
	},10);
});
$("#barButton").click(function(){
		$("#tablename").remove();
		var chartName="column";
		$("#container").show();
		plotArea(chartName);	
	});
$("#areaButton").click(function(){
		$("#tablename").remove();
		var chartName="area";
		$("#container").show();
		plotArea(chartName);	
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
			data: {"data": dataToPrint,"table_name":table_name,"attained_marks":fullMarksAttained,"full_marks":fullMarks},
			complete:function(bot){
				$(document).html(bot.responseText);					
				}
		});
	});
