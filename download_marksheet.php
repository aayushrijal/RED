<?php

include('/var/www/downloaded_libraries/font/courier.php'); // for my local computer
include('/var/www/downloaded_libraries/fpdf.php');  //for my local computer



	if($_POST["data"]){
                $result_array = $_POST["data"];
        //  var_dump($result_array);
		$tb = $_POST["table_name"];
	//	echo "$tb";
		$fm = $_POST["full_marks"];
	//	echo $fm;
		$obtained_mark = $_POST["attained_marks"];
	//	echo $obtained_mark;
	}else{
                echo "error";
	}
	                  




$name_of_student = "STUDENT_NAME";              //assumend name
$title = "ORGANIZATION NAME";
$roll_no = "4525";
$cursor = 0 ; // for the cursor of the pdf file  0 = right, 1 = next line, 2 = below
$top_row = array("SN","Subject","FM","PM","Marks Obtained");


/* the actual pdf generation
        format Cell( width, height,txt,border,aftercall(cursor),allign,fill background,link);
*/
                $pdf = new FPDF(); //new object of FPDF class
                $pdf->AddPage();
                $pdf->AddFont('courier','IB','courier.php');
                $pdf->SetFont('courier','BU',14);
                $pdf->Cell(0,10,$title,0,2,'C');  // For the title of the pdf
                $pdf->Cell(0,10,$name_of_student."   ".$roll_no,0,2,'C'); //name and roll of the student


                        foreach($top_row as $x){
                                $pdf->SetFont('courier','I',8);
                                $pdf->Cell(35,10,$x,1,$cursor,'C');
                        }
                                $cursor = 1; //for new line
                                $pdf->Cell(35,10,"",0,$cursor,'C');//for new line

                        foreach($result_array as $temp){
                                $pdf->SetFont('courier','I',8);
                                $cursor = 0; //go to the begining of the next line
                                foreach($temp as $x){
                                $pdf->Cell(35,10,$x,0,$cursor,'C');
                                }
                                $cursor = 1; //for new line
                                $pdf->Cell(35,10,"",0,$cursor,'C');
                        }
        $pdf->Output();


