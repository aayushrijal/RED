function plotted(dat){
var a = new Array();
for(i=1, l=dat.data.length; i<l-1; i++ ){
	var 	obj = {},
		temp = dat["data"][i];
		console.log(l);
	
	obj["name"] = temp[0];
	obj["data"] = temp.slice(1, l);
	a.push(obj);
	console.log("dat is",JSON.stringify(dat), temp);
}
var datar=dat.data[0];
datar=datar.slice(1,datar.length);
console.log(datar);
$('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Marks Attained'
            },
            subtitle: {
                text: 'Source: Aces.com'
            },
            xAxis: {
                categories: datar
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
            series:a
        });
}

	$('#addC').click(function(){
		$container.handsontable({startCols:6});
	});


