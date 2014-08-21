<?php
global $action;

$IC = new Item();
$itemtype = "slogan";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC"));
?>
<div class="scene front i:front red">


<?	if($items): ?>
	<ul class="items i:carousel">
<?		foreach($items as $item): 
			$item = $IC->extendItem($item); ?>
		<li class="item image_id:<?= $item["item_id"] ?> image_format:<?= $item["files"] ?>">
			<p><?= $item["name"] ?></p>

			<? if($item["url"]): ?>
			<a href="<?= $item["url"] ?>"><?= $item["url"] ?></a>
			<? endif; ?>			
		</li>
<?		endforeach; ?>
	</ul>
	
<?	endif; ?>

	<!--ul class="actions">
		<li class="next">Næste</li>
		<li class="previous">Forrige</li>
	</ul-->


</div>