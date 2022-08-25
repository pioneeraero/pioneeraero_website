document.addEventListener("DOMContentLoaded", () => {

	// Google Maps
	function initMap() {
		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 8,
			center,
	  });
	}
	
	// Avoid console errors in browsers that lack a console
	function avoidConsoleErrors() {
    let method;
    let noop = function () {};
    let methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
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
var miGlobal = {
    sliders : {
      items: []
    }
  }
  //cache obj
  miGlobal.cache = {
      $window : null,
      $html : null,
      $body : null,
      init : function() {
        this.$window = $(window);
        this.$html = $('html');
        this.$body = this.$html.find('body');
      }
  }
  
    
    
  function createSlider(sliderSelector) {
    var slider = tns({
      container: sliderSelector,
      loop: true,
      items: 1,
      slideBy: 'page',
      nav: false,    
      autoplay: false,
      speed: 800,
      autoplayButtonOutput: false,
      mouseDrag: true,
      lazyload: true,
      controlsContainer: "#customise-controls",
      responsive: {
          640: {
              items: 2,
          },
          
          768: {
              items: 3,
          }
      }
    });
    return slider
  }
  
  function filter (filterValue) {
      //1 destroy slider
      var sliderObj = miGlobal.sliders.items[0].slider; //hardcoded el index
      sliderObj.destroy(); 
                            
      //2 modify DOM obj create, delete, edit...
      var $cached = $(miGlobal.sliders.items[0].cached); //usamos el slider de caché, con los datos originales no filtrados
      $(sliderSelector).html($cached.html())
      if (filterValue != "all") {
          $(sliderSelector).find('[data-type]').not('[data-type*=' + filterValue + ']').remove();
      }
    
      //3 rebuild slider 
      miGlobal.sliders.items[0].slider = createSlider(sliderSelector);
  }
  
  miGlobal.cache.init()
  var sliderSelector = '.project-slider';
  var $cachedSlider = miGlobal.cache.$body.find(sliderSelector)[0].cloneNode(true); // ¡clon!
  var $thisSlider = createSlider(sliderSelector);
  var domSlider = miGlobal.sliders.items[0] = {
    'slider' : $thisSlider,
    'cached' : $cachedSlider
  };
});