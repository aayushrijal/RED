var table_name="TABLE1";
var bat;
var eXit=0;
var sheetType="history";
$(".headerIcon").click(function(){
		$("#wholeBody").toggleClass("section1");
		});
$(".crossicon").click(function(){
		$("#wholeBody").removeClass("section1");
		});
$('#container').hide();
$(function(){
$.ajax({
        url: "list_tables.php",
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
});

function sheetClick(e){
	alert("Im here");
	table_name=e.target.id;
	switch(sheetType){
	case 'marksheet':				
	$.ajax({	url:"marksheet_for_javascript.php",
			data:{'student_name':table_name},	
                	dataType: 'json',
         		type: 'POST',
			complete: function (studentList) {
						$.getScript("js/marksheet.js");
						$("#internalFirst").load("internalFirst.html");	
						$("#firstPage").hide();
						setTimeout(function(){
						handsontable.loadData(markSheet);
							},100);
							}
                			  });
        break;
	case 'studentlist':
	$.ajax({	url: "list_student_names.php",
				data:{'selected_table':table_name},	
                 		dataType: 'json',
                    		type: 'POST',
				complete: function (studentList) {
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
	$("#internalFirst").load("internalFirst.html");
	setTimeout(function(){
	$("#firstPage").hide();
	$.ajax({	url: "display_table.php",
			data:{'table_name':table_name},	
                 	dataType: 'json',
                    	type: 'POST',
			complete: function (res) {
						bat=res;
						handsontable.loadData(res.responseJSON.data);
						plotted(res.responseJSON);
						}
                	});
	},10);
	break;	
	default:
	alert("Crap");
	}
};
