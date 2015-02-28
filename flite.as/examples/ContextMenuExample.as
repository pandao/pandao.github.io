package  
{
	import flash.text.*;
	import flash.utils.*;
	import flash.system.*;
	import flash.events.*;
	import flash.display.*;
	import flash.external.*;
	import flash.geom.Point;
	
	import flash.ui.ContextMenu;
	import com.flite.Utils;
	import com.flite.xContextMenu;
	
	/**
	 * ...
	 * @author Pandao
	 */
	
	public class ContextMenuExample extends MovieClip
	{
		public var $:Utils;
		
		public function ContextMenuExample() : void
		{			
			System.useCodePage           = false;		
			stage.align                  = StageAlign.TOP_LEFT;
			stage.scaleMode              = StageScaleMode.NO_SCALE; 
			stage.showDefaultContextMenu = false; 
			
			$ = new Utils();
			
			this.test();
		}
		
		public function test()
		{			
			var square:OrangeSquare = new OrangeSquare();
			addChild(square);
			
			$.click(square, function(){
				stage.displayState = StageDisplayState.FULL_SCREEN;
			});
			
			var newContextMenu:xContextMenu = new xContextMenu(square);
			newContextMenu.add("FLite.xContextMenu", true);
			newContextMenu.add("Copyright @ 2015 Pandao all right reserved.");
			newContextMenu.add("FLite.as Home Page", false, function() { newContextMenu.openURL("https://github.com/pandao/flite.as", '_blank'); } );
			/*
			newContextMenu.add("Exit", false, newContextMenu.close());
			newContextMenu.add("FullScreen", false, function(event:ContextMenuEvent) {
				trace("MENU_ITEM_SELECT");
				stage.displayState = StageDisplayState.FULL_SCREEN;	
				newContextMenu.remove('last');
			});*/
			
			addChild(newContextMenu);
			/*
			stage.addEventListener( FullScreenEvent.FULL_SCREEN, function(event:FullScreenEvent){
				trace("FullScreenEvent");
			});*/
		}
	}
}