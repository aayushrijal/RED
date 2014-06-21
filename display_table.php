<?php
include('lib/database.init.php');
/*if($_POST['table_name']){		//will get the table name from the json file
	$table_name = $_POST['table_name'];
*/
	$table_name = "project1";
	$array = array();
	$temp_array = array();
	$array_index = 0; //initial index for the $array
	$temp_array_index = 0; //intial index for the $temp_array
/*database connection

*/
	$conn = mysql_connect($DB_host,$DB_user,$DB_password);
	if(!$conn)
		die("ERROR: ".mysql_error());
	mysql_select_db($DB_name);
	$sql = "SELECT * FROM $table_name;";
	$retval = mysql_query($sql,$conn);
		if(!$retval)
			die("ERROR: ".mysql_error());
	while($row=mysql_fetch_assoc($retval,MYSQL_ASSOC)){
		if( check($row['name']) == 0 ){
			$temp_array_index++;
		}else{  		//ie yes_no ==1;
			array_push($temp_array,$row['name']);
			$temp_array_index++;
		}
			$temp_array[$temp_array_index] = $row['marks'];
	}




/*make this function inline function*/
function check($name){		// $name = name obtained from sql query
	global $array;
	global $array_index;
	global $temp_array;
	global $temp_array_index;
	if( '$array[$array_index][0]' == $name ){
		return 1; //return true;
	}else{
		array_push($array,$temp_array);
		$temp_array_index = 0;
		$temp_array[$temp_array_index] = $name;
		$temp_array_index = 1;
		return 0;//return false;
	}
	
}

/*Creating temporary ie new multi_indexed array

*/

/*
function insert_name($name){
	global $temp_array;
	global $array;
	array_push($temp_array,$name);
	array_push($array,$temp_array);
}
*/
	var_dump($array);

	
