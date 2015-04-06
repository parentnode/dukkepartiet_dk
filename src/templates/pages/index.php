<?php
global $action;

$IC = new Items();
$itemtype = "counter";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => true, "limit" => 1));
if($items) {
	$item = $items[0];

}
?>
<div class="scene front i:front red">

<?	if($item && $item["counter"] != 0): ?>
	<h1><?= $item["text"] ?></h1>
	<h2><span><?= implode("</span><span>", str_split($item["counter"])) ?></span></h2>
	<p>Vælgererklæringer</p>
<?	endif; ?>

</div>