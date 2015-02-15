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

	<?= $slug_data_receipt ?>

	<div class="close"><a href="javascript:window.close();">go back</a></div>

</div>
