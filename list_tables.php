<?php
	include("lib/database.init.php");
	$list_of_table = array();
	$conn = mysql_connect($DB_host,$DB_user,$DB_password);
	if( !$conn )
		die("ERROR :".mysql_error());
	mysql_select_db($DB_name);
	$sql = "SELECT DISTINCT table_name FROM project1;"; //better if used the variables instead of the default values
	$retval = mysql_query($sql,$conn);
		if(!$retval)
			die("ERROR :".mysql_error());
	while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
		array_push($list_of_table,$row['table_name']);
	}
	$list_of_table = array("table_list"=>$list_of_table);
	$json_output = json_encode($list_of_table);
	echo $json_output;
	
	
	
