<?php	


		// $data = data for print;
		// $attained marks = marks;
		// $full_marks = full marks;

include('downloaded_libraries/font/courier.php'); // for my local computer
include('downloaded_libraries/fpdf.php');  //for my local computer



	if($_GET["data"]){
                $result_array = $_GET["data"];
        //  var_dump($result_array);
		$tb = $_GET["student_name"];		// table_name
//		echo "$tb";
		$fm = $_GET["full_marks"];
	//	echo $fm;
		$obtained_mark = $_GET["attained_marks"];
	//	echo $obtained_mark;
	}else{
                echo "error";
	}
	                  

/* for the image*/
	$image = "kec.jpeg";


$name_of_student ="Kalimati  ,";              //assumend name
$title = "Kathmandu Engineering College";
$roll_no = "Kathmandu";
$cursor = 0 ; // for the cursor of the pdf file  0 = right, 1 = next line, 2 = below
$top_row = array("SN","Subject","FM","PM","Marks Obtained");


/* the actual pdf generation
        format Cell( width, height,txt,border,aftercall(cursor),allign,fill background,link);
*/

/*
	For the margin of the PDF file
*/	
	$sn_width = 5;
	$subject_width = 10;
	$fm_width = 5;
	$pm_width = 5;
	$mark_obtained_width = 10;


                $pdf = new FPDF(); //new object of FPDF class
                $pdf->AddPage();
                $pdf->AddFont('courier','IB','courier.php');
                $pdf->SetFont('courier','B',14);		// this is for the top components
			// setfont( font,"boldunderlined", ....)
		$pdf->SetFillColor("100",230,123);
               

		$pdf->Cell(40,40,$pdf->Image($image,$pdf->GetX(),$pdf->GetY(),33.78),0,1,'R',false); 		//for the image

		$pdf->Cell(0,10,$title,0,2,'C');  // For the title of the pdf
                $pdf->Cell(0,10,$name_of_student."   ".$roll_no,0,2,'C'); //name and roll of the student
			//name_of_student and $roll_no are error right now ie for address and kathmandu
		
		$pdf->SetFont('courier','B',10);	//for the name
		$pdf->Cell(0,10,"NAME : ".$tb,0,2,'L');		//test

                        foreach($top_row as $x){
                                $pdf->SetFont('courier','I',8);
                                $pdf->Cell(35,10,$x,1,$cursor,'C');
                        }
                                $cursor = 1; //for new line
                                $pdf->Cell(35,10,"",0,$cursor,'C');//for new line



                        foreach($result_array as $temp){
                                $pdf->SetFont('courier','I',8);
                                $cursor = 0; //go to the begining of the next line
				
                          $pdf->Cell(0.1,10,"",1,0,'C'); // for the border
				 
				foreach($temp as $x){
				$pdf->Cell(35,10,$x,1,$cursor,'C');		//data print of the student
                           
				 }

			 $pdf->Cell(0.1,10,"",1,0,'C');    //for the bo 
                                $cursor = 1; //for new line
                                $pdf->Cell(35,10,"",0,$cursor,'C');
                        }
			
		$pdf->Cell(50,10,"Marks Obtained: ".$obtained_mark,0,1,'C');
		$pdf->Cell(50,10,"Percentage Obtained: ".($obtained_mark/$fm)*100,0,1,'C');
			$percent =( $obtained_mark/$fm )* 100;
			if($percent>80){
				$pdf->Cell(50,10,"Division: DISTINCTION",0,1,'C');
			}else if($percent>60 && $percent<80){
				$pdf->Cell(50,10,"Divison: FIRST",0,1,'C');
			}else{
				$pdf->Cell(50,10,"Divison: SECOND",0,1,'C');
			}
        $pdf->Output();

