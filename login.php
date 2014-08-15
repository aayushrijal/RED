<?php
	include('lib/database.init.php');
//	$data = $_POST["sign_in_sign_up"];		// will determine if signin is called or signup is called
	
		
/* for the sign up of in the system 
	on success the id is assigned to the user and send to javascript 
*/
	if( $_POST["user_name"]){	
		$user_name = $_POST["user_name"];
		$user_password = $_POST["user_password"];
			
		$conn = mysql_connect($DB_host,$DB_user,$DB_password);
		mysql_select_db($DB_name);

			$sql = "SELECT id FROM user_table  where user='$user_name' and password='$user_password';";
			$retval = mysql_query($sql,$conn);
				if( ! $retval )
					die("ERROR: ".mysql_error());
			
		while(	$row = mysql_fetch_array($retval,MYSQL_ASSOC)){ // MYSQL_ASSOC returns array as associative array;
        		$uid = $row['id'];
			echo $uid;
		}
        	
	}else{
		echo "ERROR: INVALID USER_NAME OR PASSWORD.";
	}

?>
		


			
				
	                                                                                       
