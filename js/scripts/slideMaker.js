"use strict";

var SlideMaker = function( cakeDetails ) {

	$('.slideHolder').show();

	var startLeft = (cakeDetails.col) * cakeDetails.dwidth;
	var startTop = cakeDetails.row * cakeDetails.dheight;
		
	var updatePosition = function () {

		console.log( startLeft );

		$(cakeDetails.slidePallet)
		.css({
			left: -startLeft,
			top: -startTop
		})
		.show();

	}

	updatePosition();

	$('a.close').on('click', function(e){

		e.preventDefault();

		$('.palletSlide').hide();
		$('.slideHolder').hide();

	});

	$('a.leftArrow').on('click', function(e){

		e.preventDefault();
		
		if( startLeft >  0 ) {

			startLeft -= cakeDetails.dwidth;
			updatePosition();
			
		}

		return;

	});
	$('a.rightArrow').on('click', function(e){

		e.preventDefault();
		
		if( startLeft <  cakeDetails.totalWidth- (cakeDetails.dwidth * cakeDetails.zoom) ) {

			startLeft += cakeDetails.dwidth;
			updatePosition();
			
		}

		return;

		

	});
	$('a.topArrow').on('click', function(e){

		e.preventDefault();
		
		if( startTop >  0 ) {

			startTop -= cakeDetails.dheight;
			updatePosition();
			
		}

		return;

	});
	$('a.bottmArrow').on('click', function(e){

		e.preventDefault();
		
		if( startTop <  cakeDetails.totalHeight - (cakeDetails.dheight * cakeDetails.zoom) ) {

			startTop += cakeDetails.dheight;
			updatePosition();
			
		}

		return;

	});

}