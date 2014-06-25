function plotted(dat){
	var dataToPlot = new Array();
	for(i=1, l=dat.data.length; i<l-1; i++ ){
		var obj = {},
		temp = dat["data"][i];
		obj["name"] = temp[0];
		obj["data"] = temp.slice(1);
		for(j=0;j<obj.data.length;j++){
			obj.data[j] = Number(obj.data[j]);
			}
		dataToPlot.push(obj);
	}
var dataCategories=dat.data[0];
dataCategories=dataCategories.slice(1,dataCategories.length);
$('#container').show();
$('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Marks Attained'
            },
            subtitle: {
                text: 'RED'
            },
            xAxis: {
                categories: dataCategories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Marks'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series:dataToPlot
        });
}

