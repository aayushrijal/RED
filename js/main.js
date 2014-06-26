var table_name="TABLE1";
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
				table_name=e.target.id;
				$("#internalFirst").load("internalFirst.html");
				$("#firstPage").hide();
				alert("RED \n \n \tYour table "+table_name+" has been loaded!");
				$.ajax({	url: "display_table.php",
						data:{'table_name':table_name},	
                    		 	 	dataType: 'json',
                    				type: 'POST',
                    				success: function (res) {
							handsontable.loadData(res.data);
							plotted(res);
							console.log(res,"Data loaded");                  
                    					}
                			  });
               			 });
				}
		   
                  });
			
	});

