<?php
global $slug;
global $slug_data_receipt;

// now is the time to clear session
$segment = session()->value("segment");
$dev = session()->value("dev");

session()->reset();


session()->value("segment", $segment);
session()->value("dev", $dev);

?>

<div class="scene receipt i:receipt">

	<h1>Tusind tak</h1>
	<p>Vi har nu modtaget din underskrevne vælgererklæring.</p>

	<h3>Returnér din godkendte vælgererklæring til os</h3>
	<p>Indenfor nogle uger får du din godkendte vælgererklæring tilbage med posten fra Folkeregistret i din kommune. Først når vi modtager den fra dig, tæller den med blandt de 20.260 vælgererklæringer, som vi skal bruge for at kunne stille op til næste folketingsvalg.</p>
	<p>Husk at sende den til os hurtigst muligt!</p>
	<p>Du gør det meget hurtigt og nemt ved at tage et foto af den med din smartphone og uploade den til os: <a href="https://dukkepartiet.dk/vaelgererklaering/upload">https://dukkepartiet.dk/upload</a>.</p>

	<p class="regards">Med venlig hilsen</p>
	<h2>Dukkepartiet</h2>

	<div class="close"><a href="javascript:window.close();">go back</a></div>

</div>
