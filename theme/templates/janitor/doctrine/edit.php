<?php
global $action;
global $IC;
global $itemtype;
global $model;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => true));
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit doctrine</h1>

	<?= $JML->editGlobalActions($item) ?>

	<div class="item i:defaultEdit item_id:<?= $item_id ?>">
		<h2>Doctrine</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("doctrine", array("class" => "autoexpand", "value" => $item["doctrine"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

</div>
