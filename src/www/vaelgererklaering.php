<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();


$page->bodyClass("om_os");
$page->pageTitle("Dukke Partiet - Vælgererklæring");


$page->header();
?>

<div class="scene">

	<form name="declaration" action="vaelgererklaering_preview.php" method="post">
		<fieldset>

			<div class="field string">
				<label>Navn</label>
				<input type="text" name="name" value="Martin Nielsen">
			</div>

			<div class="field string">
				<label>Adresse 1</label>
				<input type="text" name="address1" value="En vej et sted i danmark">
			</div>

			<div class="field string">
				<label>Adresse 2</label>
				<input type="text" name="address2" value="Et sted i provinsen">
			</div>

			<div class="field string">
				<label>Postnummer</label>
				<input type="text" name="postal" value="1234">
			</div>

			<div class="field string">
				<label>By</label>
				<input type="text" name="city" value="Provinsby">
			</div>

			<div class="field string">
				<label>Kommune</label>
				<input type="text" name="municipality" value="Rødovre">
			</div>

			<div class="field string">
				<label>CPR</label>
				<input type="text" name="cpr_1" value="123456">-<input type="text" name="cpr_2" value="1234">
			</div>

		</fieldset>

		<ul class="actions">
			<li><input type="submit" value="Prøv"></li>
		</ul>
	</form>
	
</div>

<?
$page->footer();
?>
	