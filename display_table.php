<?php
include('lib/database.init.php');

	if( $_POST["table_name"] )
	$table_name = $_POST["table_name"]; //table_name is the name send by the user to load that file
	else
	echo "ERROR";

	$array = array();
	$temp_array = array();
	$array_index = 0; //initial index for the $array
	$temp_array_index = 0; //intial index for the $temp_array
	$temp_array[$temp_array_index] = NULL;

//database connection


	$conn = mysql_connect($DB_host,$DB_user,$DB_password);
	if(!$conn)
		die("ERROR: ".mysql_error());
	mysql_select_db($DB_name);
	$sql = "SELECT * FROM project1 where table_name = '{$table_name}';";
	$retval = mysql_query($sql,$conn);
		if(!$retval)
			die("ERROR: ".mysql_error());
	
	while($row = mysql_fetch_assoc($retval,MYSQL_ASSOC)){
		if( $row['name'] == $temp_array[0]){
			$temp_array_index++;
			$temp_array[$temp_array_index] = $row['marks'];
		}else{
			if(empty($temp_array) ){
			$temp_array_index = 0;
			$temp_array[$temp_array_index] = $row['name'];
			$temp_array_index++;
			$temp_array[$temp_array_index] = $row['marks'];
			}else{
				array_push($array,$temp_array);
				$temp_array_index = 0;
				$temp_array[$temp_array_index] = $row['name'];
				$temp_array_index++;
				$temp_array[$temp_array_index] = $row['marks'];
			}
		}	
	}
			array_push($array,$temp_array);
			
/*for the names of the field

*/
	$fields = array();		//for the extraction of the fields (doesn't include the first column field,assuming it as name always)
	array_push($fields,"name");	//this is our system's standard 
	$retval = mysql_query($sql,$conn);
	if(!$retval)
		die("ERROR :".mysql_error());
	while($row = mysql_fetch_assoc($retval,MYSQL_ASSOC)){
		if( in_array($row['subject'],$fields)){		//if exists loop terminates
			break;
		}else{
			array_push($fields,$row['subject']);
		}
	}
	
/* now $array is reversed and $fields is pushed ie. the fields are at the last
	again $array is reversed so that $fields are in first

*/




	
	array_shift($array);		//removes the null array of the first
	if( !empty($array))		//if there is no data in $array don't even put the column names
	array_unshift($array,$fields);



	$a = array("data"=>$array);
	header('Content-Type:application/json');	
	$json_output = json_encode($a);
		
	echo $json_output;
	



?>

	
