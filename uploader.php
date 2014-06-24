<?php


$table_name = $_POST['table_name'];
// 	echo $table_name; //test line to display table name from the json file.


if( $_POST['data']){
	$x = $_POST['data'];
	$field = array_shift($x); //extracts the fields of the column
	$count_fields = count($field);
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
				$check = check_entry($y[0],$f);  //to check if there is entry already existed.	
				if( $check == 0){ 	// new entry
					echo "insert called";
					if( $i != 0 ){
						$sql = "INSERT INTO project1".
							"(name,subject,marks,table_name) ".
							"values('{$y[0]}','{$f}',{$y[$i]},'{$table_name}')";
						if(isset($y[0]) && !empty($y[0])){
							$retval =  mysql_query($sql,$conn);
							if(!$retval)
							die("cannot upload data: ".mysql_error());
							else
							echo "successfully inserted\n";
						}
					}
				}else{
				echo  "update called\n";
//	$sql = "UPDATE project1 SET `{$f[2]}`=\"{$y[2]}\" WHERE name=\"{[$y[0]}\" AND subject=\"{$y[1]}\"" ;deepak ko code		
//update entry
							$sql = "UPDATE project1 SET marks = {$y[$i]} WHERE name = \"{$y[0]}\" AND subject = \"$f\";";
							$retval =  mysql_query($sql,$conn);
							if(!$retval)
							die("cannot upload data: ".mysql_error());
							else
							echo " successfully updated\n";
				}
				$i++;
			}
		}

}else{
	echo "no data";
}
	


function check_entry($name,$subject){
	global $conn;
	include('lib/database.init.php');
	$conn = mysql_connect($DB_host,$DB_user,$DB_password);
	mysql_select_db("database_1");
	$sql = "SELECT COUNT(*) as cnt FROM project1 ".
		"where name = \"{$name}\" AND subject = \"{$subject}\";";
	$retval = mysql_query($sql,$conn);
		if(!$retval)
			die("ERROR :".mysql_error());
	while($row = mysql_fetch_array($retval,MYSQL_ASSOC))
	$cnt = $row['cnt'];
	echo $cnt;
	return $cnt;
}
	














/*table_name from json file


	

		if( $_POST['table_name']){
			$data2 = $_POST['table_name'];
			echo $data2;
		}else{
				echo "NO ANOTHER DATA";
		}
*/
