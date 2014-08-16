
var failFlag=0;		
var markSheet=new Array();
var markSheetDataFn=function(){
table_name="ReportCard of "+dataObtained.data[1][0];
$("#tableName").html(table_name);
markSheet[0]=["S.N.","Subject","Full Marks","Pass Marks","Marks Attained"];
var numberOfSubjects=dataObtained.data[0].length;
	for(i=1;i<numberOfSubjects;i++){
	markSheet[i]=[i,dataObtained.data[0][i],100,32,dataObtained.data[1][i]];
	if(Number(markSheet[i][4])<32){
				markSheet[i][4]+='*';
				failFlag=1;
		}	
	}
var totalObtained="Failed";
if(failFlag!=1){
	totalObtained=0;
	for(i=1;i<numberOfSubjects;i++){totalObtained+=Number(dataObtained.data[1][i])};
}
markSheet[numberOfSubjects]=[" "," ",(100*(numberOfSubjects-1))," ",totalObtained];
};
var dataToPrintFetch;
var dataToPrint=new Array();
var fullMarksAttained=0;
var fullMarks=0;
var dataToPrintArray;

