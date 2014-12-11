
var tableData=new Array();
var downPDF=function(){
	//if(this.html()=="downloadPDF"){
	dataToPrintFetch=handsontable.getData();
	dataToPrint=dataToPrintFetch.slice(1,(dataToPrintFetch.length-2));
	for(i=0;i<dataToPrint.length;i++){
		for(j=0;j<dataToPrint[0].length;j++){
			if(i==0&&j==0){
				dataToPrintArray="&data["+i+"]["+j+"]="+dataToPrint[i][j];		
			}else{
				dataToPrintArray+="&data["+i+"]["+j+"]="+dataToPrint[i][j];
			}		
		}};
	fullMarksAttained=dataToPrintFetch[dataToPrintFetch.length-2][4];
	fullMarks=dataToPrintFetch[dataToPrintFetch.length-2][2];
	window.location.href="download_marksheet.php?student_name="+table_name.slice(14)+dataToPrintArray+"&attained_marks="+fullMarksAttained+"&full_marks="+fullMarks;
		
	};
$("#signout").click(function(){
	localStorage.removeItem("userID");
	window.location.href="index.html";			
			});
$(".newSheet").click(function(){
		$("#wholeBody").addClass("section1");
		});
$("#newSpreadSheet").click(function(){
	$("#container").hide(1000);		
	$("#firstPage").hide();
	$("#internalFirst").show();
	$("#internalFirst").load("spreadsheet.html");	
});
$("#newGraph").click(function(){
	tableData=handsontable.getData();
	if(tableData[1]==null)
	{
	alert("Select a table first");
	}else{
	//tableData=handsontable.getData();
	$("#container").hide();		
	$("#firstPage").hide();
	//$egg=$.get("graphselect.html");
	//setTimeout(function(){
	$("#internalFirst").load("graphselect.html");
	}
});
$("#newMarkSheet").click(function(){
	$.ajax({
                url: "list_tables.php/?uid="+diresu,
				dataType: 'json',
                type: 'GET',
                success: function (daTable) {
			$("#internalFirst").hide();
			$("#ourteam").hide();
			$("#firstPage").show();
			$("#container").hide();
			$("#internalField").hide();
			$(".history").html("SELECT TABLE");
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
		alert(e,e.target.id);	
		sheetClick(e);
	});
$("#button1").click(function(){
	table_name=$("#text1").val();
	$("#internalFirst").children().remove();
	$("#internalField").show();		
	$("#tableName").html(table_name);
	handsontable.loadData([["Name","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5"],[],[],[]]);
});
$("#barButton").click(function(){
		//$("#tablename").remove();
		$("#internalFirst").children().remove();
		var chartName="column";
		$("#container").show();
		plotArea(chartName);	
	});
$("#areaButton").click(function(){
		//$("#tablename").remove();
		$("#internalFirst").children().remove();
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
$("#explore").click(function(){
	$("#internalFirst").hide();
	$("#ourteam").hide();
	$("#firstPage").show();
	$("#container").hide();
	$("#internalField").hide();	
	});
$("#ourTeam").click(function(){
	$("#container").hide();
	$("#internalField").hide();
	$("#firstPage").hide();
	$("#ourteam").toggle();
});
$("#downloadPdf").click(function(){
		window.location.href="download_marksheet.php?student_name="+table_name.slice(14)+dataToPrintArray+"&id="+diresu+"attained_marks="+fullMarksAttained+"&full_marks="+fullMarks;
});
