<?php
global $fs;

$bundles = $fs->files(PUBLIC_FILE_PATH."/declaration_zips", array("allow_extension" => "zip"));
arsort($bundles);

$declarations = $fs->files(PUBLIC_FILE_PATH."/declarations", array("allow_extension" => "pdf"));
arsort($declarations);
?>
<div class="scene defaultList declarationList">
	<h1>Vælgererklæringer</h1>

	<div class="all_items bundles i:defaultList">
		<h2>Daily bundles</h2>
<?		if($bundles): ?>
		<ul class="items">
<?			foreach($bundles as $bundle):
				$filename = str_replace(PUBLIC_FILE_PATH."/declaration_zips/", "", $bundle); ?>
			<li class="item">
				<h3><?= str_replace(".zip", "", $filename) ?></h3>

				<ul class="actions">
					<li class="delete">
						<form action="/janitor/declaration/archiveBundle/<?= $filename ?>" method="post" class="delete">
							<input type="submit" value="Archive bundle" name="delete" class="delete button">
						</form>
					</li>
					<li class="download">
						<a href="/janitor/declaration/downloadBundle/<?= $filename ?>" class="button">Download bundle</a>
					</li>
				</ul>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No bundles.</p>
<?		endif; ?>
	</div>

	<div class="all_items declarations i:defaultList">
		<h2>Todays declarations</h2>
<?		if($declarations): ?>
		<ul class="items">
<?			foreach($declarations as $declaration):
				$filename = str_replace(PUBLIC_FILE_PATH."/declarations/", "", $declaration); ?>
			<li class="item">
				<h3><?= date("d/m/Y H:i:s", str_replace(".pdf", "", $filename)) ?></h3>

				<ul class="actions">
					<li class="delete">
						<form action="/janitor/declaration/archive/<?= $filename ?>" method="post" class="delete">
							<input type="submit" value="Archive" name="delete" class="delete button">
						</form>
					</li>
					<li class="download">
						<a href="/janitor/declaration/download/<?= $filename ?>" class="button">Download</a>
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
