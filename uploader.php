<?php
		$table_name = "table1"; //this is got from the post method from the json file.
		if( $_POST['data']){
		$x = $_POST['data'];
		$field = array_shift($x); //extracts the fields of the column
//			print_r($x);  // test
			$count = count($x);
		//	echo $count;   //test
		include("lib/database.init.php");
//		echo $DB_host;  //test line
			$conn = mysql_connect($DB_host,$DB_user,$DB_password);
				if( !$conn){
					die("cannot connect to database: ".mysql_error());
					}
			mysql_select_db("database_1");


			foreach($x as $y){
//				echo "hi";  //test
				$i = 0;
				foreach($field as $f){
					if( $i != 0 ) {
						$sql = "INSERT INTO project1".
							"(name,subject,marks,table_name)".
							"values('{$y[0]}','{$f}',{$y[$i]},'{$table_name}')";
					//		echo $f[$i];//test
						
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
	


		if( $_POST['data2']){
			$data2 = $_POST['data2'];
			echo $data2;
			}else{
				echo "NO ANOTHER DATA";
		}
	
		
	
