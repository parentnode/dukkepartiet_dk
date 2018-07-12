<?php
global $slug_data_intro;
global $slug;


// session not initalized yet


if(!session()->value("signature_id")) {

	session()->value("signature_id", gen_uuid());

	$name = "";
	$address1 = "";
	$address2 = "";
	$postal = "";
	$city = "";
	$municipality = "";
	$cpr_1 = "";
	$cpr_2 = "";

	$date_data = "";
	$signature_data = "";


	// prefill with dummy data
	// only for ease of testing - to be removed before launch

	// $name            = "En borgers navn";
	// $address1        = "En vej et sted i danmark";
	// $address2        = "Et sted i provinsen";
	// $postal          = "1234";
	// $city            = "En by med et navn";
	// $municipality    = "Kommuneslev";
	// $cpr_1           = "123456";
	// $cpr_2           = "1234";
	//
	// $date_data       = "";
	// $signature_data  = "";

}
else {

	$name            = session()->value("name");
	$address1        = session()->value("address1");
	$address2        = session()->value("address2");
	$postal          = session()->value("postal");
	$city            = session()->value("city");
	$municipality    = session()->value("municipality");
	$cpr_1           = session()->value("cpr_1");
	$cpr_2           = session()->value("cpr_2");

	$date_data       = session()->value("date_data");
	$signature_data  = session()->value("signature_data");

}


?>

<div class="scene dataform i:dataform">

	<h1>Vælgererklæring</h1>
	<p>Hjælp os med at opstille til folketingsvalget, ved at udfylde den digitale vælgererklæring.</p>
	<p>Indtast dine personlige oplysninger i formularen herunder:</p>

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

		</fieldset>

		<ul class="actions">
			<li><input type="submit" value="Fortsæt"></li>
		</ul>
	</form>

	<div class="close"><a href="javascript:window.close();">go back</a></div>

</div>
