<?php
global $action;

$IC = new Item();
$itemtype = "doctrine";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC"));
?>
<div class="scene doctrines i:doctrines red">

	
	<h2>Doktriner</h2>

<?	if($items): ?>
	<ul class="items i:carousel">
<?		foreach($items as $item): 
			$item = $IC->extendItem($item); ?>
		<li class="item">
			<p><span><?= $item["doctrine"] ?></span></p>
		</li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

	<!--ul class="actions">
		<li class="next">Næste</li>
		<li class="previous">Forrige</li>
	</ul-->	
</div>