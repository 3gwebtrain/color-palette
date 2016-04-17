;(function($){

	$.fn.colorPallet = function( options ){

		var settings = $.extend({
				pallets:[
					{
						title:'Design Group',
						rows:30,
						total:150,
						prefix:'DG',
						bgPath:'images/'
					}, 
					{
						title:'Color Groups',
						rows:30,
						total:150,
						prefix:'CG',
						bgPath:'images/'
					}, 
					{
						title:'Cabinet Combinations',
						rows:30,
						total:90,
						prefix:'CC',
						bgPath:'images/'
					}, 
					{	
						title:'Finishes',
						rows:30,
						total:150,
						prefix:'FS',
						bgPath:'images/'
					}
				],
				marginBottom:30,
				bbw:40,
				bbh:30,
				zoom:3,
				rows:30
		}, options);
		

		//looping array;-

		if(!settings.pallets.length) {
			console.log('no pallet assigned');
			return;
		}

		//start looping the array;

		var size = settings.pallets.length;
		var hHeight = this.height();
		var pHeight = hHeight / size - settings.marginBottom;
		var that = this;
		var bbw =  settings.bbw;
		var bbh =  settings.bbh;
		var baseHTML = ["<div class='pallet'><h1>","</h1><div></div></div>"];
		var slideHTML = [
							"<div class='slideHolder'>",
							"<div class='slideView'>",
							"<div class='viewPort'></div>",
							"<a class='arrow close' href='#'></a>",
							"<a class='arrow leftArrow' href='#'></a>",
							"<a class='arrow topArrow' href='#'></a>",
							"<a class='arrow rightArrow' href='#'></a>",
							"<a class='arrow bottmArrow' href='#'></a>",
							"</div>",
							"</div>"
						]
		
		//adding slide properties;-

		this.append(slideHTML.join(""));

		//end of slide properties;-

		return $.each( settings.pallets, function(index, pallet) {

			var html = $(baseHTML[0]+pallet.title+baseHTML[1]);
			var row = 0;
			var col = 0;
			var dwidth = bbw*settings.zoom;
			var dheight = bbh*settings.zoom;
			var cakeDetails = {};

			//slide parents;-
			var slidePalletHolder = that.find('.slideView')
									.append($('<div />', 
										{
											id:'pallete'+(index+1),
											class:'palletSlide',
											width:bbw * settings.rows * settings.zoom,
											height:pallet.total / bbh * bbh * settings.zoom
										}));
			var slidePallet = $('#pallete'+(index+1));

			//picker works 
			var picker = html.find('div')
						.css({
							width:bbw * settings.rows,
							height:pallet.total / bbh * bbh
						})
						.mousemove(function(e) {

							var dragger = $(this).children(".dragger").show();
							var x = e.pageX - this.offsetLeft;
    						var y = e.pageY - this.offsetTop;
    						var parentWidth = $(this).width();
    						var parentHeight = $(this).height();
    						var variationX = parentWidth - x;
    						var variationY = parentHeight - y;

							dragger.css({
								height:dheight,
								display:'block',
								right:variationX < dwidth ? 0 : variationX,
								bottom:variationY < dheight ? 0 : "auto",
								left: x < dwidth ? 0 : function(){ 
									return variationX < dwidth ? parentWidth-dwidth : Math.ceil(x / 40) * 40 - (dwidth+bbw)
								},
								top: y < dheight ? 0 : function(){ 
									return !(variationY < dheight) ? Math.ceil(y / 30) * 30 : parentHeight-dheight;
								},
							});

						})
						.mouseleave(function(event) {
							$(this).children(".dragger").hide();
						})
						.click(function(e) {
							
							cakeDetails.row = $(this).children(".dragger").position().top / bbh;
							cakeDetails.col = $(this).children(".dragger").position().left / bbw;
							cakeDetails.bbw = bbw;
							cakeDetails.bbh = bbh;
							cakeDetails.dwidth = dwidth;
							cakeDetails.dheight = dheight;
							cakeDetails.slidePallet = slidePallet;
							cakeDetails.totalWidth = bbw * settings.rows * settings.zoom;
							cakeDetails.totalHeight = pallet.total / bbh * bbh * settings.zoom;
							cakeDetails.zoom = settings.zoom;

							new SlideMaker( cakeDetails );


						})
						.addClass(pallet.prefix)
						.append($('<div />',{
							class:'dragger',
							width:dwidth,
							height:dheight
						}));



			//color pallete works
			for(var i = 1; i<= pallet.total; i +=1) {

				row += 1;
				
				if((i % pallet.rows) == 1){
					row  = 0;
				}
				
				picker.append($('<div />', 
					{
						class:pallet.prefix+'-row-'+row+'p-'+i,
						css:{
							left:Math.ceil(row*bbw),
							top:col*bbh,
							width:Math.ceil(bbw),
							height:Math.ceil(bbh),
							background:'url('+pallet.bgPath+'color'+i+'.jpg)'
						},
						text:i
					})
				);

				


				slidePallet.append($('<div />', 
					{
						class:pallet.prefix+'-srow-'+row+'sp-'+i,
						css:{
							width:Math.ceil(bbw)*settings.zoom,
							height:Math.ceil(bbh)*settings.zoom,
							background:'url('+pallet.bgPath+'color'+i+'.jpg)'
						},
						text:i
					})
				);

				$('.viewPort').append(slidePallet);

				if((i % pallet.rows) == 0){
					col += 1;
				}
			}
			
			that.append( html );


		});
	}
})(jQuery);

jQuery(document).ready(function($) {
	
	$('div.colorHolder').colorPallet();

});