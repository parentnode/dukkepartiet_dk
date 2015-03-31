<?
global $slug;
global $slug_data_address;

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

?>
<div class="scene signature i:signature">

	<h1>Vælgererklæring</h1>

	<div id="vcard-dukkepartiet" class="vcard" itemscope itemtype="http://schema.org/Organization">
		<div class="name fn org" itemprop="name">Dukkepartiet</div>
		<div class="adr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
			<div class="po-box" itemprop="postOfficeBoxNumber">Postbox 2030</div>
			<div class="postallocality"><span class="postal-code" itemprop="postalCode">1112</span> <span class="locality" itemprop="addressLocality">København K</span></div>
		</div>
		<div class="url" itemprop="url">www.dukkepartiet.dk</div>
		<div class="email" itemprop="email"><a href="mailto:kontakt@dukkepartiet.dk">kontakt@dukkepartiet.dk</a></div>
	</div>

	<div class="signatureform">
		<div class="name"><?= $name ?></div>
		<div class="address1"><?= $address1 ?></div>
		<div class="address2"><?= $address2 ?></div>
		<div class="postal"><span><?= implode("</span><span>", str_split($postal)) ?></span></div>
		<div class="city"><?= $city ?></div>
		<div class="municipality"><?= $municipality ?></div>
		<div class="cpr_1"><span><?= implode("</span><span>", str_split($cpr_1)) ?></span></div>
		<div class="cpr_2"><span><?= implode("</span><span>", str_split($cpr_2)) ?></span></div>
	</div>

	<form name="approve" action="/vaelgererklaering/preview" method="post">
		<!--input type="hidden" id="approved" name="approved" value="0" /-->
		<!--input type="hidden" id="slug" name="slug" value="<?= $slug ?>" /-->
		<input type="hidden" id="date_data" name="date_data" value="<?= $date_data ?>" />
		<input type="hidden" id="signature_data" name="signature_data" value="<?= $signature_data ?>" />

		<ul class="actions">
			<li class="preview"><input type="submit" value="Godkend"></li>
		</ul>
	</form>
</div>
