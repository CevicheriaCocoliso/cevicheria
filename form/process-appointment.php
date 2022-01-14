<?php

	$to = "";  // Your email here
	$name = $_REQUEST['name'];
	$lastname = $_REQUEST['lastname'];
	$phone = $_REQUEST['phone'];
	$from = $_REQUEST['email'];
	$date = $_REQUEST['date'];
	$time = $_REQUEST['time'];
	$autoinfo = $_REQUEST['autoinfo'];
  $kilometers = $_REQUEST['kilometers'];
	$select1 = $_REQUEST['select1'];
	$message = $_REQUEST['message'];
	$headers = "From: $from";
	$subject = "Appointment Form Car Repair Site";

	$fields = array();
	$fields{"name"} = "First name";
	$fields{"lastname"} = "Last Name";
	$fields{"phone"} = "Phone";
	$fields{"email"} = "Email";
	$fields{"date"} = "Date";
	$fields{"time"} = "Time";
	$fields{"autoinfo"} = "Auto Info";
	$fields{"select1"} = "Year";
  $fields{"kilometers"} = "Kilometers";
	$fields{"message"} = "Message";

	$body = "Here is what was sent:\n\n"; 
	foreach($fields as $a => $b){   
		$body .= sprintf("%20s:%s\n",$b,$_REQUEST[$a]);
	}
	$send = mail($to, $subject, $body, $headers);

?>