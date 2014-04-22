<?php
$declaration_id = $_GET["id"];
?>

<div class="scene receipt i:receipt">

	<h1>Tak</h1>
	<p>Vi har nu modtaget din underskrevne vælgererklæring</p>

	<p class="regards">Med venlig hilsen</p>
	<h2>Dukkepartiet</h2>

	<ul class="actions">
		<li class="download"><a href="/vaelgererklaering/download?id=<?= $declaration_id ?>">Download PDF til godkendelse af OIM</a></li>
	</ul>

</div>
