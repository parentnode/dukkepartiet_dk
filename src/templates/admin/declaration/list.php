<?php

$fs = new FileSystem();


$declarations = $fs->files(PUBLIC_FILE_PATH."/declarations", array("allow_extension" => "pdf"));
?>
<div class="scene defaultList declarationList">
	<h1>Vælgererklæringer</h1>

	<div class="all_items i:defaultList">
<?		if($declarations): ?>
		<ul class="items">
<?			foreach($declarations as $declaration):
				$filename = str_replace(PUBLIC_FILE_PATH."/declarations/", "", $declaration);

?>
			<li class="item">
				<h3><?= $filename ?></h3>

				<ul class="actions">
					<li class="delete">
						<form action="/admin/declaration/delete/<?= $filename ?>" method="post" class="i:formDefaultDelete">
							<input type="submit" value="Delete" class="delete button">
						</form>
					</li>
					<li class="download">
						<a href="/admin/declaration/download/<?= $filename ?>" class="button">Download</a>
					</li>
				</ul>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No declarations.</p>
<?		endif; ?>
	</div>

</div>
