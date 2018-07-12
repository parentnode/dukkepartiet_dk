<?php
global $action;
global $IC;
global $itemtype;
global $model;
?>
<div class="scene defaultNew">
	<h1>New slogan</h1>

	<ul class="actions">
		<?= $JML->newList(array("label" => "List")) ?>
	</ul>

	<?= $model->formStart("save", array("class" => "i:defaultNew labelstyle:inject")) ?>
		<p>Give the slogan a meaningful name, press <em>save</em> and upload your image. The slogan can also link to subpage, if so add a URL.</p>
		<fieldset>
			<?= $model->input("name") ?>
			<?= $model->input("url") ?>
		</fieldset>

		<?= $JML->newActions() ?>
	<?= $model->formEnd() ?>

</div>
