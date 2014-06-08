<?php

$action = $this->actions();

$IC = new Item();
$itemtype = "news";

$model = $IC->typeObject($itemtype);

?>
<div class="scene defaultNew">
	<h1>New news</h1>

	<ul class="actions">
		<?= $model->link("Back", "/admin/".$itemtype."/list", array("class" => "button", "wrapper" => "li.cancel")) ?>
	</ul>

	<?= $model->formStart("/admin/cms/save/".$itemtype, array("class" => "i:formDefaultNew labelstyle:inject")) ?>
		<fieldset>
			<?= $model->input("published_at") ?>
			<?= $model->input("name") ?>
			<?= $model->input("client") ?>
			<?= $model->input("type") ?>
			<?= $model->input("description", array("class" => "autoexpand")) ?>
			<?= $model->input("article") ?>
		</fieldset>

		<ul class="actions">
			<?= $model->link("Back", "/admin/".$itemtype."/list", array("class" => "button key:esc", "wrapper" => "li.cancel")) ?>
			<?= $model->submit("Save", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
		</ul>
	<?= $model->formEnd() ?>

</div>
