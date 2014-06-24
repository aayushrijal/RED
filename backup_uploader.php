<?php


$table_name = $_POST['table_name'];
// 	echo $table_name; //test line to display table name from the json file.


if( $_POST['data']){
	$x = $_POST['data'];
	$field = array_shift($x); //extracts the fields of the column
	$count = count($x);
/*database connections

*/	
	include("lib/database.init.php");
	$conn = mysql_connect($DB_host,$DB_user,$DB_password);
	if( !$conn){
		die("cannot connect to database: ".mysql_error());
	}
	mysql_select_db("database_1");
		
/* entry in database

*/
		foreach($x as $y){
			$i = 0;
			foreach($field as $f){
					if( $i != 0 ){
					$sql = "INSERT INTO project1".
						"(name,subject,marks,table_name)".
						"values('{$y[0]}','{$f}',{$y[$i]},'{$table_name}')";
						$retval =  mysql_query($sql,$conn);
					if( !$retval)
					die("cannot upload data: ".mysql_error());
					else
					echo "successfull";
					}
				$i++;
			}
		}

}else{
	echo "no data";
}
	
/*table_name from json file


	

		if( $_POST['table_name']){
			$data2 = $_POST['table_name'];
			echo $data2;
		}else{
				echo "NO ANOTHER DATA";
		}
*/
