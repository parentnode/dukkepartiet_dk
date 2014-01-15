<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();


$page->bodyClass("error");
$page->pageTitle("Dukke Partiet - 404");


$page->header();
$page->template("pages/404.php");
$page->footer();

?>