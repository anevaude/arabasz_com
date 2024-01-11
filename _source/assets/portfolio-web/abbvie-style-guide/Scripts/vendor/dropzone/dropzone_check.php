<?php
	$uploaddir = getcwd() . '/';
	$uploadfile = $uploaddir . basename($_FILES['file']['name']);
	if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
	  echo "File is valid, and was successfully uploaded.\n";
	}
?>