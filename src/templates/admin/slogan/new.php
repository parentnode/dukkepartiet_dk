<?php
global $action;
global $IC;
global $itemtype;
global $model;
?>
<div class="scene defaultNew">
	<h1>New slogan</h1>

	<ul class="actions">
		<?= $model->link("Back", "/admin/".$itemtype."/list", array("class" => "button", "wrapper" => "li.cancel")) ?>
	</ul>

	<?= $model->formStart("/admin/cms/save/".$itemtype, array("class" => "i:formDefaultNew labelstyle:inject")) ?>

		<p>Give the slogan a meaningful name, press <em>save</em> and upload your image.</p>
		<fieldset>
			<?= $model->input("name") ?>
		</fieldset>

		<ul class="actions">
			<?= $model->link("Back", "/admin/".$itemtype."/list", array("class" => "button key:esc", "wrapper" => "li.cancel")) ?>
			<?= $model->submit("Save", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
		</ul>
	<?= $model->formEnd() ?>

</div>
