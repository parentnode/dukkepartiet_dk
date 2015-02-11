<?php
global $action;

$IC = new Items();
$itemtype = "interview";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => true));
?>
<div class="scene interview i:interview blue">
	
	<div class="introduction">
		<h2>Dukkerne møder</h2>
		<p>Dukkepartiet samarbejder med politikere og kendte danskere for at skabe politisk dialog og visioner for demokratiet. I Dukke-Dialogerne kan du blandt andet høre, hvordan de har det med politikerlede og politisk klima.</p>
	</div>

	<h3>Interviews</h3>
<?	if($items): ?>
	<ul class="items">
<?		foreach($items as $item): ?>
		<li class="item">
			<?
				$url = $item["url"];
				parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
				$id = $my_array_of_vars['v'];
			?>
			<div class="image image_id:<?= $id ?>"></div>
			<h3><?= $item["name"] ?></h3>
			<a href="<?= $url ?>"><?= $id ?></a>
		</li>
<?		endforeach; ?>
	</ul>
	
<?	endif; ?>

</div>