<?php
/* Lists the names of the students for generation of their marksheets
	The input is the table name from which this file lists the students names.
*/

/*assumed data
$selected_table = "table2"; //this data is from the selected table by the user
$name = "Sam"; //this data got from the selection by user
$selected_table = "SLC"; //this data is from the selected table by the user
*/
		
	if( $_POST["selected_table"]){
		$selected_table = $_POST["selected_table"];
	}else{
		echo "no data";
	}


//actual codes
        include("lib/database.init.php");
        $name_list = array();
        $conn = mysql_connect($DB_host,$DB_user,$DB_password);
        if( !$conn )
                die("ERROR :".mysql_error());
        mysql_select_db($DB_name);
        $sql = "SELECT DISTINCT name FROM project1 where table_name= '$selected_table';"; //better if used the variables instead of the default values
        $retval = mysql_query($sql,$conn);
                if(!$retval)
                        die("ERROR :".mysql_error());
        while( $row = mysql_fetch_array($retval,MYSQL_ASSOC)){
                array_push($name_list,$row['name']);
        }
        $name_list = array("name_list"=>$name_list);
        $json_output = json_encode($name_list);
        echo $json_output;
