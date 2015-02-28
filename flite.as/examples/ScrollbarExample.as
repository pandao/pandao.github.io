package  
{
	import flash.geom.Rectangle;
	import flash.text.*;
	import flash.utils.*;
	import flash.system.*;
	import flash.events.*;
	import flash.display.*;
	import flash.external.*;
	
	import com.flite.Utils;
	import com.flite.Animation;
	import com.flite.Scrollbar;
	import com.flite.ImageLoader;
	
	/**
	 * ...
	 * @author Pandao
	 */
	
	public class ScrollbarExample extends MovieClip
	{		
		public var $:Utils;
		
		public function ScrollbarExample() : void
		{
			stage.align     = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			
			$ = new Utils();
			
			addChild($);
			
			verticalDirectionTest();   // vertical   == x
			horizontalDirectionTest(); // horizontal == y
		}
		
		public function horizontalDirectionTest()
		{			
			var _this = this;
			var animate:Animation = new Animation();
			var container:MovieClip = new MovieClip();
			
			addChild(container);
			
			var params:Object = {
				y           : 390,
				width       : 690,  // if direction is horizontal, Rectangle width  == width
				height      : 360,  // if direction is horizontal, Rectangle height == height + scrollbar.height + scrollbar.margin
				barAlpha    : 0.7,
				barHeight   : 10,
				barMargin   : 2,
				barColor    : 0x2D96E3,
				barConColor : 0x0A428C,
				direction   : "x",
				tweenTime   : 0.5
			};
			
			var testScrollbar:Scrollbar;
			var imageLoader:ImageLoader = new ImageLoader("http://localhost/flite.as/examples/images/bg.jpg");
						
			imageLoader.onload = function() { 
				imageLoader.image.height = 360;
				testScrollbar = new Scrollbar(stage, imageLoader.image, params);
				
				container.addChild(testScrollbar.container);
				
				container.x = (stage.stageWidth - 690) / 2;
				
				$.resize(function(event){
					container.x = (stage.stageWidth - 690) / 2;
				});
			};
		}
		
		public function verticalDirectionTest()
		{			
			var _this = this;
			var animate:Animation = new Animation();
			var container:MovieClip = new MovieClip();
			
			addChild(container);
			
			var params:Object = {
				//x           : 20,
				width       : 690,  // if direction is Vertical, Rectangle width  == width + scrollbar.width + scrollbar.margin
				height      : 360,  // if direction is Vertical, Rectangle height == height
				barAlpha    : 0.7,
				barWidth    : 4,
				barMargin   : 2,
				barColor    : 0x2D96E3,
				barConColor : 0x0A428C,
				//direction   : "y",  // default value == "y"
				tweenTime   : 0.5
			};
			
			var testScrollbar:Scrollbar;
			var imageLoader:ImageLoader = new ImageLoader("http://localhost/flite.as/examples/images/bg.jpg");
						
			imageLoader.onload = function() { 
				imageLoader.image.width = 690;
				testScrollbar = new Scrollbar(stage, imageLoader.image, params);
				
				container.addChild(testScrollbar.container);
				
				$.setPosition(container, "center", 20);
				
				$.resize(function(event){
					$.setPosition(container, "center", 20);
				});
			};
		}
	}
}