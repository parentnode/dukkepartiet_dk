<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();


$page->bodyClass("candidates");
$page->pageTitle("Dukke Partiet - Kandidaterne");

// list
if(!$action) {

	$page->header();
	$page->template("pages/candidates.php");
	$page->footer();

}
else {

	$page->header();
	$page->template("pages/candidate.php");
	$page->footer();

}

?>
