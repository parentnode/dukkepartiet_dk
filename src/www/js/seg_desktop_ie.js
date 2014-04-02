
/*seg_desktop_ie_include.js*/

/*seg_desktop_ie.js*/
if(!u || !Util) {
	var u, Util = u = new function() {};
	u.version = 0.8;
	u.bug = function() {};
	u.nodeId = function() {};
	u.stats = new function() {this.pageView = function(){};this.event = function(){};this.customVar = function(){};}
}
Util.debugURL = function(url) {
	if(u.bug_force) {
		return true;
	}
	return document.domain.match(/.local$/);
}
Util.nodeId = function(node, include_path) {
		if(!include_path) {
			return node.id ? node.nodeName+"#"+node.id : (node.className ? node.nodeName+"."+node.className : (node.name ? node.nodeName + "["+node.name+"]" : node.nodeName));
		}
		else {
			if(node.parentNode && node.parentNode.nodeName != "HTML") {
				return u.nodeId(node.parentNode, include_path) + "->" + u.nodeId(node);
			}
			else {
				return u.nodeId(node);
			}
		}
	return "Unindentifiable node!";
}
Util.bug = function(message, corner, color) {
	if(u.debugURL()) {
		if(!u.bug_console_only) {
			var option, options = new Array([0, "auto", "auto", 0], [0, 0, "auto", "auto"], ["auto", 0, 0, "auto"], ["auto", "auto", 0, 0]);
			if(isNaN(corner)) {
				color = corner;
				corner = 0;
			}
			if(typeof(color) != "string") {
				color = "black";
			}
			option = options[corner];
			if(!u.qs("#debug_id_"+corner)) {
				var d_target = u.ae(document.body, "div", {"class":"debug_"+corner, "id":"debug_id_"+corner});
				d_target.style.position = u.bug_position ? u.bug_position : "absolute";
				d_target.style.zIndex = 16000;
				d_target.style.top = option[0];
				d_target.style.right = option[1];
				d_target.style.bottom = option[2];
				d_target.style.left = option[3];
				d_target.style.backgroundColor = u.bug_bg ? u.bug_bg : "#ffffff";
				d_target.style.color = "#000000";
				d_target.style.textAlign = "left";
				if(d_target.style.maxWidth) {
					d_target.style.maxWidth = u.bug_max_width ? u.bug_max_width+"px" : "auto";
				}
				d_target.style.padding = "3px";
			}
			if(typeof(message) != "string") {
				message = message.toString();
			}
			u.ae(u.qs("#debug_id_"+corner), "div", ({"style":"color: " + color})).innerHTML = message ? message.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/&lt;br&gt;/g, "<br>") : "Util.bug with no message?";
		}
		if(typeof(console) == "object") {
			console.log(message);
		}
	}
}
Util.xInObject = function(object) {
	if(u.debugURL()) {
		var x, s = "--- start object ---<br>";
		for(x in object) {
			if(object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) == "string") {
				s += x + "=" + object[x]+" -> " + u.nodeId(object[x], 1) + "<br>";
			}
			else if(object[x] && typeof(object[x]) == "function") {
				s += x + "=function<br>";
			}
			else {
				s += x + "=" + object[x]+"<br>";
			}
		}
		s += "--- end object ---"
		u.bug(s);
	}
}
Util.Animation = u.a = new function() {
	this.support3d = function() {
		if(this._support3d === undefined) {
			var node = document.createElement("div");
			try {
				var test = "translate3d(10px, 10px, 10px)";
				node.style[this.variant() + "Transform"] = test;
				if(node.style[this.variant() + "Transform"] == test) {
					this._support3d = true;
				}
				else {
					this._support3d = false;
				}
			}
			catch(exception) {
				this._support3d = false;
			}
		}
		return this._support3d;
	}
	this.variant = function() {
		if(this._variant === undefined) {
			if(document.body.style.webkitTransform != undefined) {
				this._variant = "webkit";
			}
			else if(document.body.style.MozTransform != undefined) {
				this._variant = "Moz";
			}
			else if(document.body.style.oTransform != undefined) {
				this._variant = "o";
			}
			else if(document.body.style.msTransform != undefined) {
				this._variant = "ms";
			}
			else {
				this._variant = "";
			}
		}
		return this._variant;
	}
	this.transition = function(node, transition) {
		try {		
			node.style[this.variant() + "Transition"] = transition;
			if(this.variant() == "Moz") {
				u.e.addEvent(node, "transitionend", this._transitioned);
			}
			else {
				u.e.addEvent(node, this.variant() + "TransitionEnd", this._transitioned);
			}
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
			}
			else {
				node.duration = false;
				if(transition.match(/none/i)) {
					node.transitioned = null;
				}
			}
		}
		catch(exception) {
			u.bug("Exception ("+exception+") in u.a.transition(" + node + "), called from: "+arguments.callee.caller);
		}
	}
	this._transitioned = function(event) {
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
	this.removeTransform = function(node) {
		node.style[this.variant() + "Transform"] = "none";
	}
	this.translate = function(node, x, y) {
		if(this.support3d()) {
			node.style[this.variant() + "Transform"] = "translate3d("+x+"px, "+y+"px, 0)";
		}
		else {
			node.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px)";
		}
		node._x = x;
		node._y = y;
		node.offsetHeight;
	}
	this.rotate = function(node, deg) {
		node.style[this.variant() + "Transform"] = "rotate("+deg+"deg)";
		node._rotation = deg;
		node.offsetHeight;
	}
	this.scale = function(node, scale) {
		node.style[this.variant() + "Transform"] = "scale("+scale+")";
		node._scale = scale;
		node.offsetHeight;
	}
	this.setOpacity = function(node, opacity) {
		node.style.opacity = opacity;
		node._opacity = opacity;
		node.offsetHeight;
	}
	this.setWidth = function(node, width) {
		width = width.toString().match(/\%|auto|px/) ? width : (width + "px");
		node.style.width = width;
		node._width = width;
		node.offsetHeight;
	}
	this.setHeight = function(node, height) {
		height = height.toString().match(/\%|auto|px/) ? height : (height + "px");
		node.style.height = height;
		node._height = height;
		node.offsetHeight;
	}
	this.setBgPos = function(node, x, y) {
		x = x.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? x : (x + "px");
		y = y.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? y : (y + "px");
		node.style.backgroundPosition = x + " " + y;
		node._bg_x = x;
		node._bg_y = y;
		node.offsetHeight;
	}
	this.setBgColor = function(node, color) {
		node.style.backgroundColor = color;
		node._bg_color = color;
		node.offsetHeight;
	}
}
Util.saveCookie = function(name, value, options) {
	expiry = false;
	path = false;
	if(typeof(options) == "object") {
		var argument;
		for(argument in options) {
			switch(argument) {
				case "expiry"	: expiry	= (typeof(options[argument]) == "string" ? options[argument] : "Mon, 04-Apr-2020 05:00:00 GMT"); break;
				case "path"		: path		= options[argument]; break;
			}
		}
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +";" + (path ? "path="+path+";" : "") + (expiry ? "expires="+expiry+";" : "")
}
Util.getCookie = function(name) {
	var matches;
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.deleteCookie = function(name, options) {
	path = false;
	if(typeof(options) == "object") {
		var argument;
		for(argument in options) {
			switch(argument) {
				case "path"	: path	= options[argument]; break;
			}
		}
	}
	document.cookie = encodeURIComponent(name) + "=;" + (path ? "path="+path+";" : "") + "expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.saveNodeCookie = function(node, name, value) {
	var ref = u.cookieReference(node);
	var mem = JSON.parse(u.getCookie("jes_mem"));
	if(!mem) {
		mem = {};
	}
	if(!mem[ref]) {
		mem[ref] = {};
	}
	mem[ref][name] = (value !== false && value !== undefined) ? value : "";
	u.saveCookie("jes_mem", JSON.stringify(mem), {"path":"/"});
}
Util.getNodeCookie = function(node, name) {
	var ref = u.cookieReference(node);
	var mem = JSON.parse(u.getCookie("jes_mem"));
	if(mem && mem[ref]) {
		if(name) {
			return mem[ref][name] ? mem[ref][name] : "";
		}
		else {
			return mem[ref];
		}
	}
	return false;
}
Util.deleteNodeCookie = function(node, name) {
	var ref = u.cookieReference(node);
	var mem = JSON.parse(u.getCookie("jes_mem"));
	if(mem && mem[ref]) {
		if(name) {
			delete mem[ref][name];
		}
		else {
			delete mem[ref];
		}
	}
	u.saveCookie("jes_mem", JSON.stringify(mem), {"path":"/"});
}
Util.cookieReference = function(node) {
	var ref;
	if(node.id) {
		ref = node.nodeName + "#" + node.id;
	}
	else {
		var id_node = node;
		while(!id_node.id) {
			id_node = id_node.parentNode;
		}
		if(id_node.id) {
			ref = id_node.nodeName + "#"+id_node.id + " " + (node.name ? (node.nodeName + "["+node.name+"]") : (node.className ? (node.nodeName+"."+node.className) : node.nodeName));
		}
	}
	return ref;
}
Util.date = function(format, timestamp, months) {
	var date = timestamp ? new Date(timestamp) : new Date();
	if(isNaN(date.getTime())) {
		if(!timestamp.match(/[A-Z]{3}\+[0-9]{4}/)) {
			if(timestamp.match(/ \+[0-9]{4}/)) {
				date = new Date(timestamp.replace(/ (\+[0-9]{4})/, " GMT$1"));
			}
		}
		if(isNaN(date.getTime())) {
			date = new Date();
		}
	}
	var tokens = /d|j|m|n|F|Y|G|H|i|s/g;
	var chars = new Object();
	chars.j = date.getDate();
	chars.d = (chars.j > 9 ? "" : "0") + chars.j;
	chars.n = date.getMonth()+1;
	chars.m = (chars.n > 9 ? "" : "0") + chars.n;
	chars.F = months ? months[date.getMonth()] : "";
	chars.Y = date.getFullYear();
	chars.G = date.getHours();
	chars.H = (chars.G > 9 ? "" : "0") + chars.G;
	var i = date.getMinutes();
	chars.i = (i > 9 ? "" : "0") + i;
	var s = date.getSeconds();
	chars.s = (s > 9 ? "" : "0") + s;
	return format.replace(tokens, function (_) {
		return _ in chars ? chars[_] : _.slice(1, _.length - 1);
	});
};
Util.querySelector = u.qs = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelectorAll(query);
}
Util.getElement = u.ge = function(identifier, scope) {
	var node, i, regexp;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; node = scope.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(node.className)) {
			return node;
		}
	}
	return scope.getElementsByTagName(identifier).length ? scope.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, scope) {
	var node, i, regexp;
	var nodes = new Array();
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; node = scope.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(node.className)) {
			nodes.push(node);
		}
	}
	return nodes.length ? nodes : scope.getElementsByTagName(identifier);
}
Util.parentNode = u.pn = function(node, node_type) {
	if(node_type) {
		if(node.parentNode) {
			var parent = node.parentNode;
		}
		while(parent.nodeName.toLowerCase() != node_type.toLowerCase()) {
			if(parent.parentNode) {
				parent = parent.parentNode;
			}
			else {
				return false;
			}
		}
		return parent;
	}
	else {
		return node.parentNode;
	}
}
Util.previousSibling = u.ps = function(node, exclude) {
	node = node.previousSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || exclude && (u.hc(node, exclude) || node.nodeName.toLowerCase().match(exclude)))) {
		node = node.previousSibling;
	}
	return node;
}
Util.nextSibling = u.ns = function(node, exclude) {
	node = node.nextSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || exclude && (u.hc(node, exclude) || node.nodeName.toLowerCase().match(exclude)))) {
		node = node.nextSibling;
	}
	return node;
}
Util.childNodes = u.cn = function(node, exclude) {
	var i, child;
	var children = new Array();
	for(i = 0; child = node.childNodes[i]; i++) {
		if(child && child.nodeType != 3 && child.nodeType != 8 && (!exclude || (!u.hc(child, exclude) && !child.nodeName.toLowerCase().match(exclude) ))) {
			children.push(child);
		}
	}
	return children;
}
Util.appendElement = u.ae = function(parent, node_type, attributes) {
	try {
		var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
		node = parent.appendChild(node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute]
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
		u.bug("node:" + u.nodeId(parent, 1));
		u.xInObject(attributes);
	}
	return false;
}
Util.insertElement = u.ie = function(parent, node_type, attributes) {
	try {
		var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
		node = parent.insertBefore(node, parent.firstChild);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ie, called from: "+arguments.callee.caller);
		u.bug("node:" + u.nodeId(parent, 1));
		u.xInObject(attributes);
	}
	return false;
}
Util.wrapElement = u.we = function(node, node_type, attributes) {
	try {
		var wrapper_node = node.parentNode.insertBefore(document.createElement(node_type), node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		wrapper_node.appendChild(node);
		return wrapper_node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.we, called from: "+arguments.callee.caller);
		u.bug("node:" + u.nodeId(node, 1));
		u.xInObject(attributes);
	}
	return false;
}
Util.textContent = u.text = function(node) {
	return node.textContent;
}
Util.clickableElement = u.ce = function(node) {
	var a = (node.nodeName.toLowerCase() == "a" ? node : u.qs("a", node));
	if(a) {
		u.ac(node, "link");
		if(a.getAttribute("href") !== null) {
			node.url = a.href;
			a.removeAttribute("href");
		}
	}
	if(typeof(u.e.click) == "function") {
		u.e.click(node);
	}
	return node;
}
u.link = u.ce;
Util.classVar = u.cv = function(node, var_name) {
	try {
		var regexp = new RegExp(var_name + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
		if(node.className.match(regexp)) {
			return node.className.match(regexp)[0].replace(var_name + ":", "");
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.cv, called from: "+arguments.callee.caller);
	}
	return false;
}
u.getIJ = u.cv;
Util.setClass = u.sc = function(node, classname) {
	try {
		var old_class = node.className;
		node.className = classname;
		node.offsetTop;
		return old_class;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.setClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.hasClass = u.hc = function(node, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
			if(regexp.test(node.className)) {
				return true;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.hasClass("+u.nodeId(node)+"), called from: "+arguments.callee.caller);
	}
	return false;
}
Util.addClass = u.ac = function(node, classname, dom_update) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$)");
			if(!regexp.test(node.className)) {
				node.className += node.className ? " " + classname : classname;
				dom_update === false ? false : node.offsetTop;
			}
			return node.className;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.addClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.removeClass = u.rc = function(node, classname, dom_update) {
	try {
		if(classname) {
			var regexp = new RegExp("(\\b)" + classname + "(\\s|$)", "g");
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
			dom_update === false ? false : node.offsetTop;
			return node.className;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.toggleClass = u.tc = function(node, classname, _classname, dom_update) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(node.className)) {
			u.rc(node, classname, false);
			if(_classname) {
				u.ac(node, _classname, false);
			}
		}
		else {
			u.ac(node, classname, false);
			if(_classname) {
				u.rc(node, _classname, false);
			}
		}
		dom_update === false ? false : node.offsetTop;
		return node.className;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.toggleClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.applyStyle = u.as = function(node, property, value, dom_update) {
	try {
		node.style[property] = value;
		dom_update === false ? false : node.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.applyStyle("+u.nodeId(node)+", "+property+", "+value+") called from: "+arguments.callee.caller);
	}
}
Util.getComputedStyle = u.gcs = function(node, property) {
	node.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(node, null).getPropertyValue(property);
	}
	return false;
}
Util.hasFixedParent = u.hfp = function(node) {
	while(node.nodeName.toLowerCase() != "body") {
		if(u.gcs(node.parentNode, "position").match("fixed")) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(node, type, action) {
		try {
			node.addEventListener(type, action, false);
		}
		catch(exception) {
			alert("exception in addEvent:" + node + "," + type + ":" + exception);
		}
	}
	this.removeEvent = function(node, type, action) {
		try {
			node.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.bug("exception in removeEvent:" + node + "," + type + ":" + exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(node, action) {
		u.e.addEvent(node, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.removeStartEvent = this.removeDownEvent = function(node, action) {
		u.e.removeEvent(node, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.addMoveEvent = function(node, action) {
		u.e.addEvent(node, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.removeMoveEvent = function(node, action) {
		u.e.removeEvent(node, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.addEndEvent = this.addUpEvent = function(node, action) {
		u.e.addEvent(node, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(node.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(node, "mouseout", this._snapback);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(node, action) {
		u.e.removeEvent(node, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(node.snapback && u.e.event_pref == "mouse") {
			u.e.removeEvent(node, "mouseout", this._snapback);
		}
	}
	this.resetClickEvents = function(node) {
		u.t.resetTimer(node.t_held);
		u.t.resetTimer(node.t_clicked);
		this.removeEvent(node, "mouseup", this._dblclicked);
		this.removeEvent(node, "touchend", this._dblclicked);
		this.removeEvent(node, "mousemove", this._clickCancel);
		this.removeEvent(node, "touchmove", this._clickCancel);
		this.removeEvent(node, "mousemove", this._move);
		this.removeEvent(node, "touchmove", this._move);
	}
	this.resetEvents = function(node) {
		this.resetClickEvents(node);
		if(typeof(this.resetDragEvents) == "function") {
			this.resetDragEvents(node);
		}
	}
	this.resetNestedEvents = function(node) {
		while(node && node.nodeName != "HTML") {
			this.resetEvents(node);
			node = node.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = event.timeStamp;
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			var node = this;
			while(node) {
				if(node.e_drag || node.e_swipe) {
					u.e.addMoveEvent(this, u.e._cancelClick);
					break;
				}
				else {
					node = node.parentNode;
				}
			}
			u.e.addMoveEvent(this, u.e._move);
			if(u.e.event_pref == "touch") {
				u.e.addMoveEvent(this, u.e._cancelClick);
			}
			u.e.addEndEvent(this, u.e._dblclicked);
			if(u.e.event_pref == "mouse") {
				u.e.addEvent(this, "mouseout", u.e._cancelClick);
			}
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.addMoveEvent(this, u.e._pick);
			u.e.addEndEvent(this, u.e._drop);
		}
		if(this.e_scroll) {
			u.e.addMoveEvent(this, u.e._scrollStart);
			u.e.addEndEvent(this, u.e._scrollEnd);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		u.e.resetClickEvents(this);
		if(typeof(this.clickCancelled) == "function") {
			this.clickCancelled(event);
		}
	}
	this._move = function(event) {
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this.hold = function(node) {
		node.e_hold = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._held = function(event) {
		u.stats.event(this, "held");
		u.e.resetNestedEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(node) {
		node.e_click = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._clicked = function(event) {
		u.stats.event(this, "clicked");
		u.e.resetNestedEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(node) {
		node.e_dblclick = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			u.stats.event(this, "dblclicked");
			u.e.resetNestedEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(!event) {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
}
u.e.addDOMReadyEvent = function(action) {
	if(document.readyState && document.addEventListener) {
		if((document.readyState == "interactive" && !u.browser("ie")) || document.readyState == "complete" || document.readyState == "loaded") {
			action();
		}
		else {
			var id = u.randomString();
			window["DOMReady_" + id] = action;
			eval('window["_DOMReady_' + id + '"] = function() {window["DOMReady_'+id+'"](); u.e.removeEvent(document, "DOMContentLoaded", window["_DOMReady_' + id + '"])}');
			u.e.addEvent(document, "DOMContentLoaded", window["_DOMReady_" + id]);
		}
	}
	else {
		u.e.addOnloadEvent(action);
	}
}
u.e.addOnloadEvent = function(action) {
	if(document.readyState && (document.readyState == "complete" || document.readyState == "loaded")) {
		action();
	}
	else {
		var id = u.randomString();
		window["Onload_" + id] = action;
		eval('window["_Onload_' + id + '"] = function() {window["Onload_'+id+'"](); u.e.removeEvent(window, "load", window["_Onload_' + id + '"])}');
		u.e.addEvent(window, "load", window["_Onload_" + id]);
	}
}
u.e.addResizeEvent = function(node, action) {
}
u.e.removeResizeEvent = function(node, action) {
}
u.e.addScrollEvent = function(node, action) {
}
u.e.removeScrollEvent = function(node, action) {
}
u.e.resetDragEvents = function(node) {
	this.removeEvent(node, "mousemove", this._pick);
	this.removeEvent(node, "touchmove", this._pick);
	this.removeEvent(node, "mousemove", this._drag);
	this.removeEvent(node, "touchmove", this._drag);
	this.removeEvent(node, "mouseup", this._drop);
	this.removeEvent(node, "touchend", this._drop);
	this.removeEvent(node, "mouseout", this._drop_mouse);
	this.removeEvent(node, "mousemove", this._scrollStart);
	this.removeEvent(node, "touchmove", this._scrollStart);
	this.removeEvent(node, "mousemove", this._scrolling);
	this.removeEvent(node, "touchmove", this._scrolling);
	this.removeEvent(node, "mouseup", this._scrollEnd);
	this.removeEvent(node, "touchend", this._scrollEnd);
}
u.e.overlap = function(node, boundaries, strict) {
	if(boundaries.constructor.toString().match("Array")) {
		var boundaries_start_x = Number(boundaries[0]);
		var boundaries_start_y = Number(boundaries[1]);
		var boundaries_end_x = Number(boundaries[2]);
		var boundaries_end_y = Number(boundaries[3]);
	}
	else if(boundaries.constructor.toString().match("HTML")) {
		var boundaries_start_x = u.absX(boundaries) - u.absX(node);
		var boundaries_start_y =  u.absY(boundaries) - u.absY(node);
		var boundaries_end_x = Number(boundaries_start_x + boundaries.offsetWidth);
		var boundaries_end_y = Number(boundaries_start_y + boundaries.offsetHeight);
	}
	var node_start_x = Number(node._x);
	var node_start_y = Number(node._y);
	var node_end_x = Number(node_start_x + node.offsetWidth);
	var node_end_y = Number(node_start_y + node.offsetHeight);
	if(strict) {
		if(node_start_x >= boundaries_start_x && node_start_y >= boundaries_start_y && node_end_x <= boundaries_end_x && node_end_y <= boundaries_end_y) {
			return true;
		}
		else {
			return false;
		}
	} 
	else if(node_end_x < boundaries_start_x || node_start_x > boundaries_end_x || node_end_y < boundaries_start_y || node_start_y > boundaries_end_y) {
		return false;
	}
	return true;
}
u.e.drag = function(node, boundaries, settings) {
	node.e_drag = true;
	if(node.childNodes.length < 2 && node.innerHTML.trim() == "") {
		node.innerHTML = "&nbsp;";
	}
	node.drag_strict = true;
	node.drag_elastica = 0;
	node.drag_dropout = true;
	node.show_bounds = false;
	node.callback_picked = "picked";
	node.callback_moved = "moved";
	node.callback_dropped = "dropped";
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "strict"			: node.drag_strict			= settings[argument]; break;
				case "elastica"			: node.drag_elastica		= Number(settings[argument]); break;
				case "dropout"			: node.drag_dropout			= settings[argument]; break;
				case "show_bounds"		: node.show_bounds			= settings[argument]; break; 
				case "vertical_lock"	: node.vertical_lock		= settings[argument]; break;
				case "horizontal_lock"	: node.horizontal_lock		= settings[argument]; break;
				case "callback_picked"	: node.callback_picked		= settings[argument]; break;
				case "callback_moved"	: node.callback_moved		= settings[argument]; break;
				case "callback_dropped"	: node.callback_dropped		= settings[argument]; break;
			}
		}
	}
	if((boundaries.constructor && boundaries.constructor.toString().match("Array")) || (boundaries.scopeName && boundaries.scopeName != "HTML")) {
		node.start_drag_x = Number(boundaries[0]);
		node.start_drag_y = Number(boundaries[1]);
		node.end_drag_x = Number(boundaries[2]);
		node.end_drag_y = Number(boundaries[3]);
	}
	else if((boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		node.start_drag_x = u.absX(boundaries) - u.absX(node);
		node.start_drag_y = u.absY(boundaries) - u.absY(node);
		node.end_drag_x = node.start_drag_x + boundaries.offsetWidth;
		node.end_drag_y = node.start_drag_y + boundaries.offsetHeight;
	}
	if(node.show_bounds) {
		var debug_bounds = u.ae(document.body, "div", {"class":"debug_bounds"})
		debug_bounds.style.position = "absolute";
		debug_bounds.style.background = "red"
		debug_bounds.style.left = (u.absX(node) + node.start_drag_x - 1) + "px";
		debug_bounds.style.top = (u.absY(node) + node.start_drag_y - 1) + "px";
		debug_bounds.style.width = (node.end_drag_x - node.start_drag_x) + "px";
		debug_bounds.style.height = (node.end_drag_y - node.start_drag_y) + "px";
		debug_bounds.style.border = "1px solid white";
		debug_bounds.style.zIndex = 9999;
		debug_bounds.style.opacity = .5;
		if(document.readyState && document.readyState == "interactive") {
			debug_bounds.innerHTML = "WARNING - injected on DOMLoaded"; 
		}
		u.bug("node: "+u.nodeId(node)+" in (" + u.absX(node) + "," + u.absY(node) + "), (" + (u.absX(node)+node.offsetWidth) + "," + (u.absY(node)+node.offsetHeight) +")");
		u.bug("boundaries: (" + node.start_drag_x + "," + node.start_drag_y + "), (" + node.end_drag_x + ", " + node.end_drag_y + ")");
	}
	node._x = node._x ? node._x : 0;
	node._y = node._y ? node._y : 0;
	node.locked = ((node.end_drag_x - node.start_drag_x == node.offsetWidth) && (node.end_drag_y - node.start_drag_y == node.offsetHeight));
	node.only_vertical = (node.vertical_lock || (!node.locked && node.end_drag_x - node.start_drag_x == node.offsetWidth));
	node.only_horizontal = (node.horizontal_lock || (!node.locked && node.end_drag_y - node.start_drag_y == node.offsetHeight));
	u.e.addStartEvent(node, this._inputStart);
}
u.e._pick = function(event) {
	var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
	var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
	if((init_speed_x > init_speed_y && this.only_horizontal) || 
	   (init_speed_x < init_speed_y && this.only_vertical) ||
	   (!this.only_vertical && !this.only_horizontal)) {
		u.e.resetNestedEvents(this);
	    u.e.kill(event);
		this.move_timestamp = event.timeStamp;
		this.move_last_x = this._x;
		this.move_last_y = this._y;
		if(u.hasFixedParent(this)) {
			this.start_input_x = u.eventX(event) - this._x - u.scrollX(); 
			this.start_input_y = u.eventY(event) - this._y - u.scrollY();
		}
		else {
			this.start_input_x = u.eventX(event) - this._x; 
			this.start_input_y = u.eventY(event) - this._y;
		}
		this.current_xps = 0;
		this.current_yps = 0;
		u.a.transition(this, "none");
		u.e.addMoveEvent(this, u.e._drag);
		u.e.addEndEvent(this, u.e._drop);
		if(typeof(this[this.callback_picked]) == "function") {
			this[this.callback_picked](event);
		}
	}
	if(this.drag_dropout && u.e.event_pref == "mouse") {
		u.e.addEvent(this, "mouseout", u.e._drop_mouse);
	}
}
u.e._drag = function(event) {
	if(u.hasFixedParent(this)) {
		this.current_x = u.eventX(event) - this.start_input_x - u.scrollX();
		this.current_y = u.eventY(event) - this.start_input_y - u.scrollY();
	}
	else {
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
	}
	this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.move_timestamp = event.timeStamp;
	this.move_last_x = this.current_x;
	this.move_last_y = this.current_y;
	if(!this.locked && this.only_vertical) {
		this._y = this.current_y;
	}
	else if(!this.locked && this.only_horizontal) {
		this._x = this.current_x;
	}
	else if(!this.locked) {
		this._x = this.current_x;
		this._y = this.current_y;
	}
	if(this.e_swipe) {
		if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.only_horizontal)) {
			if(this.current_xps < 0) {
				this.swiped = "left";
			}
			else {
				this.swiped = "right";
			}
		}
		else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.only_vertical)) {
			if(this.current_yps < 0) {
				this.swiped = "up";
			}
			else {
				this.swiped = "down";
			}
		}
	}
	if(!this.locked) {
		if(u.e.overlap(this, [this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y], true)) {
			u.a.translate(this, this._x, this._y);
		}
		else if(this.drag_elastica) {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			var offset = false;
			if(!this.only_vertical && this._x < this.start_drag_x) {
				offset = this._x < this.start_drag_x - this.drag_elastica ? - this.drag_elastica : this._x - this.start_drag_x;
				this._x = this.start_drag_x;
				this.current_x = this._x + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.only_vertical && this._x + this.offsetWidth > this.end_drag_x) {
				offset = this._x + this.offsetWidth > this.end_drag_x + this.drag_elastica ? this.drag_elastica : this._x + this.offsetWidth - this.end_drag_x;
				this._x = this.end_drag_x - this.offsetWidth;
				this.current_x = this._x + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_x = this._x;
			}
			if(!this.only_horizontal && this._y < this.start_drag_y) {
				offset = this._y < this.start_drag_y - this.drag_elastica ? - this.drag_elastica : this._y - this.start_drag_y;
				this._y = this.start_drag_y;
				this.current_y = this._y + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.horizontal && this._y + this.offsetHeight > this.end_drag_y) {
				offset = (this._y + this.offsetHeight > this.end_drag_y + this.drag_elastica) ? this.drag_elastica : (this._y + this.offsetHeight - this.end_drag_y);
				this._y = this.end_drag_y - this.offsetHeight;
				this.current_y = this._y + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_y = this._y;
			}
			if(offset) {
				u.a.translate(this, this.current_x, this.current_y);
			}
		}
		else {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			if(this._x < this.start_drag_x) {
				this._x = this.start_drag_x;
			}
			else if(this._x + this.offsetWidth > this.end_drag_x) {
				this._x = this.end_drag_x - this.offsetWidth;
			}
			if(this._y < this.start_drag_y) {
				this._y = this.start_drag_y;
			}
			else if(this._y + this.offsetHeight > this.end_drag_y) { 
				this._y = this.end_drag_y - this.offsetHeight;
			}
			u.a.translate(this, this._x, this._y);
		}
	}
	if(typeof(this[this.callback_moved]) == "function") {
		this[this.callback_moved](event);
	}
}
u.e._drop = function(event) {
	u.e.resetEvents(this);
	if(this.e_swipe && this.swiped) {
		if(this.swiped == "left" && typeof(this.swipedLeft) == "function") {
			this.swipedLeft(event);
		}
		else if(this.swiped == "right" && typeof(this.swipedRight) == "function") {
			this.swipedRight(event);
		}
		else if(this.swiped == "down" && typeof(this.swipedDown) == "function") {
			this.swipedDown(event);
		}
		else if(this.swiped == "up" && typeof(this.swipedUp) == "function") {
			this.swipedUp(event);
		}
	}
	else if(!this.drag_strict && !this.locked) {
		this.current_x = Math.round(this._x + (this.current_xps/2));
		this.current_y = Math.round(this._y + (this.current_yps/2));
		if(this.only_vertical || this.current_x < this.start_drag_x) {
			this.current_x = this.start_drag_x;
		}
		else if(this.current_x + this.offsetWidth > this.end_drag_x) {
			this.current_x = this.end_drag_x - this.offsetWidth;
		}
		if(this.only_horizontal || this.current_y < this.start_drag_y) {
			this.current_y = this.start_drag_y;
		}
		else if(this.current_y + this.offsetHeight > this.end_drag_y) {
			this.current_y = this.end_drag_y - this.offsetHeight;
		}
		this.transitioned = function() {
			this.transitioned = null;
			u.a.transition(this, "none");
			if(typeof(this.projected) == "function") {
				this.projected(event);
			}
		}
		if(this.current_xps || this.current_yps) {
			u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
		}
		else {
			u.a.transition(this, "all 0.2s cubic-bezier(0,0,0.25,1)");
		}
		u.a.translate(this, this.current_x, this.current_y);
	}
	if(typeof(this[this.callback_dropped]) == "function") {
		this[this.callback_dropped](event);
	}
}
u.e._drop_mouse = function(event) {
	if(event.target == this) {
		this._drop = u.e._drop;
		this._drop(event);
	}
}
u.e.swipe = function(node, boundaries, settings) {
	node.e_swipe = true;
	u.e.drag(node, boundaries, settings);
}
u.e.scroll = function(e) {
	e.e_scroll = true;
	e._x = e._x ? e._x : 0;
	e._y = e._y ? e._y : 0;
	u.e.addStartEvent(e, this._inputStart);
}
u.e._scrollStart = function(event) {
	u.e.resetNestedEvents(this);
	this.move_timestamp = new Date().getTime();
	this.current_xps = 0;
	this.current_yps = 0;
	this.start_input_x = u.eventX(event) - this._x;
	this.start_input_y = u.eventY(event) - this._y;
	u.a.transition(this, "none");
	if(typeof(this.picked) == "function") {
		this.picked(event);
	}
	u.e.addMoveEvent(this, u.e._scrolling);
	u.e.addEndEvent(this, u.e._scrollEnd);
}
u.e._scrolling = function(event) {
	this.new_move_timestamp = new Date().getTime();
	this.current_x = u.eventX(event) - this.start_input_x;
	this.current_y = u.eventY(event) - this.start_input_y;
	this.current_xps = Math.round(((this.current_x - this._x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this._y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
	this.move_timestamp = this.new_move_timestamp;
	if(u.scrollY() > 0 && -(this.current_y) + u.scrollY() > 0) {
		u.e.kill(event);
		window.scrollTo(0, -(this.current_y) + u.scrollY());
	}
	if(typeof(this.moved) == "function") {
		this.moved(event);
	}
}
u.e._scrollEnd = function(event) {
	u.e.resetEvents(this);
	if(typeof(this.dropped) == "function") {
		this.dropped(event);
	}
}
u.e.beforeScroll = function(node) {
	node.e_beforescroll = true;
	u.e.addStartEvent(node, this._inputStartDrag);
}
u.e._inputStartDrag = function() {
	u.e.addMoveEvent(this, u.e._beforeScroll);
}
u.e._beforeScroll = function(event) {
	u.e.removeMoveEvent(this, u.e._beforeScroll);
	if(typeof(this.picked) == "function") {
		this.picked(event);
	}
}
Util.flashDetection = function(version) {
	var flash_version = false;
	var flash = false;
	if(navigator.plugins && navigator.plugins["Shockwave Flash"] && navigator.plugins["Shockwave Flash"].description && navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) {
		flash = true;
		var Pversion = navigator.plugins["Shockwave Flash"].description.match(/\b([\d]+)\b/);
		if(Pversion.length > 1 && !isNaN(Pversion[1])) {
			flash_version = Pversion[1];
		}
	}
	else if(window.ActiveXObject) {
		try {
			var AXflash, AXversion;
			AXflash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			if(AXflash) {
				flash = true;
				AXversion = AXflash.GetVariable("$version").match(/\b([\d]+)\b/);
				if(AXversion.length > 1 && !isNaN(AXversion[1])) {
					flash_version = AXversion[1];
				}
			}
		}
		catch(exception) {}
	}
	if(flash_version || (flash && !version)) {
		if(!version) {
			return true;
		}
		else {
			if(!isNaN(version)) {
				return flash_version == version;
			}
			else {
				return eval(flash_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.flash = function(node, url, settings) {
	var width = "100%";
	var height = "100%";
	var background = "transparent";
	var id = "flash_" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getMilliseconds();
	var allowScriptAccess = "always";
	var menu = "false";
	var scale = "showall";
	var wmode = "transparent";
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "id"					: id				= settings[argument]; break;
				case "width"				: width				= Number(settings[argument]); break;
				case "height"				: height			= Number(settings[argument]); break;
				case "background"			: background		= settings[argument]; break;
				case "allowScriptAccess"	: allowScriptAccess = settings[argument]; break;
				case "menu"					: menu				= settings[argument]; break;
				case "scale"				: scale				= settings[argument]; break;
				case "wmode"				: wmode				= settings[argument]; break;
			}
		}
	}
	html = '<object';
	html += ' id="'+id+'"';
	html += ' width="'+width+'"';
	html += ' height="'+height+'"';
	if(u.browser("explorer")) {
		html += ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
	}
	else {
		html += ' type="application/x-shockwave-flash"';
		html += ' data="'+url+'"';
	}
	html += '>';
	html += '<param name="allowScriptAccess" value="'+allowScriptAccess+'" />';
	html += '<param name="movie" value="'+url+'" />';
	html += '<param name="quality" value="high" />';
	html += '<param name="bgcolor" value="'+background+'" />';
	html += '<param name="play" value="true" />';
	html += '<param name="wmode" value="'+wmode+'" />';
	html += '<param name="menu" value="'+menu+'" />';
	html += '<param name="scale" value="'+scale+'" />';
	html += '</object>';
	var temp_node = document.createElement("div");
	temp_node.innerHTML = html;
	node.insertBefore(temp_node.firstChild, node.firstChild);
	var flash_object = u.qs("#"+id, node);
	return flash_object;
}
Util.Form = u.f = new function() {
	this.customInit = {};
	this.customValidate = {};
	this.customSend = {};
	this.init = function(form, settings) {
		var i, j, field, action, input;
		form.form_send = "params";
		form.ignore_inputs = "ignoreinput";
		if(typeof(settings) == "object") {
			var argument;
			for(argument in settings) {
				switch(argument) {
					case "ignore_inputs"	: form.ignore_inputs	= settings[argument]; break;
					case "form_send"		: form.form_send		= settings[argument]; break;
				}
			}
		}
		form.onsubmit = function(event) {return false;}
		form.setAttribute("novalidate", "novalidate");
		form._submit = this._submit;
		form.fields = {};
		form.tab_order = [];
		form.actions = {};
		var fields = u.qsa(".field", form);
		for(i = 0; field = fields[i]; i++) {
			var abbr = u.qs("abbr", field);
			if(abbr) {
				abbr.parentNode.removeChild(abbr);
			}
			var error_message = field.getAttribute("data-error");
			if(error_message) {
				u.ae(field, "div", {"class":"error", "html":error_message})
			}
			field._indicator = u.ae(field, "div", {"class":"indicator"});
			field._label = u.qs("label", field);
			field._hint = u.qs(".hint", field);
			field._error = u.qs(".error", field);
			var not_initialized = true;
			var custom_init;
			for(custom_init in this.customInit) {
				if(field.className.match(custom_init)) {
					this.customInit[custom_init](field);
					not_initialized = false;
				}
			}
			if(not_initialized) {
				if(u.hc(field, "string|email|tel|number|integer|password")) {
					field._input = u.qs("input", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "text")) {
					field._input = u.qs("textarea", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "select")) {
					field._input = u.qs("select", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "checkbox|boolean")) {
					field._input = u.qs("input[type=checkbox]", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "radio|radio_buttons")) {
					field._input = u.qsa("input", field);
					for(j = 0; input = field._input[j]; j++) {
						input.field = field;
						this.formIndex(form, input);
					}
				}
				else if(u.hc(field, "date|datetime")) {
					field._input = u.qsa("select,input", field);
					for(j = 0; input = field._input[j]; j++) {
						input.field = field;
						this.formIndex(form, input);
					}
				}
				else if(u.hc(field, "tags")) {
					field._input = u.qs("input", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "prices")) {
					field._input = u.qs("input", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
				else if(u.hc(field, "files")) {
					field._input = u.qs("input", field);
					field._input.field = field;
					this.formIndex(form, field._input);
				}
			}
		}
		var hidden_fields = u.qsa("input[type=hidden]", form);
		for(i = 0; hidden_field = hidden_fields[i]; i++) {
			if(!form.fields[hidden_field.name]) {
				form.fields[hidden_field.name] = hidden_field;
				hidden_field.val = this._value;
			}
		}
		var actions = u.qsa(".actions li", form);
		for(i = 0; action = actions[i]; i++) {
			action._input = u.qs("input,a", action);
			if(action._input.type && action._input.type == "submit") {
				action._input.onclick = function(event) {
					u.e.kill(event ? event : window.event);
				}
			}
			u.ce(action._input);
			action._input.clicked = function(event) {
				u.e.kill(event);
				if(!u.hc(this, "disabled")) {
					if(this.type && this.type.match(/submit/i)) {
						this.form._submit_button = this;
						this.form._submit_input = false;
						this.form._submit(event, this);
					}
				}
			}
			this.buttonOnEnter(action._input);
			this.activateButton(action._input);
			var action_name = action._input.name ? action._input.name : action.className;
				form.actions[action_name] = action._input;
			if(typeof(u.k) == "object" && u.hc(action._input, "key:[a-z0-9]+")) {
				u.k.addKey(u.cv(action._input, "key"), action._input);
			}
		}
	}
	this._value = function(value) {
		if(value !== undefined) {
			this.value = value;
			u.f.validate(this);
		}
		return this.value;
	}
	this._value_radio = function(value) {
		if(value) {
			for(i = 0; option = this.form[this.name][i]; i++) {
				if(option.value == value) {
					option.checked = true;
					u.f.validate(this);
				}
			}
		}
		else {
			var i, option;
			for(i = 0; option = this.form[this.name][i]; i++) {
				if(option.checked) {
					return option.value;
				}
			}
		}
		return false;
	}
	this._value_checkbox = function(value) {
		if(value) {
			this.checked = true
			u.f.validate(this);
		}
		else {
			if(this.checked) {
				return this.value;
			}
		}
		return false;
	}
	this._value_select = function(value) {
		if(value !== undefined) {
			var i, option;
			for(i = 0; option = this.options[i]; i++) {
				if(option.value == value) {
					this.selectedIndex = i;
					u.f.validate(this);
					return i;
				}
			}
			return false;
		}
		else {
			return this.options[this.selectedIndex].value;
		}
	}
	this.inputOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(this.nodeName.match(/input/i) && (event.keyCode == 40 || event.keyCode == 38)) {
				this._submit_disabled = true;
			}
			else if(this.nodeName.match(/input/i) && this._submit_disabled && (
				event.keyCode == 46 || 
				(event.keyCode == 39 && u.browser("firefox")) || 
				(event.keyCode == 37 && u.browser("firefox")) || 
				event.keyCode == 27 || 
				event.keyCode == 13 || 
				event.keyCode == 9 ||
				event.keyCode == 8
			)) {
				this._submit_disabled = false;
			}
			else if(event.keyCode == 13 && !this._submit_disabled) {
				u.e.kill(event);
				this.form.submitInput = this;
				this.form.submitButton = false;
				this.form._submit(event, this);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.buttonOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(event.keyCode == 13 && !u.hc(this, "disabled")) {
				u.e.kill(event);
				this.form.submit_input = false;
				this.form.submit_button = this;
				this.form._submit(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.formIndex = function(form, iN) {
		iN.tab_index = form.tab_order.length;
		form.tab_order[iN.tab_index] = iN;
		if(iN.field && iN.name) {
			form.fields[iN.name] = iN;
			if(iN.nodeName.match(/input/i) && iN.type && iN.type.match(/text|email|tel|number|password|datetime|date/)) {
				iN.val = this._value;
				u.e.addEvent(iN, "keyup", this._updated);
				u.e.addEvent(iN, "change", this._changed);
				this.inputOnEnter(iN);
			}
			else if(iN.nodeName.match(/textarea/i)) {
				iN.val = this._value;
				u.e.addEvent(iN, "keyup", this._updated);
				u.e.addEvent(iN, "change", this._changed);
				if(u.hc(iN.field, "autoexpand")) {
					var current_height = parseInt(u.gcs(iN, "height"));
					u.bug(current_height + "," + iN.scrollHeight);
					var current_value = iN.val();
					iN.val("");
					u.bug(current_height + "," + iN.scrollHeight);
					u.as(iN, "overflow", "hidden");
					u.bug(current_height + "," + iN.scrollHeight);
					iN.autoexpand_offset = 0;
					if(parseInt(u.gcs(iN, "height")) != iN.scrollHeight) {
						iN.autoexpand_offset = iN.scrollHeight - parseInt(u.gcs(iN, "height"));
					}
					iN.val(current_value);
					iN.setHeight = function() {
						var textarea_height = parseInt(u.gcs(this, "height"));
						if(this.val()) {
							if(u.browser("webkit")) {
								if(this.scrollHeight - this.autoexpand_offset > textarea_height) {
									u.a.setHeight(this, this.scrollHeight);
								}
							}
							else if(u.browser("opera") || u.browser("explorer")) {
								if(this.scrollHeight > textarea_height) {
									u.a.setHeight(this, this.scrollHeight);
								}
							}
							else {
								u.a.setHeight(this, this.scrollHeight);
							}
						}
					}
					u.e.addEvent(iN, "keyup", iN.setHeight);
					iN.setHeight();
				}
			}
			else if(iN.nodeName.match(/select/i)) {
				iN.val = this._value_select;
				u.e.addEvent(iN, "change", this._updated);
				u.e.addEvent(iN, "keyup", this._updated);
				u.e.addEvent(iN, "change", this._changed);
			}
			else if(iN.type && iN.type.match(/checkbox/)) {
				iN.val = this._value_checkbox;
				if(u.browser("explorer", "<=8")) {
					iN.pre_state = iN.checked;
					iN._changed = u.f._changed;
					iN._updated = u.f._updated;
					iN._clicked = function(event) {
						if(this.checked != this.pre_state) {
							this._changed(window.event);
							this._updated(window.event);
						}
						this.pre_state = this.checked;
					}
					u.e.addEvent(iN, "click", iN._clicked);
				}
				else {
					u.e.addEvent(iN, "change", this._updated);
					u.e.addEvent(iN, "change", this._changed);
				}
				this.inputOnEnter(iN);
			}
			else if(iN.type && iN.type.match(/radio/)) {
				iN.val = this._value_radio;
				if(u.browser("explorer", "<=8")) {
					iN.pre_state = iN.checked;
					iN._changed = u.f._changed;
					iN._updated = u.f._updated;
					iN._clicked = function(event) {
						var i, input;
						if(this.checked != this.pre_state) {
							this._changed(window.event);
							this._updated(window.event);
						}
						for(i = 0; input = this.field._input[i]; i++) {
							input.pre_state = input.checked;
						}
					}
					u.e.addEvent(iN, "click", iN._clicked);
				}
				else {
					u.e.addEvent(iN, "change", this._updated);
					u.e.addEvent(iN, "change", this._changed);
				}
				this.inputOnEnter(iN);
			}
			else if(iN.type && iN.type.match(/file/)) {
				iN.val = function(value) {
					if(value !== undefined) {
						alert('adding values manually to input type="file" is not supported')
					}
					else {
						var i, file, files = [];
						for(i = 0; file = this.files[i]; i++) {
							files.push(file);
						}
						return files.join(",");
					}
				}
				u.e.addEvent(iN, "keyup", this._updated);
				u.e.addEvent(iN, "change", this._changed);
			}
			this.activateField(iN);
			this.validate(iN);
		}
	}
	this._changed = function(event) {
		this.used = true;
		if(typeof(this.changed) == "function") {
			this.changed(this);
		}
		if(typeof(this.form.changed) == "function") {
			this.form.changed(this);
		}
	}
	this._updated = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			if(this.used || u.hc(this.field, "error")) {
				u.f.validate(this);
			}
			if(typeof(this.updated) == "function") {
				this.updated(this);
			}
			if(typeof(this.form.updated) == "function") {
				this.form.updated(this);
			}
		}
	}
	this._validate = function() {
		u.f.validate(this);
	}
	this._submit = function(event, iN) {
		for(name in this.fields) {
			if(this.fields[name].field) {
				this.fields[name].used = true;
				u.f.validate(this.fields[name]);
			}
		}
		if(u.qs(".field.error", this)) {
			if(typeof(this.validationFailed) == "function") {
				this.validationFailed();
			}
		}
		else {
			if(typeof(this.submitted) == "function") {
				this.submitted(iN);
			}
			else {
				this.submit();
			}
		}
	}
	this._focus = function(event) {
		this.field.focused = true;
		u.ac(this.field, "focus");
		u.ac(this, "focus");
		if(typeof(this.focused) == "function") {
			this.focused();
		}
		if(typeof(this.form.focused) == "function") {
			this.form.focused(this);
		}
	}
	this._blur = function(event) {
		this.field.focused = false;
		u.rc(this.field, "focus");
		u.rc(this, "focus");
		this.used = true;
		if(typeof(this.blurred) == "function") {
			this.blurred();
		}
		if(typeof(this.form.blurred) == "function") {
			this.form.blurred(this);
		}
	}
	this._button_focus = function(event) {
		u.ac(this, "focus");
		if(typeof(this.focused) == "function") {
			this.focused();
		}
		if(typeof(this.form.focused) == "function") {
			this.form.focused(this);
		}
	}
	this._button_blur = function(event) {
		u.rc(this, "focus");
		if(typeof(this.blurred) == "function") {
			this.blurred();
		}
		if(typeof(this.form.blurred) == "function") {
			this.form.blurred(this);
		}
	}
	this._default_value_focus = function() {
		u.rc(this, "default");
		if(this.val() == this.default_value) {
			this.val("");
		}
	}
	this._default_value_blur = function() {
		if(this.val() == "") {
			u.ac(this, "default");
			this.val(this.default_value);
		}
	}
	this.activateField = function(iN) {
		u.e.addEvent(iN, "focus", this._focus);
		u.e.addEvent(iN, "blur", this._blur);
		u.e.addEvent(iN, "blur", this._validate);
		if(iN.form.labelstyle || u.hc(iN.form, "labelstyle:[a-z]+")) {
			iN.form.labelstyle = iN.form.labelstyle ? iN.form.labelstyle : u.cv(iN.form, "labelstyle");
			if(iN.form.labelstyle == "inject" && (!iN.type || !iN.type.match(/file|radio|checkbox/))) {
				iN.default_value = iN.field._label.innerHTML;
				u.e.addEvent(iN, "focus", this._default_value_focus);
				u.e.addEvent(iN, "blur", this._default_value_blur);
				if(iN.val() == "") {
					iN.val(iN.default_value);
					u.ac(iN, "default");
				}
			}
		}
	}
	this.activateButton = function(button) {
		u.e.addEvent(button, "focus", this._button_focus);
		u.e.addEvent(button, "blur", this._button_blur);
	}
 	this.isDefault = function(iN) {
		if(iN.default_value && iN.val() == iN.default_value) {
			return true;
		}
		return false;
	}
	this.fieldError = function(iN) {
		u.rc(iN, "correct");
		u.rc(iN.field, "correct");
		if(iN.used || !this.isDefault(iN) && iN.val()) {
			u.ac(iN, "error");
			u.ac(iN.field, "error");
			if(typeof(iN.validationFailed) == "function") {
				iN.validationFailed();
			}
		}
	}
	this.fieldCorrect = function(iN) {
		if(!this.isDefault(iN) && iN.val()) {
			u.ac(iN, "correct");
			u.ac(iN.field, "correct");
			u.rc(iN, "error");
			u.rc(iN.field, "error");
		}
		else {
			u.rc(iN, "correct");
			u.rc(iN.field, "correct");
			u.rc(iN, "error");
			u.rc(iN.field, "error");
		}
	}
	this.validate = function(iN) {
		var min, max, pattern;
		var not_validated = true;
		if(!u.hc(iN.field, "required") && (iN.val() == "" || this.isDefault(iN))) {
			this.fieldCorrect(iN);
			return true;
		}
		else if(u.hc(iN.field, "required") && (iN.val() == "" || this.isDefault(iN))) {
			this.fieldError(iN);
			return false;
		}
		var custom_validate;
		for(custom_validate in u.f.customValidate) {
			if(u.hc(iN.field, custom_validate)) {
				u.f.customValidate[custom_validate](iN);
				not_validated = false;
			}
		}
		if(not_validated) {
			if(u.hc(iN.field, "password")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 8;
				max = max ? max : 20;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "number")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "integer")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					Math.round(iN.val()) == iN.val() && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "tel")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\+0-9\-\.\s\(\)]){5,18}$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "email")) {
				if(
					!pattern && iN.val().match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "text")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "select")) {
				if(iN.val()) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "checkbox|boolean|radio|radio_buttons")) {
				if(iN.val()) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "string")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min &&
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "date")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2})$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "datetime")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2} [\d]{2}[\-\/\ \:]{1}[\d]{2}[\-\/\ \:]{0,1}[\d]{0,2})$/) ||
					(pattern && iN.val().match(pattern))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "tags")) {
				if(
					!pattern && iN.val().match(/\:/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "prices")) {
				if(
					!isNaN(iN.val())
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "files")) {
				if(
					1
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
		}
		if(u.hc(iN.field, "error")) {
			return false;
		}
		else {
			return true;
		}
	}
	this.getParams = function(form, settings) {
		var send_as = "params";
		var ignore_inputs = "ignoreinput";
		if(typeof(settings) == "object") {
			var argument;
			for(argument in settings) {
				switch(argument) {
					case "ignore_inputs"	: ignore_inputs		= settings[argument]; break;
					case "send_as"			: send_as			= settings[argument]; break;
				}
			}
		}
		var i, input, select, textarea, param;
			var params = new Object();
		if(form._submit_button && form._submit_button.name) {
			params[form._submit_button.name] = form._submit_button.value;
		}
		var inputs = u.qsa("input", form);
		var selects = u.qsa("select", form)
		var textareas = u.qsa("textarea", form)
		for(i = 0; input = inputs[i]; i++) {
			if(!u.hc(input, ignore_inputs)) {
				if((input.type == "checkbox" || input.type == "radio") && input.checked) {
					if(!this.isDefault(input)) {
						params[input.name] = input.value;
					}
				}
				else if(input.type == "file") {
					if(!this.isDefault(input)) {
						params[input.name] = input.value;
					}
				}
				else if(!input.type.match(/button|submit|reset|file|checkbox|radio/i)) {
					if(!this.isDefault(input)) {
						params[input.name] = input.value;
					}
				}
			}
		}
		for(i = 0; select = selects[i]; i++) {
			if(!u.hc(select, ignore_inputs)) {
				if(!this.isDefault(select)) {
					params[select.name] = select.options[select.selectedIndex].value;
				}
			}
		}
		for(i = 0; textarea = textareas[i]; i++) {
			if(!u.hc(textarea, ignore_inputs)) {
				if(!this.isDefault(textarea)) {
					params[textarea.name] = textarea.value;
				}
			}
		}
		if(send_as && typeof(this.customSend[send_as]) == "function") {
			return this.customSend[send_as](params, form);
		}
		else if(send_as == "json") {
			return u.f.convertNamesToJsonObject(params);
		}
		else if(send_as == "object") {
			return params;
		}
		else {
			var string = "";
			for(param in params) {
					string += (string ? "&" : "") + param + "=" + encodeURIComponent(params[param]);
			}
			return string;
		}
	}
}
u.f.convertNamesToJsonObject = function(params) {
 	var indexes, root, indexes_exsists, param;
	var object = new Object();
	for(param in params) {
	 	indexes_exsists = param.match(/\[/);
		if(indexes_exsists) {
			root = param.split("[")[0];
			indexes = param.replace(root, "");
			if(typeof(object[root]) == "undefined") {
				object[root] = new Object();
			}
			object[root] = this.recurseName(object[root], indexes, params[param]);
		}
		else {
			object[param] = params[param];
		}
	}
	return object;
}
u.f.recurseName = function(object, indexes, value) {
	var index = indexes.match(/\[([a-zA-Z0-9\-\_]+)\]/);
	var current_index = index[1];
	indexes = indexes.replace(index[0], "");
 	if(indexes.match(/\[/)) {
		if(object.length !== undefined) {
			var i;
			var added = false;
			for(i = 0; i < object.length; i++) {
				for(exsiting_index in object[i]) {
					if(exsiting_index == current_index) {
						object[i][exsiting_index] = this.recurseName(object[i][exsiting_index], indexes, value);
						added = true;
					}
				}
			}
			if(!added) {
				temp = new Object();
				temp[current_index] = new Object();
				temp[current_index] = this.recurseName(temp[current_index], indexes, value);
				object.push(temp);
			}
		}
		else if(typeof(object[current_index]) != "undefined") {
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
		else {
			object[current_index] = new Object();
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
	}
	else {
		object[current_index] = value;
	}
	return object;
}
Util.absoluteX = u.absX = function(node) {
	if(node.offsetParent) {
		return node.offsetLeft + u.absX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.absoluteY = u.absY = function(node) {
	if(node.offsetParent) {
		return node.offsetTop + u.absY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.relativeX = u.relX = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetLeft + u.relX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.relativeY = u.relY = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetTop + u.relY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.actualWidth = u.actualW = function(node) {
	return parseInt(u.gcs(node, "width"));
}
Util.actualHeight = u.actualH = function(node) {
	return parseInt(u.gcs(node, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.body.offsetWidth + parseInt(u.gcs(document.body, "margin-left")) + parseInt(u.gcs(document.body, "margin-right"));
}
Util.htmlHeight = u.htmlH = function() {
	return document.body.offsetHeight + parseInt(u.gcs(document.body, "margin-top")) + parseInt(u.gcs(document.body, "margin-bottom"));
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}
Util.Hash = u.h = new function() {
	this.catchEvent = function(callback, node) {
		this.node = node;
		this.node.callback = callback;
		hashChanged = function(event) {
			u.h.node.callback();
		}
		if("onhashchange" in window && !u.browser("explorer", "<=7")) {
			window.onhashchange = hashChanged;
		}
		else {
			u.current_hash = window.location.hash;
			window.onhashchange = hashChanged;
			setInterval(
				function() {
					if(window.location.hash !== u.current_hash) {
						u.current_hash = window.location.hash;
						window.onhashchange();
					}
				}, 200
			);
		}
	}
	this.cleanHash = function(string, levels) {
		if(!levels) {
			return string.replace(location.protocol+"//"+document.domain, "");
		}
		else {
			var i, return_string = "";
			var hash = string.replace(location.protocol+"//"+document.domain, "").split("/");
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanUrl = function(string, levels) {
		string = string.replace(location.protocol+"//"+document.domain, "").match(/[^#$]+/)[0];
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
}
Util.Objects = u.o = new Object();
Util.init = function(scope) {
	var i, node, nodes, object;
	scope = scope && scope.nodeName ? scope : document;
	nodes = u.ges("i\:([_a-zA-Z0-9])+");
	for(i = 0; node = nodes[i]; i++) {
		while((object = u.cv(node, "i"))) {
			u.rc(node, "i:"+object);
			if(object && typeof(u.o[object]) == "object") {
				u.o[object].init(node);
			}
		}
	}
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.numToHex = function(num) {
	return num.toString(16);
}
Util.hexToNum = function(hex) {
	return parseInt(hex,16);
}
Util.round = function(number, decimals) {
	var round_number = number*Math.pow(10, decimals);
	return Math.round(round_number)/Math.pow(10, decimals);
}
Util.period = function(format, time) {
	var seconds = 0;
	if(typeof(time) == "object") {
		var argument;
		for(argument in time) {
			switch(argument) {
				case "seconds"		: seconds = time[argument]; break;
				case "milliseconds" : seconds = Number(time[argument])/1000; break;
				case "minutes"		: seconds = Number(time[argument])*60; break;
				case "hours"		: seconds = Number(time[argument])*60*60 ; break;
				case "days"			: seconds = Number(time[argument])*60*60*24; break;
				case "months"		: seconds = Number(time[argument])*60*60*24*(365/12); break;
				case "years"		: seconds = Number(time[argument])*60*60*24*365; break;
			}
		}
	}
	var tokens = /y|n|o|O|w|W|c|d|e|D|g|h|H|l|m|M|r|s|S|t|T|u|U/g;
	var chars = new Object();
	chars.y = 0; 
	chars.n = 0; 
	chars.o = (chars.n > 9 ? "" : "0") + chars.n; 
	chars.O = 0; 
	chars.w = 0; 
	chars.W = 0; 
	chars.c = 0; 
	chars.d = 0; 
	chars.e = 0; 
	chars.D = Math.floor(((seconds/60)/60)/24);
	chars.g = Math.floor((seconds/60)/60)%24;
	chars.h = (chars.g > 9 ? "" : "0") + chars.g;
	chars.H = Math.floor((seconds/60)/60);
	chars.l = Math.floor(seconds/60)%60;
	chars.m = (chars.l > 9 ? "" : "0") + chars.l;
	chars.M = Math.floor(seconds/60);
	chars.r = Math.floor(seconds)%60;
	chars.s = (chars.r > 9 ? "" : "0") + chars.r;
	chars.S = Math.floor(seconds);
	chars.t = Math.round((seconds%1)*10);
	chars.T = Math.round((seconds%1)*100);
	chars.T = (chars.T > 9 ? "": "0") + Math.round(chars.T);
	chars.u = Math.round((seconds%1)*1000);
	chars.u = (chars.u > 9 ? chars.u > 99 ? "" : "0" : "00") + Math.round(chars.u);
	chars.U = Math.round(seconds*1000);
	return format.replace(tokens, function (_) {
		return _ in chars ? chars[_] : _.slice(1, _.length - 1);
	});
};
Util.popup = function(url, settings) {
	var width = "330";
	var height = "150";
	var name = "popup" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getMilliseconds();
	var extra = "";
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "name"		: name		= settings[argument]; break;
				case "width"	: width		= Number(settings[argument]); break;
				case "height"	: height	= Number(settings[argument]); break;
				case "extra"	: extra		= settings[argument]; break;
			}
		}
	}
	var p;
	p = "width=" + width + ",height=" + height;
	p += ",left=" + (screen.width-width)/2;
	p += ",top=" + ((screen.height-height)-20)/2;
	p += extra ? "," + extra : ",scrollbars";
	document[name] = window.open(url, name, p);
	return document[name];
}
Util.createRequestObject = u.createRequestObject = function() {
	return new XMLHttpRequest();
}
Util.Request = u.request = function(node, url, settings) {
	node.request_url = url;
	node.request_method = "GET";
	node.request_async = true;
	node.request_params = "";
	node.request_headers = false;
	node.response_callback = "response";
	if(typeof(settings) == "object") {
		var argument;
		for(argument in settings) {
			switch(argument) {
				case "method"		: node.request_method		= settings[argument]; break;
				case "params"		: node.request_params		= settings[argument]; break;
				case "async"		: node.request_async		= settings[argument]; break;
				case "headers"		: node.request_headers		= settings[argument]; break;
				case "callback"		: node.response_callback	= settings[argument]; break;
			}
		}
	}
	if(node.request_method.match(/GET|POST|PUT|PATCH/i)) {
		node.HTTPRequest = this.createRequestObject();
		node.HTTPRequest.node = node;
		if(node.request_async) {
			node.HTTPRequest.onreadystatechange = function() {
				if(this.readyState == 4) {
					u.validateResponse(this);
				}
			}
		}
		try {
			if(node.request_method.match(/GET/i)) {
				var params = u.JSONtoParams(node.request_params);
				node.request_url += params ? ((!node.request_url.match(/\?/g) ? "?" : "&") + params) : "";
				node.HTTPRequest.open(node.request_method, node.request_url, node.request_async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node.HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				if(typeof(node.request_headers) == "object") {
					var header;
					for(header in node.request_headers) {
						node.HTTPRequest.setRequestHeader(header, node.request_headers[header]);
					}
				}
				node.HTTPRequest.send("");
			}
			else if(node.request_method.match(/POST|PUT|PATCH/i)) {
				var params;
				if(typeof(node.request_params) == "object" && !node.request_params.constructor.toString().match(/FormData/i)) {
					params = JSON.stringify(node.request_params);
				}
				else {
					params = node.request_params;
				}
				node.HTTPRequest.open(node.request_method, node.request_url, node.request_async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node.HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				if(typeof(node.request_headers) == "object") {
					var header;
					for(header in node.request_headers) {
						node.HTTPRequest.setRequestHeader(header, node.request_headers[header]);
					}
				}
				node.HTTPRequest.send(params);
			}
		}
		catch(exception) {
			node.HTTPRequest.exception = exception;
			u.validateResponse(node.HTTPRequest);
			return;
		}
		if(!node.request_async) {
			u.validateResponse(node.HTTPRequest);
		}
	}
	else if(node.request_method.match(/SCRIPT/i)) {
		var key = u.randomString();
		document[key] = new Object();
		document[key].node = node;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.responseText = response;
			u.validateResponse(response_object);
		}
		var params = u.JSONtoParams(node.request_params);
		node.request_url += params ? ((!node.request_url.match(/\?/g) ? "?" : "&") + params) : "";
		node.request_url += (!node.request_url.match(/\?/g) ? "?" : "&") + "callback=document."+key+".responder";
		u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node.request_url}));
	}
}
Util.JSONtoParams = function(json) {
	if(typeof(json) == "object") {
		var params = "", param;
		for(param in json) {
			params += (params ? "&" : "") + param + "=" + json[param];
		}
		return params
	}
	var object = u.isStringJSON(json);
	if(object) {
		return u.JSONtoParams(object);
	}
	return json;
}
Util.isStringJSON = function(string) {
	if(string.trim().substr(0, 1).match(/[\{\[]/i) && string.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = JSON.parse(string);
			if(typeof(test) == "object") {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.isStringHTML = function(string) {
	if(string.trim().substr(0, 1).match(/[\<]/i) && string.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = string;
			if(test.childNodes.length) {
				var body_class = string.match(/<body class="([a-z0-9A-Z_: ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = string.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.evaluateResponseText = function(responseText) {
	var object;
	if(typeof(responseText) == "object") {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		var response_string;
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
			response_string = responseText.trim().substr(1, responseText.trim().length-2);
		}
		else {
			response_string = responseText;
		}
		var json = u.isStringJSON(response_string);
		if(json) {
			return json;
		}
		var html = u.isStringHTML(response_string);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(response){
	var object = false;
	if(response) {
		try {
			if(response.status && !response.status.toString().match(/403|404|500/)) {
				object = u.evaluateResponseText(response.responseText);
			}
			else if(response.responseText) {
				object = u.evaluateResponseText(response.responseText);
			}
		}
		catch(exception) {
			response.exception = exception;
		}
	}
	if(object) {
		if(typeof(response.node[response.node.response_callback]) == "function") {
			response.node[response.node.response_callback](object);
		}
	}
	else {
		if(typeof(response.node.ResponseError) == "function") {
			response.node.ResponseError(response);
		}
		if(typeof(response.node.responseError) == "function") {
			response.node.responseError(response);
		}
	}
}
Util.cutString = function(string, length) {
	var matches, match, i;
	if(string.length <= length) {
		return string;
	}
	else {
		length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; match = matches[i]; i++){
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.prefix = function(string, length, prefix) {
	string = string.toString();
	prefix = prefix ? prefix : "0";
	while(string.length < length) {
		string = prefix + string;
	}
	return string;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = u.eitherOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
Util.browser = function(model, version) {
	var current_version = false;
	if(model.match(/\bexplorer\b|\bie\b/i)) {
		if(window.ActiveXObject) {
			current_version = navigator.userAgent.match(/(MSIE )(\d+.\d)/i)[2];
		}
	}
	else if(model.match(/\bfirefox\b|\bgecko\b/i)) {
		if(window.navigator.mozIsLocallyAvailable) {
			current_version = navigator.userAgent.match(/(Firefox\/)(\d+\.\d+)/i)[2];
		}
	}
	else if(model.match(/\bwebkit\b/i)) {
		if(document.body.style.webkitTransform != undefined) {
			current_version = navigator.userAgent.match(/(AppleWebKit\/)(\d+.\d)/i)[2];
		}
	}
	else if(model.match(/\bchrome\b/i)) {
		if(window.chrome && document.body.style.webkitTransform != undefined) {
			current_version = navigator.userAgent.match(/(Chrome\/)(\d+)(.\d)/i)[2];
		}
	}
	else if(model.match(/\bsafari\b/i)) {
		if(!window.chrome && document.body.style.webkitTransform != undefined) {
			current_version = navigator.userAgent.match(/(Version\/)(\d+)(.\d)/i)[2];
		}
	}
	else if(model.match(/\bopera\b/i)) {
		if(window.opera) {
			if(navigator.userAgent.match(/Version\//)) {
				current_version = navigator.userAgent.match(/(Version\/)(\d+)(.\d)/i)[2];
			}
			else {
				current_version = navigator.userAgent.match(/(Opera\/)(\d+)(.\d)/i)[2];
			}
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.segment = function(segment) {
	if(!u.current_segment) {
		var scripts = document.getElementsByTagName("script");
		var script, i, src;
		for(i = 0; script = scripts[i]; i++) {
			seg_src = script.src.match(/\/seg_([a-z_]+)/);
			if(seg_src) {
				u.current_segment = seg_src[1];
			}
		}
	}
	if(segment) {
		return segment == u.current_segment;
	}
	return u.current_segment;
}
Util.system = function(os, version) {
}
Util.support = function(property) {
	if(document.documentElement) {
		property = property.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		return property in document.documentElement.style;
	}
	return false;
}
Util.windows = function() {
	return (navigator.userAgent.indexOf("Windows") >= 0) ? true : false;
}
Util.osx = function() {
	return (navigator.userAgent.indexOf("OS X") >= 0) ? true : false;
}
Util.Timer = u.t = new function() {
	this._timers = new Array();
	this.setTimer = function(node, action, timeout) {
		var id = this._timers.length;
		this._timers[id] = {"_a":action, "_n":node, "_t":setTimeout("u.t._executeTimer("+id+")", timeout)};
		return id;
	}
	this.resetTimer = function(id) {
		if(this._timers[id]) {
			clearTimeout(this._timers[id]._t);
			this._timers[id] = false;
		}
	}
	this._executeTimer = function(id) {
		var node = this._timers[id]._n;
		node._timer_action = this._timers[id]._a;
		node._timer_action();
		node._timer_action = null;
		this._timers[id] = false;
	}
	this.setInterval = function(node, action, interval) {
		var id = this._timers.length;
		this._timers[id] = {"_a":action, "_n":node, "_i":setInterval("u.t._executeInterval("+id+")", interval)};
		return id;
	}
	this.resetInterval = function(id) {
		if(this._timers[id]) {
			clearInterval(this._timers[id]._i);
			this._timers[id] = false;
		}
	}
	this._executeInterval = function(id) {
		var node = this._timers[id]._n;
		node._interval_action = this._timers[id]._a;
		node._interval_action();
		node._timer_action = null;
	}
	this.valid = function(id) {
		return this._timers[id] ? true : false;
	}
	this.resetAllTimers = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._t) {
				this.resetTimer(i);
			}
		}
	}
	this.resetAllIntervals = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._i) {
				this.resetInterval(i);
			}
		}
	}
}
Util.getVar = function(param, url) {
	var string = url ? url.split("#")[0] : location.search;
	var regexp = new RegExp("[\&\?\b]{1}"+param+"\=([^\&\b]+)");
	var match = string.match(regexp);
	if(match && match.length > 1) {
		return match[1];
	}
	else {
		return "";
	}
}
u.a.transition = function(node, transition) {
	var duration = transition.match(/[0-9.]+[ms]+/g);
	if(duration) {
		node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
	}
	else {
		node.duration = false;
		if(transition.match(/none/i)) {
			node.transitioned = null;
		}
	}
	if(u.support(this.variant()+"Transition")) {
		node.style[this.variant()+"Transition"] = "none";
	}
}
u.a.translate = function(node, x, y) {
	var update_frequency = 25;
	node._x = node._x ? node._x : 0;
	node._y = node._y ? node._y : 0;
	if(node.duration && (node._x != x || node._y != y)) {
		node.x_start = node._x;
		node.y_start = node._y;
		node.translate_transitions = node.duration/update_frequency;
		node.translate_progress = 0;
		node.x_change = (x - node.x_start) / node.translate_transitions;
		node.y_change = (y - node.y_start) / node.translate_transitions;
		node.translate_transitionTo = function(event) {
			++this.translate_progress;
			var new_x = (Number(this.x_start) + Number(this.translate_progress * this.x_change));
			var new_y = (Number(this.y_start) + Number(this.translate_progress * this.y_change));
			this.style["msTransform"] = "translate("+ new_x + "px, " + new_y +"px)";
			this.offsetHeight;
			if(this.translate_progress < this.translate_transitions) {
				this.t_translate_transition = u.t.setTimer(this, this.translate_transitionTo, update_frequency);
			}
			else {
				this.style["msTransform"] = "translate("+ this._x + "px, " + this._y +"px)";
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		node.translate_transitionTo();
	}
	else {
		node.style["msTransform"] = "translate("+ x + "px, " + y +"px)";
	}
	node._x = x;
	node._y = y;
	node.offsetHeight;
}
u.a.rotate = function(node, deg) {
	var update_frequency = 25;
	node._rotation = node._rotation ? node._rotation : 0;
	if(node.duration && node._rotation != deg) {
		node.rotate_start = node._rotation;
		node.rotate_transitions = node.duration/update_frequency;
		node.rotate_progress = 0;
		node.rotate_change = (deg - node.rotate_start) / node.rotate_transitions;
		node.rotate_transitionTo = function(event) {
			++this.rotate_progress;
			var new_deg = (Number(this.rotate_start) + Number(this.rotate_progress * this.rotate_change));
			this.style["msTransform"] = "rotate("+ new_deg + "deg)";
			this.offsetHeight;
			if(this.rotate_progress < this.rotate_transitions) {
				this.t_rotate_transition = u.t.setTimer(this, this.rotate_transitionTo, update_frequency);
			}
			else {
				this.style["msTransform"] = "rotate("+ this._rotation + "deg)";
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		node.rotate_transitionTo();
	}
	else {
		node.style["msTransform"] = "rotate("+ deg + "deg)";
	}
	node._rotation = deg;
	node.offsetHeight;
}
u.a.scale = function(node, scale) {
	var update_frequency = 25;
	node._scale = node._scale ? node._scale : 0;
	if(node.duration && node._scale != scale) {
		node.scale_start = node._scale;
		node.scale_transitions = node.duration/update_frequency;
		node.scale_progress = 0;
		node.scale_change = (scale - node.scale_start) / node.scale_transitions;
		node.scale_transitionTo = function(event) {
			++this.scale_progress;
			var new_scale = (Number(this.scale_start) + Number(this.scale_progress * this.scale_change));
			this.style["msTransform"] = "scale("+ new_scale +")";
			this.offsetHeight;
			if(this.scale_progress < this.scale_transitions) {
				this.t_scale_transition = u.t.setTimer(this, this.scale_transitionTo, update_frequency);
			}
			else {
				this.style["msTransform"] = "scale("+ this._scale +")";
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		node.scale_transitionTo();
	}
	else {
		node.style["msTransform"] = "scale("+ scale +")";
	}
	node._scale = scale;
	node.offsetHeight;
}
u.a.setOpacity = function(node, opacity) {
	var update_frequency = 25;
	node._opacity = node._opacity ? node._opacity : u.gcs(node, "opacity");
	if(node.duration && node._opacity != opacity) {
		node.opacity_start = node._opacity;
		node.opacity_transitions = node.duration/update_frequency;
		node.opacity_change = (opacity - node.opacity_start) / node.opacity_transitions;
		node.opacity_progress = 0;
		node.opacity_transitionTo = function(event) {
			++this.opacity_progress;
			var new_opacity = (Number(this.opacity_start) + Number(this.opacity_progress * this.opacity_change));
			u.as(this, "opacity", new_opacity);
			this.offsetHeight;
			if(this.opacity_progress < this.opacity_transitions) {
				this.t_opacity_transition = u.t.setTimer(this, this.opacity_transitionTo, update_frequency);
			}
			else {
				this.style.opacity = this._opacity;
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		node.opacity_transitionTo();
	}
	else {
		node.style.opacity = opacity;
	}
	node._opacity = opacity;
	node.offsetHeight;
}
u.a.setWidth = function(node, width) {
	var update_frequency = 25;
	node._width = node._width ? node._width : u.gcs(node, "width").match("px") ? u.gcs(node, "width").replace("px", "") : 0;
	if(node.duration && node._width != width) {
		node.width_start = node._width;
		node.width_transitions = node.duration/update_frequency;
		node.width_change = (width - node.width_start) / node.width_transitions;
		node.width_progress = 0;
		node.width_transitionTo = function(event) {
			++this.width_progress;
			var new_width = (Number(this.width_start) + Number(this.width_progress * this.width_change));
			u.as(this, "width", new_width+"px");
			this.offsetHeight;
			if(this.width_progress < this.width_transitions) {
				this.t_width_transition = u.t.setTimer(this, this.width_transitionTo, update_frequency);
			}
			else {
				u.as(this, "width", this._width);
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		node.width_transitionTo();
	}
	else {
		var new_width = width.toString().match(/\%|auto/) ? width : width + "px";
		u.as(node, "width", new_width);
	}
	node._width = width;
	node.offsetHeight;
}
u.a.setHeight = function(node, height) {
	var update_frequency = 25;
	node._height = node._height ? node._height : u.gcs(node, "height").match("px") ? u.gcs(node, "height").replace("px", "") : 0;
	if(node.duration && node._height != height) {
		node.height_start = node._height;
		node.height_transitions = node.duration/update_frequency;
		node.height_change = (height - node.height_start) / node.height_transitions;
		node.height_progress = 0;
		node.height_transitionTo = function(event) {
			++this.height_progress;
			var new_height = (Number(this.height_start) + Number(this.height_progress * this.height_change));
			u.as(this, "height", new_height+"px");
			this.offsetHeight;
			if(this.height_progress < this.height_transitions) {
				this.t_height_transition = u.t.setTimer(this, this.height_transitionTo, update_frequency);
			}
			else {
				u.as(this, "height", this._height);
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		node.height_transitionTo();
	}
	else {
		var new_height = height.toString().match(/\%|auto/) ? height : height + "px";
		u.as(node, "height", new_height);
	}
	node._height = height;
	node.offsetHeight;
}
u.a.setBgPos = function(node, x, y) {
	var update_frequency = 25;
	var current_bg_x = u.gcs(node, "background-position-x");
	var current_bg_y = u.gcs(node, "background-position-y");
	node._bg_x = node._bg_x ? node._bg_x : current_bg_x.match("px") ? current_bg_x.replace("px", "") : x;
	node._bg_y = node._bg_y ? node._bg_y : current_bg_y.match("px") ? current_bg_y.replace("px", "") : y;
	if(node.duration && (node._bg_x != x || node._bg_y != y)) {
		node._bg_same_x = false;
		node._bg_same_y = false;
		node.bg_transitions = node.duration/update_frequency;
		if(node._bg_x != x) {
			node.bg_start_x = node._bg_x;
			node.bg_change_x = (x - node.bg_start_x) / node.bg_transitions;
		}
		else {
			node._bg_same_x = true;
		}
		if(node._bg_y != y) {
			node.bg_start_y = node._bg_y;
			node.bg_change_y = (y - node.bg_start_y) / node.bg_transitions;
		}
		else {
			node._bg_same_y = true;
		}
		node.bg_progress = 0;
		node.bg_transitionTo = function(event) {
			++this.bg_progress;
			var new_x, new_y;
			if(!this._bg_same_x) {
				new_x = Math.round((Number(this.bg_start_x) + Number(this.bg_progress * this.bg_change_x)));
			}
			else {
				new_x = this._bg_x;
			}
			if(!this._bg_same_y) {
				new_y = Math.round((Number(this.bg_start_y) + Number(this.bg_progress * this.bg_change_y)));
			}
			else {
				new_y = this._bg_y;
			}
			var new_bg_x = new_x.toString().match(/\%|top|left|right|center|bottom/) ? new_x : (new_x + "px");
			var new_bg_y = new_y.toString().match(/\%|top|left|right|center|bottom/) ? new_y : (new_y + "px");
			u.as(this, "backgroundPosition", new_bg_x + " " + new_bg_y);
			this.offsetHeight;
			if(this.bg_progress < this.bg_transitions) {
				this.t_bg_transition = u.t.setTimer(this, this.bg_transitionTo, update_frequency);
			}
			else {
				var new_bg_x = x.toString().match(/\%|top|left|right|center|bottom/) ? this._bg_x : (this._bg_x + "px");
				var new_bg_y = y.toString().match(/\%|top|left|right|center|bottom/) ? this._bg_y : (this._bg_y + "px");
				u.as(this, "backgroundPosition", new_bg_x + " " + new_bg_y);
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		node.bg_transitionTo();
	}
	else {
		var new_bg_x = x.toString().match(/\%|top|left|right|center|bottom/) ? x : (x + "px");
		var new_bg_y = y.toString().match(/\%|top|left|right|center|bottom/) ? y : (y + "px");
		u.as(node, "backgroundPosition", new_bg_x + " " + new_bg_y);
	}
	node._bg_x = x;
	node._bg_y = y;
	node.offsetHeight;
}
u.a.setBgColor = function(node, color) {
	var update_frequency = 100;
	if(isNaN(node._bg_color_r) || isNaN(node._bg_color_g) || isNaN(node._bg_color_b)) {
		var current_bg_color = u.gcs(node, "background-color");
		var matches;
		var current_bg_color_r, current_bg_color_g, current_bg_color_b;
		var new_bg_color_r = false;
		var new_bg_color_g = false;
		var new_bg_color_b = false;
		if(current_bg_color.match(/#[\da-fA-F]{3,6}/)) {
			if(current_bg_color.length == 7) {
				matches = current_bg_color.match(/#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/);
			}
			else {
				matches = current_bg_color.match(/#([\da-fA-F]{1}),[ ]?([\da-fA-F]{1}),[ ]?([\da-fA-F]{1})/);
			}
			current_bg_color_r = u.hexToNum(matches[1]);
			current_bg_color_g = u.hexToNum(matches[2]); 
			current_bg_color_b = u.hexToNum(matches[3]);
		}
		else if(current_bg_color.match(/rgb\([\d]{1,3},[ ]?[\d]{1,3},[ ]?[\d]{1,3}\)/)) {
			matches = current_bg_color.match(/rgb\(([\d]{1,3}),[ ]?([\d]{1,3}),[ ]?([\d]{1,3})\)/);
			current_bg_color_r = matches[1];
			current_bg_color_g = matches[2];
			current_bg_color_b = matches[3];
		}
		else if(current_bg_color.match(/rgba\([\d]{1,3},[ ]?[\d]{1,3},[ ]?[\d]{1,3},[ ]?[\d\.]+\)/)) {
			matches = current_bg_color.match(/rgba\(([\d]{1,3}),[ ]?([\d]{1,3}),[ ]?([\d]{1,3}),[ ]?([\d\.]+)\)/);
			current_bg_color_r = matches[1];
			current_bg_color_g = matches[2];
			current_bg_color_b = matches[3];
		}
	}
	if(color.match(/#[\da-fA-F]{3,6}/)) {
		if(color.length == 7) {
			matches = color.match(/#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/);
		}
		else {
			matches = color.match(/#([\da-fA-F]{1}),[ ]?([\da-fA-F]{1}),[ ]?([\da-fA-F]{1})/);
		}
		new_bg_color_r = u.hexToNum(matches[1]);
		new_bg_color_g = u.hexToNum(matches[2]);
		new_bg_color_b = u.hexToNum(matches[3]);
	}
	node._bg_color_r = !isNaN(node._bg_color_r) ? node._bg_color_r : !isNaN(current_bg_color_r) ? current_bg_color_r : false;
	node._bg_color_g = !isNaN(node._bg_color_g) ? node._bg_color_g : !isNaN(current_bg_color_g) ? current_bg_color_g : false;
	node._bg_color_b = !isNaN(node._bg_color_b) ? node._bg_color_b : !isNaN(current_bg_color_b) ? current_bg_color_b : false;
	if(node.duration && 
	node._bg_color_r !== false && 
	node._bg_color_g !== false && 
	node._bg_color_b !== false && 
	new_bg_color_r !== false && 
	new_bg_color_g !== false && 
	new_bg_color_b !== false &&
	(new_bg_color_r != node._bg_color_r ||
	new_bg_color_g != node._bg_color_g ||
	new_bg_color_b != node._bg_color_b)) {
		node.bg_color_r_start = node._bg_color_r;
		node.bg_color_g_start = node._bg_color_g;
		node.bg_color_b_start = node._bg_color_b;
		node.bg_color_transitions = node.duration/update_frequency;
		node.bg_color_r_change = (new_bg_color_r - node.bg_color_r_start) / node.bg_color_transitions;
		node.bg_color_g_change = (new_bg_color_g - node.bg_color_g_start) / node.bg_color_transitions;
		node.bg_color_b_change = (new_bg_color_b - node.bg_color_b_start) / node.bg_color_transitions;
		node.bg_color_progress = 0;
		node.bg_color_transitionTo = function(event) {
			++this.bg_color_progress;
			var new_bg_color_r = Math.round(Number(this.bg_color_r_start) + Number(this.bg_color_progress * this.bg_color_r_change));
			var new_bg_color_g = Math.round(Number(this.bg_color_g_start) + Number(this.bg_color_progress * this.bg_color_g_change));
			var new_bg_color_b = Math.round(Number(this.bg_color_b_start) + Number(this.bg_color_progress * this.bg_color_b_change));
			var bg_hex_r = u.prefix(u.numToHex(new_bg_color_r), 2);
			var bg_hex_g = u.prefix(u.numToHex(new_bg_color_g), 2);
			var bg_hex_b = u.prefix(u.numToHex(new_bg_color_b), 2);
			u.as(this, "backgroundColor", "#" + bg_hex_r + bg_hex_g + bg_hex_b);
			this.offsetHeight;
			if(this.bg_color_progress < this.bg_color_transitions) {
				this.t_bg_color_transition = u.t.setTimer(this, this.bg_color_transitionTo, update_frequency);
			}
			else {
				u.as(this, "backgroundColor", this._bg_color);
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		node.bg_color_transitionTo();
	}
	else {
		node.style.backgroundColor = color;
	}
	node._bg_color = color;
	node.offsetHeight;
}


/*u-image.js*/
Util.Image = u.i = new function() {
	this.load = function(node, src) {
		var image = new Image();
		image.node = node;
		u.ac(node, "loading");
	    u.e.addEvent(image, 'load', u.i._loaded);
		u.e.addEvent(image, 'error', u.i._error);
		image.src = src;
	}
	this._loaded = function(event) {
		u.rc(this.node, "loading");
		if(typeof(this.node.loaded) == "function") {
			this.node.loaded(event);
		}
	}
	this._error = function(event) {
		u.rc(this.node, "loading");
		u.ac(this.node, "error");
		if(typeof(this.node.loaded) == "function" && typeof(this.node.failed) != "function") {
			this.node.loaded(event);
		}
		else if(typeof(this.node.failed) == "function") {
			this.node.failed(event);
		}
	}
	this._progress = function(event) {
		u.bug("progress")
		if(typeof(this.node.progress) == "function") {
			this.node.progress(event);
		}
	}
	this._debug = function(event) {
		u.bug("event:" + event.type);
		u.xInObject(event);
	}
}


/*beta-u-preloader.js*/
u.preloader = function(node, files, options) {
	var callback, callback_min_delay
	if(typeof(options) == "object") {
		var argument;
		for(argument in options) {
			switch(argument) {
				case "callback"				: callback				= options[argument]; break;
				case "callback_min_delay"	: callback_min_delay	= options[argument]; break;
			}
		}
	}
	if(!u._preloader_queue) {
		u._preloader_queue = document.createElement("div");
		u._preloader_processes = 0;
		if(u.e && u.e.event_pref == "touch") {
			u._preloader_max_processes = 1;
		}
		else {
			u._preloader_max_processes = 1;
		}
	}
	if(node && files) {
		var entry, file;
		var new_queue = u.ae(u._preloader_queue, "ul");
		new_queue._callback = callback;
		new_queue._node = node;
		new_queue._files = files;
		new_queue.nodes = new Array();
		new_queue._start_time = new Date().getTime();
		for(i = 0; file = files[i]; i++) {
			entry = u.ae(new_queue, "li", {"class":"waiting"});
			entry.i = i;
			entry._queue = new_queue
			entry._file = file;
		}
		u.ac(node, "waiting");
		if(typeof(node.waiting) == "function") {
			node.waiting();
		}
	}
	u.queueLoader();
	return u._preloader_queue;
}
u.queueLoader = function() {
	if(u.qs("li.waiting", u._preloader_queue)) {
		while(u._preloader_processes < u._preloader_max_processes) {
			var next = u.qs("li.waiting", u._preloader_queue);
			if(next) {
				if(u.hc(next._queue._node, "waiting")) {
					u.rc(next._queue._node, "waiting");
					u.ac(next._queue._node, "loading");
					if(typeof(next._queue._node.loading) == "function") {
						next._node._queue.loading();
					}
				}
				u._preloader_processes++;
				u.rc(next, "waiting");
				u.ac(next, "loading");
				next.loaded = function(event) {
					this._image = event.target;
					this._queue.nodes[this.i] = this;
					u.rc(this, "loading");
					u.ac(this, "loaded");
					u._preloader_processes--;
					if(!u.qs("li.waiting,li.loading", this._queue)) {
						u.rc(this._queue._node, "loading");
						if(typeof(this._queue._callback) == "function") {
							this._queue._node._callback = this._queue._callback;
							this._queue._node._callback(this._queue.nodes);
						}
						else if(typeof(this._queue._node.loaded) == "function") {
							this._queue._node.loaded(this._queue.nodes);
						}
					}
					u.queueLoader();
				}
				u.i.load(next, next._file);
			}
			else {
				break
			}
		}
	}
}


/*i-page-desktop.js*/
u.bug_console_only = true;
Util.Objects["page"] = new function() {
	this.init = function(page) {
			page.hN = u.qs("#header");
			page.cN = u.qs("#content");
			page.nN = u.qs("#navigation");
			page.nN = u.ie(page.hN, page.nN);
			page.fN = u.qs("#footer");
			page.resized = function() {
			}
			page.scrolled = function() {
				u.bug("scrolled");
				var scroll_y = u.scrollY();
				var browser_h = u.browserH();
				var i, node;
				for (i = 0; node = page.scenes[i]; i++) {
					abs_y = u.absY(node);
					if(abs_y-35 <= scroll_y && abs_y + node.offsetHeight > scroll_y) {
						if (u.hc(node, "red")) {
							u.ac(page.nN, "red");
							u.rc(page.nN, "blue");
						}
						else {
							u.ac(page.nN, "blue");
							u.rc(page.nN, "red");
						}
					}
					else {
					}
				}
			}
			page.ready = function() {
				u.bug("page ready")
				if(!u.hc(this, "ready")) {
					u.addClass(this, "ready");
					this.initNavigation();
					this.scenes = u.qsa("#content .scene", this);
					u.e.addEvent(window, "resize", page.resized);
					u.e.addEvent(window, "scroll", page.scrolled);
					this.resized();
					this.scrolled();
				}
			}
			page.cN.ready = function() {
				u.bug("page.cN ready:" + u.hc(page, "ready") + ", " + u.hc(this, "ready"));
			}
			// 		
			// 		
			page.initNavigation = function() {
				this.logo = u.ae(this.nN, "div", {"class": "logo"});
				u.ce(this.logo)
				this.logo.clicked = function(event) {
					location.href = "/";
				}
				this.primary = u.qs("ul.primary", page.nN);
				this.primary.li = u.qsa("li a", this.primary);
				var i, node;
				for (i = 0; node = this.primary.li[i]; i++) {
					if (document.body.className == node.className) {
						u.ac(node, "active");
					}
				}
				this.servicenavigation = u.qs("ul.servicenavigation", page.fN).cloneNode(true);
				this.servicenavigation = u.ae(this.nN, this.servicenavigation)
				this.social = u.qs(".social", page.fN).cloneNode(true);
				this.social = u.ae(this.nN, this.social)
				this.nav_icon = u.ae(this.nN, "div", {"class": "nav_icon"});
				u.e.click(this.nav_icon);
				this.nav_icon.clicked = function(event) {
					if (u.hc(page.hN, "open")) {
						u.a.setHeight(page.nN, 0);
						u.rc(page.hN, "open");
						u.as(page.cN, "display", "block");
						document.body.scrollTop = this.scroll_y;
					} else {
						u.ac(page.hN, "open");
						u.a.setHeight(page.nN, u.browserHeight());
						var height = u.browserHeight() - page.social.offsetHeight;
						var middle = (height/2) - (page.primary.offsetHeight/2);
						u.as(page.primary, "top", middle+"px");
						this.scroll_y = u.scrollY();
						u.as(page.cN, "display", "none");
					}
				}
			}
	}
}
u.e.addDOMReadyEvent(u.init);


/*i-front-desktop.js*/
Util.Objects["front"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			u.as(scene, "height", u.browserHeight()+"px");
			var height = u.browserHeight() - scene.logo.offsetHeight - 100; 
			u.as(scene.slogan, "marginTop", (height/2)-(scene.slogan.offsetHeight/2) +"px");
			this.offsetHeight;
		}
		scene.scrolled = function() {
			var scroll_y = u.scrollY();
			var browser_h = u.browserH();
			if (scroll_y > browser_h) {
				if (u.hc(page, "no_logo")) {
					u.rc(page, "no_logo");
				}
			}
			else {
				if (!u.hc(page, "no_logo")) {
					u.ac(page, "no_logo");
				}
			}
			if (scroll_y+100 > browser_h) {
				if (u.hc(page, "no_menu")) {
					u.rc(page, "no_menu");
				}
			}
			else {
				if (!u.hc(page, "no_menu")) {
					u.ac(page, "no_menu");
				}
			}
		}
		scene.ready = function() {
			if (u.qsa(".scene", page.cN).length == 3) {
				this.logo = u.ie(this, "div", {"class": "logo"});
				this.slogan = u.qs(".container", this);
				this.servicenavigation = u.qs("ul.servicenavigation", page.fN).cloneNode(true);
				u.ae(this, this.servicenavigation)
				this.loadSloganImages();
				u.e.addEvent(window, "resize", scene.resized);
				u.e.addEvent(window, "scroll", scene.scrolled);
				this.scrolled();
				this.resized();
				page.ready();
			}
		}
		scene.loadSloganImages = function() {
			this.slogans = u.qsa("ul.items li.item", this.slogan);
			var i, node;
			for (i = 0; node = this.slogans[i]; i++) {
				node._image_available = u.cv(node, "image_id");
				if(node._image_available) {
					node._image_format = u.cv(node, "image_format");
					node._image_src = "/images/" + node._image_available + "/1260x" + "." + node._image_format;;
					node._image_mask = u.ie(node, "div", {"class":"image"});
					node.loaded = function(queue) {
						this._image = u.ae(this._image_mask, "img", {"src":this._image_src});
						scene.resized();
					}
					u.preloader(node, [node._image_src]);
				}
			}
		}
		scene.loadPages = function() {
			this.sections = ["/aktioner", "/program"];
			var i, section, div;
			for (i = 0; section = this.sections[i]; i++) {
				div = u.ae(page.cN, "div");
				div.response = function(response) {
					var new_scene = u.qs(".scene", response);
					if(new_scene) {
						this.innerHTML = new_scene.innerHTML;
						u.ac(this, new_scene.className);
						u.init(this);
						scene.ready();
					}
				}
				u.request(div, u.h.getCleanHash(section));
			}
		}
		scene.loadPages();
	}
}


/*i-carousel-desktop.js*/
Util.Objects["carousel"] = new function() {
	this.init = function(list) {
		list.resized = function() {
		}
		list.scrolled = function() {
		}
		list.ready = function() {
			this.container = u.we(this, "div", {"class": "container"})
			this.slides = u.qsa('li.item', this);
			this.current_slide_num = 0;
			this.current_node = this.slides[0];
			this.next_node;
			this._previous = u.ae(this.container, "div", {"class": "next", "html": "Næste"});
			this._next = u.ae(this.container, "div", {"class": "previous", "html": "Forrige"});
			var i, node;
			for(i = 0; node = this.slides[i]; i++) {
				// 
				u.e.click(this._next);
				u.e.click(this._previous);
				this._next.clicked = this._previous.clicked = function(event) {
					if (u.hc(event.target, "next")) {
						if (list.current_slide_num == list.slides.length-1) {
							list.current_slide_num = 0;	
						} else {
							list.current_slide_num++;
						}
						list.hide(list.current_node);
						list.show(list.slides[list.current_slide_num]);
					}
					if (u.hc(event.target, "previous")) {
						if (list.current_slide_num != 0) {
							list.current_slide_num--;
						} else {
							list.current_slide_num = list.slides.length-1;
						}
						list.hide(list.current_node);
						list.show(list.slides[list.current_slide_num]);
					}
				}
				if (i == 0) {
					u.as(node, "display", "block");
				} else {
					u.as(node, "display", "none");
				}
			}
		}
		list.hide = function(node) {
			u.as(node, "display", "none");
		}
		list.show = function(node) {
			u.as(node, "display", "block");
			list.current_node = node;
			// 	
			// 	
			// 	
			// 
		}
		list.ready();
	}
}

/*i-events-desktop.js*/
Util.Objects["events"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.bug("events");
			this.nodes = u.qsa("ul.items li.item", this);
			var i, node;
			for (i = 0; node = this.nodes[i]; i++) {
				u.ce(node);
				node.clicked = function() {
					location.href = this.url;
				}
			}
			page.ready();
			page.cN.ready();
		}
		scene.ready();
	}
}

/*i-event-desktop.js*/
Util.Objects["event"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.bug("event!   " + u.browserHeight());
			u.as(this, "height", u.browserHeight()+"px");
			this.ul = u.qs("ul.items li.item", this);
			u.as(this.ul, "marginTop", (u.browserHeight()/2)-(this.ul.offsetHeight/2) +"px");
			page.ready();
			page.cN.ready();
		}
		scene.ready();
	}
}

/*i-about-desktop.js*/
Util.Objects["about"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.bug("about");
			this.loadMapsAPI();
			u.bug(page.cN);
			page.cN.ready();
		}
    	scene.loadMapsAPI = function() {
			u.bug("loadMapsAPI");
			var id = u.randomString();
			u.ac(this, id);
			var script = document.createElement("script");
  			script.type = "text/javascript";
  			script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" + "callback=map_" + id;
  			document.body.appendChild(script);
  			eval('window["map_' + id + '"] = function() {u.qs(".'+id+'").mapsApiReady();}');
		}
		scene.mapsApiReady = function() {
			u.bug("maps loaded!!");
			this.gmap = u.ae(this, "div", {"class": "gmap"});
			this.overlay = u.ae(this, "div", {"class": "overlay"});
			var mapOptions = {
				zoom: 8,
				center: new google.maps.LatLng(55.674026, 12.570235),
				//center: myLatLng, 
				zoom: 16,
				mapTypeControl: false,
				panControl: false,
				zoomControl: true,
				scrollwheel: false,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL
				},
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};
			var styles = [
				{
					stylers: [
						{ hue: "#00027a" },
						{ saturation: +20 }
					]
				},{
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{ lightness: 100 },
						{ visibility: "simplified" }
					]
				},{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}
			];
			var map = new google.maps.Map(this.gmap, mapOptions);
			map.setOptions({styles: styles});
		}
		scene.ready();
	}
}

/*i-action-desktop.js*/
Util.Objects["action"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.bug("action");
			page.cN.ready();
			this.ul = u.qs("ul.items", this)
			if(this.ul) {
				this.nodes = u.qsa("ul.items li.item", this.ul);
				this.video_container = u.qs(".youtube", this);
				this.video_player = u.qs(".youtube .player", this);
				this.video_close = u.qs(".youtube .close", this);
				u.ce(this.video_close);
				this.video_close.clicked = function(event) {
					u.as(scene.video_container, "display", "none");
					scene.video_player.innerHTML = "";
					u.as(scene.ul, "opacity", "1");
				}
				var i, node;
				for (i = 0; node = this.nodes[i]; i++) {
					node._image_available = u.cv(node, "image_id");
					if(node._image_available) {
						node._image_src = "/images/" + node._image_available + "/300x.jpg";
						node._image_mask = u.ie(node, "div", {"class":"image"});
						node._image = u.ae(node._image_mask, "img", {"src":node._image_src});
						node.player_url = u.qs("a", node).href;
						if (u.browserWidth() > 959 ) {
							node.player_width = 720;
							node.player_height = (node.player_width/16)*9;
						}
						else {
							node.player_width = 520;
							node.player_height = (node.player_width/16)*9;
						}
						if(node.player_url.match(/youtube/i)) {
							var p_id = node.player_url.match(/watch\?v\=([a-zA-Z0-9_-]+)/);
							if(p_id) {
								node.player_id = p_id[1];
								node.player_html = '<iframe width="' + node.player_width+ '" height="' + node.player_height + '" src="//www.youtube.com/embed/' + node.player_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>'
								node._bn_play = u.ae(node._image_mask, "div", {"class":"play_bn", "html": "<p>Play</p>"});
								node._bn_play.player_html = node.player_html;
								u.ce(node._bn_play);
								node._bn_play.clicked = function(event) {
									u.as(scene.video_container, "display", "block");
									scene.video_player.innerHTML = this.player_html;
									u.as(scene.ul, "opacity", "0.5");
								}
							}
						}
					}
				}
			}
		}
		scene.ready();
	}
}

/*i-candidates-desktop.js*/
Util.Objects["candidates"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.bug("candidates");
			this.nodes = u.qsa("ul.items li.item", this);
			var i, node;
			for (i = 0; node = this.nodes[i]; i++) {
				u.ce(node);
				node.clicked = function() {
					location.href = this.url;
				}
				node._image_available = u.cv(node, "image_id");
				if(node._image_available) {
					node._image_src = "/images/" + node._image_available + "/600x.jpg";
					node._image_mask = u.ie(node, "div", {"class":"image"});
					node._image = u.ae(node._image_mask, "img", {"src":node._image_src});
				}
			}
			page.ready();
			page.cN.ready();
		}
		scene.ready();
	}
}

/*i-candidate-desktop.js*/
Util.Objects["candidate"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.bug("candidate");
			this.li = u.qs("ul.items li.item", this);
			u.bug("height:  " + this.li.offsetHeight)
			u.bug("u.browserHeight():  " + u.browserHeight())
			this.li._image_available = u.cv(this.li, "image_id");
			if(this.li._image_available) {
				this.li._image_src = "/images/" + this.li._image_available + "/400x.jpg";
				this.li._image_mask = u.ie(this.li, "div", {"class":"image"});
				this.li.loaded = function(queue) {
					this._image = u.ae(this._image_mask, "img", {"src":this._image_src});
					if (u.browserHeight() > this.offsetHeight) {
						u.as(scene, "height", u.browserHeight()+"px");
						u.as(this, "marginTop", (u.browserHeight()/2)-(this.offsetHeight/2) +"px");
					} else {
						u.as(this, "padding", "100px 0 60px");
					}
				}
				u.preloader(this.li, [this.li._image_src]);
			}
		}
		scene.ready();
	}
}

/*i-support-desktop.js*/
Util.Objects["support"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var height = u.browserHeight();
			this.ul = u.qs(".container", this);
			if (this.ul.offsetHeight < height ) {
				u.as(this, "height", u.browserHeight()+"px");
				u.as(this.ul, "paddingTop", (u.browserHeight()/2)-(this.ul.offsetHeight/2) +"px");
			} else {
				u.as(this.ul, "padding", "100px 0 60px 0");
			}
			page.ready();
			page.cN.ready();
		}
		scene.ready();
	}
}

/*i-help-desktop.js*/
Util.Objects["help"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			var height = u.browserHeight();
			this.ul = u.qs(".container", this);
			if (this.ul.offsetHeight < height ) {
				u.as(this, "height", u.browserHeight()+"px");
				u.as(this.ul, "paddingTop", (u.browserHeight()/2)-(this.ul.offsetHeight/2) +"px");
			} else {
				u.as(this.ul, "padding", "100px 0 60px 0");
			}
			page.ready();
			page.cN.ready();
		}
		scene.ready();
	}
}

/*i-footer-desktop.js*/
Util.Objects["footer"] = new function() {
	this.init = function(footer) {
		footer.ready = function() {
			u.bug("set footer color");
			if (document.body.className == "candidates" || document.body.className == "candidate") {
				u.ac(this, "red");
			}
			else {
				u.ac(this, "blue");
			}
		}
		footer.ready();
	}
}

/*i-fonts-desktop.js*/

/*013abfcd-c15e-468e-aebc-4b44edca5e9f.js*/
;(function(window,document,undefined){var aa=aa||{},ba=this;ba.Jb=true;function ca(a){return a.call.apply(a.w,arguments)}function da(a,b){if(!a)throw new Error;if(arguments.length>2){var c=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,c);return a.apply(b,d)}}else return function(){return a.apply(b,arguments)}}function E(){E=Function.prototype.w&&Function.prototype.w.toString().indexOf("native code")!=-1?ca:da;return E.apply(null,arguments)}
var ea=aa.Qb&&Date.now||function(){return+new Date};function F(a){a.call(ba)};mti={};mti.w=function(a,b){var c=arguments.length>2?Array.prototype.slice.call(arguments,2):[];return function(){c.push.apply(c,arguments);return b.apply(a,c)}};var fa={};function H(a,b){this.ha=a;this.ub=b||a;this.p=this.ub.document;this.ma=undefined}
F(function(){H.prototype.createElement=function(a,b,c){a=this.p.createElement(a);if(b)for(var d in b)if(b.hasOwnProperty(d))d=="style"?this.Ha(a,b[d]):a.setAttribute(d,b[d]);c&&a.appendChild(this.p.createTextNode(c));return a};H.prototype.D=function(a,b){a=this.p.getElementsByTagName(a)[0];if(!a)a=document.documentElement;if(a&&a.lastChild){a.insertBefore(b,a.lastChild);return true}return false};H.prototype.Ka=function(a){var b=this;function c(){b.p.body?a():setTimeout(c,0)}c()};H.prototype.Ga=function(a){if(a.parentNode){a.parentNode.removeChild(a);
return true}return false};H.prototype.v=function(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return;c.push(b);a.className=c.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")};H.prototype.M=function(a,b){for(var c=a.className.split(/\s+/),d=[],e=0,f=c.length;e<f;e++)c[e]!=b&&d.push(c[e]);a.className=d.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")};H.prototype.va=function(a,b){a=a.className.split(/\s+/);for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return true;
return false};H.prototype.Ha=function(a,b){if(this.hb())a.setAttribute("style",b);else a.style.cssText=b};H.prototype.hb=function(){if(this.ma===undefined){var a=this.p.createElement("p");a.innerHTML='<a style="top:1px;">w</a>';this.ma=/top/.test(a.getElementsByTagName("a")[0].getAttribute("style"))}return this.ma};H.prototype.getComputedStyle=function(a){if(typeof a!="undefined")if(a!=null){var b={};if(typeof a.currentStyle!="undefined"){b.fontFamily=a.currentStyle.fontFamily;b.fontWeight=a.currentStyle.fontWeight;
b.fontStyle=a.currentStyle.fontStyle;return b}else if(a=this.p.defaultView.getComputedStyle(a,null)){b.fontFamily=a.getPropertyValue("font-family");b.fontWeight=a.getPropertyValue("font-weight");b.fontStyle=a.getPropertyValue("font-style");return b}else return""}return""};H.prototype.A=function(a){if(typeof a!="undefined")if(a!=null)if(typeof a.currentStyle!="undefined")return a.currentStyle.fontFamily;else return(a=this.p.defaultView.getComputedStyle(a,null))?a.getPropertyValue("font-family"):"";
return""};H.prototype.aa=function(a){var b="";if(a.tagName=="INPUT")b+=a.value;a=a.childNodes||a;for(var c="img,script,noscript,iframe,object,style,param,embed,link,meta,head,title,br,hr".split(","),d=0;d<a.length;d++)if(a[d].nodeType!=8)if(this.indexOf(c,a[d].tagName?a[d].tagName.toLowerCase():"")<0)if(this.cb(a[d].parentNode)!="none"){var e=a[d].nodeType!=1?a[d].nodeValue.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," "):this.aa(a[d].childNodes);b+=e.toLowerCase()+e.toUpperCase()}else b+=
a[d].nodeType!=1?a[d].nodeValue.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," "):this.aa(a[d].childNodes);return b};H.prototype.getElementById=function(a){return this.p.getElementById(a)};H.prototype.W=function(a,b,c,d){var e=[],f=this.A(a).split(",");if(c instanceof Array)for(var k=0;k<f.length;k++)if(this.V(f[k])!=b)if(this.V(f[k]).indexOf(b)>-1)for(var g=0;g<c.length;g++){if(c[g]!=""){if(d){var i=this.V(c[g]),m=i.length;i.slice(m-2,m)}e.push(c[g])}}else e.push(f[k]);else if(c instanceof
Array)for(g=0;g<c.length;g++){if(c[g]!=""){if(d){i=this.V(c[g]);m=i.length;i.slice(m-2,m)}e.push(c[g])}}else e.push(c);else e.push(c);for(c=0;c<f.length;c++)f[c]!=""&&e.push(f[c]);e=this.gb(e);if(e.length>1&&e[0]!=b){a.style.fontFamily=""+e;a.setAttribute("data-mtiFont",b);if(d){a.style.fontWeight="";a.style.fontStyle=""}return a.style.fontFamily}else return null};H.prototype.kb=function(a,b){for(b=b.parentNode;b!=null;){if(b==a)return true;b=b.parentNode}return false};H.prototype.Ja=function(a,b){b(a);
for(a=a.firstChild;a;){this.Ja(a,b);a=a.nextSibling}};H.prototype.cb=function(a){if(a)if(typeof a.currentStyle!="undefined")return a.currentStyle.textTransform;else return(a=this.p.defaultView.getComputedStyle(a,null))?a.getPropertyValue("text-transform"):""};H.prototype.indexOf=function(a,b){if(a.indexOf)return a.indexOf(b);else{for(var c=0;c<a.length;c++)if(a[c]==b)return c;return-1}};H.prototype.V=function(a){return a.replace(/^\s|\s$/g,"").replace(/'|"/g,"").replace(/,\s*/g,"|")};H.prototype.gb=
function(a){for(var b={},c=[],d=0,e=a.length;d<e;++d)if(!b.hasOwnProperty(a[d])){c.push(a[d]);b[a[d]]=1}return c};H.prototype.V=function(a){return a.replace(/^\s|\s$/g,"").replace(/'|"/g,"").replace(/,\s*/g,"|")}});function I(a,b,c){this.Hb=a;this.Gb=b;this.bc=c}F(function(){});function K(a,b,c,d){this.f=a!=null?a:null;this.s=b!=null?b:null;this.Da=c!=null?c:null;this.h=d!=null?d:null}var ga,M;
F(function(){ga=/^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;K.prototype.ga=function(){return this.f!==null};K.prototype.toString=function(){return[this.f,this.s||"",this.Da||"",this.h||""].join("")};M=function(a){a=ga.exec(a);var b=null,c=null,d=null,e=null;if(a){if(a[1]!==null&&a[1])b=parseInt(a[1],10);if(a[2]!==null&&a[2])c=parseInt(a[2],10);if(a[3]!==null&&a[3])d=parseInt(a[3],10);if(a[4]!==null&&a[4])e=/^[0-9]+$/.test(a[4])?parseInt(a[4],10):a[4]}return new K(b,c,d,e)}});function N(a,b,c,d,e,f,k,g,i,m,h){this.t=a;this.ac=b;this.q=c;this.Za=d;this.Tb=e;this.Q=f;this.Ea=k;this.Yb=g;this.Xb=i;this.Sb=m;this.G=h}F(function(){N.prototype.getName=function(){return this.t}});function O(a,b){this.b=a;this.o=b}var ha=new N("Unknown",new K,"Unknown","Unknown",new K,"Unknown","Unknown",new K,"Unknown",undefined,new I(false,false,false));
F(function(){O.prototype.parse=function(){return this.nb()?this.zb():this.qb()?this.Ab():this.rb()?this.Ca():this.sb()?this.Ca():this.mb()?this.yb():ha};O.prototype.B=function(){var a=this.d(this.b,/(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,1);if(a!=""){if(/BB\d{2}/.test(a))a="BlackBerry";return a}a=this.d(this.b,/(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/,1);if(a!=""){if(a=="Mac_PowerPC")a="Macintosh";return a}return"Unknown"};O.prototype.$=function(){var a=this.d(this.b,/(OS X|Windows NT|Android) ([^;)]+)/,
2);if(a)return a;if(a=this.d(this.b,/Windows Phone( OS)? ([^;)]+)/,2))return a;if(a=this.d(this.b,/(iPhone )?OS ([\d_]+)/,2))return a;if(a=this.d(this.b,/(?:Linux|CrOS) ([^;)]+)/,1)){a=a.split(/\s/);for(var b=0;b<a.length;b+=1)if(/^[\d\._]+$/.test(a[b]))return a[b]}if(a=this.d(this.b,/(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/,2))return a;return"Unknown"};O.prototype.nb=function(){return this.b.indexOf("MSIE")!=-1};O.prototype.zb=function(){var a=this.B(),b=this.$(),c=M(b),d=this.d(this.b,/MSIE ([\d\w\.]+)/,
1),e=M(d),f=a=="Windows"&&e.f>=6||a=="Windows Phone"&&c.f>=8;return new N("MSIE",e,d,"MSIE",e,d,a,c,b,this.Z(this.o),new I(f,false,false))};O.prototype.qb=function(){return this.b.indexOf("Opera")!=-1};O.prototype.rb=function(){return/OPR\/[\d.]+/.test(this.b)};O.prototype.Ab=function(){var a="Unknown",b=this.d(this.b,/Presto\/([\d\w\.]+)/,1),c=M(b),d=this.$(),e=M(d),f=this.Z(this.o);if(c.ga())a="Presto";else{if(this.b.indexOf("Gecko")!=-1)a="Gecko";b=this.d(this.b,/rv:([^\)]+)/,1);c=M(b)}if(this.b.indexOf("Opera Mini/")!=
-1){var k=this.d(this.b,/Opera Mini\/([\d\.]+)/,1),g=M(k);return new N("OperaMini",g,k,a,c,b,this.B(),e,d,f,new I(false,false,false))}if(this.b.indexOf("Version/")!=-1){k=this.d(this.b,/Version\/([\d\.]+)/,1);g=M(k);if(g.ga())return new N("Opera",g,k,a,c,b,this.B(),e,d,f,new I(g.f>=10,false,false))}k=this.d(this.b,/Opera[\/ ]([\d\.]+)/,1);g=M(k);if(g.ga())return new N("Opera",g,k,a,c,b,this.B(),e,d,f,new I(g.f>=10,false,false));return new N("Opera",new K,"Unknown",a,c,b,this.B(),e,d,f,new I(false,
false,false))};O.prototype.sb=function(){return/AppleWeb(K|k)it/.test(this.b)};O.prototype.Ca=function(){var a=this.B(),b=this.$(),c=M(b),d=this.d(this.b,/AppleWeb(?:K|k)it\/([\d\.\+]+)/,1),e=M(d),f="Unknown",k=new K,g="Unknown",i=false;if(/OPR\/[\d.]+/.test(this.b))f="Opera";else if(this.b.indexOf("Chrome")!=-1||this.b.indexOf("CrMo")!=-1||this.b.indexOf("CriOS")!=-1)f="Chrome";else if(/Silk\/\d/.test(this.b))f="Silk";else if(a=="BlackBerry"||a=="Android")f="BuiltinBrowser";else if(this.b.indexOf("PhantomJS")!=
-1)f="PhantomJS";else if(this.b.indexOf("Safari")!=-1)f="Safari";else if(this.b.indexOf("AdobeAIR")!=-1)f="AdobeAIR";if(f=="BuiltinBrowser")g="Unknown";else if(f=="Silk")g=this.d(this.b,/Silk\/([\d\._]+)/,1);else if(f=="Chrome")g=this.d(this.b,/(Chrome|CrMo|CriOS)\/([\d\.]+)/,2);else if(this.b.indexOf("Version/")!=-1)g=this.d(this.b,/Version\/([\d\.\w]+)/,1);else if(f=="AdobeAIR")g=this.d(this.b,/AdobeAIR\/([\d\.]+)/,1);else if(f=="Opera")g=this.d(this.b,/OPR\/([\d.]+)/,1);else if(f=="PhantomJS")g=
this.d(this.b,/PhantomJS\/([\d.]+)/,1);k=M(g);i=f=="AdobeAIR"?k.f>2||k.f==2&&k.s>=5:a=="BlackBerry"?c.f>=10:a=="Android"?c.f>2||c.f==2&&c.s>1:e.f>=526||e.f>=525&&e.s>=13;var m=e.f<536||e.f==536&&e.s<11,h=a=="iPhone"||a=="iPad"||a=="iPod"||a=="Macintosh";return new N(f,k,g,"AppleWebKit",e,d,a,c,b,this.Z(this.o),new I(i,m,h))};O.prototype.mb=function(){return this.b.indexOf("Gecko")!=-1};O.prototype.yb=function(){var a="Unknown",b=new K,c="Unknown",d=this.$(),e=M(d),f=false;if(this.b.indexOf("Firefox")!=
-1){a="Firefox";c=this.d(this.b,/Firefox\/([\d\w\.]+)/,1);b=M(c);f=b.f>=3&&b.s>=5}else if(this.b.indexOf("Mozilla")!=-1)a="Mozilla";var k=this.d(this.b,/rv:([^\)]+)/,1),g=M(k);f||(f=g.f>1||g.f==1&&g.s>9||g.f==1&&g.s==9&&g.Da>=2||k.match(/1\.9\.1b[123]/)!=null||k.match(/1\.9\.1\.[\d\.]+/)!=null);return new N(a,b,c,"Gecko",g,k,this.B(),e,d,this.Z(this.o),new I(f,false,false))};O.prototype.d=function(a,b,c){if((a=a.match(b))&&a[c])return a[c];return""};O.prototype.Z=function(a){if(a.documentMode)return a.documentMode}});function P(a){this.tb=a||ia}var ia="-";F(function(){P.prototype.Cb=function(a){return a.replace(/[\W_]+/g,"").toLowerCase()};P.prototype.h=function(){for(var a=[],b=0;b<arguments.length;b++)a.push(this.Cb(arguments[b]));return a.join(this.tb)}});function Q(a,b,c,d){this.a=a;this.j=b;this.da=c;this.k=d||ja;this.i=new P("-")}var ja="mti";
F(function(){Q.prototype.ta=function(){this.a.v(this.j,this.i.h(this.k,"loading"));this.I("loading")};Q.prototype.Ya=function(a){this.a.v(this.j,this.i.h(this.k,a.getName(),a.n().toString(),"loading"));this.I("fontloading",a)};Q.prototype.Wa=function(a){this.a.M(this.j,this.i.h(this.k,a.getName(),a.n().toString(),"loading"));this.a.M(this.j,this.i.h(this.k,a.getName(),a.n().toString(),"inactive"));this.a.v(this.j,this.i.h(this.k,a.getName(),a.n().toString(),"active"));this.I("fontactive",a)};Q.prototype.Xa=
function(a){this.a.M(this.j,this.i.h(this.k,a.getName(),a.n().toString(),"loading"));this.a.va(this.j,this.i.h(this.k,a.getName(),a.n().toString(),"active"))||this.a.v(this.j,this.i.h(this.k,a.getName(),a.n().toString(),"inactive"));this.I("fontinactive",a)};Q.prototype.Y=function(){this.a.M(this.j,this.i.h(this.k,"loading"));this.a.va(this.j,this.i.h(this.k,"active"))||this.a.v(this.j,this.i.h(this.k,"inactive"));this.I("inactive")};Q.prototype.Va=function(){this.a.M(this.j,this.i.h(this.k,"loading"));
this.a.M(this.j,this.i.h(this.k,"inactive"));this.a.v(this.j,this.i.h(this.k,"active"));this.I("active")};Q.prototype.I=function(a,b){if(this.da[a])b?this.da[a](b.getName(),b.n()):this.da[a]()}});function ka(){this.Aa={}}F(function(){ka.prototype.Sa=function(a,b){this.Aa[a]=b};ka.prototype.fb=function(a,b){var c=[];for(var d in a)if(a.hasOwnProperty(d)){var e=this.Aa[d];e&&c.push(e(a[d],b))}return c}});function R(a,b){this.t=a;this.O=4;this.F="n";if(a=(b||"n4").match(/^([nio])([1-9])$/i)){this.F=a[1];this.O=parseInt(a[2],10)}}
F(function(){R.prototype.getName=function(){return this.t};R.prototype.db=function(){return this.Fa(this.t)};R.prototype.Fa=function(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");d.indexOf(" ")==-1?b.push(d):b.push("'"+d+"'")}return b.join(",")};R.prototype.n=function(){return this.F+this.O};R.prototype.eb=function(){var a="normal",b=this.O+"00";if(this.F==="o")a="oblique";else if(this.F==="i")a="italic";return"font-style:"+a+";font-weight:"+b+";"}});function S(a,b){this.a=a;this.T=b;this.J=this.a.createElement("span",{"aria-hidden":"true"},this.T)}F(function(){S.prototype.la=function(a){this.a.Ha(this.J,this.Ua(a))};S.prototype.fa=function(){this.a.D("body",this.J)};S.prototype.Ua=function(a){return"position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+a.db()+";"+a.eb()};S.prototype.remove=function(){this.a.Ga(this.J)}});function T(a,b,c,d,e,f,k,g){this.pa=a;this.jb=b;this.a=c;this.z=d;this.T=g||la;this.G=e;this.xa={};this.na=f||5E4;this.za=k||null;this.S=this.R=null;this.Db()}var U={Pb:"serif",Ob:"sans-serif",Mb:"monospace"},la="BESb\uc5d0swy";
F(function(){T.prototype.Db=function(){var a=new S(this.a,this.T);a.fa();for(var b in U)if(U.hasOwnProperty(b)){a.la(new R(U[b],this.z.n()));this.xa[U[b]]=a.J.offsetWidth}a.remove()};T.prototype.start=function(){this.R=new S(this.a,this.T);this.R.fa();this.S=new S(this.a,this.T);this.S.fa();this.Eb=ea();this.R.la(new R(this.z.getName()+",serif",this.z.n()));this.S.la(new R(this.z.getName()+",sans-serif",this.z.n()));this.qa()};T.prototype.ca=function(a,b){return a===this.xa[b]};T.prototype.Ib=function(a,
b){for(var c in U)if(U.hasOwnProperty(c))if(this.ca(a,U[c])&&this.ca(b,U[c]))return true;return false};T.prototype.ib=function(){return ea()-this.Eb>=this.na};T.prototype.lb=function(a,b){return this.ca(a,"serif")&&this.ca(b,"sans-serif")};T.prototype.wa=function(a,b){return this.G.Gb&&this.Ib(a,b)};T.prototype.ob=function(){return this.za===null||this.za.hasOwnProperty(this.z.getName())};T.prototype.qa=function(){var a=this.R.J.offsetWidth,b=this.S.J.offsetWidth;if(this.lb(a,b)||this.wa(a,b))if(this.ib())this.wa(a,
b)&&this.ob()?this.ea(this.pa):this.ea(this.jb);else this.Ta();else this.ea(this.pa)};T.prototype.Ta=function(){setTimeout(E(function(){this.qa()},this),25)};T.prototype.ea=function(a){this.R.remove();this.S.remove();a(this.z)}});function V(a,b,c,d){this.a=b;this.K=c;this.ra=0;this.Ia=this.ya=false;this.na=d;this.G=a.G}
F(function(){V.prototype.X=function(a,b,c,d){if(a.length===0&&d)this.K.Y();else{this.ra+=a.length;if(d)this.ya=d;for(d=0;d<a.length;d++){var e=a[d],f=b[e.getName()];this.K.Ya(e);(new T(E(this.$a,this),E(this.ab,this),this.a,e,this.G,this.na,c,f)).start()}}};V.prototype.$a=function(a){this.K.Wa(a);this.Ia=true;this.sa()};V.prototype.ab=function(a){this.K.Xa(a);this.sa()};V.prototype.sa=function(){if(--this.ra==0&&this.ya)this.Ia?this.K.Va():this.K.Y()}});mti.Kb=function(){this.Fa='"'};mti.P=function(){this.Zb=mti.P.Oa;this.Fb=mti.P.Qa};mti.P.Oa=["font-style","font-weight"];mti.P.Qa={"font-style":[["n","normal"]],"font-weight":[["4","normal"]]};mti.P.Lb=function(a,b,c){this.Ub=a;this.$b=b;this.Fb=c};function W(a,b,c){this.ha=a;this.ua=b;this.b=c;this.ia=this.ja=0}
F(function(){W.prototype.Ra=function(a,b){this.ua.Sa(a,b)};W.prototype.load=function(a){var b=a.context||this.ha;this.a=new H(this.ha,b);b=new Q(this.a,b.document.documentElement,a);this.b.G.Hb?this.vb(b,a):b.Y()};W.prototype.pb=function(a,b,c,d){var e=this;if(d)a.load(function(f,k,g){e.xb(b,c,f,k,g)});else{a=--this.ja==0;this.ia--;if(a)this.ia==0?b.Y():b.ta();c.X([],{},null,a)}};W.prototype.xb=function(a,b,c,d,e){var f=--this.ja==0;f&&a.ta();setTimeout(function(){b.X(c,d||{},e||null,f)},0)};W.prototype.vb=
function(a,b){var c=this.ua.fb(b,this.a);b=b.timeout;this.ia=this.ja=c.length;b=new V(this.b,this.a,a,b);for(var d=0,e=c.length;d<e;d++){var f=c[d];ma(f,this.b,E(this.pb,this,f,a,b))}}});var na=window.MonoTypeWebFonts=function(){var a=(new O(navigator.userAgent,document)).parse();return new W(window,new ka,a)}();window.MonoTypeWebFonts.load=na.load;var X=window.MTIConfig||{isAsync:false,EnableCustomFOUTHandler:false,RemoveMTIClass:false};mti.u=function(a,b,c){this.N=a;this.a=b;this.Bb=c;this.U={};this.r=[];this.g=[]};mti.u.prototype.indexOf=function(a,b){if(a.indexOf)return a.indexOf(b);else{for(var c=0;c<a.length;c++)if(a[c]==b)return c;return-1}};
function Y(a,b,c){var d=a.Bb,e=a.a.getComputedStyle(b),f=e.fontFamily,k="",g=e.fontStyle,i=0,m=0,h="";f=(f||"").replace(/^\s|\s$/g,"").replace(/'|"/g,"").replace(/,\s*/g,"|");if(f!=""){var z=f.split("|"),u="";for(i=0;i<z.length;i++){var w=new RegExp("^("+z[i]+")$","ig");for(m=0;m<d.length;m++){var l=d[m];u=l.fontfamily;var r,p,t=u;if(l.fontWeight!=undefined&&l.fontStyle!=undefined){r=l.fontWeight;p=l.fontStyle;h=p.charAt(0)+r/100;k=e.fontWeight=="normal"?400:e.fontWeight=="bold"?700:e.fontWeight}else{var j=
"h1,h2,h3,h4,h5,h6,strong,b".split(",");if(b.nodeType==1)k=a.indexOf(j,b.tagName.toLowerCase())>=0?400:e.fontWeight=="normal"?400:e.fontWeight=="bold"?700:400}if(r!=undefined||p!=undefined)t+="_"+h;j=u.replace(/^\s|\s$/g,"");var q=t.replace(/^\s|\s$/g,""),G=w.test(j);q=w.test(q);if(G||q){if(r!=undefined||p!=undefined)if(k==r&&g==p)a.g.push(new R(j,h));else t==f&&a.g.push(new R(j,h));else{h=g.charAt(0)+k/100;a.g.push(new R(j))}if(X.EnableCustomFOUTHandler==true)a.a.v(b,c?"mti_font_element"+c:"mti_font_element");
a.r.push(b);t=b.getAttribute("style");u=u;u+=t&&t.indexOf("font-weight")>-1&&t.indexOf("font-style")>-1?"_"+g.charAt(0)+k/100:h.length>1?"_"+h:"";if(l.enableSubsetting)if(a.U[u.replace(/^\s|\s$/g,"")])a.U[u.replace(/^\s|\s$/g,"")]+=a.a.aa(b);else a.U[u.replace(/^\s|\s$/g,"")]=a.a.aa(b)}}}}}
function oa(a,b,c){b="img,script,noscript,iframe,object,style,param,embed,link,meta,head,title,br,hr".split(",");var d=a.N,e=null;do if(d){e=d.firstChild;if(e==null){if(d.nodeType==1)if(a.indexOf(b,d.tagName.toLowerCase())<0)c?Y(a,d,c):Y(a,d);e=d.nextSibling}if(e==null){d=d;do{e=d.parentNode;if(e==a.N){if(e.tagName.toLowerCase()!="body")if(a.indexOf(b,e.tagName.toLowerCase())<0)c?Y(a,e,c):Y(a,e);break}if(e!=null){if(e.nodeType==1)if(a.indexOf(b,e.tagName.toLowerCase())<0)c?Y(a,e,c):Y(a,e);d=e;e=e.nextSibling}}while(e==
null)}d=e}while(d!=a.N);c=false;for(var f in a.U){c=true;break}if(c)return a.U;return null}mti.u.prototype.C=function(){var a=this.g,b=a==null?0:a.length,c={},d,e=[];for(d=0;d<b;d+=1){var f=a[d].t+"||"+a[d].O+"||"+a[d].F;c[f]=f}for(d in c){b=c[d].split("||");a=b[0];(b=b[2]+b[1])?e.push(new R(a,b)):e.push(new R(a))}return this.g=e};
mti.u.prototype.W=function(a,b,c){var d="img,script,noscript,iframe,object,style,param,embed,link,meta,head,title,br,hr".split(","),e=this.N,f=null;do{f=e.firstChild;if(f==null){e.nodeType==1&&this.indexOf(d,e.tagName.toLowerCase())<0&&Y(this,e);f=e.nextSibling}if(f==null){e=e;do{f=e.parentNode;if(f==this.N)break;f.nodeType==1&&this.indexOf(d,f.tagName.toLowerCase())<0&&this.a.A(f).indexOf(a)>-1&&this.a.W(f,a,b,c);e=f;f=f.nextSibling}while(f==null)}e=f}while(e!=this.N);return null};mti.La=4E4;mti.e=function(a,b,c,d,e){this.L=a;this.b=b;this.a=c;this.c=d;this.bb={};this.l=e;this.g=[]};mti.e.Na="monotype";
function ma(a,b,c){b=a.c.projectId;var d;if(b){a.L.mti_element_cache=[];pa(a);var e=a.b.getName();e=e.toLowerCase();var f=e=="opera"?true:false,k=a.b.q,g=e=="msie"&&k<=8?true:false,i=function(){if(X.UseHybrid){window.MonoTypeWebFonts.addEvent("active",function(){qa(a,a.ba,d)});window.MonoTypeWebFonts.addEvent("inactive",function(){qa(a,a.ba,d)})}function v(){o=new mti.u(document.body,a.a,a.c.pfL);C=oa(o);f&&ra(a);a.L.mti_element_cache=o.r;d=o.C();Z(a,d,C);var x=o.r;a.l!=null&&mti.w(a.l,a.l.load,x)();
for(var A=0;A<x.length;A++)for(var s in a.m)a.a.A(x[A]).indexOf(s)>-1&&a.a.W(x[A],s,a.m[s],g)}var B=a.c.reqSub,o=null,C=null;if(f&&B){sa(a);va(a,function(){v()})}else if(!f&&B)v();else{o=new mti.u(document.body,a.a,a.c.pfL);C=oa(o);Z(a,o.C);d=o.C();a.L.mti_element_cache=o.r;a.l!=null&&mti.w(a.l,a.l.load,o.r)()}c(true)};if(X.isAsync===true)X.onReady=i;else{setTimeout(function(){document.documentElement.style.visibility=""},750);if(a.c.reqSub)if(X.CheckFontWatcher&&X.UseHybrid){var m={},h=0,z=a.c.pfL.length;
b=a.c.projectId;e=a.c.ec;k=a.c.fcURL;for(var u=a.c.ck,w=0;w<a.c.pfL.length;w++){var l=a.c.pfL[w],r=l.fontfamily,p=l.contentIds,t=l.enableOtf;if(l.enableSubsetting){getCookieFlag=false;var j=wa(a,p),q,G;if(l.fontWeight!=undefined&&l.fontStyle!=undefined){q=l.fontWeight;G=l.fontStyle}fontURL=$(a,p,b,false,e,k,"",u,r,q,G,null,j,t);l=j!=null&&j.toUpperCase()=="EOT"||j.toUpperCase()=="MTX";_cssText='@font-face{\nfont-family:"'+r+'_fw";';_cssText+='\nsrc:url("'+fontURL+'")';p={TTF:"truetype",WOFF:"woff",
SVG:"svg",MTX:"truetype",OTF:"opentype"};l||(_cssText+=' format("'+p[j.toUpperCase()]+'")');_cssText+=";}\n";j=document.getElementById("mti_stylesheet_cache"+a.c.projectId);var D;if(j==null)D=a.a.createElement("style",{type:"text/css",id:"mti_stylesheet_cache"+a.c.projectId});if(_cssText!=""){j==null&&a.a.D("head",D);if(D.styleSheet)D.styleSheet.cssText+=_cssText;else D.innerHTML+=_cssText}xa(a,r+"_fw",function(v,B){m[v]=B;h++;if(h==z){for(B=v=0;B<a.c.pfL.length;B++)if(m[a.c.pfL[B].fontfamily+"_fw"]==
true){a.c.pfL[B].enableSubsetting=false;v++}if(v==h)Z(a,a.c.pfL);else{v=document.getElementById("mti_stylesheet_cache"+a.c.projectId);v.parentNode.removeChild(v);ya(a,i)}}})}else z--}}else ya(a,i);else a.Ka(function(){var v=new mti.u(document.body,a.a,a.c.pfL);oa(v);d=v.C();Z(a,d);a.L.mti_element_cache=v.r;a.l!=null&&mti.w(a.l,a.l.load,v.r)();c(true)});if(X.EnableCustomFOUTHandler==true)document.documentElement.style.visibility="hidden"}var n=[];if(d)n=d;if(a.c.reqSub&&(d==null?0:d.length)==0||f)for(q=
0;q<a.c.pfL.length;q++)n.push(new R(a.c.pfL[q].fontfamily));a.L["__mti_fntLst"+b]=function(){for(var v=[],B={},o=[],C=0;C<n.length;C++)if(!B.hasOwnProperty(n[C])){v.push({fontfamily:n[C].t});o.push(n[C]);B[n[C]]=1}return v}}else c(true)}function za(a,b){if(document.getElementsByClassName)return document.getElementsByClassName(b);else{var c=[];a.a.Ja(document.body,function(d){var e;e=d.className;var f;if(e){e=e.split(" ");for(f=0;f<e.length;f++)if(e[f]===b){c.push(d);break}}});return c}}
function sa(a,b){var c=document.createElement("STYLE");c.setAttribute("type","text/css");c.id="monotype_fake_fontface_"+a.c.projectId;var d="";a=a.c.pfL;if(a!=null){d+="@font-face{font-family:opera_testfont;src:url(data:font/opentype;base64,T1RUTwALAIAAAwAwQ0ZGIMA92IQAAAVAAAAAyUZGVE1VeVesAAAGLAAAABxHREVGADAABAAABgwAAAAgT1MvMlBHT5sAAAEgAAAAYGNtYXAATQPNAAAD1AAAAUpoZWFk8QMKmwAAALwAAAA2aGhlYQS/BDgAAAD0AAAAJGhtdHgHKQAAAAAGSAAAAAxtYXhwAANQAAAAARgAAAAGbmFtZR8kCUMAAAGAAAACUnBvc3T/uAAyAAAFIAAAACAAAQAAAAEAQVTDUm9fDzz1AAsD6AAAAADHUuOGAAAAAMdS44YAAADzAz8BdgAAAAgAAgAAAAAAAAABAAABdgDzAAkDQQAAAAADPwABAAAAAAAAAAAAAAAAAAAAAwAAUAAAAwAAAAICmgGQAAUAAAK8AooAAACMArwCigAAAd0AMgD6AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAEZIRAAAQAAgAC0C7v8GAAABdv8NAAAAAQAAAAAAAAAAACAAIAABAAAAFAD2AAEAAAAAAAAAPAB6AAEAAAAAAAEAAgC9AAEAAAAAAAIABwDQAAEAAAAAAAMAEQD8AAEAAAAAAAQAAwEWAAEAAAAAAAUABQEmAAEAAAAAAAYAAgEyAAEAAAAAAA0AAQE5AAEAAAAAABAAAgFBAAEAAAAAABEABwFUAAMAAQQJAAAAeAAAAAMAAQQJAAEABAC3AAMAAQQJAAIADgDAAAMAAQQJAAMAIgDYAAMAAQQJAAQABgEOAAMAAQQJAAUACgEaAAMAAQQJAAYABAEsAAMAAQQJAA0AAgE1AAMAAQQJABAABAE7AAMAAQQJABEADgFEAEcAZQBuAGUAcgBhAHQAZQBkACAAaQBuACAAMgAwADAAOQAgAGIAeQAgAEYAbwBuAHQATABhAGIAIABTAHQAdQBkAGkAbwAuACAAQwBvAHAAeQByAGkAZwBoAHQAIABpAG4AZgBvACAAcABlAG4AZABpAG4AZwAuAABHZW5lcmF0ZWQgaW4gMjAwOSBieSBGb250TGFiIFN0dWRpby4gQ29weXJpZ2h0IGluZm8gcGVuZGluZy4AAFAASQAAUEkAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAEYATwBOAFQATABBAEIAOgBPAFQARgBFAFgAUABPAFIAVAAARk9OVExBQjpPVEZFWFBPUlQAAFAASQAgAABQSSAAADEALgAwADAAMAAAMS4wMDAAAFAASQAAUEkAACAAACAAAFAASQAAUEkAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAAAAAAADAAAAAwAAABwAAQAAAAAARAADAAEAAAAcAAQAKAAAAAYABAABAAIAIAAt//8AAAAgAC3////h/9UAAQAAAAAAAAAAAQYAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAA/7UAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAQAEBAABAQEDUEkAAQIAAQAu+BAA+BsB+BwC+B0D+BgEWQwDi/eH+dP4CgUcAIwPHAAAEBwAkREcAB4cAKsSAAMCAAEAPQA/AEFHZW5lcmF0ZWQgaW4gMjAwOSBieSBGb250TGFiIFN0dWRpby4gQ29weXJpZ2h0IGluZm8gcGVuZGluZy5QSVBJAAAAAAEADgADAQECAxQODvb3h/cXAfeHBPnT9xf90wYO+IgU+WoVHgoDliX/DAmLDAr3Fwr3FwwMHgoG/wwSAAAAAAEAAAAOAAAAGAAAAAAAAgABAAEAAgABAAQAAAACAAAAAAABAAAAAMbULpkAAAAAx1KUiQAAAADHUpSJAfQAAAH0AAADQQAA)}";
for(var e=0;e<a.length;e++)d+="@font-face{font-family:'"+a[e].fontfamily+(b?b:"")+"';src:url(data:font/opentype;base64,T1RUTwALAIAAAwAwQ0ZGIMA92IQAAAVAAAAAyUZGVE1VeVesAAAGLAAAABxHREVGADAABAAABgwAAAAgT1MvMlBHT5sAAAEgAAAAYGNtYXAATQPNAAAD1AAAAUpoZWFk8QMKmwAAALwAAAA2aGhlYQS/BDgAAAD0AAAAJGhtdHgHKQAAAAAGSAAAAAxtYXhwAANQAAAAARgAAAAGbmFtZR8kCUMAAAGAAAACUnBvc3T/uAAyAAAFIAAAACAAAQAAAAEAQVTDUm9fDzz1AAsD6AAAAADHUuOGAAAAAMdS44YAAADzAz8BdgAAAAgAAgAAAAAAAAABAAABdgDzAAkDQQAAAAADPwABAAAAAAAAAAAAAAAAAAAAAwAAUAAAAwAAAAICmgGQAAUAAAK8AooAAACMArwCigAAAd0AMgD6AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAEZIRAAAQAAgAC0C7v8GAAABdv8NAAAAAQAAAAAAAAAAACAAIAABAAAAFAD2AAEAAAAAAAAAPAB6AAEAAAAAAAEAAgC9AAEAAAAAAAIABwDQAAEAAAAAAAMAEQD8AAEAAAAAAAQAAwEWAAEAAAAAAAUABQEmAAEAAAAAAAYAAgEyAAEAAAAAAA0AAQE5AAEAAAAAABAAAgFBAAEAAAAAABEABwFUAAMAAQQJAAAAeAAAAAMAAQQJAAEABAC3AAMAAQQJAAIADgDAAAMAAQQJAAMAIgDYAAMAAQQJAAQABgEOAAMAAQQJAAUACgEaAAMAAQQJAAYABAEsAAMAAQQJAA0AAgE1AAMAAQQJABAABAE7AAMAAQQJABEADgFEAEcAZQBuAGUAcgBhAHQAZQBkACAAaQBuACAAMgAwADAAOQAgAGIAeQAgAEYAbwBuAHQATABhAGIAIABTAHQAdQBkAGkAbwAuACAAQwBvAHAAeQByAGkAZwBoAHQAIABpAG4AZgBvACAAcABlAG4AZABpAG4AZwAuAABHZW5lcmF0ZWQgaW4gMjAwOSBieSBGb250TGFiIFN0dWRpby4gQ29weXJpZ2h0IGluZm8gcGVuZGluZy4AAFAASQAAUEkAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAEYATwBOAFQATABBAEIAOgBPAFQARgBFAFgAUABPAFIAVAAARk9OVExBQjpPVEZFWFBPUlQAAFAASQAgAABQSSAAADEALgAwADAAMAAAMS4wMDAAAFAASQAAUEkAACAAACAAAFAASQAAUEkAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAAAAAAADAAAAAwAAABwAAQAAAAAARAADAAEAAAAcAAQAKAAAAAYABAABAAIAIAAt//8AAAAgAC3////h/9UAAQAAAAAAAAAAAQYAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAA/7UAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAQAEBAABAQEDUEkAAQIAAQAu+BAA+BsB+BwC+B0D+BgEWQwDi/eH+dP4CgUcAIwPHAAAEBwAkREcAB4cAKsSAAMCAAEAPQA/AEFHZW5lcmF0ZWQgaW4gMjAwOSBieSBGb250TGFiIFN0dWRpby4gQ29weXJpZ2h0IGluZm8gcGVuZGluZy5QSVBJAAAAAAEADgADAQECAxQODvb3h/cXAfeHBPnT9xf90wYO+IgU+WoVHgoDliX/DAmLDAr3Fwr3FwwMHgoG/wwSAAAAAAEAAAAOAAAAGAAAAAAAAgABAAEAAgABAAQAAAACAAAAAAABAAAAAMbULpkAAAAAx1KUiQAAAADHUpSJAfQAAAH0AAADQQAA);}"}c.textContent=
d;b=document.getElementsByTagName("HEAD");b.length>0&&b[0].appendChild(c)}function ra(a){(a=document.getElementById("monotype_fake_fontface_"+a.c.projectId))&&a.parentNode.removeChild(a)}
function va(a,b){var c=document.createElement("SPAN");c.innerHTML="MMMWWW";c.style.position="absolute";c.style.left="-32768px";c.style.fontFamily="opera_testfont";document.documentElement.appendChild(c);var d=0,e=(new Date).getTime();d=window.setInterval(function(){if(a.a.A(c)==="opera_testfont"||(new Date).getTime()-e>200){try{document.documentElement.removeChild(c)}catch(f){}b();window.clearInterval(d)}},60)}
function wa(a,b){var c=a.c.ffArray,d=a.b.getName();d=d.toLowerCase();var e=a.b.q;if(d=="firefox")d="mozilla";if(/ipad|ipod|iphone/.test(a.b.Ea.toLowerCase()))d="msafari";if(d.toLowerCase()=="mozilla"&&e=="Unknown"){e=a.b.Q;d="msie"}a=c[d];c="";for(var f in a)if(parseFloat(e)>=parseFloat(f))if(b[a[f].toUpperCase()])c=a[f];return c}function Aa(a,b,c,d,e){a="";c=c;c+=d!=undefined&&e!=undefined?"_"+e.charAt(0)+d/100:"_n4";if(b&&b[c])a=b[c];return a.length>0?a:null}mti.e.prototype.m={};
function Z(a,b,c,d){var e="TTF",f=a.c.projectId,k=a.c.ec,g=a.c.fcURL,i=a.c.dfcURL,m=a.a.createElement("style",{type:"text/css",id:"mti_fontface_"+(d?"Aj_":"")+a.c.projectId}),h="",z=false,u={},w={};a.m={};var l={TTF:"truetype",WOFF:"woff",SVG:"svg",MTX:"truetype",OTF:"opentype"},r=a.b.getName();r=r.toLowerCase();var p=a.b.q;if(r.toLowerCase()=="mozilla"&&p=="Unknown"){p=a.b.Q;r="msie"}var t=r=="msie"&&p<8?true:false;p=r=="msie"&&p<=8?true:false;r=r=="opera"?true:false;var j=null,q=null;b||(b=[]);
for(var G=0;G<a.c.pfL.length;G++){var D=a.c.pfL[G],n=D.fontfamily,v=D.contentIds,B=D.enableOtf,o=D.enableSubsetting,C=null;if(D.fontWeight!=undefined&&D.fontStyle!=undefined){j=D.fontWeight;q=D.fontStyle;C=q.charAt(0)+j/100}e=wa(a,v);var x=true,A="";if(b.length>0||r||!o){x=r||!o?true:false;for(o=0;o<b.length;o++){A=j!=undefined||q!=undefined?n+"_"+q.charAt(0)+j/100:n+"_n4";if(b[o].t==n&&(j?b[o].O==j/100:true)&&(q?b[o].F==q.charAt(0):true)){C==null?a.g.push(new R(n)):a.g.push(new R(n,C));x=true;break}}if(r)C==
null?a.g.push(new R(n)):a.g.push(new R(n,C));if(x){C=e!=null&&e.toUpperCase()=="EOT"||e.toUpperCase()=="MTX";D=D.enableSubsetting;x=i;var s=a.c.ck;o=n;w=j;var y=q,J=e,L=v[J.toUpperCase()];x=(window.location.protocol=="https:"?"https://":"http://")+x.replace("http://","").replace("https://","");x=x+"?";if(k)x+=s+"&";x+="fctypeId="+a.c.fctypeArray[J]+"&fcId="+v.TTF+"&origId="+L;x+="&projectId="+f;x+="&content=";s="";J=a.b.getName();J=J.toLowerCase();L=a.b.q;if(J.toLowerCase()=="mozilla"&&L=="Unknown")J=
"msie";J=J=="msie"?true:false;if(c){L=null;o=Aa(a,c,o,w,y);o=Ba(a,o);if(J){if(o)L=o.replace("\\","").replace("#","").replace("&","").replace(">","").replace("%","").replace("<","").replace('"',"").replace("'","").replace("+","").replace("/","%2f")}else L=escape((o||"").replace("\\","").replace("/","%2f"));s+=(L||"")+la+"Mm"}o=x+s;y=a.c.bsmcArray;s=a.b.getName();s=s.toLowerCase();if(s=="firefox")s="mozilla";if(/ipad|ipod|iphone/.test(a.b.Ea.toLowerCase()))s="msafari";w=a.b.q;if(s.toLowerCase()=="mozilla"&&
w=="Unknown"){w=a.b.Q;s="msie"}y=y[s];s="";for(var ta in y)if(parseFloat(w)>=parseFloat(ta))s=y[ta];w=s;if(o.length>w){x=w-x.length;x={Ba:Math.ceil(o.length/x),Wb:x}}else x={Ba:1};x=x.Ba;w=false;if(t&&x>1){x=1;w=true;D=false}o="";if(x>1||d){if(c!==null){z=true;u[A]||(u[A]=[]);if(c)var ua=c[A];if(ua){w=[];y="";o=y=(d?n.length>25?n.substring(0,20):n:n)+(d?d:"");o+=p&&q!=undefined&&j!=undefined?"_"+q.charAt(0)+j/100:q!=undefined&&j!=undefined?"_"+q.charAt(0)+j/100:"_n4";u[A].push(o);c[o]=ua;o=x>1?$(a,
v,f,false,k,g,i,a.c.ck,y,j,q,c,e,B):$(a,v,f,D,k,g,i,a.c.ck,y,j,q,c,e,B);if(o!=""){h+='@font-face{\nfont-family:"'+y+'";';if(p==false&&j!=undefined&&q!=undefined){h+="\nfont-style:"+q+";";h+="\nfont-weight:"+j+";"}h+='\nsrc:url("'+o+'")';C||(h+=' format("'+l[e.toUpperCase()]+'")');h+=";}\n";w.push("'"+y+"'")}a.m[n]=w}else if(p&&!D){if(p&&j!=undefined&&q!=undefined)n+="_"+q.charAt(0)+j/100;o=$(a,v,f,D,k,g,i,a.c.ck,n+(d?d:""),j,q,w?null:c,e,B);if(o!=""){h+='@font-face{\nfont-family:"'+n+(d?d:"")+'";';
if(p==false&&j!=undefined&&q!=undefined){h+="\nfont-style:"+q+";";h+="\nfont-weight:"+j+";"}h+='\nsrc:url("'+o+'")';if(!C){n=v[e.toUpperCase()];e=l[e.toUpperCase()];n||(e=l.TTF);h+=" format('"+e+"')"}h+=";}\n"}}}}else{o=$(a,v,f,D,k,g,i,a.c.ck,n+(d?d:""),j,q,w?null:c,e,B);if(o!=""){B="";if(p&&j!=undefined&&q!=undefined){B="_"+q.charAt(0)+j/100;a.m[n]=n+B}h+='@font-face{\nfont-family:"'+n+(d?d:"")+B+'";';if(p==false&&j!=undefined&&q!=undefined){h+="\nfont-style:"+q+";";h+="\nfont-weight:"+j+";"}h+=
'\nsrc:url("'+o+'")';if(!C){n=v[e.toUpperCase()];e=l[e.toUpperCase()];n||(e=l.TTF);h+=" format('"+e+"')"}h+=";}\n"}}}}}if(z===true||d){a.a.Ga(a.a.getElementById("mti_stylesheet_"+(d?"Aj_":"")+a.c.projectId)||{});d?pa(a,u,d):pa(a,u)}h!=""&&a.a.D("head",m);if(m.styleSheet)m.styleSheet.cssText=h;else{a=document.createTextNode(h);m.appendChild(a)}}
function pa(a,b,c){var d=new P("-"),e=a.a.createElement("style",{type:"text/css",id:"mti_stylesheet_"+(c?"Aj_":"")+a.c.projectId}),f="",k="";k=X.UseTextIndent==true?"text-align:left;text-indent:-9999px;font-size:0px":"visibility:hidden;";if(X.EnableCustomFOUTHandler==true){var g=a.c.pfL;f+="."+ja+"-loading .mti_font_element"+(c?"_Aj":"")+"{"+k+"}\n";for(var i=0;i<g.length;i++){var m=g[i].fontfamily,h="4",z="n";if(g[i].fontWeight!=undefined&&g[i].fontStyle!=undefined){h=g[i].fontWeight/100;z=g[i].fontStyle.charAt(0)}if(c)m+=
c;if(m)f+="."+d.h(ja,m,z+h,"loading")+" .mti_font_element"+(c?c:"")+"{"+k+"}\n"}}d=(new O(navigator.userAgent,document)).parse().getName();d=d.toLowerCase();h=a.b.q;if(d.toLowerCase()=="mozilla"&&h=="Unknown"){h=a.b.Q;d="msie"}d=d=="msie"&&h<=8?true:false;for(i in a.c.selectorFontMap){g=a.c.selectorFontMap[i];m=g.familyName;z=g.fontStyle;h=g.fontWeight;m=m;if(b&&b[m]&&b[m].length>0)m=b[m].join("','");if(!c){if(d&&z!=undefined&&h!=undefined)m+="_"+z.charAt(0)+h/100;f+=i+"{font-family:'"+m+"';";if(d==
false&&z!=undefined&&h!=undefined){f+="\n font-style:"+z+";";f+="\n font-weight:"+h+";"}if(a.l!=null){h=g.otf;z=g.vrnt;if(h&&h!=null&&h!="")f+=a.l.Rb(h,z)}f+="}\n"}if(X.EnableCustomFOUTHandler==true){f+="\n";h=i.split(",");for(var u in h)f+="."+ja+"-loading "+h[u]+"{"+k+"}\n"}}f!=""&&a.a.D("head",e);if(e.styleSheet)e.styleSheet.cssText=f;else{a=document.createTextNode(f);e.appendChild(a)}}
function Ba(a,b){if(b&&typeof b=="string"){b=b.replace(/\s/g,"").replace(/\n/g,"").replace(/\r/g,"");a="";for(var c=b.length,d=null,e=0;e<c;e++){d=b.charAt(e);if(a.indexOf(d)==-1)a+=d}return a}return""}
function $(a,b,c,d,e,f,k,g,i,m,h,z,u,w,l){var r=b[u.toUpperCase()],p="http://",t="";if(X.UseHybrid){t=i+"_f";if(m!=undefined&&h!=undefined){fontVariation=h.charAt(0)+m/100;t=(i.length>25?i.substring(0,20):i)+"_"+fontVariation+"_f"}if(d==true&&Ca(a,t)&&!l)return $(a,b,c,false,e,f,k,g,i,m,h,z,u,w,true)}l=a.c.fontdataversion;var j=a.c.env;if(window.location.protocol=="https:")p="https://";f=f.replace("http://","").replace("https://","");k=k.replace("http://","").replace("https://","");f=p+f+(w?"ot/":
"");k=p+k;if(d){t=k+"?";if(e)t+=g+"&";t+="fctypeId="+a.c.fctypeArray[u]+"&fcId="+b.TTF+"&origId="+r;if(l=="v2"){t+="&fontdataversion=v2";if(j!="undefined"&&j!="")t+="&env="+j}}else if(e)if(r){if(l=="v2")f+=u.toUpperCase()=="EOT"?"2/":u.toUpperCase()=="WOFF"?"3/":u.toUpperCase()=="SVG"?"11/":u.toUpperCase()=="OTF"?"13/":"1/";t=f+r+"."+u.toLowerCase()+"?"+g}else t=f+"1/"+b.TTF+".ttf?"+g;else t=f+"?fctypeId="+a.c.fctypeArray[u]+"&fcId="+r;t+="&projectId="+c;b=a.b.getName();b=b.toLowerCase();c=a.b.q;
if(b.toLowerCase()=="mozilla"&&c=="Unknown")b="msie";b=b=="msie"?true:false;c=null;if(z)if(d){d=Aa(a,z,i,m,h);if(d=Ba(a,d))c=d.replace("\\","").replace("#","").replace("&","").replace(">","").replace("%","").replace("<","").replace('"',"").replace("'","").replace("+","");b||(c=escape(c||""));if(c&&c.length>0)t+="&content="+(c||"")+la+"Mm";else t=""}if(u!=null&&u.toUpperCase()=="SVG")t+="#"+r;return t}
mti.e.indexOf=function(a,b){if(Array.prototype.indexOf)return a.indexOf(b);else{var c=a.length>>>0,d=Number(b)||0;d=d<0?Math.ceil(d):Math.floor(d);if(d<0)d+=c;for(;d<c;d++)if(d in a&&a[d]===b)return d;return-1}};
function Da(a,b){var c=false;c=document.getElementById(b)===null?false:true;if(!c)return false;var d=true;a.g=[];var e=a.c.projectId,f=a.c.ec,k=a.c.fcURL,g=a.c.ck;c="";var i,m;d=a.b.q;var h=a.b.getName().toLowerCase(),z=h=="msie"&&d<=8?true:false,u=h=="opera"?true:false,w={TTF:"truetype",WOFF:"woff",SVG:"svg",MTX:"truetype",OTF:"opentype"};d=true;if(X.UseHybrid){d=false;var l=document.getElementById(b);h=a.a.getElementById("mti_fontface_"+e);if(h==null){h=a.a.createElement("style",{type:"text/css",
id:"mti_fontface_"+e});a.a.D("head",h)}var r=l.getAttribute("data-mtiFont"),p=a.a.getComputedStyle(l);if(r==null)r=p.fontFamily.replace(/^\s|\s$/g,"").replace(/'|"/g,"");for(var t=[],j=0;j<a.c.pfL.length;j++)t.push(a.c.pfL[j].fontfamily);if(l.hasChildNodes&&mti.e.indexOf(t,r)<0){j=l.childNodes;for(l=0;l<j.length;l++)if(j[l].nodeType==1){r=a.a.A(j[l]).replace(/^\s|\s$/g,"").replace(/'|"/g,"");if(mti.e.indexOf(t,r)>-1)break}}t=p.fontWeight;p=p.fontStyle;j=p.charAt(0)+t/100;var q=r.split(",");for(l=
0;l<q.length;l++){d=q[l]+"_f";var G,D=false;for(j=0;j<a.c.pfL.length;j++){G=a.c.pfL[j];var n=G.fontfamily;if(q[l]==n&&G.enableSubsetting)if(G.fontWeight!=undefined&&G.fontStyle!=undefined){i=G.fontWeight;m=G.fontStyle;if(p==G.fontStyle&&t==G.fontWeight){D=true;j=m.charAt(0)+i/100;d=(n.length>25?n.substring(0,20):n)+"_"+j+"_f";a.g.push(new R(n,j));break}}else{a.g.push(new R(n));D=true;break}}if(Ca(a,d)&&D){d=false;contentIdArray=G.contentIds;enableOtf=G.enableOtf;fFormat=wa(a,contentIdArray);G=n;if(z&&
m!=undefined&&i!=undefined)G+="_"+m.charAt(0)+i/100;fontURL=$(a,contentIdArray,e,false,f,k,"",g,G,i,m,null,fFormat,enableOtf);if(fontURL!=""){c+='@font-face{\nfont-family:"'+n+'";';if(z==false&&i!=undefined&&m!=undefined){c+="\nfont-style:"+m+";";c+="\nfont-weight:"+i+";"}c+='\nsrc:url("'+fontURL+'")';if(!(fFormat!=null&&fFormat.toUpperCase()=="EOT"||fFormat.toUpperCase()=="MTX")){i=contentIdArray[fFormat.toUpperCase()];m=w[fFormat.toUpperCase()];i||(m=w.TTF);c+=" format('"+m+"')"}c+=";}\n"}if(h.styleSheet){i=
h.styleSheet.cssText;i=i.replace(n,"xxx");h.styleSheet.cssText=i;h.styleSheet.cssText+=c}else h.innerHTML+=c;document.getElementById(b).style.fontFamily=""+r;document.getElementById(b).removeAttribute("data-mtiFont");n="";if(document.getElementById(b).hasChildNodes()){n=document.getElementById(b).childNodes;for(c=0;c<n.length;c++)if(n[c].nodeType==1&&n[c].getAttribute("data-mtiFont")){n[c].style.fontFamily=n[c].getAttribute("data-mtiFont");n[c].removeAttribute("data-mtiFont")}}break}else d=true}}if(d){var v=
Ea(a),B=null,o=null,C=[],x=function(){B=new mti.u(document.getElementById(b).parentElement,a.a,a.c.pfL);o=oa(B,{},v);u&&ra(a);var A=[];if(o!=undefined)for(var s in o){s+=v;A.push(new R(y))}a.L.mti_element_cache=B.r;Z(a,B.C(),o,v);A=B.r;a.l!=null&&mti.w(a.l,a.l.Vb,A)();for(s=0;s<A.length;s++)for(var y in a.m)if(a.a.A(A[s]).indexOf(y)>-1)if(A[s].getAttribute("id")==b)a.a.W(A[s],y,a.m[y],z);else a.a.kb(a.a.getElementById(b),A[s])&&a.a.A(A[s]).replace(/'|"/g,"").indexOf(y)>-1&&a.a.W(A[s],y,a.m[y],z);
A=a.m[y]==null?0:a.m[y].length;for(s=0;s<A;s++)C.push(new R(a.m[y][s]))};if(u){sa(a,v);va(a,function(){x()})}else x();X.RemoveMTIClass==true&&setTimeout(function(){var A="mti_font_element"+v,s=(new O(navigator.userAgent,document)).parse(),y=za(a,A),J=s.getName();J=J.toLowerCase();s=s.q;J=J=="msie"&&s<8?true:false;for(s=new RegExp(A,"ig");y.length>0;){for(var L=0;L<y.length;L++)if(y[L].className.split(" ").length==1&&!J)y[L].removeAttribute("class");else y[L].className=y[L].className.replace(s," ").replace(/^\s+|\s+$/g,
"");y=za(a,A)}},fa.La);n={};if(X.UseHybrid){n.fontactive=function(){qa(a,a.ba,C)};n.fontinactive=function(){qa(a,a.ba,C)}}(new V(a.b,a.a,new Q(a.a,document.documentElement,n),6E5)).X(C,{},{},false)}}mti.e.prototype.load=function(a){a(this.C(),this.bb)};mti.Ma=function(a){this.o=a};mti.Ma.prototype.protocol=function(){var a=["http:","https:"],b=a[0];if(this.o&&this.o.location&&this.o.location.protocol){var c=0;for(c=0;c<a.length;c++)if(this.o.location.protocol==a[c])return this.o.location.protocol}return b};
mti.oa=function(a,b){this.a=a;this.c=b};mti.oa.prototype.appendBannerScript=function(){var a;a=new RegExp(escape("WFS_MTI_SS")+"=([^;]+)");if(a.test(document.cookie+";")){a.exec(document.cookie+";");a=unescape(RegExp.$1)}else a=false;var b=this.c.bannerHandlerURL;if(b){b+="?projectId="+this.c.projectId;if(a!==false)b+="&WFS_MTI_SS="+a;b+="&"+escape((new Date).getTime());this.a.D("head",this.a.createElement("Script",{type:"text/javascript",src:b}))}};mti.Pa=function(a){this.wb=a};
MonoTypeWebFonts.Ra(mti.e.Na,function(a){var b=(new O(navigator.userAgent,document)).parse(),c=new H(window),d=null;if(a.enableOtf)d=new mti.Nb(c,b,a);window.MonoTypeWebFonts.BannerHandler=new mti.oa(c,a);a=new mti.e(window,b,c,a,d);var e=new mti.Pa(a);window.MonoTypeWebFonts.renderPartial=function(f){Da(e.wb,f)};return a});function Ea(){for(var a="",b=0;b<5;b++)a+="abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random()*26));return a}mti.e.prototype.C=function(){return this.g};mti.e.H=false;
function ya(a,b){if(mti.e.H===true)b();else{var c=a.a.p;if(a.b.getName()=="MSIE"){var d=false,e=function(){if(!d){d=true;b();mti.e.H=true}};(function(){try{c.documentElement.doScroll("left");if(c.readyState!="complete"){setTimeout(arguments.callee,50);return}}catch(f){setTimeout(arguments.callee,50);return}e()})();c.onreadystatechange=function(){if(c.readyState=="complete"){c.onreadystatechange=null;e()}}}else if(a.b.Za=="AppleWebKit"&&a.b.Q<525)(function(){if(["loaded","complete"].indexOf(c.readyState)>
-1){b();mti.e.H=true}else setTimeout(arguments.callee,50)})();else if(c.addEventListener)if(c.readyState=="loading")c.addEventListener("DOMContentLoaded",function(){b();mti.e.H=true},false);else window.onload=function(){b();mti.e.H=true};else window.onload=function(){b();mti.e.H=true}}}mti.e.prototype.Ka=function(a){function b(){document.body?a():setTimeout(b,0)}b()};
mti.e.prototype.ba=function(a,b){var c=this;if(!(a!=null&&a.length<1)){var d=c.c.projectId,e=c.c.ec,f=c.c.fcURL,k=c.c.ck;a="";var g,i,m=c.b.q,h=c.b.getName();h=h.toLowerCase();var z=h=="msie"&&m<=8?true:false;h=false;var u={TTF:"truetype",WOFF:"woff",SVG:"svg",MTX:"truetype",OTF:"opentype"};m=[];for(var w=0;w<c.c.pfL.length;w++){for(var l=c.c.pfL[w],r=false,p=l.fontfamily,t=0;t<c.g.length;t++)if(c.g[t].t==p&&l.enableSubsetting){var j=p+"_f";r=true;if(l.fontWeight!=undefined&&l.fontStyle!=undefined){r=
false;if(c.g[t].O==l.fontWeight/100&&c.g[t].F==l.fontStyle.charAt(0)){r=true;g=l.fontWeight;i=l.fontStyle;fontVariation=i.charAt(0)+g/100;j=(p.length>25?p.substring(0,20):p)+"_"+fontVariation+"_f"}}break}if(r){j=p+"_f";if(l.enableSubsetting){if(l.fontWeight!=undefined&&l.fontStyle!=undefined){g=l.fontWeight;i=l.fontStyle;fontVariation=i.charAt(0)+g/100;j=(p.length>25?p.substring(0,20):p)+"_"+fontVariation+"_f"}m.push(j);contentIdArray=l.contentIds;enableOtf=l.enableOtf;if(!Ca(c,j)){h=true;fFormat=
wa(c,contentIdArray);fontURL=$(c,contentIdArray,d,false,e,f,"",k,p,g,i,null,fFormat,enableOtf);if(fontURL!=""){if(z&&i!=undefined&&g!=undefined)p+="_"+i.charAt(0)+g/100;a+='@font-face{\nfont-family:"'+j+'";';if(z==false&&g!=undefined&&i!=undefined){a+="\nfont-style:"+i+";";a+="\nfont-weight:"+g+";"}a+='\nsrc:url("'+fontURL+'")';if(!(fFormat!=null&&fFormat.toUpperCase()=="EOT"||fFormat.toUpperCase()=="MTX")){l=contentIdArray[fFormat.toUpperCase()];r=u[fFormat.toUpperCase()];l||(r=u.TTF);a+=" format('"+
r+"')"}a+=";}\n"}}}}}g=c.a.getElementById("mti_fontface_"+d);if(g==null){g=c.a.createElement("style",{type:"text/css",id:"mti_fontface_"+(b?"Aj_":"")+c.c.projectId});a!=""&&c.a.D("head",g)}if(g.styleSheet)g.styleSheet.cssText+=a;else g.innerHTML+=a;if(h){b=[];for(a=0;a<m.length;a++)b.push(new R(m[a]));a={};a.fontactive=function(q){q.substr(q.length-2)=="_f"&&!Ca(c,q)&&Fa(c,q)};(new V(this.b,this.a,new Q(c.a,document.documentElement,a),6E5)).X(b,{},{},false)}}};
function qa(a,b,c){document.readyState=="complete"?setTimeout(function(){b.apply(a,c)},500):document.addEventListener("readystatechange",function(){document.readyState=="complete"&&setTimeout(function(){b.apply(a,c)},500)});if(document.addEventListener)document.addEventListener("keydown",function(d){a.ka.apply(a,[d])});else window.attachEvent?window.attachEvent("onkeydown",function(d){a.ka.apply(a,[d])}):document.addEventListener("keydown",function(d){a.ka.apply(a,[d])})}
mti.e.prototype.ka=function(a){if((a.ctrlKey||a.metaKey)&&a.keyCode==116){a.preventDefault();a=document.cookie.split(";");for(var b="",c=1;c<=a.length;c++){var d=a[c-1].split("="),e=d[0].substr(d[0].length-2);if(d[1]=="1"&&e=="_f"){b+=a[c-1];document.cookie=d[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"}}document.location.reload(true)}};
function xa(a,b,c){var d={};d.fontactive=function(){c(b,true)};d.fontinactive=function(){c(b,false)};var e=X.timeout==null?100:X.timeout;a=new V(a.b,a.a,new Q(a.a,document.documentElement,d),e);d=[];d.push(new R(b));a.X(d,{},{},false)}function Fa(a,b){a=new Date;a.setDate(a.getDate()+1);document.cookie=b+"="+("1; expires="+a.toUTCString())}function Ca(a,b){a=document.cookie.split(b+"=");b=null;if(a.length==2)b=a.pop().split(";").shift();return b==1?true:false};})(this,document);
if(window.addEventListener){  window.addEventListener('load', function(){MonoTypeWebFonts.cleanup();}, false);}else if(window.attachEvent){  window.attachEvent('onload', function(){MonoTypeWebFonts.cleanup();});}MonoTypeWebFonts.cleanupExecuted = false;MonoTypeWebFonts.cleanup = function(){if(MonoTypeWebFonts.cleanupExecuted === true){ return; }MonoTypeWebFonts.cleanupExecuted = (window['mti_element_cache'].length > 0);var className = document.documentElement.className;var MTIConfig = window['MTIConfig'] || { 'RemoveMTIClass': false };if(MTIConfig['RemoveMTIClass']==true){function walkTheDOM (node, func) {func(node);node = node.firstChild;while (node) {walkTheDOM(node, func);node = node.nextSibling;}}function getElementsByClassName (className) {if (document.getElementsByClassName){return document.getElementsByClassName(className);}else {var results = [];walkTheDOM(document.body, function (node) {var a, c = node.className, i;if (c) {a = c.split(' ');for (i=0; i<a.length; i++) {if (a[i] === className) {results.push(node);break;}}}});return results;}}setTimeout(function(){var mti_elements = getElementsByClassName('mti_font_element');var u=navigator.userAgent;var ua = u.toLowerCase(), is = function (t) { return ua.indexOf(t) > -1 },b = (!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)), c=false;if((RegExp.$1==6)||(RegExp.$1==7)){	c=true;	}while(mti_elements.length > 0){for(var i=0; i< mti_elements.length; i++){var classList=mti_elements[i].className.split(' ');if(classList.length==1 && !c){mti_elements[i].removeAttribute('class');}else{mti_elements[i].className=mti_elements[i].className.replace(/mti_font_element/ig, ' ').replace(/^\s+|\s+$/g,'');}}mti_elements = getElementsByClassName('mti_font_element');}},40000);}className = className;if(!document.getElementById('MonoTypeFontApiFontTracker')){  var fontTrackingUrl = "http://fast.fonts.net/t/1.css";  if(window.location.protocol == 'https:'){    fontTrackingUrl = fontTrackingUrl.replace(/http:/,'https:');  }  var head = document.getElementsByTagName('HEAD')[0];  var cssEle = document.createElement('LINK');  if(cssEle){      cssEle.setAttribute('id','MonoTypeFontApiFontTracker');      cssEle.setAttribute('type','text/css');      cssEle.setAttribute('rel','stylesheet');      cssEle.setAttribute('href',fontTrackingUrl + "?apiType=js&projectid=013abfcd-c15e-468e-aebc-4b44edca5e9f");      head.appendChild(cssEle);  }}window['mti_element_cache'] = [];};MonoTypeWebFonts._fontActiveEventList = [];MonoTypeWebFonts._fontLoadingEventList = [];MonoTypeWebFonts._activeEventList = [];MonoTypeWebFonts._inActiveEventList = [];MonoTypeWebFonts.addEvent = function(eventName, callbackFunction){   if(eventName.toLowerCase() == 'fontactive'){      MonoTypeWebFonts._fontActiveEventList.push(callbackFunction);  }else if(eventName.toLowerCase() == 'fontloading'){      MonoTypeWebFonts._fontLoadingEventList.push(callbackFunction);  }else if(eventName.toLowerCase() == 'inactive'){      MonoTypeWebFonts._inActiveEventList.push(callbackFunction);  }else if(eventName.toLowerCase() == 'active'){      MonoTypeWebFonts._activeEventList.push(callbackFunction);  }};MonoTypeWebFonts.loadFonts = function(){MonoTypeWebFonts.load({monotype:{ reqSub:false, enableOtf: false, otfJsParentUrl: '//fast.fonts.net/jsapi/otjs/',pfL:[{'fontfamily' : "HelveticaNeueW02-BlackC" ,contentIds :{EOT: 'a86ea76d-0c34-4ee1-8032-37134c83251b',WOFF: 'f8da16a1-d1cd-4723-8c63-c9e98bbd3e12',TTF: 'f6614e7d-4358-4d4d-a5a6-f78c794109b2',SVG: '833d26cd-6e2b-45e2-8027-53f24c6167e4'}, enableSubsetting : false, enableOtf: false },{'fontfamily' : "HelveticaNeueW01-77BdCn 692722" ,contentIds :{EOT: '83d5bc89-af33-46a9-8fe3-15d87784f50e',WOFF: '102ab74c-0e84-4fe5-a17a-b20fb643591a',TTF: '1d146b29-55e2-485b-96aa-5cb628e7e9eb',SVG: 'd90b3358-e1e2-4abb-ba96-356983a54c22'}, enableSubsetting : false, enableOtf: false },{'fontfamily' : "HelveticaNeueW02-77BdCn 694069" ,contentIds :{EOT: 'b140bbd0-c46d-44cc-9624-d6771c7ef867',WOFF: '0a4f4fc6-0a6f-48c8-b2ca-d0be41181c3e',TTF: 'b1fc01ad-5910-4abe-b74b-64b80fc93e9d',SVG: '877fb191-395b-4a54-bd78-78a0c8a4f363'}, enableSubsetting : false, enableOtf: false },{'fontfamily' : "HelveticaNeueW02-97Blac" ,contentIds :{EOT: '2577307a-8b8e-4e65-bfec-84b103ddbca9',WOFF: 'ae577454-d515-443e-a862-ba1c3be91fa1',TTF: '232d8cf9-7040-4cb3-acc7-b5e83fa3f3f7',SVG: 'ea0105b2-f20e-43ab-bd23-fe43f20cc4e8'}, enableSubsetting : false, enableOtf: false }],selectorFontMap:{},ck:'d44f19a684109620e4841470a390e8187ec4694d596e7fd2009c7371e56ff604b16b4c75adfcada40e16ef7bbddb8022b4e834fab1520ae812fd1bf3285e8cbeceb51f1b7d4bb15cb45097d80caeb33046e5714acf31793870059604f259',ec:'true',fcURL:'http://fast.fonts.net/dv2/',dfcURL:'http://api2.fonts.com/FontSubsetter.ashx',pURL:'http://api2.fonts.com/FontSubsetter.ashx',fontdataversion:'v2',sO:'True',ffArray:{safari: {'3.1': 'ttf','5.1':'woff'}, msafari: {'1' : 'svg', '4.2' : 'ttf'}, chrome: {'3' :'svg', '4' : 'ttf','5':'woff'}, opera: {'10' : 'ttf', '11.10' : 'woff'}, msie: {'4' : 'eot', '9' : 'woff', '10':'otf'}, mozilla: {'3.5' : 'ttf', '3.6' : 'woff'}},bsmcArray:{safari: {'3.1': '2000','5.0':'1650','5.1':'8190'}, msafari: {'1' : '8190'}, chrome: {'3' :'8190'}, opera: {'10' : '8190'}, msie: {'4':'1000','9':'2067'}, mozilla: {'3.5' : '8190'}},fctypeArray:{'ttf':'1','eot':'2','woff':'3','svg': '11','otf':'13'},projectId:'013abfcd-c15e-468e-aebc-4b44edca5e9f',EOD:null},fontloading:function(fontFamily, fontDescription){  for(var i=0; i<MonoTypeWebFonts._fontLoadingEventList.length; i++){      MonoTypeWebFonts._fontLoadingEventList[i].call(MonoTypeWebFonts, fontFamily, fontDescription);  }},fontactive:function(fontFamily, fontDescription) {  for(var i=0; i<MonoTypeWebFonts._fontActiveEventList.length; i++){      MonoTypeWebFonts._fontActiveEventList[i].call(MonoTypeWebFonts, fontFamily, fontDescription);  }},inactive:function(){  MonoTypeWebFonts.cleanup();  for(var i=0; i<MonoTypeWebFonts._inActiveEventList.length; i++){      MonoTypeWebFonts._inActiveEventList[i].call(MonoTypeWebFonts);  }},active:function(){  MonoTypeWebFonts.cleanup();  for(var i=0; i<MonoTypeWebFonts._activeEventList.length; i++){      MonoTypeWebFonts._activeEventList[i].call(MonoTypeWebFonts);  }}});};MonoTypeWebFonts.loadFonts();MonoTypeWebFonts.RefreshFonts=function(){MonoTypeWebFonts.cleanupExecuted = false;if(document.getElementById('mti_stylesheet_013abfcd-c15e-468e-aebc-4b44edca5e9f')!=null){var nodeToRemove1 = document.getElementById('mti_stylesheet_013abfcd-c15e-468e-aebc-4b44edca5e9f');var parentNode1 = nodeToRemove1.parentNode;parentNode1.removeChild(nodeToRemove1);}if(document.getElementById('mti_fontface_013abfcd-c15e-468e-aebc-4b44edca5e9f')!=null){var nodeToRemove2 = document.getElementById('mti_fontface_013abfcd-c15e-468e-aebc-4b44edca5e9f');var parentNode2 = nodeToRemove2.parentNode;parentNode2.removeChild(nodeToRemove2);}MonoTypeWebFonts.loadFonts();};MonoTypeWebFonts.loadColo = function(){};setTimeout(function(){ MonoTypeWebFonts.cleanup(); }, 40000);


/*ga.js*/
u.ga_account = 'UA-49620305-1';
u.ga_domain = 'dukkepartiet.dk';


/*u-googleanalytics.js*/
if(u.ga_account) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', u.ga_account, u.ga_domain);
    ga('send', 'pageview');
	u.stats = new function() {
		this.pageView = function(url) {
			ga('send', 'pageview', url);
		}
		this.event = function(node, action, label) {
			ga('_trackEvent', location.href.replace(document.location.protocol + "//" + document.domain, ""), action, (label ? label : this.nodeSnippet(node)));
		}
		this.customVar = function(slot, name, value, scope) {
			//       slot,		
			//       name,		
			//       value,	
			//       scope		
		}
		this.nodeSnippet = function(e) {
			if(e.textContent != undefined) {
				return u.cutString(e.textContent.trim(), 20) + "(<"+e.nodeName+">)";
			}
			else {
				return u.cutString(e.innerText.trim(), 20) + "(<"+e.nodeName+">)";
			}
		}
	}
}

