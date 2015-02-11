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
if(count($action) > 0) {

	$page->page(array(
		"body_class" => "candidate",
		"templates" => "pages/candidate.php"
	));
	exit();

}

$page->page(array(
	"body_class" => "candidates",
	"templates" => "pages/candidates.php"
));
exit();

?>
