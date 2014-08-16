var table_name="TABLE1";
var bat;
var eXit=0;
var student_table="TABLE1";
var sheetType="history";
var diresu;
$(".headerIcon").click(function(){
		$("#wholeBody").toggleClass("section1");
		});
$(".crossicon").click(function(){
		$("#wholeBody").removeClass("section1");
		});
$('#container').hide();
$('#internalField').hide();
var dataObtained;

$(function(){
if(localStorage.getItem("userID")==undefined){
	window.location.href="index.html";
}else{
 diresu=localStorage.getItem("userID");	
}
$.ajax({
        url: "list_tables.php/?uid=1",
	dataType: 'json',
        type: 'GET',
        success: function (daTable) {
			for(i=0;i<daTable.table_list.length;i++){
				$("#historyContent").append('<button class="sheetlist" id="'+daTable.table_list[i]+'"><img src="icons/sheets.png" width="100" height="100"><label>'+daTable.table_list[i]+'</label></button>');
							}			
			$(".sheetlist").click(function(e){	
				sheetClick(e);
			});
	}
       });
function sheetClick(e){
	eXit=e;
	table_name=e.target.id;
	if(table_name==""){
	table_name=e.target.parentElement.id;
	}
	switch(sheetType){
	case 'marksheet':				
	$.ajax({	url:"marksheet_for_javascript.php",
			data:{'student_name':table_name,
				'table_name':student_table,
				'uid':diresu	
					},	
                	dataType: 'json',
         		type: 'POST',
			complete: function (studentList) {
						dataObtained={
										data:studentList.responseJSON.student_marks	
						};
						markSheetDataFn();
						eXit=studentList;
						$("#firstPage").hide();
						$("#internalField").show();
						handsontable.loadData(markSheet);
						$(".button").html("Download PDF").attr({id:"downloadPDF"});
						$("#downloadPDF").click(function(){
						downPDF()
							});						
						}
                			  });
        break;
	case 'studentlist':
	$.ajax({	url: "list_student_names.php",
				data:{'selected_table':table_name,'uid':diresu},	
                 		dataType: 'json',
                    		type: 'POST',
				complete: function (studentList) {
						$(".history").html("SELECT STUDENT");
						student_table=table_name;
						sheetType="marksheet";
						$("#historyContent").children().remove();
						for(i=0;i<studentList.responseJSON.name_list.length;i++){
							$("#historyContent").append('<button class="sheetlist" id="'+studentList.responseJSON.name_list[i]+'"><img src="icons/sheets.png" width="100" height="100"><label>'+studentList.responseJSON.name_list[i]+'</label></button>');
											}
						$(".sheetlist").click(function(e){	
										sheetClick(e);
										});	
								}
                			  });
	break;
	case 'history':
	$("#internalField").show();
	$("#firstPage").hide();
	$.ajax({	url: "display_table.php",
			data:{'table_name':table_name,'uid':diresu},	
                 	dataType: 'json',
                    	type: 'POST',
			complete: function (res) {
						bat=res;
						handsontable.loadData(res.responseJSON.data);
						plotted(res.responseJSON);
						}
                	});
	break;	
	default:
	alert("Crap");
	}
};
});
