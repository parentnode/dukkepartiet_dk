<?php
global $action;

$IC = new Items();
$itemtype = "candidate";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at ASC"));
?>

<div class="scene candidates i:candidates blue">

	<h1>Print maske</h1>


<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): 
				$item = $IC->extendItem($item); ?>
			<li class="item image_id:<?= $item["item_id"] ?>" itemscope itemtype="http://schema.org/Person">
				<h2 itemprop="name"><a href="/kandidaterne/<?= $item['item_id'] ?>"><?= $item["name"] ?></a></h2>
				<h4><?= $item["area"] ?></h4>
				<p class="link"><a href="<?= $item["link"] ?>"><?= $item["link"] ?></a></p>

				<!-- Bio -->
				<h3>Politisk ansvar:</h3>
				<p><?= $item["responsibilities"] ?></p>
				<h3>Baggrund:</h3>
				<p><?= $item["background"] ?></p>
				
			</li>
<?			endforeach; ?>
		</ul>
<?		endif; ?>
	
	
</div>