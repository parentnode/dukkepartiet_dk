<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("program");
$page->pageTitle("Dukke Partiet - Program");


$page->page(array(
	"templates" => "pages/program.php"
));
exit();

?>
