<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();


$page->bodyClass("doktrinen");
$page->pageTitle("Dukke Partiet - Doktrinen");

// list
if(!$action) {

	$page->header();
	$page->template("pages/doktrinen.php");
	$page->footer();

}
else {

	$page->header();
	$page->template("pages/404.php");
	$page->footer();

}

?>
