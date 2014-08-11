<?php
	$target_path = "uploads/";
	$target_path = $target_path . basename( $_FILES['uploadedfile']['name']); 
	
	$allowed = array('txt','csv','json');  			//remove the txt version of the file 
	$filename = $_FILES['uploadedfile']['name'];
	$ext = pathinfo($filename, PATHINFO_EXTENSION);
		if( !in_array($ext,$allowed) ){
			echo 'Invalid type file';
		}else{
			if( move_uploaded_file($_FILES['uploadedfile']['tmp_name'],$target_path)){
				include('lib/database.init.php');
				$conn = mysql_connect($DB_host,$DB_user,$DB_password);
					if( !$conn){			//for invalid error in mysql
						die('Cannot connect mysql:'.mysql_error() );
					}
				mysql_select_db( $DB_name);				//POINT 1
				
/* shift the array to get the initals of the subjects and table name then counting the total element to enter to the database

*/
			$str_data = file_get_contents("uploads/$filename");
			$data = json_decode($str_data,true); 
				$heading_variables = array_shift($data);	//to get ["tablename","subject..........]
				$table_name = array_shift($heading_variables);	//the tablename of the entry in database is obtained and heading_varib											ales only contains the subjects now
				$subject_name = $heading_variables;
				$subject_count = count($heading_variables);	// subject is 1 less due to exisit of the table name
		//		echo $subject_count;
		//		echo $heading_variables["subject1"];
				$total_student = count($data); 		//will give the acutal no of student records
/* Insertion in the database from the json file
			
*/

			for($a = 0; $a < $total_student ;$a++){
				for($b=0; $b < $subject_count ; $b++){
					$c = $b + 1 ; 			//as indexed marks is always a index greater than the subject name
					$name = $data["data{$a}"][0];
					$subject = $subject_name["subject{$b}"];
					$marks = $data["data{$a}"][$c];
					$sql = "INSERT INTO project1".
				 		"(name,subject,marks,table_name) ".
						"values( '$name', '$subject' , $marks , '$table_name');";
					$retval = mysql_query($sql,$conn);
					if(!$retval)
						die( "ERROR: ".mysql_error());
					echo "successfull entry";
				}
			}
/*		TEST CODES FOR IMPLEMENTAION
			$a = 0;
				$b = 0;
				$c = $b +1;
				echo $data["data{$a}"][0];
				echo $subject_name["subject{$b}"];
				echo $data["data{$a}"][$c];
				echo $table_name;



	
				$i = 2;
				$j = 0;
				echo $data["data{$i}"]["$j"];
*/

			
	
		
			}else{
				echo "FILE UNABLE TO UPLOAD COMPLETELY";
			}
		}


