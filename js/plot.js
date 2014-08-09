var alphatest1 = new Array();
var alphatest2 = new Array();

function plotted(dat){
	alphatest1=dat;
	var dataToPlot = new Array();
	var splineDataFetch =new Array();
	var pieData={
		data:[],
		type:'pie',
		name:/*table_name*/"Total Marks Attained",
		center: [100, 80],
                size: 100,
      	      showInLegend: false,
            dataLabels: {
                enabled: false
            }
		};
	for(i=1, l=dat.data.length; i<l-1; i++ ){
		var obj = {};
		var pieDataFetch=0;
		temp = dat["data"][i];
		obj["name"] = temp[0];
		if(temp[0]!=undefined)
		obj["type"] ="column";
		obj["data"] = temp.slice(1);
		for(j=0;j<obj.data.length;j++){
			obj.data[j] = Number(obj.data[j]);
			if(i>1){
					splineDataFetch[j]+=obj.data[j];
				}else{
					splineDataFetch[j]=obj.data[j];
					}
			if(pieDataFetch!=0){
					pieDataFetch+=obj.data[j];
					}else{
					pieDataFetch=obj.data[j];
					}
				}
			pieData.data.push({	
						name:temp[0],
						y:pieDataFetch,
						/*color:Highcharts.getOptions().colors[i]*/
						});
		alphatest2=pieData;
		dataToPlot.push(obj);
		console.log(splineDataFetch);
	}
	splineDataFetch.forEach(function(part,index,theArray){
			console.log(theArray[index],"has items ",(l-2));
			theArray[index]/=(l-2);
			console.log(theArray[index]);
			});		
	dataToPlot.push(pieData);
	dataToPlot.push({
		type:'spline',
		name:'average',
		data:splineDataFetch,
		marker: {
            	lineWidth: 2,
            	lineColor: Highcharts.getOptions().colors[3],
            	fillColor: 'white'
            	}
	});
var dataCategories=dat.data[0];
dataCategories=dataCategories.slice(1,dataCategories.length);
$('#container').show();
$('#container').highcharts({
            title: {
            text: table_name
        },
        xAxis: {
            categories: dataCategories
        },
        labels: {
            items: [{
                html: table_name,
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series:dataToPlot
	 });
}
