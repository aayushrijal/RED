		var greyRenderer = function (instance, td, row, col, prop, value, cellProperties) {
 	 	Handsontable.renderers.TextRenderer.apply(this, arguments);
  		$(td).css({
    		background: '#ccc'
  			});
		};	              
		 var $container = $("#example1");
                var $console = $("#example1console");
                var $parent = $container.parent();
                var autosaveNotification;
                $container.handsontable({
                  startRows: 10,
                  startCols: 4,		
                  rowHeaders: false,
                  colHeaders: false,
                  minSpareRows: 1,
                  contextMenu: true,
		cells: function (row, col, prop) {
	                if (row === 0) {
	                  this.renderer = greyRenderer;
		                }
	              },
                  afterChange: function (change, source) {
                    if (source === 'loadData') {
                      return; //don't save this change
                    }
                    if ($parent.find('input[name=autosave]').is(':checked')) {
                      clearTimeout(autosaveNotification);
			var arr={data:handsontable.getData()};
                 	plotted(arr);     
		$.ajax({
                        url: "json/save.json",
                        dataType: "json",
                        type: "POST",
                        data: change, //contains changed cells' data
                        complete: function (data) {
                          $console.text('Autosaved (' + change.length + ' ' +
                            'cell' + (change.length > 1 ? 's' : '') + ')');
                          autosaveNotification = setTimeout(function () {
                            $console.text('Changes will be autosaved');
                          }, 1000);
                        }
                      });
                    }
                  }
                });
                var handsontable = $container.data('handsontable');

                $parent.find('button[name=load]').click(function () {
                  $.ajax({
                    url: "json/load.json",
                    dataType: 'json',
                    type: 'GET',
                    success: function (res) {
			//var arr=res;
			//$container.handsontable({colHeaders:res.data[0]});
			//var dat=res.data.splice(0,1);
			//dat=$.merge(dat,res.data);
			handsontable.loadData(res.data);
			plotted(res);                    
			$console.text('Data loaded');
			
                    }
                  });
                });

                $parent.find('button[name=save]').click(function () {
                  $.ajax({
                    url: "json/save.json",
                    data: {"data": handsontable.getData()}, //returns all cells' data
                    dataType: 'json',
                    type: 'POST',
                    success: function (res) {
                      if (res.result === 'ok') {
                        $console.text('Data saved');
                      }
                      else {
                        $console.text('Save error');
                      }
                    },
                    error: function () {
                      $console.text('Save error. POST method is not allowed on GitHub Pages. ' +
                        'Run this example on your own server to see the success message.');
                    }
                  });
                });

                $parent.find('input[name=autosave]').click(function () {
                  if ($(this).is(':checked')) {
                    $console.text('Changes will be autosaved');
                  }
                  else {
                    $console.text('Changes will not be autosaved');
                  }
                });
$(".headerIcon").click(function(){
$('#sideBar').toggle();
});
$(".crossicon").click(function(){
$('#sideBar').hide();
});
$('#container').hide();

