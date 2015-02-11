<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->pageTitle("Dukke Partiet - Mød kandidaterne");


// list
if(count($action) > 0) {

	$page->page(array(
		"body_class" => "event",
		"templates" => "pages/event.php"
	));
	exit();

}

$page->page(array(
	"body_class" => "events",
	"templates" => "pages/events.php"
));
exit();

?>
