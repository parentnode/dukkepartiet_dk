<?php
global $action;

$IC = new Item();
$itemtype = "candidate";

//$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at ASC"));
$item = $IC->getCompleteItem(array("id" => $action[0]));
$item_id = $item["id"];
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

	
	
</div>