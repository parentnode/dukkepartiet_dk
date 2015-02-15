<?php

global $slug_data_intro;
global $slug_data_address;
global $slug_data_receipt;
global $slug_data_footer;

$slug_data_intro = '<p>Hjælp os med at opstille til folketingsvalget, ved at udfylde den digitale vælgererklæring.</p>';


$slug_data_address = '';
$slug_data_address .= '<div id="vcard-dukkepartiet" class="vcard" itemscope itemtype="http://schema.org/Organization">';
$slug_data_address .= '	<div class="name fn org" itemprop="name">Dukkepartiet</div>';
$slug_data_address .= '	<div class="adr" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">';
$slug_data_address .= '		<div class="po-box" itemprop="postOfficeBoxNumber">Postbox 2030</div>';
$slug_data_address .= '		<div class="postallocality"><span class="postal-code" itemprop="postalCode">1112</span> <span class="locality" itemprop="addressLocality">København K</span></div>';
$slug_data_address .= '	</div>';
$slug_data_address .= '	<div class="url" itemprop="url">www.dukkepartiet.dk</div>';
$slug_data_address .= '	<div class="email" itemprop="email"><a href="mailto:kontakt@dukkepartiet.dk">kontakt@dukkepartiet.dk</a></div>';
$slug_data_address .= '</div>';




$slug_data_receipt = '';
$slug_data_receipt .= '<h1>Tusind tak</h1>';
$slug_data_receipt .= '<p>Vi har nu modtaget din underskrevne vælgererklæring.</p>';

$slug_data_receipt .= '<h3>Returnér din godkendte vælgererklæring til os</h3>';
$slug_data_receipt .= '<p>Indenfor nogle uger får du din godkendte vælgererklæring tilbage med posten fra Folkeregistret i din kommune. Først når vi modtager den fra dig, tæller den med blandt de 20.260 vælgererklæringer, som vi skal bruge for at kunne stille op til næste folketingsvalg.</p>';
$slug_data_receipt .= '<p>Husk at sende den til os hurtigst muligt!</p>';
//$slug_data_receipt .= '<p>Du gør det meget hurtigt og nemt ved at tage et foto af den med din smartphone og uploade den til os: <a href="https://dukkepartiet.dk/vaelgererklaering/upload">https://dukkepartiet.dk/vaelgererklaering/upload</a>.</p>';

$slug_data_receipt .= '<p class="regards">Med venlig hilsen,</p>';
$slug_data_receipt .= '<h2>Dukkepartiet</h2>';


$slug_data_footer = '';



?>