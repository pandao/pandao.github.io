package  
{
	import flash.text.*;
	import flash.utils.*;
	import flash.system.*;
	import flash.events.*;
	import flash.display.*;
	import flash.external.*;
	import flash.geom.Point;
	
	import com.flite.Utils;
	import com.flite.Animation;
	
	/**
	 * ...
	 * @author Pandao
	 */
	
	public class AnimationExample extends MovieClip
	{
		public var $:Utils;
		
		public function AnimationExample() : void
		{			
			this.stop();
			
			System.useCodePage           = false;		
			stage.align                  = StageAlign.TOP_LEFT;
			stage.scaleMode              = StageScaleMode.NO_SCALE; 
			stage.showDefaultContextMenu = false; 
			
			$ = new Utils();
			
			addChild($); // get Stage etc. objects.
			
			this.parallaxTest();
			this.mouseFollowTest();
			this.fadeTest();
		}
		
		public function fadeTest()
		{
			var animate:Animation = new Animation();
			
			var square:Square = new Square;
			square.alpha  = 0;
			square.scaleX = square.scaleY = 2;
			addChild(square);
			
			animate.fadeIn(square).slideDown(square);
			
			var square2:TealSquare = new TealSquare;
			square2.x = square.width + 15;
			addChild(square2);
			
			animate.fadeOut(square2);
			
			var square3:OrangeSquare = new OrangeSquare;
			square3.alpha = 0.2;
			square3.x = square2.x + square2.width + 15;
			addChild(square3);
			
			animate.fadeTo(square3, 0.8);
			
			var timer:int = setTimeout(function() {
				clearTimeout(timer);
				animate.slideUp(square);
			}, 1000);
		}
		
		public function mouseFollowTest()
		{
			var square:TealSquare = new TealSquare;
			var animate:Animation = new Animation();
			
			addChild(square);
			animate.mouseFollow(square);
		}
				
		public function parallaxTest()
		{
			var square:RedSquare = new RedSquare;
			square.width      = 200;
			square.height     = 200;
			square.y          = 300;
			
			this.addChild(square);
			
			$.setPoint(square, new Point(square.width / 2, square.height / 2)); // x = center, y = center
			
			square.rotation = 45;
						
			var square2:OrangeSquare = new OrangeSquare;
			square2.width = 200;
			square2.height = 200;
			square2.x = 500;
			square2.y = 200;
			
			this.addChild(square2);
			
			square2.addEventListener(MouseEvent.MOUSE_OVER, function(event) {
				$.setPoint(square2, new Point(square2.mouseX, square2.mouseY));		
				square2.rotation = 30;
			});
			
			square2.addEventListener(MouseEvent.MOUSE_OUT, function(event){			
				$.setPoint(square2, new Point(0, 0));	
				square2.rotation = 0;
			});	
			
			$.clickOpenURL(square, "https://github.com/pandao/flite.as", "_blank");
						
			var animate:Animation = new Animation();
			
			animate.parallax(square, "x", 0.05);
			animate.parallax(square2, "x", 0.1);
			
			return this;
		}
	}
}