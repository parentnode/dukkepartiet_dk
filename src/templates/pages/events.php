<?php
global $action;
global $IC;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at ASC"));
?>
<div class="scene i:events events red">

	<!-- Mød kandidaterne -->
	
		<h1>Kalender</h1>

<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): 
				$item = $IC->extendItem($item); ?>
			<li class="item">
				<h3><a href="/kalender/<?= $item['item_id'] ?>"><?= $item["name"] ?></a></h3>
				<dl class="info">
					<dt class="published_at">Tidspunkt</dt>
					<!--dd class="published_at"><?= date("d.m.y H:i", strtotime($item["published_at"])) ?></dd-->
					<dd class="published_at"><?= date("d.m.y", strtotime($item["published_at"])) ?></dd>
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

	</div>
</div>