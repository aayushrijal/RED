var dataObtained={
	data:[["name","English","Nepali","Social"],["Ram","80","72","60"]]
};
var failFlag=0;		
var markSheet=new Array();
var numberOfSubjects=dataObtained.data[0].length;
	for(i=1;i<numberOfSubjects;i++){
	markSheet[i-1]=[i,dataObtained.data[0][i],100,32,dataObtained.data[1][i]];
	if(markSheet[i-1][4]<32){
				markmarkSheet[i-1][4]+='*';
				failFlag=1;
		}	
	}
var totalObtained="Failed";
if(failFlag!=1){
	totalObtained=0;
	for(i=1;i<numberOfSubjects;i++){totalObtained+=Number(dataObtained.data[1][i])};
}
markSheet[numberOfSubjects-1]=[" "," ",(100*(numberOfSubjects-1))," ",totalObtained];
