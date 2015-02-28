package  
{
	import flash.text.*;
	import flash.utils.*;
	import flash.system.*;
	import flash.events.*;
	import flash.display.*;
	import flash.external.*;
	
	import com.flite.Animation;
	import com.flite.FullscreenBackground;
	
	/**
	 * ...
	 * @author Pandao
	 */
	
	public class FullscreenBackgroundExample extends MovieClip
	{		
		public function FullscreenBackgroundExample() : void
		{
			test();
		}
		
		public function test()
		{
			var _this = this;
			var animate:Animation = new Animation();
			
		    var loadProgressText:TextField  = new TextField();
			loadProgressText.autoSize       = TextFieldAutoSize.LEFT;
			
			var textStyle:TextFormat = new TextFormat();
			textStyle.font  = "微软雅黑";
			textStyle.size  = 25;
			textStyle.color = 0xFFFFFF;
			loadProgressText.setTextFormat(textStyle);
			
			addChild(loadProgressText);
			
			var fullBg:FullscreenBackground = new FullscreenBackground(stage, "http://localhost/flite.as/examples/images/bg.jpg");
			
			addChild(fullBg.image);
			
			var square:OrangeSquare = new OrangeSquare();
			addChild(square);
			
			animate.mouseFollow(square);
			
			fullBg.onpreload = function(event) { 
				_this.setChildIndex(square, _this.numChildren - 1);
				fullBg.image.alpha = 0;
				trace("preload =>", event);
				trace("fullBg.url =>", fullBg.url);
			};
			
			fullBg.onerror = function(event) {
				trace("error =>", event);
			};

			fullBg.onprogress = function(event, percent) { 
				trace(percent + "%");
				loadProgressText.text = fullBg.percent + "%";
			};
			
			fullBg.onload = function(event) {
				trace("loaded =>", event);
				loadProgressText.visible = false;
				//fullBg.image.visible = false;
				animate.fadeIn(fullBg.image, 0.1);
			};
		}
	}
}