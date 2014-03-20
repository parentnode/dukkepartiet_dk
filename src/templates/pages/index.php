<div class="scene front i:front">

<!-- TODO: Add backend to slogans -->
<!--
<?	if($items): ?>
	<ul class="items">
<?		foreach($items as $item): 
			$item = $IC->extendItem($item); ?>
		<li class="item">
			<p><?= $item["slogan"] ?></p>
		</li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

	<ul class="actions">
		<li class="next">Næste</li>
		<li class="previous">Forrige</li>
	</ul>
-->

	<div class="slogans">
		<ul class="items i:carousel">
			<li class="item">
				<img src="/img/slogan1.png" />
			</li>
			<li class="item">
				<img src="/img/slogan2.png" />
			</li>
			<li class="item">
				<img src="/img/slogan3.png" />
			</li>
			<li class="item">
				<img src="/img/slogan4.png" />
			</li>
		</ul>

		<ul class="actions">
			<li class="next">Næste</li>
			<li class="previous">Forrige</li>
		</ul>
	</div>

</div>