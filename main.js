function openTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("h1").style.fontSize = "30px";
  } else {
    document.getElementById("h1").style.fontSize = "90px";
  }
}

function expandAuthorWorks(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

function filterAuthors() {
  // Declare variables
  var input, filter, ul, a, b, c, i, txtValue;
  input = document.getElementById('authorSearch');
  filter = input.value.toUpperCase();
  ul = document.getElementById("authorList");
  b = ul.getElementsByTagName('button');
  c = ul.getElementsByTagName('li')

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < b.length; i++) {
    //a = b[i].getElementsByTagName("button")[0];
    txtValue = b[i].textContent || b[i].id;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      b[i].style.display = ""; //reset display
    } else {
      b[i].style.display = "none"; //this hides the buttons
      c[i].className = c[i].className.replace(" w3-show", ""); //this hides the author's works.  same line as else clause in expandAuthorWorks
    }
  }
}

(function($) {
  'use strict';

  var Hero = {
    getDebounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    getSlick: function($method) {
      $('[data-init="slick"]').each(function () {
        var el = $(this);

        var breakpointsWidth = { tn: 319, xs: 479, ss: 519, sm: 767, md: 991, lg: 1199 };

        var slickDefault = {
          dots: true,
          arrows: false,

          fade: true,
          infinite: true,
          autoplay: true,
          pauseOnHover: true,
          speed: 1000,
          adaptiveHeight: true,

          slidesToShow: 1,
          slidesToScroll: 1,

          mobileFirst: true
        };

        // Merge settings.
        var settings = $.extend(slickDefault, el.data());
        delete settings.init;

        // Build breakpoints.
        if (settings.breakpoints) {
          var _responsive = [];
          var _breakpoints = settings.breakpoints;

          var buildBreakpoints = function buildBreakpoints(key, show, scroll) {
            if (show !== 0) {
              if (breakpointsWidth[key] != 991 && breakpointsWidth[key] != 1199) {
                _responsive.push({
                  breakpoint: breakpointsWidth[key],
                  settings: {
                    slidesToShow: parseInt(show),
                    slidesToScroll: 1
                  }
                });
              } else {
                _responsive.push({
                  breakpoint: breakpointsWidth[key],
                  settings: {
                    slidesToShow: parseInt(show),
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true
                  }
                });
              }
            };
          };

          if ((typeof _breakpoints === 'undefined' ? 'undefined' : _typeof(_breakpoints)) === "object") {
            $.each(_breakpoints, buildBreakpoints);
          }

          delete settings.breakpoints;
          settings.responsive = _responsive;
        };

        if ($method != 'unslick') el.slick(settings);else el.slick($method);
      });
    },

    getYoutubePlayer: function() {
      $('[data-video="youtube"]').each(function() {
        $(this).YTPlayer({
          showControls: false
        });
      });
    },

    getVimeoPlayer: function() {
      $('[data-video="vimeo"]').each(function() {
        $(this).vimeo_player({
          showControls: false
        });
      });
    },

    init: function() {
      var self = this;

      // Call functions use debounce resize function
      var resizeDebounce = self.getDebounce(function() {
      }, 250);

      self.getSlick();
      self.getYoutubePlayer();
      self.getVimeoPlayer();

      window.addEventListener('resize', resizeDebounce);
    }
  };

  $(document).ready(function() {
    Hero.init();
  });

})(jQuery);
