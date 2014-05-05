<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();


$page->bodyClass("declaration");
$page->pageTitle("Dukke Partiet - Vælgererklæring");


// list
if(count($action) > 0) {

	if($action[0] == "signature") {

		$page->header();
		$page->template("declaration/signature.php");
		$page->footer();
		exit();

	}
	else if($action[0] == "preview") {

		$page->header();
		$page->template("declaration/preview.php");
		$page->footer();
		exit();

	}
	else if($action[0] == "save") {

		$page->header();
		$page->template("declaration/save.php");
		$page->footer();
		exit();

	}
	else if($action[0] == "receipt") {

		$page->header();
		$page->template("declaration/receipt.php");
		$page->footer();
		exit();

	}
	else if($action[0] == "print") {

		$page->template("declaration/print.php");
		exit();
	}

}

$page->header();
$page->template("declaration/start.php");
$page->footer();

?>