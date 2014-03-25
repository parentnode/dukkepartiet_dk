<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();
$IC = new Item();
$itemtype = "candidate";


$page->bodyClass("candidates");
$page->pageTitle("Dukke Partiet - Kandidaterne");

// list
if(!$action) {

	$page->bodyClass("candidates");

	$page->header();
	$page->template("pages/candidates.php");
	$page->footer();

}
else {

	$page->bodyClass("candidate");

	$page->header();
	$page->template("pages/candidate.php");
	$page->footer();

}

?>
