<?php
global $action;
global $IC;
global $itemtype;


$item = $IC->getCompleteItem(array("id" => $action[0]));
$item_id = $item["id"];

// get previous and next from current item order
$items = $IC->getItems(array("count" => 1, "itemtype" => $itemtype, "status" => 1, "order" => "published_at ASC"));
$next = $IC->getNext($item_id, array("items" => $items));
$prev = $IC->getPrev($item_id, array("items" => $items));
?>
<div class="scene candidate i:candidates blue">

	<h1>Kandidaterne</h1>

	<ul class="items">
		<li class="item image_id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">
			<h2 itemprop="name"><a href="/kandidaterne/<?= $item['item_id'] ?>"><?= $item["name"] ?></a></h2>
			<h4><?= $item["area"] ?></h4>
			<p class="link"><a href="<?= $item["link"] ?>"><?= $item["link"] ?></a></p>

			<!-- Bio -->
			<h3>Politisk ansvar:</h3>
			<p><?= $item["responsibilities"] ?></p>
			<h3>Baggrund:</h3>
			<p><?= $item["background"] ?></p>
			

			<ul class="actions">
				<li class="button"><a href="<?= $item["link"] ?>"><?= $item["link"] ?></a></li>
			</ul>

		</li>

	</ul>

	<ul class="actions">
<? if($prev): ?><li class="previous"><a href="/kandidaterne/<?= $prev[0]["id"] ?>">Forrige</a></li><? endif; ?>
<? if($next): ?><li class="next"><a href="/kandidaterne/<?= $next[0]["id"] ?>">Næste</a></li><? endif; ?>
	</ul>

</div>