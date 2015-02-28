package  
{
	import flash.text.*;
	import flash.utils.*;
	import flash.system.*;
	import flash.events.*;
	import flash.display.*;
	import flash.external.*;
	
	import com.flite.Utils;
	import com.flite.Animation;
	import com.flite.ImageLoader;
	
	/**
	 * ...
	 * @author Pandao
	 */
	
	public class ImageLoaderExample extends MovieClip
	{		
		public var $:Utils;
		
		public function ImageLoaderExample() : void
		{
			$ = new Utils();
			
			addChild($);
			
			test();
		}
		
		public function test()
		{
			stage.align     = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			
			var _this = this;
			var animate:Animation = new Animation();
			
		    var loadProgressText:TextField  = new TextField();
			loadProgressText.autoSize       = TextFieldAutoSize.LEFT;
			
			var textStyle:TextFormat = new TextFormat();
			textStyle.font  = "Microsoft Yahei";
			textStyle.size  = 25;
			textStyle.color = 0xFFFFFF;
			loadProgressText.setTextFormat(textStyle);
			
			addChild(loadProgressText);
			
			var imageLoader:ImageLoader = new ImageLoader("http://localhost/flite.as/examples/images/bg.jpg");
			
			addChild(imageLoader.image);
			
			var square:OrangeSquare = new OrangeSquare();
			addChild(square);
			
			animate.mouseFollow(square);
			
			imageLoader.onpreload = function(event) { 
				_this.setChildIndex(square, _this.numChildren - 1);
				imageLoader.image.alpha = 0;
				trace("preload =>", event);
				trace("imageLoader.url =>", imageLoader.url);
			};
			
			imageLoader.onerror = function(event) {
				trace("error =>", event);
			};

			imageLoader.onprogress = function(event, percent) { 
				trace(percent + "%");
				loadProgressText.text = imageLoader.percent + "%";
			};
			
			imageLoader.onload = function(event) {
				trace("loaded =>", event);
				loadProgressText.visible = false;
				
				imageLoader.image.width = imageLoader.image.height = 240;
				
				$.setPosition(imageLoader.image, "center", "center");
				
				$.resize(function(event) {
					//trace(stage.stageWidth, stage.stageHeight);
					$.setPosition(imageLoader.image, "center", "center");					
				});
				
				//imageLoader.image.visible = false;
				animate.fadeIn(imageLoader.image, 0.1).parallax(imageLoader.image);
			};
		}
	}
}