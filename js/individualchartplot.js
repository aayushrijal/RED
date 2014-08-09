function plotArea(){
	dat=handsontable.getData();
	var dataToPlot = new Array();
	for(i=1, l=dat.length; i<l-1; i++ ){
		var obj = {},
		temp = dat[i];
		obj["name"] = temp[0];
		obj["data"] = temp.slice(1);
		for(j=0;j<obj.data.length;j++){
			obj.data[j] = Number(obj.data[j]);
			}
		dataToPlot.push(obj);
	}
var dataCategories=dat[0];
dataCategories=dataCategories.slice(1,dataCategories.length);
	$('#container').highcharts({
            chart: {
                type: 'area',
                spacingBottom: 30
            },
            title: {
                text: table_name
            },
            subtitle: {
                text: '* Area plot to show Information',
                floating: true,
                align: 'right',
                verticalAlign: 'bottom',
                y: 15
            },
            legend: {
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'top',
                x: 0,
                y: 0,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: dataCategories
            },
            yAxis: {
                title: {
                    text: 'Y-Axis'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    this.x +': '+ this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
            credits: {
                enabled: false
            },
            series: dataToPlot
        });
}
