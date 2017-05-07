$( document ).ready( function(){
	$('.blink')
		.focus(function(){
			if( $(this).attr('value') == $(this).attr('title') ) {
				$(this).attr({ 'value': '' });
			}
		})
		.blur(function(){
			if( $(this).attr('value') == '' || typeof($(this).attr('value')) == 'undefined') {
				$(this).attr({ 'value': $(this).attr('title') })
			}
		});
		
	$('#slider-holder ul').jcarousel({
		scroll: 1,
		wrap: 'both',
		initCallback: _init_carousel,
		buttonNextHTML: null,
		buttonPrevHTML: null
	});
	
	$('.tabs a').slide({
		'slide_selector' : '.tab-content'
	})
	
	
	/* This code is executed after the DOM has been completely loaded */
	
	/* Defining an array with the tab text and AJAX pages:
	'CCD CAMERAS'		: 		'pages/ccdcameras.html',
		'IR CAMERAS'		: 		'pages/ircameras.html',
	*/
	var Tabs = {
		'CCD CAMERAS'		: 		'pages/ccdcameras.html',
		'IR CAMERAS'		: 		'pages/ircameras.html',
		'IR DOME CAMERAS (New)'  : 		'pages/irDomeCamerasNew.html',	
		'DOME/ZOOM CAMERAS'	: 		'pages/domeZoomCameras.html',
		'BOARD LENS/ACCESSORIES': 		'pages/boardLensAccessories.html',
		'MULTIPLEXERS'		: 		'pages/multiplexers.html',
		'DVRs (STANDALONE)'	: 		'pages/dvrsStandalone.html',
		'DVRs (New)'		:		'pages/dvrsNew.html',
		'DVR CARDS'		: 		'pages/dvrCards.html',
		'GPS LOCATOR'		: 		'pages/gpsLocator.html'
	}
	
	/* The available colors for the tabs: */
	var colors = ['red','green'];
	
	/* The colors of the line above the tab when it is active: */
	var topLineColor = {
		red:'red',
		green:'green'
	}
	
	/* Looping through the Tabs object: */
	var z=0;
	$.each(Tabs,function(i,j){
		/* Sequentially creating the tabs and assigning a color from the array: */
		var tmp = $('<li><a href="#" class="tab '+colors[(z++%2)]+'">'+i+' </a></li>');
		
		/* Setting the page data for each hyperlink: */
		tmp.find('a').data('page',j);
		
		/* Adding the tab to the UL container: */
		$('ul.tabContainer').append(tmp);
	})

	/* Caching the tabs into a variable for better performance: */
	var the_tabs = $('.tab');
	
	the_tabs.click(function(e){
		/* "this" points to the clicked tab hyperlink: */
		var element = $(this);
		
		
		/* If it is currently active, return false and exit: */
		if(element.find('#overLine').length) {
			return false;
		}
		/* Detecting the color of the tab (it was added to the class attribute in the loop above): */
		var bg = element.attr('class').replace('tab ','');

		/* Removing the line: */
		$('#overLine').remove();
		
		/* Creating a new line with jQuery 1.4 by passing a second parameter: */
		$('<div>',{
			id:'overLine',
			css:{
				display:'none',
				width:element.outerWidth()-2,
				background:topLineColor[bg] || 'white'
			}}).appendTo(element).fadeIn('slow');
		
		/* Checking whether the AJAX fetched page has been cached: */
		
		if(!element.data('cache'))
		{	
			/* If no cache is present, show the gif preloader and run an AJAX request: */
			$('#contentHolder').html('<img src="../css/images/ajax_preloader.gif" width="64" height="64" class="preloader" />');

			$.get(element.data('page'),function(msg){
				$('#contentHolder').html(msg);
				if ($('#rell').length ) {
			
		}
		
				$("img[rel]").overlay();
				/* After page was received, add it to the cache for the current hyperlink: */
				element.data('cache',msg);
			});
		}
		else $('#contentHolder').html(element.data('cache'));
		
		/* Loads the image overlay, which enlarge the image  */
		
		
		e.preventDefault();
		

		$("img[rel]").overlay();
		return true;
	})
	
	
	/* Emulating a click on the first tab so that the content area is not empty: */
	the_tabs.eq(0).click();
	
	/* Loads the image overlay, which enlarge the image  */
	
	
	$("img[rel]").overlay();
	
});
function _init_carousel(carousel) {
	$('#slider-nav .next').bind('click', function() {
		carousel.next();
		return false;
	});
	
	$('#slider-nav .prev').bind('click', function() {
		carousel.prev();
		return false;
	});
};
