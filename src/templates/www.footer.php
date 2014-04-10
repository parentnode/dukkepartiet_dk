fvsfv			
			</div>
			
			<div id="navigation">
				<ul class="primary">
					
					<li><a class="front" href="/">Forside</a></li>
					<li><a class="candidates" href="/kandidaterne">Kandidater</a></li>
<? 
$IC = new Item();
$events = $IC->getItems(array("itemtype" => "event", "status" => 1, "order" => "published_at ASC"));
if($events): ?>
					<li><a class="events" href="/kalender">Kalender</a></li>
<? endif; ?>

<? 
$IC = new Item();
$events = $IC->getItems(array("itemtype" => "bill", "status" => 1, "order" => "published_at ASC"));
if($events): ?>
					<li><a class="bills" href="/lovforslag">Lovforslag</a></li>
<? endif; ?>
					<!--li><a class="reform" href="/folketingsreformen">Folketingsreformen</a></li-->
				</ul>

			</div>

			<div id="footer" class="i:footer" >
				<!-- Move to fixed menu -->
				<ul class="servicenavigation">
					<li class="help_us"><a href="/hjaelp_os">Hjælp os</a></li>
					<li class="support_us"><a href="/stot_os">Støt os</a></li>
				</ul>

				<!-- Move to menu overlay -->
				<div class="social">
					<h4>Følg Dukkepartiet</h4>
					<ul>
						<li class="facebook"><a href="http://www.facebook.com/dukkepartiet" target="_blank">facebook</a></li>
						<li class="youtube"><a href="http://www.youtube.com/channel/UCWHykjLjMYGVjugW0PYsg5w" target="_blank">youtube</a></li>
						<li class="twitter"><a href="http://twitter.com/Dukkepartiet" target="_blank">twitter</a></li>
						<li class="instagram"><a href="http://instagram.com/dukkepartiet" target="_blank">instagram</a></li>
					</ul>
				</div>

				<!-- Stay in footer -->
				<div class="about">
					<p>Dukkepartiet er et samlingspunkt for alle, der hverken kan eller vil stille sig tilfreds med den aktuelle udformning af det politiske landskab. Partiet består af en gruppe borgere, der ønsker at tage et opgør med vores demokratiforståelse. Et opgør, der skal udstille tomheden for derigennem at genstarte demokratiet.</p>
					<ul class="contacts" itemscope itemtype="http://schema.org/PostalAddress">
						<li class="contact">
							<h4>Kontakt os</h4>
							<h5 itemprop="name">Dukkepartiet</h5>
							<p itemprop="streetAddress">Postbox 2030</p>
							<p><span itemprop="postalCode">1112</span><span itemprop="addressLocality">KBH K.</span></p>
							<p><a itemprop="email" href="mailto:kontakt@dukkepartiet.dk">kontakt@dukkepartiet.dk</a></p>
						</li>
						<li class="contact press">
							<h4>Pressekontakt</h4>
							<h5 itemprop="name">Have Kommunikation A/S</h5>
							<p itemprop="member">Kristina Sindberg</p>
							<p itemprop="telephone">(+45) 2486 0184</p>
							<p><a itemprop="email" href="mailto:kristina@have.dk">kristina@have.dk</a></p>
						</li>
					</ul>
				</div>
			</div>

		</div>

	</body>    
</html>