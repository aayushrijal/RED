<?php
	include("lib/database.init.php");
	$conn = mysql_connect($DB_host,$DB_user,$DB_password);
	if( !$conn )
		die("ERROR :".mysql_error());
	mysql_select_db($DB_name);
	$sql = "SELECT DISTINCT table_name FROM project1;";
	$retval = mysql_query($sql,$conn);
		if(!$retval)
			die("ERROR :".mysql_error());
	while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
		echo $row['table_name'];
	}
	
	
	
