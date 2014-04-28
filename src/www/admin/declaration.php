<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

// include the output class for output method support
include_once("class/system/output.class.php");

$action = $page->actions();
$output = new Output();


$page->bodyClass("declaration");
$page->pageTitle("Declarations");


if(is_array($action) && count($action)) {

	// LIST ITEM
	// Requires exactly two parameters /enable/#item_id#
	if(count($action) == 1 && $action[0] == "list") {

		$page->header(array("type" => "admin"));
		$page->template("admin/declaration/list.php");
		$page->footer(array("type" => "admin"));
		exit();

	}

	// DOWNLOAD ITEM
	else if(count($action) == 2 && $action[0] == "download") {
	

		$file = PUBLIC_FILE_PATH."/declarations/".$action[1];
		if(file_exists($file)) {
			header('Content-Description: File Transfer');
			header('Content-Type: application/octet-stream');
			header("Content-Type: application/force-download");
			header('Content-Disposition: attachment; filename=' . urlencode(basename($file)));
			header('Expires: 0');
			header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			header('Pragma: public');
			header('Content-Length: ' . filesize($file));
			ob_clean();
			flush();
			readfile($file);
		}

//		header("Location: /admin/declaration/list");
		exit();
	
	}

	// DELETE ITEM
	else if(count($action) == 2 && $action[0] == "delete") {
	

		$file = PUBLIC_FILE_PATH."/declarations/".$action[1];
		if(file_exists($file)) {
			unlink($file);
		}
		$output->screen(array("cms_status" => "success"));

//		header("Location: /admin/declaration/list");
		exit();
	
	}


}

$page->header();
$page->template("404.php");
$page->footer();

?>
