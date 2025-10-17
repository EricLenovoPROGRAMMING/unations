//iife
(function (global) {
	// uuid example: 55ed 868a-a712-4eb1-b963-a0b5 d000 2b90
	//847d b45f-ad58-1766-5839-7e25 bd49 50b9
	function generateUUID() {
		const HEXADECIMAL = "0123456789abcdef";
		let uuid = "";
		for (let u = 0; u < 4 * 8; u++) {
			if ((u % 4) == 0 && ~~(u / 4) >= 2 && ~~(u / 4) <= 5)
				uuid += "-";
			uuid += HEXADECIMAL[~~(Math.random() * 16)];

		}
		return uuid;

	}
	let onLeaves = [];
	function addOnLeave(func) {
		onLeaves.push(func);
	}

	let $ = (id => document.getElementById(id));

	let cache = {
		cache: {}
	};
	cache.getCache = (na) => {
		return cache.cache?.[na] || null;
	};
	cache.setCache = (na, v) => {
		cache.cache[na] = v;
	};

	const DEFAULT_FONT_SIZE = 16;
	const WEBVIEW_FONT_SIZE = ~~window.getComputedStyle(document.documentElement).fontSize.split("px")[0];
	const FONT_SIZE = (DEFAULT_FONT_SIZE / WEBVIEW_FONT_SIZE);
	document.documentElement.style.fontSize = `${FONT_SIZE}px`;
	let urlSavestates = {};

	let load = ((_directory, respType) => {
		
		let dir = _directory;

		let _d = _directory.split("./");

		let directory = (`./${_d[_d.length - 1]}`).replace(new RegExp("//", "gm"), "/");
		////console.log(directory)
		return new Promise((res, rej) => {
			let xhr = new XMLHttpRequest();
			xhr.timeout = 20000;
			xhr.responseType = "arraybuffer";

			xhr.onreadystatechange = async (event) => {

				if (event.target.readyState === 4 && event.target.status === 403) {
					//console.error("403: EricLenovo System does not find a file: forbidden or there's an error encountered during the loading of a file.")
					//rej("403: EricLenovo System does not find a file: forbidden or there's an error encountered during the loading of a file.");
					let retry = await __fetch(_directory, respType);
					res(retry);
					return;
				};

				if (event.target.readyState === 4 && event.target.status === 200) {
					//////console.log(xhr.response)
					var uint8Array = new Uint8Array(xhr.response);
					var i = uint8Array.length;
					let binaryString = new TextDecoder().decode(uint8Array);

					var base64 = binaryString;


					urlSavestates[directory] = binaryString;

					let type = {
						text: () => binaryString,
						blob: () => new Blob([uint8Array]),
						base64: () => binaryString

					}[respType || "text"];
					//////console.log(type())

					res(type());
				};
				if (event.target.readyState === 4 && event.target.status === 404) {

					rej("404: EricLenovo System does not find a file: no such file or directory.");
				};



				if (event.target.status !== 0 && event.target.status === 0) {

				};


			}
			xhr.open('GET', directory, true);
			xhr.send();
		})
	});



	let sendServer = (query, callback) => {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'response.php', true);
		xhr.onload = function () {
			callback(this);
		}

		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(query);
	};

	const SEARCH_PARAMS = {};
	do {
		let query = window.location.toString().split('?')[1];
		if (typeof query === "undefined") break;
		let keys = [];
		let values = [];

		for (let u of query.split("&")) {
			let q = u.split("=");
			let key = q[0];
			let value = q[1];
			SEARCH_PARAMS[key] = value;
		}
	} while (false);

	//console.log(SEARCH_PARAMS);
	let headerButton = 0;
	let header = [];
	for (let g of document.getElementsByTagName("JETK-head-button")) header.push(g);
	header.forEach(mo => {
		////console.log(mo)
		let hb = headerButton;
		mo.addEventListener("click", () => {
			////console.log(hb);
			switch (hb) {
				case 0: {
					loadURL("./map/main");
					break;
				}
				case 1: {
					loadURL("./map/lvm");
					break;
				}
				case 2: {
					loadURL("./map/about");
					break;
				}
			}
		}, false);
		headerButton++;
		//console.log(g(mo.attributes)
		if (("is-icon" in mo.attributes) && mo.attributes["is-icon"].value == "true") return;
		let text = mo.innerText;
		mo.innerHTML = `<JETK-head-buttontext style="pointer-events: none">${text}</JETK-head-buttontext>`;
		////console.log(mo);



	});

	function visibleHeaderBtn() {
		header.forEach(mo => {
			////console.log(mo)
			if (mo.id=="QUIZ") {
				mo.style.display = "none";
				return;
			}
			mo.style.display = "flex";



		});
	}
	let resizables = {
		fill: [],
		custom: [],
		fontsizeEm: []
	};
	let newelements = {};
	let parents = {};
	let animationsUUID = {};
	let animationsElements = {};



	function clean() {
		newelements = {};
		parents = {};
		animationsUUID = {};
		animationsElements = {};
		for (let o of onLeaves) {
			o();
		}
		for (let o of onLeaves) {
			onLeaves.unshift();
		}
		let content = document.getElementById("CONTENT");
		content.style.overflowY = "scroll";
		content.style.overflowX = "hidden";
	}

	async function loadURL(url) {
		let body = document.getElementById("CONTENT");
		let a = await load("./map/" + url + ".xml", "text");
		body.innerHTML = "";
		let xmlidReferences = {};
		clean();
		visibleHeaderBtn();
		let bodyHTML = document.createElement("bodycontent");
		bodyHTML.innerHTML = a;
		////console.log(a);
		let precontent = bodyHTML.getElementsByTagName("content")[0];
		let content = document.createElement("content");
		////console.log(precontent)

		let metadata = bodyHTML.getElementsByTagName("metadata")[0];
		let keyframesXML = metadata.getElementsByTagName("keyframes")[0];
		let listeners = {

		};
		let __script = {};	


		if (keyframesXML) {
			let mq = document.getElementById("STYLE");
			mq.innerHTML = "";
			let tr = "";
			let animation = keyframesXML.getElementsByTagName("animation");
			for (let k of animation) {
				let uuid = generateUUID();
				tr += "@keyframes a_" + uuid + " {";
				////console.log(k.attributes.name.name)
				animationsUUID[k.attributes.name.value] = "a_" + uuid;
				let keyframe = k.getElementsByTagName("keyframe");
				for (let kk of keyframe) {
					tr += `${kk.attributes.t.value} { ${kk.attributes.a.value} }`;
				}
			}
			tr += "}";
			mq.innerHTML = tr;
		}

		let xmlScript = metadata.getElementsByTagName("script")[0];
		let _function;
		if (xmlScript) {
			let mq = xmlScript.innerText;

			_function = new Function(["global", "document", "content", "contentSize", "load", "uuid", "addOnLeave", "getElementById", "switchPage", "cache", "__local"], mq + ";;;;;");

		}

		let elements = {};
		for (let k in newelements) {
			delete newelements[k];
		}
		for (let k in parents) {
			delete parents[k];
		}


		function recursor2(element, fun) {
			fun(element);
			if (element.length == 0) return;
			for (let m of element.children) {
				recursor2(m, fun);
			}
		}

		function getElementByUUID(f, fallback) {
			if (f in newelements) return newelements[f];
			return fallback;
		}

		recursor2(precontent, (e) => {
			let uuid = generateUUID();
			e.uuid = (uuid);
			elements[uuid] = e;
		}); /** */

		recursor2(precontent, (e) => {
			////console.log(e.parentNode)
			if (!e?.parentNode) return;
			if (!e.parentNode?.uuid) {
				parents[e.uuid] = "base";
				return;
			}
			parents[e.uuid] = e.parentNode.uuid;
		});

		resizables.fill.length = 0;
		resizables.custom.length = 0;
		resizables.fontsizeEm.length = 0;

		for (let k in elements) {
			let e = elements[k];
			let ea = e.tagName
			let inner = "";
			let attr = {
				style: ""
			};
			let isFontSizeCalled = false;
			if (!(k in listeners)) listeners[k] = [];
			let int = 0;
			let id = "";
			while (int < 100) {
				if (!e.attributes.item(int)) break;
				let item = e.attributes.item(int);
				int++;

				////console.log(item);
				if (item.name == "value") {
					inner = item.value;
				}
				if (item.name == "fill") {
					let reference = document.getElementById("CONTENT").getBoundingClientRect();
					e.style.width = reference.width;
					e.style.height = reference.height;
					resizables.fill.push(k);
				}

				if (item.name.startsWith("webstyle:")) {
					let name = item.name.replace("webstyle:", "");
					if (name == "font-size-em") {
						isFontSizeCalled = true;
						resizables.fontsizeEm.push({
							a: k,
							value: parseFloat(item.value)
						});
					}
					resizables.custom.push({
						a: k,
						value: parseFloat(item.value),
						t: name
					});

				} else if (item.name.startsWith("styleproperty:")) {
					let name = item.name.replace("styleproperty:", "");
					attr.style += "--" + name + ":" + item.value + ";";
				}
				else if (item.name.startsWith("style:")) {
					let name = item.name.replace("style:", "");
					if (name == "font-size") {
						isFontSizeCalled = true;
					}
					attr.style += name + ":" + item.value + ";";
				}
				else if (item.name.startsWith("listener:")) {
					let name = item.name.replace("listener:", "");
					listeners[k].push([name, (t, event) => {
						event.preventDefault();
						let man = new Function(["_this", "global", "event", "$", "sendServer", "loadURL", "load", "uuid", "__script"], item.value);
						man(t, this, event, (e) => document.getElementById(e), sendServer, validateLink, load, generateUUID, __script);
					}]);
				} else switch (item.name) {
					case "src": {
						//attr.src
						if (e.tagName == "PHOTO") {
							ea = ("img");
						}
						load(item.value, "blob").then((res, rej) => {
							////console.log(res)
							let url = URL.createObjectURL(res);
							newelements[k].src = url;
						});
						break;
					}
					case "animation": {
						let split = item.value.split("/");
						////console.log(split,(item.value.toString()))
						////console.log(animationsUUID);
						let sam = animationsUUID[(split[0] || "")];
						let la = `${sam || ""} ${split[1] || ""} ${split[2] || ""} ${split[3] || ""} ${split[4] || ""}`;
						////console.log(split,Object.keys(animationsUUID), sam)
						//attr.style += la;
						animationsElements[k] = {
							name: sam || "",
							time: split[1] || "",
							iterations: split[2] || "",
							timingFunction: split[3] || "",
							delay: split[4] || ""
						}; //TODO continue this one finished)
						break;
					}
					case "id": {
						id = item.value;
						
						break;
					}
				}
			}
			if (!isFontSizeCalled) {
				attr.style += "font-size: " + FONT_SIZE + "px";
				resizables.fontsizeEm.push({
					a: k,
					value: 1
				});
			}
			////console.log(e.innerText)
			let a = document.createElement(ea);
			if (id !== "") xmlidReferences[id] = a;
			a.id = k;
			a.innerText = inner;
			for (let o in attr) {
				let at = attr[o];

				a.setAttribute(o, at);
			}

			for (let s of listeners[k]) {
				a.addEventListener(s[0], (evt) => {
					s[1](a, evt);
					});
			}




			newelements[k] = a;
		}
		for (let h in parents) {
			let parent = parents[h];
			let ael = getElementByUUID(h);

			if (parent == "base") {
				content.append(ael);
				//ael.offsetHeight;
				continue;
			}

			let apr = getElementByUUID(parent);
			//let ael = getElementByUUID(h);
			apr.append(ael);

			//ael.offsetHeight;
		}


		function saj() {
			function getElementById(_id) {
				return xmlidReferences[_id];
			}
			_function(window, document, body, {
				get width() {
					return contentWidth;
				},
				get height() {
					return contentHeight;
				}
			}, load, generateUUID, addOnLeave, getElementById, loadURL, cache, __script);
			for (let m in newelements) {
				body.appendChild(content);
				document.title = bodyHTML.getElementsByTagName("TITLE")[0].innerHTML + " - JETKode Mains";

				let elem = document.getElementById(m);



				if (m in animationsElements) {
					let strStyle = elem.getAttribute("style");

					{
						let am = animationsElements[m];
						elem.style.setProperty("animation-name", am.name);
						elem.style.setProperty("animation-duration", am.time);
						elem.style.setProperty("animation-iteration-count", am.iterations);
						elem.style.setProperty("animation-timing-function", am.timingFunction);
						elem.style.setProperty("animation-delay", am.delay);
					}
				}
				resize();
			}


		}
		window.setTimeout(saj, 1);
		//console.log(content.innerHTML)

	}

	async function validateLink(link) {
		if (link == "mn") {
			let string = await load("./homepage.xml");
			for (let h of ["ifugao", "cebuano", "maguindanao"]) {

			}
		} else {
			loadURL(link);
		}
	}
	window.addEventListener("load", () => {
		if ("url" in SEARCH_PARAMS) {
			validateLink(SEARCH_PARAMS.url);
		} else {
			validateLink("main");
		}
	});
	let contentWidth, contentHeight;



	function resize() {
		let width = window.innerWidth;
		let height = window.innerHeight;
		let sumWidth = 0;


		let cellSize = ~~(Math.max(width, height) / 50);
		let fontSize = ~~((Math.max(width, height) / 50) * (FONT_SIZE));

		//console.log(fontSize, FONT_SIZE, WEBVIEW_FONT_SIZE, DEFAULT_FONT_SIZE)
		let headerHeightNum = cellSize * 1.3;
		let headerHeight = `${headerHeightNum}px`;

		let core = document.getElementById("CORE").style;

		core.width = width + "px";
		core.height = height + "px";


		for (let header of [
			document.getElementById("HEADER"),
			document.getElementById("HEADER-BACKGROUND"),
			document.getElementById("HEADER-FOREGROUND")
		]) {
			sumWidth += width;
			header.style.width = width + "px";

			header.style.height = headerHeight;
			header.style.setProperty("--width", width + "px");
		}

		let logo = document.getElementById("logo").style;
		logo.width = logo.height = headerHeight;
		logo.marginLeft = (fontSize * 0.3) + "px";
		logo.marginRight = (fontSize * 0.3) + "px";

		let content = document.getElementById("CONTENT").style;
		content.height = `${height - (headerHeightNum)}px`;
		////console.log(content.height, (headerHeight))
		content.width = width + "px";

		if (document.getElementById("SEARCH-BUTTON")) {
		let svgsearch = document.getElementById("SEARCH-BUTTON").style;
		svgsearch.height = headerHeight;
		////console.log(content.height, (headerHeight))
		svgsearch.width = headerHeight;
		}
		contentWidth = width;
		contentHeight = height - (headerHeightNum);
		////console.log(content.width)
		content.fontSize = `${fontSize}px`;
		content.background = "#312";


		[...document.getElementsByTagName("JETK-head-button")].forEach(mo => {
			let mw = fontSize * 5;
			let fs = fontSize * 0.8;
			if (mo.id === "SEARCH-BUTTON") {
				let mos = document.getElementById("SEARCH-SVG");
				//console.log(g(mos);
				mw = headerHeightNum;
				fs = fontSize * 0.8;
				mos.style.width = `${mw}px`;
				mos.style.height = `${mw}px`;
				mo.style.fontSize = `${fs}px`;
			}
			mo.style.width = `${mw}px`;
			mo.style.fontSize = `${fs}px`;
			mo.style.height = headerHeight;
		});

		for (let j of resizables.fill) {
			let element = newelements[j].style;
			element.width = width + "px";
			element.height = contentHeight + "px";
		}

		for (let j of resizables.custom) {
			let element = newelements[j.a].style;
			element[j.t] = (cellSize * j.value) + "px";
			//element.height = resizables.custom[j].value + "px";
		}
		for (let j of resizables.fontsizeEm) {
			let element = newelements[j.a].style;
			element.fontSize = (fontSize * j.value) + "px";
			//element.height = resizables.custom[j].value + "px";
		}



	}

	global.addEventListener("resize", () => requestAnimationFrame(resize));
	global.addEventListener("DOMContentLoaded", () => resize());


	function raf() {

		window.requestAnimationFrame
	}
})(window);