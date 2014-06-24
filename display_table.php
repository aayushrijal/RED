<?php
include('lib/database.init.php');
/*if($_POST['table_name']){		//will get the table name from the json file
	$table_name = $_POST['table_name'];
*/
	$table_name = "TABLE1"; //table2 is the name send by the user
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



/*
//make this function inline function


function check($name){		// $name = name obtained from sql query static $name_set = 0; //to see if name has been set
	global $array;
	global $array_index;
	global $temp_array;
	global $temp_array_index;
	if( '$array[$array_index][0]' == $name ){   //same as name
			;
	}else{						//not same name
		insert_name($name);
		return 1;
	}
	
}

/*Creating temporary ie new multi_indexed array



function insert_name($name){
	global $temp_array;
	global $array;
	global $name_inserted;
	$temp_array_index = 0;
	array_push($temp_array,$name);
	$name_inserted = 1; //to set that name has been inserted
}

*/	
	array_shift($array);
	$a = array("data"=>$array);
	$json_output = json_encode($a);
	echo $json_output;
?>

	
