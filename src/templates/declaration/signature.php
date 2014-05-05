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
		<div class="name"><?= getVar("name") ?></div>
		<div class="address1"><?= getVar("address1") ?></div>
		<div class="address2"><?= getVar("address2") ?></div>
		<div class="postal"><span><?= implode("</span><span>", str_split(getVar("postal"))) ?></span></div>
		<div class="city"><?= getVar("city") ?></div>
		<div class="municipality"><?= getVar("municipality") ?></div>
		<div class="cpr_1"><span><?= implode("</span><span>", str_split(getVar("cpr_1"))) ?></span></div>
		<div class="cpr_2"><span><?= implode("</span><span>", str_split(getVar("cpr_2"))) ?></span></div>
	</div>

	<form name="approve" action="/vaelgererklaering/preview" method="post">
		<input type="hidden" name="approved" value="1">
		<input type="hidden" name="name" value="<?= getVar("name") ?>">
		<input type="hidden" name="address1" value="<?= getVar("address1") ?>">
		<input type="hidden" name="address2" value="<?= getVar("address2") ?>">
		<input type="hidden" name="postal" value="<?= getVar("postal") ?>">
		<input type="hidden" name="city" value="<?= getVar("city") ?>">
		<input type="hidden" name="municipality" value="<?= getVar("municipality") ?>">
		<input type="hidden" name="cpr_1" value="<?= getVar("cpr_1") ?>">
		<input type="hidden" name="cpr_2" value="<?= getVar("cpr_2") ?>">
		<input type="hidden" id="date_data" name="date_data" value="<?= getVar("date_data") ?>">
		<input type="hidden" id="signature_data" name="signature_data" value="<?= getVar("signature_data") ?>">

		<ul class="actions">
			<li class="preview"><input type="submit" value="Godkend"></li>
		</ul>
	</form>
</div>
