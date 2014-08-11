<?php
	if($_POST['data']){
                $dataa= $_POST['data'];
                echo "data present";
		$tb = $_POST['table_name'];
		echo "$tb";
		var_dump($dataa);
	}else{
                echo "error";
	}
	                  
