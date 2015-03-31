<?php
global $action;

$IC = new Items();
$itemtype = "slogan";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => array("mediae" => true)));
?>
<div class="scene front i:front red">

<?	if($items): ?>
	<ul class="items i:carousel">
<?		foreach($items as $item): ?>
		<li class="item image_id:<?= $item["item_id"] ?> image_format:<?= $item["mediae"] ? $item["mediae"]["main"]["format"] : "" ?>">
			<p><?= $item["name"] ?></p>

			<? if($item["url"]): ?>
			<a href="<?= $item["url"] ?>"><?= $item["url"] ?></a>
			<? endif; ?>
		</li>
<?		endforeach; ?>
	</ul>

<?	endif; ?>

</div>