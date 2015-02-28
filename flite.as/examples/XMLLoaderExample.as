package  
{
	import flash.text.*;
	import flash.utils.*;
	import flash.system.*;
	import flash.events.*;
	import flash.display.*;
	
	import com.flite.XMLLoder;
	
	/**
	 * ...
	 * @author Pandao
	 */
	
	public class XMLLoderExample extends MovieClip
	{		
		public function XMLLoderExample() : void
		{			
			System.useCodePage           = false;		
			stage.align                  = StageAlign.TOP_LEFT;
			stage.scaleMode              = StageScaleMode.NO_SCALE; 
			stage.showDefaultContextMenu = false; 
			
			test();
		}
		
		public function test()
		{			
		    var text:TextField  = new TextField();
			text.autoSize       = TextFieldAutoSize.LEFT;
			
			var textStyle:TextFormat = new TextFormat();
			textStyle.font  = "Microsoft Yahei";
			textStyle.size  = 25;
			textStyle.color = 0xFFFFFF;
			text.setTextFormat(textStyle);
			
			addChild(text);
			
			var xmlLoader:XMLLoder = new XMLLoder("http://localhost/flite.as/examples/xml/config.xml");
			
			xmlLoader.onpreload = function(event:Event) 
			{
				trace("onpreload", event);
			}
			
			xmlLoader.onprogress = function(event, percent) { 
				trace("percent =>", percent + "%", xmlLoader.percent);
			};
			
			xmlLoader.onerror = function(event) {
				trace("Error =>", event);
			};
								
			xmlLoader.onload = function(xml) {
				text.appendText(xmlLoader.url + "\n");
				text.appendText(xmlLoader.xml + "\n");
				text.appendText(xmlLoader.xml.slides);		
			};			
		}
	}
}