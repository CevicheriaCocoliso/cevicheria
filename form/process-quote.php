<?php

	$to = "";  // Your email here
	$name = $_REQUEST['name'];
	$phone = $_REQUEST['phone'];
	$from = $_REQUEST['email'];
	$select1 = $_REQUEST['select1'];
  $select2 = $_REQUEST['select2'];
  $select3 = $_REQUEST['select3'];
	$message = $_REQUEST['message'];
	$headers = "From: $from";
	$subject = "Quote Form Car Repair Site";

	$fields = array();
	$fields{"name"} = "First name";
	$fields{"phone"} = "Phone";
	$fields{"email"} = "Email";
	$fields{"select1"} = "Vehicle";
  $fields{"select2"} = "Year";
  $fields{"select3"} = "Service";
	$fields{"message"} = "Message";

	$body = "Here is what was sent:\n\n"; 
	foreach($fields as $a => $b){   
		$body .= sprintf("%20s:%s\n",$b,$_REQUEST[$a]);
	}
	$send = mail($to, $subject, $body, $headers);

?>