<?php
global $action;

$IC = new Item();
$itemtype = "doctrine";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC"));
?>
<div class="scene i:doctrines doctrines">

	<div class="doktrinen">
		<h2>Dukkedoktriner</h2>

<?		if($items): ?>
		<ul class="slides">
<?			foreach($items as $item): 
				$item = $IC->extendItem($item); ?>
			<li class="slide">
				<p><span><?= $item["doctrine"] ?></span></p>
			</li>
<?			endforeach; ?>
		</ul>
<?		endif; ?>

		<ul class="actions">
			<li class="next">Næste</li>
			<li class="previous">Forrige</li>
		</ul>
	</div>
	
</div>