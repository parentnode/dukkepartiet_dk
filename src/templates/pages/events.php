<?php
global $action;

$IC = new Item();
$itemtype = "event";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at ASC"));
?>
<div class="scene i:events events">

	<!-- Mød kandidaterne -->
	<div class="events">
		<h2>Kalender</h2>

<?		if($items): ?>
		<ul class="slides">
<?			foreach($items as $item): 
				$item = $IC->extendItem($item); ?>
			<li class="slide">
				<h3><?= $item["name"] ?></h3>
				<dl class="info">
					<dt class="published_at">Tidspunkt</dt>
					<dd class="published_at"><?= date("Y-m-d h:i", strtotime($item["published_at"])) ?></dd>
					<dt class="location">Sted</dt>
					<dd class="location"><?= $item["location"] ?></dd>
				</dl>
				<div class="description">
					<p><?= $item["name"] ?></p>
				</div>
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