<?php
global $action;
global $IC;
global $itemtype;
global $model;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("mediae" => true)));
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit slogan</h1>

	<?= $JML->editGlobalActions($item) ?>

	<?= $JML->editSingleMedia($item, array("variant" => "main", "label" => "Image")) ?>

	<div class="item i:defaultEdit item_id:<?= $item_id ?>">
		<h2>Slogan</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("url", array("value" => $item["url"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>


</div>
