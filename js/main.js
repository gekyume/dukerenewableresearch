/* ============================================================== */
/* Template Name : Metronal - Personal Portfolio Page             */
/* Author        : Rietts Andreas Ruff                            */
/* Author URI    : https://themeforest.net/user/riettsruff        */
/* Version       : 1.4                                            */
/* ============================================================== */

function preloadImage(url)
{
    var img=new Image(url);
    img.src=url;
}
function changeImageTo(number,speed){
	$("#picture").animate({
	opacity: 0.10,
}, speed, function () {
	$('#picture').removeClass("zero-pic")  ;
	$('#picture').removeClass("one-pic")  ;
	$('#picture').removeClass("two-pic")  ;
	$('#picture').removeClass("three-pic")  ;
	$('#picture').removeClass("four-pic")  ;
	$('#picture').removeClass("six-pic")  ;
	$('#picture').removeClass("seven-pic")  ;
	$('#picture').removeClass("eight-pic")  ;
	$('#picture').removeClass("nine-pic")  ;
	$('#picture').addClass(number+"-pic")  ;
}).animate({ opacity: 1 }, speed);
}


(function($) {

	"use strict";

	// Init Metronal
	var metronal = {};
	preloadImage('../img/mitzi.png');
	preloadImage('../img/bradbury.png');
	preloadImage('../img/glass1.png');
	preloadImage('../img/glass2.png');
	preloadImage('../img/blum.png');
	preloadImage('../img/hotz.png');
	preloadImage('../img/lynch.png');
	preloadImage('../img/delaire.png');


	// Init Main Content
	metronal.mainContent = {
		list: ["#home","#microbial", "#photovoltaics", "#methanedetection",'#energymapping',"#about", "#solarfuel","#solarmaterials","#hydrogen","#thermodynamics","#references"],
		on: "",
		off: ""
	};

	// Pre Load
	metronal.preLoad = function(duration) {
		$('#pre-load').fadeOut(parseInt(duration, 10));
		$('#picture').addClass("zero-pic");
	};



	// Replace Viewport Height
	// Solves the issue about the viewport height on mobile devices as when the page loads
	metronal.replaceVHeight = function() {
		$('html').css({
			'height': $(window).height()
		});
	};

	// Portfolio Filter
	metronal.portfolioFilter = {
		// Item container
		container: $('#portfolio .portfolio-item .item-wrapper'),
		// Init function
		init: function() {
			// Checking if all images are loaded
			metronal.portfolioFilter.container.imagesLoaded(function() {
				// Init isotope once all images are loaded
				metronal.portfolioFilter.container.isotope({
					itemSelector: '#portfolio .portfolio-item .item-wrapper .item',
					layoutMode: 'masonry',
					transitionDuration: '0.8s'
				});
				// Forcing a perfect masonry layout after initial load
				metronal.portfolioFilter.container.isotope('layout');
				// Filter items when the button is clicked
				$('#portfolio .portfolio-filter ul li').on('click', 'a', function() {
					// Remove the current class from the previous element
					$('#portfolio .portfolio-filter ul li .current').removeClass('current');
					// Add the current class to the button clicked
					$(this).addClass('current');
					// Data filter
					var selector = $(this).attr('data-filter');
					metronal.portfolioFilter.container.isotope({
						filter: selector
					});
					setTimeout(function() {
						metronal.portfolioFilter.container.isotope('layout');
					}, 6);
					return false;
				});
			});
		}
	};

	// Use Magnific Popup
	metronal.useMagnificPopup = function() {
		// For portfolio item
		$('#portfolio .portfolio-item .item-wrapper .item').magnificPopup({
			delegate: 'a',
			type: 'inline',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			fixedContentPos: true,
			callbacks: {
				beforeOpen: function() {
					$('html').addClass('mfp-helper');
				},
				close: function() {
					$('html').removeClass('mfp-helper');
				}
			}
		});
	};

	// Set Skill Progress
	metronal.setSkillProgress = function() {
		// Select skill
		var skill = $('.single-skill');
		for (var i = 0; i < skill.length; i++) {
			if (skill.eq(i).find('.percentage')[0].textContent == '100%') {
				skill
					.eq(i)
					.find('.progress-wrapper .progress')
					.css({
						'width': skill.eq(i).find('.percentage')[0].textContent,
						'borderRight': 0
					});
			} else {
				skill
					.eq(i)
					.find('.progress-wrapper .progress')
					.css('width', skill.eq(i).find('.percentage')[0].textContent);
			}
		}
	};

	// Use Typed
	metronal.useTyped = function() {
		var target = $(".passion");
		target.typed({
			strings: target.attr("data-text").split(","),
			typeSpeed: 50
		});
	};

	// Progress Animation
	metronal.progressAnimation = function() {
		// Disable progress animation on IE Browser
		if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
			$('.progress-wrapper .progress').css({
				'animation': 'none'
			});
		}
	};

	// Dynamic Page
	metronal.dynamicPage = function(event, target) {
		if (!event) {
			if (!target) {
				$('#home').addClass('active');
				metronal.mainContent.on = metronal.mainContent.off = "#home";
			} else {
				if (metronal.mainContent.list.includes(target)) {
					$(target).addClass('active');
					metronal.mainContent.on = metronal.mainContent.off = target;
				} else {
					$('#home').addClass('active');
					metronal.mainContent.on = metronal.mainContent.off = "#home";

				}
			}
		} else {
			var currentTarget = event.currentTarget;
			var prevMainContentOff = metronal.mainContent.off,
				targetOff = metronal.mainContent.on,
				targetOn;
			
			if (currentTarget.className === "menu-link" || currentTarget.className === "close-menu-link" || currentTarget.id === "contact-button") {
				//$('#picture').attr('src', url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReKntIM2JkXheOP3fPD_N4XeJPtl-znml7EA&usqp=CAU'));
				if (metronal.mainContent.list.includes(target)) {
					targetOn = target;
				} else {
					return;
				}
			} else {
				return;
			}

			if (targetOn !== targetOff) {
				$(prevMainContentOff).removeClass("scaleDownCenter");
				$(targetOff).removeClass("scaleUpCenter active");
				$(targetOff).addClass("scaleDownCenter");
				$(targetOn).addClass("scaleUpCenter active");

				metronal.mainContent.off = targetOff;
				metronal.mainContent.on = targetOn;
			}
		}
	};

	// Process Contact Form
	metronal.processContactForm = function() {
		var form = $('form[name="contact"]'),
			message = $('.contact-msg'),
			formData;

		// Success Function
		var doneFunc = function(response) {
			message.text(response);
			message
				.removeClass('alert-danger')
				.addClass('alert-success')
				.fadeIn();
			setTimeout(function() {
				message.fadeOut();
			}, 3000);
			form.find('input:not([type="submit"]), textarea').val('');
		};

		// Fail Function
		var failFunc = function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.status === 400) {
				message.text(jqXHR.responseText);
			} else {
				message.text(jqXHR.statusText);
			}
			message
				.removeClass('alert-success')
				.addClass('alert-danger')
				.fadeIn();
			setTimeout(function() {
				message.fadeOut();
			}, 6000);
		};

		// Form On Submit 
		form.on('submit', function(e) {
			e.preventDefault();
			formData = $(this).serialize();
			$.ajax({
					type: 'POST',
					url: form.attr('action'),
					data: formData
				})
				.done(doneFunc)
				.fail(failFunc);
		});
	};

	// Window On Resize
	$(window).on('resize', function() {
		metronal.replaceVHeight(),
			metronal.portfolioFilter.container.isotope('layout');
	});

	// Device Orientation Changes
	window.addEventListener("orientationchange", function() {
		metronal.replaceVHeight(),
			metronal.portfolioFilter.container.isotope('layout');
	}, false);

	// Menu Link On Click
	$(".menu-link").on("click", function(e) {
		metronal.dynamicPage(e, $(this)[0].hash);
		$('#picture').removeClass("zero-pic")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("zero-pic")  ;
	});
	let zero = document.getElementById('zero');
	let one = document.getElementById('one');
	let two = document.getElementById('two');
	let three = document.getElementById('three');
	let four = document.getElementById('four');
	let five = document.getElementById('five');
	let six = document.getElementById('six');
	let seven = document.getElementById('seven');
	let eight = document.getElementById('eight');
	let nine = document.getElementById('nine');
	let picture = document.getElementById('picture');
	
	one.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("one-pic")){
			changeImageTo("one",100);
		}
		else{
		}
	  });

	two.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("two-pic")){
			changeImageTo("two",100);
		}
		else{
		}
	  });

	three.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("three-pic")){
			changeImageTo("three",100);
		}
		else{
		}
	  });

	four.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("four-pic")){
			changeImageTo("four",100);
		}
		else{
		}
	  });	  

	five.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("zero-pic")){
			changeImageTo("zero",100);
		}
		else{
		}
	  });

	six.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("six-pic")){
			changeImageTo("six",100);
		}
		else{
		}
	  });

	seven.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("seven-pic")){
			changeImageTo("seven",100);
		}
		else{
		}
	  });	

	eight.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("eight-pic")){
			changeImageTo("eight",100);
		}
		else{
		}
	  });

	nine.addEventListener('mouseenter', e => {
		if(!picture.classList.contains("nine-pic")){
			changeImageTo("nine",100);
		}
		else{
		}
	  });	
	  
