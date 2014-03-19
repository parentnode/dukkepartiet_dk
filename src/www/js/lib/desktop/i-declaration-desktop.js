Util.Objects["declaration"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		
		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			this.canvas_signature._offsetLeft = u.absX(this.canvas_signature);
			this.canvas_signature._offsetTop = u.absY(this.canvas_signature);
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scrolled")

		}


		scene.ready = function() {

			this.canvas_tools = u.ae(this, "ul", {"class":"tools"});

			this.canvas_reset = u.ae(this.canvas_tools, "li", {"class":"reset", "html":"Reset"});
			this.canvas_blue = u.ae(this.canvas_tools, "li", {"class":"blue", "html":"Blå"});
			this.canvas_red = u.ae(this.canvas_tools, "li", {"class":"red", "html":"Rød"});

			this.canvas_reset.scene = this;
			u.e.click(this.canvas_reset);
			this.canvas_reset.clicked = function() {

				this.scene.selected_input._context.clearRect(0, 0, this.scene.selected_input.offsetWidth, this.scene.selected_input.offsetHeight);

				this.scene.canvas_input._context.clearRect(0, 0, this.scene.canvas_input.offsetWidth, this.scene.canvas_input.offsetHeight);
				this.scene._s_paths = [];
				this.scene._s_x_paths = [];
				this.scene._s_y_paths = [];
			}

			this.canvas_blue.scene = this;
			u.e.click(this.canvas_blue);
			this.canvas_blue.clicked = function() {
				this.scene.canvas_date._context.strokeStyle = "#00027a";
				this.scene.canvas_signature._context.strokeStyle = "#00027a";
				this.scene.canvas_input._context.strokeStyle = "#00027a";
			}
			this.canvas_red.scene = this;
			u.e.click(this.canvas_red);
			this.canvas_red.clicked = function() {
				this.scene.canvas_date._context.strokeStyle = "#ee191b";
				this.scene.canvas_signature._context.strokeStyle = "#ee191b";
				this.scene.canvas_input._context.strokeStyle = "#ee191b";
			}


			// signature input

			this.div_signature = u.ae(this, "div", {"class":"signature"});
			this.canvas_signature = u.ae(this.div_signature, "canvas", {"class":"signature"});
			this.canvas_signature._offsetLeft = u.absX(this.canvas_signature);
			this.canvas_signature._offsetTop = u.absY(this.canvas_signature);
			this.canvas_signature.width = this.canvas_signature.offsetWidth;
			this.canvas_signature.height = this.canvas_signature.offsetHeight;
			this.canvas_signature._context = this.canvas_signature.getContext("2d");
			this.canvas_signature._context.strokeStyle = "#ee191b";
			this.canvas_signature._context.lineWidth = 0.5;
			this.canvas_signature.scene = this;
			u.e.click(this.canvas_signature);
			this.canvas_signature.clicked = function() {
				u.ac(this, "selected");
				u.rc(this.scene.canvas_date, "selected");
				this.scene.selected_input = this;

				u.ac(this.scene.canvas_input, "signature");
				u.rc(this.scene.canvas_input, "date");

				this.scene.canvas_reset.clicked();
			}

			// date input
			this.div_date = u.ae(this, "div", {"class":"date"});
			this.canvas_date = u.ae(this.div_date, "canvas", {"class":"date"});
			this.canvas_date._offsetLeft = u.absX(this.canvas_date);
			this.canvas_date._offsetTop = u.absY(this.canvas_date);
			this.canvas_date.width = this.canvas_date.offsetWidth;
			this.canvas_date.height = this.canvas_date.offsetHeight;
			this.canvas_date._context = this.canvas_date.getContext("2d");
			this.canvas_date._context.strokeStyle = "#ee191b";
			this.canvas_date._context.lineWidth = 0.5;
			this.canvas_date.scene = this;
			u.e.click(this.canvas_date);
			this.canvas_date.clicked = function() {
				u.ac(this, "selected");
				u.rc(this.scene.canvas_signature, "selected");
				this.scene.selected_input = this;

				u.ac(this.scene.canvas_input, "date");
				u.rc(this.scene.canvas_input, "signature");

				this.scene.canvas_reset.clicked();
			}

			this.div_input = u.ae(this, "div", {"class":"input"});
			u.ae(this.div_input, "h2", {"html":"Skriv her med din mus, finger eller pen"});
			this.canvas_input = u.ae(this.div_input, "canvas", {"class":"canvas_input"});
			this.canvas_input._offsetLeft = u.absX(this.canvas_input);
			this.canvas_input._offsetTop = u.absY(this.canvas_input);
			this.canvas_input.width = this.canvas_input.offsetWidth;
			this.canvas_input.height = this.canvas_input.offsetHeight;
			this.canvas_input._context = this.canvas_input.getContext("2d");
			this.canvas_input._context.strokeStyle = "#ee191b";
			this.canvas_input._context.lineWidth = 2;
			this.canvas_input.scene = this;


			this.canvas_date.clicked();


			this._s_x_paths = [];
			this._s_y_paths = [];
			this._s_paths = [];


			this.canvas_input._beginDrawing = function(event) {
				u.e.addMoveEvent(this, this._draw);

				this._bx = u.eventX(event)-this._offsetLeft;
				this._by = u.eventY(event)-this._offsetTop;

//				u.bug("begin drawing: x=" + x + ", y=" + y);

				this._context.moveTo(this._bx, this._by);
				this._context.beginPath();

				this.scene._s_paths.push(0);
				this.scene._s_x_paths.push(this._bx);
				this.scene._s_y_paths.push(this._by);

			}

			this.canvas_input._endDrawing = function(event) {

				this._cx = u.eventX(event)-this._offsetLeft;
				this._cy = u.eventY(event)-this._offsetTop;

//				u.bug("begin drawing: x=" + x + ", y=" + y);
				this._context.closePath();

				this.scene._s_paths.push(0);
				this.scene._s_x_paths.push(this._cx);
				this.scene._s_y_paths.push(this._cy);

				u.e.removeMoveEvent(this, this._draw);
			}

			this.canvas_input._draw = function(event) {

				this._cx = u.eventX(event)-this._offsetLeft;
				this._cy = u.eventY(event)-this._offsetTop;

				this._bx = this._cx;
				this._by = this._cy;

				this._context.lineTo(this._cx, this._cy);
				this._context.stroke();

//				u.bug("drawing in progress: x=" + x + ", y=" + y);

				this.scene._s_paths.push(1);
				this.scene._s_x_paths.push(this._cx);
				this.scene._s_y_paths.push(this._cy);

				this.scene.selected_input._repeat();
//				this._redraw();
			}

			this.canvas_signature._repeat = function(event) {
				var i, draw;

				this._context.beginPath();

				for(i = 0; i < this.scene._s_paths.length-1; i++) {
					if(this.scene._s_paths[i]) {
//						this._context.moveTo(this._x_paths[i], this._y_paths[i]);

						this._context.moveTo(this.scene._s_x_paths[i]/3, this.scene._s_y_paths[i]/3);
						this._context.lineTo(this.scene._s_x_paths[i+1]/3, this.scene._s_y_paths[i+1]/3);
						this._context.stroke();
					}
					else {
						this._context.closePath();
						if(i < this.scene._s_paths.length-2) {
							this._context.beginPath();
						}
					}
				}

			}

			this.canvas_date._repeat = function(event) {
				var i, draw;

				this._context.beginPath();

				for(i = 0; i < this.scene._s_paths.length-1; i++) {
					if(this.scene._s_paths[i]) {
//						this._context.moveTo(this._x_paths[i], this._y_paths[i]);

						this._context.moveTo(this.scene._s_x_paths[i]/6, this.scene._s_y_paths[i]/6);
						this._context.lineTo(this.scene._s_x_paths[i+1]/6, this.scene._s_y_paths[i+1]/6);
						this._context.stroke();
					}
					else {
						this._context.closePath();
						if(i < this.scene._s_paths.length-2) {
							this._context.beginPath();
						}
					}
				}

			}

			u.e.addStartEvent(this.canvas_input, this.canvas_input._beginDrawing);
			u.e.addEndEvent(this.canvas_input, this.canvas_input._endDrawing);

		}

		scene.ready();
	}
}

u.drawingCanvas = function(node) {
	
}