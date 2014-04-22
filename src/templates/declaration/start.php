<?php 

$name            = stringor(getVar("name"), "En borgers navn");
$address1        = stringor(getVar("address1"), "En vej et sted i danmark");
$address2        = stringor(getVar("address2"), "Et sted i provinsen");
$postal          = stringor(getVar("postal"), "1234");
$city            = stringor(getVar("city"), "En by med et navn");
$municipality    = stringor(getVar("municipality"), "Kommuneslev");
$cpr_1           = stringor(getVar("cpr_1"), "123456");
$cpr_2           = stringor(getVar("cpr_2"), "1234");

$date_data       = getVar("date_data");
$signature_data  = getVar("signature_data");

if(!Session::value("signature_id")) {
	Session::value("signature_id", gen_uuid());
}

?>

<div class="scene dataform">

	<h1>Vælgererklæring</h1>
	<p>
		Hjælp os med at opstille til folketingsvalget. <br />
		Indtast dine personlige oplysninger i formularen herunder:
	</p>
	<form name="declaration" action="/vaelgererklaering/signature" method="post">
		<fieldset>

			<div class="field string">
				<label>Navn</label>
				<input type="text" name="name" value="<?= $name ?>" />
			</div>

			<div class="field string">
				<label>Adresse 1</label>
				<input type="text" name="address1" value="<?= $address1 ?>" />
			</div>

			<div class="field string">
				<label>Adresse 2</label>
				<input type="text" name="address2" value="<?= $address2 ?>" />
			</div>

			<div class="field string">
				<label>Postnummer</label>
				<input type="text" name="postal" value="<?= $postal ?>" />
			</div>

			<div class="field string">
				<label>By</label>
				<input type="text" name="city" value="<?= $city ?>" />
			</div>

			<div class="field string">
				<label>Kommune</label>
				<input type="text" name="municipality" value="<?= $municipality ?>" />
			</div>

			<div class="field string">
				<label>CPR</label>
				<input type="text" name="cpr_1" value="<?= $cpr_1 ?>" id="cpr1" /><span>-</span><input type="text" name="cpr_2" value="<?= $cpr_2 ?>" id="cpr2" />
			</div>

			<input type="hidden" name="date_data" value="<?= $date_data ?>" />
			<input type="hidden" name="signature_data" value="<?= $signature_data ?>" />

		</fieldset>

		<ul class="actions">
			<li><input type="submit" value="Fortsæt"></li>
		</ul>
	</form>

</div>
