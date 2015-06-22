<?php
global $action;

$IC = new Items();
$itemtype = "introduction";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "extend" => true));
?>
<div class="scene front i:front red">

	<h1>Dukkepartiet</h1>

<? if($items): ?>
	<ul class="items i:carousel">
<?		foreach($items as $item): ?>
		<li class="item">
			<h2><?= $item["url"] ? '<a href="'.$item["url"].'">' : '' ?><?= $item["text"] ?><?= $item["url"] ? '</a>' : '' ?></h2>
		</li>
<? 		endforeach; ?>
	</ul>
<? endif; ?>

</div>