/*

	$("#one").onmouseover(function(elt) { 
		if(("#.picture").src != '../img/mitzi.png'){
			changeImageTo("one",50);
		}
	});

	$("#one").mouseleave(function(){
		changeImageTo("one",0);
	});

	$("#two").onmouseover(function(elt) { 
		if(("#.picture").src != '../img/bradbury.png'){
		changeImageTo("two",50);
		}
	});

	$("#two").mouseleave(function(){
		changeImageTo("two",0);
	});

	*/


/*
	preloadImage('../img/mitzi.png');
	preloadImage('../img/bradbury.png');
	preloadImage('../img/glass1.png');
	preloadImage('../img/glass2.png');
	preloadImage('../img/blum.png');
	preloadImage('../img/hotz.png');
	preloadImage('../img/lynch.png');
	preloadImage('../img/delaire.png');

	$("#one").hover(function(elt) { 
		$('#picture').fadeOut(50);
		$('#picture').addClass("one-pic")  ;
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		
		$('#picture').fadeIn(50);
	});

	$("#two").hover(function(elt) { 
		$('#picture').fadeOut(50);
		$('#picture').addClass("two-pic")  ;
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		
		$('#picture').fadeIn(50);
	});


	$("#three").hover(function(elt) { 
		$('#picture').fadeOut(50);
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("three-pic")  ;
		$('#picture').fadeIn(50);
	});


	$("#four").hover(function(elt) { 
		$('#picture').fadeOut(50);
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("four-pic")  ;
		$('#picture').fadeIn(50);
	});
	



	$("#five").hover(function(elt) { 
		$('#picture').fadeOut(50);
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("zero")  ;
		$('#picture').fadeIn(50);
	});
	

	$("#six").hover(function(elt) { 
		$('#picture').fadeOut(50);
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("six-pic")  ;
		$('#picture').fadeIn(50);
	});

	$("#seven").hover(function(elt) { 
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("seven-pic")  ;
		$('#picture').fadeIn(100);
	});

	$("#eight").hover(function(elt) { 
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("eight-pic")  ;
	});


	$("#nine").hover(function(elt) { 
		$('#picture').removeClass("zero")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("nine-pic")  ;
	});
/*
		// Close Menu Link On Click
		$("#four").on("click", function(e) {
			metronal.dynamicPage(e, $(this)[0].hash);
			$('#picture').fadeOut(0);
			$('#picture').removeClass("zero")  ;
			$('#picture').removeClass("one-pic")  ;
			$('#picture').removeClass("two-pic")  ;
			$('#picture').removeClass("three-pic")  ;
			$('#picture').removeClass("four-pic")  ;
			$('#picture').removeClass("six-pic")  ;
			$('#picture').removeClass("seven-pic")  ;
			$('#picture').removeClass("eight-pic")  ;
			$('#picture').removeClass("nine-pic")  ;
			$('#picture').addClass("zero")  ;
			$('#picture').fadeIn(0);
		});

*/



	// Close Menu Link On Click
	$(".close-menu-link").on("click", function(e) {
		metronal.dynamicPage(e, $(this)[0].hash);
		$('#picture').removeClass("zero-pic")  ;
		$('#picture').removeClass("one-pic")  ;
		$('#picture').removeClass("two-pic")  ;
		$('#picture').removeClass("three-pic")  ;
		$('#picture').removeClass("four-pic")  ;
		$('#picture').removeClass("six-pic")  ;
		$('#picture').removeClass("seven-pic")  ;
		$('#picture').removeClass("eight-pic")  ;
		$('#picture').removeClass("nine-pic")  ;
		$('#picture').addClass("zero-pic")  ;
	});

	// Contact Button On Click
	$("#contact-button").on("click", function(e) {
		metronal.dynamicPage(e, $(this)[0].hash);
	});

	// Prevent Default 'a[href=""]' click
	$('a[href="#"]').on('click', function(e) {
		e.preventDefault();
	});

	// Window On Load
	$(window).on('load', function() {
		metronal.preLoad(800);
	});

	// Document Ready
	$(document).ready(function() {
		metronal.dynamicPage(undefined, window.location.hash),
			metronal.replaceVHeight(),
			metronal.portfolioFilter.init(),
			metronal.useMagnificPopup(),
			metronal.setSkillProgress(),
			metronal.progressAnimation(),
			metronal.useTyped(),
			metronal.processContactForm();
	});

})(jQuery);