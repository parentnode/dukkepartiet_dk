	</div>

	<div id="navigation">
		<ul>
			<?= $HTML->link("Slogans/Forside", "/janitor/slogan/list", array("wrapper" => "li.slogan")) ?>
			<?= $HTML->link("Aktioner", "/janitor/action/list", array("wrapper" => "li.action")) ?>
			<?= $HTML->link("Statsministerkandidat", "/janitor/primeminister/list", array("wrapper" => "li.primeminister")) ?>
			<?= $HTML->link("Interview", "/janitor/interview/list", array("wrapper" => "li.interview")) ?>
			<?= $HTML->link("Visioner", "/janitor/vision/list", array("wrapper" => "li.vision")) ?>
			<?= $HTML->link("Lovforslag", "/janitor/bill/list", array("wrapper" => "li.bill")) ?>
			<?= $HTML->link("Kalender", "/janitor/event/list", array("wrapper" => "li.event")) ?>
			<?= $HTML->link("Doktriner/Program", "/janitor/doctrine/list", array("wrapper" => "li.doctrine")) ?>
			<?//= $HTML->link("Kandidater (print maske)", "/janitor/candidate/list", array("wrapper" => "li.candidate")) ?>

			<?= $HTML->link("Vælgereklæringer", "/janitor/declaration/list", array("wrapper" => "li.declaration")) ?>

			<?//= $HTML->link("Tags", "/janitor/admin/tag/list", array("wrapper" => "li.tags")) ?>
		</ul>
	</div>

	<div id="footer">
		<ul class="servicenavigation">
			<li class="copyright">Janitor, Manipulator, Modulator - parentNode - Copyright 2014</li>
		</ul>
	</div>

</div>

</body>
</html>