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
	
	/**
	 * ...
	 * @author Pandao
	 */
	
	public class UtilsExample extends MovieClip
	{
		public var $:Utils;
		public var squareList:MovieClip;
		
		public function UtilsExample() : void
		{			
			this.stop();
			
			System.useCodePage           = false;		
			stage.align                  = StageAlign.TOP_LEFT;
			stage.scaleMode              = StageScaleMode.NO_SCALE; 
			stage.showDefaultContextMenu = false; 
			
			$ = new Utils();
			
			addChild($); // get Stage etc. objects.
			
			$.js("alert('Please open the Developer Tools, Enter F12.')");
			
			this.inArrayTest();
			
			trace("flite.Utils.printArray() / Utils.printr()\n");
			this.printrTest();
			
			trace("\nflite.Utils.setCookie(), getCookie(), deleteCookie()\n");
			this.cookieTest();
			
			trace("\nflite.Utils.extend()\n");
			this.extendTest();
			
			trace("\nflite.Utils.js()\n");
			this.executeJavascriptTest();
			
			this.consoleTest();
			
			this.removeChildrenTest().eachDisplayObjectTest(); 
			
			this.childrenTest().siblingsTest().getChildrenIndexs().setPointTest();
			
			this.hoverTest().clickTest();
			
			this.setPositionTest();
		}
		
		public function inArrayTest() : void
		{
			$.console("log", "flite.Utils.inArray() php in [15, 89, 'php'] => " + $.inArray("php", [15, 89, "php"]));
		}
		
		public function printrTest() : void
		{			
			var startTime:uint = getTimer();
 
			var arr:Array = new Array(12515,123232,1515);
			 
			arr[0] = 1232323;
			 
			arr[0] = new Array(1, 2, 3, 4, [1987, 1988, 1989, [19901, 19902, 19903, [199031, 199032, 199033] ] ]);
			 
			arr[3] = [10, [5425, 156,], 10000, 'PHP', true, 0.52455, -15, '-132213656565', null, undefined];
			arr['P'] = 'PPPPPPP';
			arr['negative'] = -15455555;
			arr['list'] = [5, 56556,2656,565,665,656,59,[5656565656,656556,4999],5625623,2656,222,[212122,65656,999,998956,22633,22666,1484223,[10,20,30,40,50,60,[70, 71, 72, 73, 74, 75, 76,[771, 772, 773, 774, 775, [7761, 7762, 7763, 7764, [77641, 77642, 77643, 77644]]]]]]];

			var obj:Object = { a:'A', b:'B', c: { c1:'C1', c2:'C2' }, d:'D' };
			arr['obj'] = obj;
			
			var text:String = $.printArray([12,6556,56596,562.2]);
			trace($.printr([12, 6556, 56596, 562.2]), "\n", text);
			
			trace($.printr(arr));
			trace($.printr(obj));
			var endTime:uint = getTimer();
 
			trace('Runtime: ', endTime - startTime, 'ms.');		
		}
		
		public function cookieTest() : void
		{
			$.setCookie("c1", { foo:"bar" } );
			
			trace($.getCookie("c1").foo);
			
			$.deleteCookie("c1");
			
			trace($.getCookie("c1"));
		}
		
		public function extendTest() : void 
		{
			var obj1:Object = { "as" :"ActionScript 3.0", php : "PHP 5.6", html : "HTML" };
			var obj2:Object = { python : "Python", js : "JavaScript", html : "HTML5" };
			
			var str:String = $.printr($.extend(obj1, obj2));
			
			trace(str);
		}
		
		public function executeJavascriptTest() : void
		{
			var getURL:String = $.js("getConfig", "getURL");
			
			$.js("console.log(\"getPathURL =>"+$.getPathURL()+"\")");
			$.js("console.log(\"config.getURL =>"+getURL+"\")");
			
			$.js("alert('flite.Utils.js(alert)')");
		}
		
		public function consoleTest()
		{			
			var obj:Object = { "as" :"ActionScript 3.0", php : "PHP 5.6", html : "HTML" };
			
			$.console("time", "FLiteUtilsConsoleTest");
			
			$.console("log", "flite.Utils.console() unsupport assert, count, table and string containing the escape character.");

			$.console("log", "\\n");
			
			$.console("log", "flite.Utils.console() => log.message");
			$.console("error", "flite.Utils.console() => error.message");
			$.console("info", "flite.Utils.console() => info.message");
			$.console("warn", "flite.Utils.console() => warn.message");
			$.console("debug", "flite.Utils.console() => debug.message");
			
			$.console("log", "\\n");
						
			$.console("group", "flite.Utils.console() => group");
			$.console("log", "flite.Utils.console() => log.message");
			$.console("error", "flite.Utils.console() => error.message");
			$.console("info", "flite.Utils.console() => info.message");
			$.console("warn", "flite.Utils.console() => warn.message");
			$.console("debug", "flite.Utils.console() => debug.message");
			$.console("groupEnd");
			
			$.console("log", "\\n");
			
			$.console("groupCollapsed", "flite.Utils.console() => groupCollapsed");
			$.console("log", "flite.Utils.console() => log.message");
			$.console("error", "flite.Utils.console() => error.message");
			$.console("info", "flite.Utils.console() => info.message");
			$.console("warn", "flite.Utils.console() => warn.message");
			$.console("debug", "flite.Utils.console() => debug.message");
			$.console("groupEnd");
			
			$.console("log", "\\n");
			
			$.console("timeEnd", "FLiteUtilsConsoleTest");
			
			//$.console("trace"); // not use significance.
			
			//$.console("clear"); // supported.
			
			return this;
		}
		
		public function removeChildrenTest()
		{			
			var squareList:MovieClip = new MovieClip;
			
			squareList.name = "squareList";			
			this.squareList = squareList ;
			
			for (var i:uint = 0, len:uint = 10; i < len; i++)
			{			
				var square:Square = new Square;
				square.name = "square" + i;
				square.x = (square.width + 10) * i;
				squareList.addChild(square);
			}
			
			addChild(squareList);
			
			var text1:TextField = new TextField();
			//text1.text = "[click => Utils.removeChildren(), squareList.numChildren = " + squareList.numChildren + "]";
			//text1.autoSize = "left";
			//text1.x = squareList.x;
			//text1.y = squareList.height + 10;
			//text1.selectable = false;
			
			$.attr(text1, {
				selectable : false,
				autoSize   : "left",
				x          : squareList.x,
				y          : squareList.height + 10,
				text       : "[click => Utils.removeChildren(), squareList.numChildren = " + squareList.numChildren + "]"
			}, true);
			
			var textStyle:TextFormat = new TextFormat();
			textStyle.font = "Microsoft Yahei";
			textStyle.size = 14;
			textStyle.color = 0xFFFFFF;
			text1.backgroundColor = 0xFFCC00;
			text1.setTextFormat(textStyle);
			
			addChild(text1);
			
			text1.addEventListener(MouseEvent.CLICK, function(event){
				$.removeChildren(squareList, function(){
					text1.text = "[click => Utils.removeChildren(), squareList.numChildren = " + squareList.numChildren + "]";
					text1.setTextFormat(textStyle);					
				});
			});
			
			return this;
		}
		
		public function eachDisplayObjectTest() 
		{	
			$.each(squareList, function(index) {
				var obj = squareList.getChildAt(index);
				trace("Utils.each() : index =>", index, obj.name);
			});
			
			this.eachArrayTest();
			this.eachObjectTest();
			
			return this;
		}
		
		public function eachArrayTest() : void 
		{
			$.each([12, 412,3, 89, "ActionScript 3.0"], function(index){
				trace("eachArray =>", index);
			});
		}
		
		public function eachObjectTest() : void 
		{
			$.each({ python : "Python", js : "JavaScript", html : "HTML5" }, function(key, value) {
				trace("eachObject =>", key, ":", value);
			});
		}
		
		public function childrenTest()
		{			
			// set all children attributes
			$.children(squareList, {
				buttonMode : true
			});	
			
			// set children attributes by name
			$.children(squareList, {
				scaleX : 0.5,
				buttonMode : false
			}, ["square0", "square5"]);
			
			return this;
		}
		
		public function siblingsTest()
		{			
			$.siblings(squareList.getChildAt(0), squareList, {
				scaleY : 0.5
			});
			
			return this;
		}
		
		public function getChildrenIndexs()
		{			
			$.getChildrenIndexs(squareList, true);
			
			$.traceDisplayObjectList(squareList);
			
			return this;
		}
		
		public function hoverTest()
		{
			$.hover(squareList, function(event) {
				var _this = event.currentTarget;
				_this.scaleX = _this.scaleY = 2;
				trace("hover.over", _this.name);
				
			}, function(event) {
				var _this = event.currentTarget;
				_this.scaleX = _this.scaleY = 1;
				
				trace("hover.out", _this.name);				
			});
			
			return this;
		}
		
		public function clickTest()
		{
			$.click(squareList, function(event) {
				var _this = event.currentTarget;
				_this.scaleY += 1;
				trace("click", _this.name);	
			});
			
			return this;
		}
		
		public function setPositionTest() : void
		{			
			$.setPosition(squareList, "center", "center");
			
			$.resize(function(event) {
				trace(event.currentTarget);
				$.setPosition(squareList, "center", "center");	
			});
			
			this.toggleTest();
		}
		
		public function toggleTest() 
		{
			var btn:Sprite = new Sprite();
			
			btn.graphics.beginFill(0xFF9900);
			btn.graphics.drawRect(0, 0, 100, 32);
			btn.graphics.endFill();
			btn.buttonMode = true;
			
			addChild(btn);
			
			var text:TextField = new TextField();
			
			$.attr(text, {
				selectable   : false,
				mouseEnabled : false,
				autoSize     : "center",
				text         : "Toggle",
				width        : btn.width,
				height       : btn.height
			});
			
			var textStyle:TextFormat = new TextFormat();
			textStyle.font = "Microsoft Yahei";
			textStyle.size = 14;
			textStyle.color = 0xFFFFFF;
			text.setTextFormat(textStyle);
			
			btn.addChild(text);
			
			$.click(btn, function(){
				$.toggle(squareList);
			});
			
			var btn2:Sprite = new Sprite();
			
			btn2.graphics.beginFill(0xFF9900);
			btn2.graphics.drawRect(0, 0, 100, 32);
			btn2.graphics.endFill();
			btn2.buttonMode = true;
			btn2.x = btn.width + 10;
			
			addChild(btn2);
			
			var text2:TextField = new TextField();
			
			$.attr(text2, {
				selectable   : false,
				mouseEnabled : false,
				autoSize     : "center",
				text         : "Show",
				width        : btn2.width,
				height       : btn.height
			});
			
			text2.setTextFormat(textStyle);
			
			btn2.addChild(text2);
			
			$.click(btn2, function(){
				$.show(squareList);
			});
			
			var btn3:Sprite = new Sprite();
			
			btn3.graphics.beginFill(0xFF9900);
			btn3.graphics.drawRect(0, 0, 100, 32);
			btn3.graphics.endFill();
			btn3.buttonMode = true;
			btn3.x = btn2.x + btn2.width + 10;
			
			addChild(btn3);
			
			var text3:TextField = new TextField();
			
			$.attr(text3, {
				selectable   : false,
				mouseEnabled : false,
				autoSize     : "center",
				text         : "Hide",
				width        : btn2.width,
				height       : btn.height
			});
			
			text3.setTextFormat(textStyle);
			
			btn3.addChild(text3);
			
			$.click(btn3, function(){
				$.hide(squareList);
			});
		}
		
		public function setPointTest()
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
			
			//$.parallax(square, "x", 0.05);			
			//$.parallax(square2, "x", 0.1);
			//$.parallax(squareList, "xy", 0.01);
			
			return this;
		}
	}
}