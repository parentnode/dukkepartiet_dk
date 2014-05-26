<?php 

$name            = stringor(getVar("name"), "En borgers navn");
$address1        = stringor(getVar("address1"), "En vej et sted i danmark");
$address2        = stringor(getVar("address2"), "Et sted i provinsen");
$postal          = stringor(getVar("postal"), "1234");
$city            = stringor(getVar("city"), "En by med et navn");
$municipality    = stringor(getVar("municipality"), "Kommuneslev");
$cpr_1           = stringor(getVar("cpr_1"), "123456");
$cpr_2           = stringor(getVar("cpr_2"), "1234");

$name            = getVar("name");
$address1        = getVar("address1");
$address2        = getVar("address2");
$postal          = getVar("postal");
$city            = getVar("city");
$municipality    = getVar("municipality");
$cpr_1           = getVar("cpr_1");
$cpr_2           = getVar("cpr_2");

$date_data       = getVar("date_data");
$signature_data  = getVar("signature_data");

if(!Session::value("signature_id")) {
	Session::value("signature_id", gen_uuid());
}

?>

<div class="scene dataform i:dataform">

	<h1>Vælgererklæring</h1>
	<p>
		Hjælp os med at opstille til folketingsvalget, ved at udfylde den digitale vælgererklæring. <br />
		Indtast dine personlige oplysninger i formularen herunder:
	</p>
	<form name="declaration" action="/vaelgererklaering/signature" method="post">
		<fieldset>

			<div class="field string required">
				<label for="name">Navn</label>
				<input type="text" name="name" id="name" value="<?= $name ?>" />
			</div>

			<div class="field string required">
				<label for="address1">Adresse 1</label>
				<input type="text" name="address1" id="address1" value="<?= $address1 ?>" />
			</div>

			<div class="field string">
				<label for="address2">Adresse 2</label>
				<input type="text" name="address2" id="address2" value="<?= $address2 ?>" />
			</div>

			<div class="field postalcity required">
				<label for="postal">Postnr. og by</label>
				<input type="tel" name="postal" class="postal" id="postal" value="<?= $postal ?>" />
				<input type="text" name="city" class="city" value="<?= $city ?>" />
			</div>

			<div class="field string required">
				<label for="municipality">Kommune</label>
				<input type="text" name="municipality" id="municipality" value="<?= $municipality ?>" />
			</div>

			<div class="field cpr required">
				<label for="cpr">CPR</label>
				<input type="tel" name="cpr_1" value="<?= $cpr_1 ?>" id="cpr" class="cpr1" /><span>-</span><input type="tel" name="cpr_2" value="<?= $cpr_2 ?>" class="cpr2" />
			</div>

			<input type="hidden" name="date_data" value="<?= $date_data ?>" />
			<input type="hidden" name="signature_data" value="<?= $signature_data ?>" />

		</fieldset>

		<ul class="actions">
			<li><input type="submit" value="Fortsæt"></li>
		</ul>
	</form>

</div>

