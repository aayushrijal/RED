<?php
include('lib/database.init.php');
/*for the first entry

*/
//      $data = $_POST["sign_in_sign_up"];               // will determine if signin is called or signup is called


        if( $_POST["user_name"]){                          // for the sign up in the database;
                $user_name = $_POST["user_name"];
                $user_password = $_POST["user_password"];
                $user_email = $_POST["user_email"];

                $conn = mysql_connect($DB_host, $DB_user,$DB_password);
                mysql_select_db($DB_name);

                        $sql = "INSERT INTO user_table ".
                                "(user,password,email)".
                                "VALUES ('$user_name','$user_password','$user_email');";
                        $retval = mysql_query($sql,$conn);

                        if( ! $retval ){
                                die("ERROR: ".mysql_error());
                        }else{
                                echo "SUCCESSFULLY SIGNED UP";
                        }
        }else{
		echo "no data received";
	}


