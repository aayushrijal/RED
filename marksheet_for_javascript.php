<?php
/*this file sends the data to the javascript
 assumpsion make to send the [["name","English","Nepali","Social"],["Ram",80,72,60]] 	format to the javascript
 				the name in the first array is default
*/
	$student_name = "paul";
	$table_name = "table2";

/* array output to the javascript file

*/	
	$subject_list = array();		// ["name","subject1","subject2","subject3"] ie first array
	array_push($subject_list,"name");
	$marks_list = array();			// second array
	array_push($marks_list,$student_name);	// push the name of the student according to the format
	$output_array = array();	// [["name","subject1","subject2","subject3"],["RAM",80,30,53]]


/*database and program

*/
		
	include("lib/database.init.php");
	$db_handle = mysql_connect($DB_host,$DB_user,$DB_password);
        if( !$db_handle )
                die('Cannot connect to database'.mysql_error() );
		$db_select = mysql_select_db($DB_name,$db_handle);
        if( !$db_select)
                die('Cannot select database'.mysql_error() );
		
	$sql = "SELECT DISTINCT subject FROM project1 WHERE table_name = '$table_name';";
	$retval = mysql_query($sql,$db_handle);
		if(!$retval)
		die("ERROR: ".mysql_error());
	while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
		array_push($subject_list,$row['subject']);
	}	
		
	$sql = "SELECT DISTINCT marks FROM project1 WHERE table_name = '$table_name' and name = '$student_name';";
	$retval = mysql_query($sql,$db_handle);
		if(!$retval)
		die("ERROR: ".mysql_error());
	while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
		array_push($marks_list,$row['marks']);
	}
	
	array_push($output_array,$subject_list);
	array_push($output_array,$marks_list);
	
	$student_marks = array("student_marks"=> $output_array);
	$json_output = json_encode($student_marks);
	echo $json_output;
	
		
	
		
	
		
	

	
	
