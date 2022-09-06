document.addEventListener("DOMContentLoaded", () => {
	/*==========||
    || GENERAL  ||
    ||==========*/

	// Google Maps
	function initMap() {
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 8,
			center
		});
	}

	// Avoid console errors in browsers that lack a console
	function avoidConsoleErrors() {
		let method;
		let noop = function () {};
		let methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
		let length = methods.length;
		let console = (window.console = window.console || {});

		while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
				console[method] = noop;
			}
		}
	}

	/*==========||
    || NETLIFY  ||
    ||==========*/

	// Netlify admin
	if (window.netlifyIdentity) {
		window.netlifyIdentity.on("init", (user) => {
			if (!user) {
				window.netlifyIdentity.on("login", () => {
					document.location.href = "/admin/";
				});
			}
		});
	}

	/*==========||
    ||  NAVBAR  ||
    ||==========*/

	// Add active class to navbar
	let activeLinks = document.getElementById("nav").getElementsByTagName("a"),
		i = 0,
		len = activeLinks.length,
		activePath = window.location.pathname.split("/")[1]; //Ignore hashes

	// Loop through each link
	for (; i < len; i++) {
		if (activeLinks[i].pathname.split("/")[1] == activePath) {
			activeLinks[i].className += " " + "active";
		}
	}

	/*==========||
    || CAROUSEL ||
    ||==========*/

	// Carousel Settings
	let slider = tns({
		container: ".carousel-container",
		loop: true,
		items: 3,
		slideBy: "page",
		edgePadding: -15,
		gutter: 0,
		nav: false,
		navPosition: "bottom",
		autoplay: false,
		autoHeight: true,
		autoplayButtonOutput: false,
		mouseDrag: true,
		arrowKeys: true,
		controlsContainer: "#carousel-controls",
		// controlsText: ['<', '>'],
		prevButton: ".prev",
		nextButton: ".next",
		responsive: {
			360: {
				items: 3
			},
			640: {
				items: 4
			},

			768: {
				items: 5
			}
		}
	});

	// Check for carousel movement
	let dragMove = false;
	slider.events.on("dragEnd", function (info) {
		dragMove = false;
	});
	slider.events.on("dragMove", function (info) {
		dragMove = true;
	});

	/*==========||
    || LIGHTBOX ||
    ||==========*/

	// Check for YouTube link
	function is_youtubelink(url) {
		let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		return url.match(p) ? RegExp.$1 : false;
	}
	// Check for image link
	function is_imagelink(url) {
		let p = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
		return url.match(p) ? true : false;
	}
	// Check for Vimeo Link
	function is_vimeolink(url, el) {
		let id = false;
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == XMLHttpRequest.DONE) {
				// XMLHttpRequest.DONE == 4
				if (xmlhttp.status == 200) {
					let response = JSON.parse(xmlhttp.responseText);
					id = response.video_id;
					console.log(id);
					el.classList.add("lightbox-vimeo");
					el.setAttribute("data-id", id);

					el.addEventListener("click", function (event) {
						event.preventDefault();
						document.getElementById("lightbox").innerHTML = '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="videoWrapperContainer"><div class="videoWrapper"><iframe src="https://player.vimeo.com/video/' + el.getAttribute("data-id") + '/?autoplay=1&byline=0&title=0&portrait=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>';
						document.getElementById("lightbox").style.display = "block";

						setGallery(this);
					});
				} else if (xmlhttp.status == 400) {
					alert("There was an error 400");
				} else {
					alert("something else other than 200 was returned");
				}
			}
		};
		xmlhttp.open("GET", "https://vimeo.com/api/oembed.json?url=" + url, true);
		xmlhttp.send();
	}
	function setGallery(el) {
		let elements = document.body.querySelectorAll(".gallery");
		elements.forEach((element) => {
			element.classList.remove("gallery");
		});
		if (el.closest("ul, p")) {
			let link_elements = el.closest("ul, p").querySelectorAll("a[class*='lightbox-']");
			link_elements.forEach((link_element) => {
				link_element.classList.remove("current");
			});
			link_elements.forEach((link_element) => {
				if (el.getAttribute("href") == link_element.getAttribute("href")) {
					link_element.classList.add("current");
				}
			});
			if (link_elements.length > 1) {
				document.getElementById("lightbox").classList.add("gallery");
				link_elements.forEach((link_element) => {
					link_element.classList.add("gallery");
				});
			}
			let currentkey;
			let gallery_elements = document.querySelectorAll("a.gallery");
			Object.keys(gallery_elements).forEach(function (k) {
				if (gallery_elements[k].classList.contains("current")) currentkey = k;
			});
			if (currentkey == gallery_elements.length - 1) nextkey = 0;
			else nextkey = parseInt(currentkey) + 1;
			if (currentkey == 0) prevkey = parseInt(gallery_elements.length - 1);
			else prevkey = parseInt(currentkey) - 1;
			document.getElementById("next").addEventListener("click", function () {
				gallery_elements[nextkey].click();
			});
			document.getElementById("prev").addEventListener("click", function () {
				gallery_elements[prevkey].click();
			});
		}
	}
	// Create lightbox div in the footer
	let newdiv = document.createElement("div");
	newdiv.setAttribute("id", "lightbox");
	document.body.appendChild(newdiv);

	// Add classes to links to be able to initiate lightboxes
	elements = document.querySelectorAll("a");
	elements.forEach((element) => {
		let url = element.getAttribute("href");
		if (url) {
			if (url.indexOf("vimeo") !== -1 && !element.classList.contains("no-lightbox")) {
				is_vimeolink(url, element);
			}
			if (is_youtubelink(url) && !element.classList.contains("no-lightbox")) {
				element.classList.add("lightbox-youtube");
				element.setAttribute("data-id", is_youtubelink(url));
			}
			if (is_imagelink(url) && !element.classList.contains("no-lightbox")) {
				element.classList.add("lightbox-image");
				let href = element.getAttribute("href");
				let filename = href.split("/").pop();
				let split = filename.split(".");
				let name = split[0];
				element.setAttribute("title", name);
			}
		}
	});

	// Remove the clicked lightbox
	document.getElementById("lightbox").addEventListener("click", function (event) {
		if (event.target !== event.currentTarget && event.target.id !== "close") return; // Don't close if image is clicked
		if (event.target.id != "next" && event.target.id != "prev") {
			this.innerHTML = "";
			document.getElementById("lightbox").style.display = "none";
		}
	});

	// Add the YouTube lightbox on click
	elements = document.querySelectorAll("a.lightbox-youtube");
	elements.forEach((element) => {
		element.addEventListener("click", function (event) {
			event.preventDefault();
			document.getElementById("lightbox").innerHTML = '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="videoWrapperContainer"><div class="videoWrapper"><iframe src="https://www.youtube.com/embed/' + this.getAttribute("data-id") + '?autoplay=1&showinfo=0&rel=0"></iframe></div>';
			document.getElementById("lightbox").style.display = "block";

			setGallery(this);
		});
	});

	// Add the image lightbox on click
	elements = document.querySelectorAll("a.lightbox-image");
	elements.forEach((element) => {
		element.addEventListener("click", function (event) {
			if (dragMove == true) return;
			else {
				event.preventDefault();
				document.getElementById("lightbox").innerHTML = '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="img" style="background: url(\'' + this.getAttribute("href") + '\') center center / contain no-repeat;" title="' + this.getAttribute("title") + '" ><img src="' + this.getAttribute("href") + '" alt="' + this.getAttribute("title") + '" /></div><span>' + this.getAttribute("title") + "</span>";
				document.getElementById("lightbox").style.display = "block";

				setGallery(this);
			}
		});
	});
});
