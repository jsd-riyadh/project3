;(function () {

    "use strict"; // use strict to start

	/* ---------------------------------------------
         retina fix
    --------------------------------------------- */
	$(document).ready(function(){
		$('#callcenter').popover({
			placement: wheretoplace
		});
	});

  $(document).ready(function(){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    $(".menu-list li").each(function(){
        if ( $(this).data("location") == page ) {
          var loc = $(this).data("location");
          $(this).find("a").addClass("active");
          if ( $(this).hasClass("s-box") ) {
            $(this).closest(".collapse").prev(".m-box").find("a").addClass("active");
          }
        }
    });
	});

	function wheretoplace(){
		var width = window.innerWidth;
		if (width<500) return 'left';
		return 'top';
	}

    $(document).ready(function () {

        /* ---------------------------------------------
         retina fix
         --------------------------------------------- */
         if (window.devicePixelRatio > 1){
            $(".retina").each(function(){
                var src = $(this).attr("src").replace(".","@2x.");
                var h = $(this).height();
                var w = $(this).width();
                $(this).attr("src",src).css({height:h,width:'auto'});
            });
         }


        /* ---------------------------------------------
         smooth scroll
         --------------------------------------------- */
         if( typeof smoothScroll == 'object'){
             smoothScroll.init();
         }





        /* ---------------------------------------------
         menu highlight fix
         --------------------------------------------- */

        $(".op-nav li").on("click",function(){
            if($(".showhide").is(":visible")){
                $(".showhide").trigger("click");
            }
            $(".op-nav li").removeClass("active");
            $(this).addClass("active");
        });



        /* ---------------------------------------------
         Progress bars
         --------------------------------------------- */


        var progressBar = $(".progress-bar");
        progressBar.each(function(indx){
            $(this).data('animated',0);
            if($.fn.visible) {
                animateProgressbar(this);
            }
        });
        $(window).on("scroll",function(){
            if($.fn.visible){
                progressBar.each(function(){
                    animateProgressbar(this);
                })
            }
        });

        function animateProgressbar(pb){
            if($(pb).data('animated')==0){
                if($(pb).visible()){
                    $(pb).css("width", $(pb).attr("aria-valuenow") + "%");
                    $(pb).data('animated',1);
                }
            }
        }



        /* ---------------------------------------------
         accordion
         --------------------------------------------- */


        var allPanels = $(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        $(".accordion").each(function () {
            $(this).find("dt > a").first().addClass("active").parent().next().css({display: "block"});
        });

        $(".accordion > dt > a").click(function () {

            var current = $(this).parent().next("dd");
            $(this).parents(".accordion").find("dt > a").removeClass("active");
            $(this).addClass("active");
            $(this).parents(".accordion").find("dd").slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");

            return false;

        });


        /* ---------------------------------------------
         toggle accordion
         --------------------------------------------- */

        var allToggles = $(".toggle > dd").hide();

        $(".toggle > dt > a").click(function () {

            if ($(this).hasClass("active")) {

                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");

            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }

            return false;
        });


        /* ---------------------------------------------
         countTo
         --------------------------------------------- */
        var timers = $(".timer");
        if($.fn.countTo) {
            timers.each(function(){
                $(this).data('animated',0);
                animateTimer(this);
            });
        }

        $(window).on("scroll",function(){
            timers.each(function(){
                animateTimer(this);
            });
        });

        function animateTimer(timer){
            if($(timer).data('animated')==0){
                if($.fn.visible && $(timer).visible()) {
                    $(timer).data('animated', 1);
                    $(timer).countTo();
                }
            }
        }


        /* ---------------------------------------------
         carousel
         --------------------------------------------- */
        if($.fn.owlCarousel) {

            $("#clients-1").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items : 6,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [979,3]

            });

            $("#testimonial-2").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items : 1
            });

            $("#testimonial-3").owlCarousel({
                autoPlay: 4000, //Set AutoPlay to 3 seconds
                items : 1
            });

            $("#testimonial-4").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items : 1
            });

            $("#testimonial-5").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items : 1
            });

            $("#carousel-object").owlCarousel({
                autoPlay: 4000, //Set AutoPlay to 3 seconds
                items : 1
                //pagination : false
            });

            $("#owl-slider").owlCarousel({
                autoPlay: 4000, //Set AutoPlay to 3 seconds
                items : 1,
                navigation : true,
                //pagination : false,
                navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
            });


            $("#img-carousel").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items : 4,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [979,3]

            });

            $("#portfolio-carousel").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items : 3,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [979,3],
                navigation : true,
                pagination : false,
                navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]

            });

            $("#portfolio-carousel-alt").owlCarousel({
                autoPlay: false, //Set AutoPlay to 3 seconds
                items : 3,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [979,3],
                navigation : true,
                pagination : false,
                navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
            });
        }

        $(".portfolio-with-title").addClass("portfolio");

        /* ---------------------------------------------
         slider typist
         --------------------------------------------- */

        if(typeof Typist == 'function') {
            new Typist(document.querySelector('.typist-element'), {
                letterInterval: 60,
                textInterval: 3000
            });
        }


        /* ---------------------------------------------
         Wilayah Header adjust
         --------------------------------------------- */


          function adjustscreen() {
              if ($(window).width() > 1200) {
                  var wwid = $(window).width();
                  var boxwid = wwid - 1170 + 30;
                  var padwid = boxwid/2;
                  var inpad = padwid/2;

                  $('.header-wrap').css("padding-right", padwid + "px");
                  $('.header-wrap .header-banner').css("padding-right", inpad + "px");
               }
          }

          //$(document).ready(function(){
        		adjustscreen();
        	//});


          /* ---------------------------------------------
           datepicker
           --------------------------------------------- */

           $('[data-toggle="datepicker"]').datepicker({
             language: 'en',
             position: 'top left',
             autoClose: true,
           });

          /* ---------------------------------------------
           select2
           --------------------------------------------- */

           $(document).ready(function() {
               $('.select2').select2();
               $('.select2-no-search').select2({
                    minimumResultsForSearch: -1
                });
                $('.select2-xs').select2({
                     minimumResultsForSearch: -1,
                     containerCssClass: "input-xs",
                 });
           });

           $(".panel-group-service .panel-heading").first().addClass("active");

           $('.panel-collapse').on('show.bs.collapse', function () {
              $(this).siblings('.panel-heading').addClass('active');
            });

            $('.panel-collapse').on('hide.bs.collapse', function () {
              $(this).siblings('.panel-heading').removeClass('active');
            });



    });

    $('[data-toggle="tooltip"]').tooltip();

})(jQuery);
