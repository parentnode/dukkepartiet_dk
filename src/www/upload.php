<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();

$slug = "dukkepartiet";
session()->value("slug", $slug);

// include slug data
//@include("config/data-".$slug.".php");


$page->bodyClass("declaration");
$page->pageTitle("Vælgererklæring");



// Received POST data
if(count($action) == 1 && $action[0] == "send") {

	if($_SERVER["REQUEST_METHOD"] == "POST") {

		$fs = new FileSystem();
		$fs->makeDirRecursively(PUBLIC_FILE_PATH."/declaration_uploads");

//		$slug = getPost("slug");
		$upload_file = $_FILES["declaration"];

		$temp_file = $_FILES["declaration"]["tmp_name"];
		$temp_type = $_FILES["declaration"]["type"];
		print $temp_type."<br>";
		if(preg_match("/jpeg|png|pdf|gif/", $temp_type)) {
			

			$temp_extension = mimetypeToExtension($temp_type);

			$declaration_file = PUBLIC_FILE_PATH."/declaration_uploads/".time().".".$temp_extension;

			copy($temp_file, $declaration_file);


			// $page->mail(array(
			// 	"recipients" => $slug_email,
			// 	"subject" => "GODKENT VÆLGERERKLÆRING",
			// 	"message" => "Godkendt vælgererklæring fra ".SITE_URL,
			// 	"attachments" => $declaration_file
			// ));
			//
			// unlink($declaration_file);
			// redirect to clear POST state
			
			header("Location: /upload/receipt");
			exit();

		}
		else {
			message()->addMessage("Ugyldigt format. Vælgererklæringen kan uploades som .jpg, .png og .pdf", array("type" => "error"));
		}

	}

	// redirect to clear POST state
	header("Location: /upload/error");
	exit();

}
// error
else if(count($action) == 1 && $action[0] == "error") {

	$page->page(array(
		"templates" => "upload/error.php"
	));
	exit();

}
// receipt
else if(count($action) == 1 && $action[0] == "receipt") {

	$page->page(array(
		"templates" => "upload/receipt.php"
	));
	exit();

}


// back to personal data form (with slug already set)
$page->page(array(
	"templates" => "upload/start.php"
));

exit();


?>