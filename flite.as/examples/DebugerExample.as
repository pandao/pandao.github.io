package  
{
	import flash.text.*;
	import flash.utils.*;
	import flash.system.*;
	import flash.events.*;
	import flash.display.*;
	
	import com.flite.Utils;
	import com.flite.Debuger;
	
	/**
	 * ...
	 * @author Pandao
	 */
	
	public class DebugerExample extends MovieClip
	{		
		public var $:Utils;
		
		public function DebugerExample() : void
		{			
			System.useCodePage           = false;		
			stage.align                  = StageAlign.TOP_LEFT;
			stage.scaleMode              = StageScaleMode.NO_SCALE; 
			stage.showDefaultContextMenu = false; 
			
			$ = new Utils();
			
			test();
			consoleTest();
		}
		
		public function test()
		{ 			
			var arr:Array = new Array(12515,123232,1515);
			 
			arr[0] = 1232323;
			 
			arr[0] = new Array(1, 2, 3, 4, [1987, 1988, 1989, [19901, 19902, 19903, [199031, 199032, 199033] ] ]);
			 
			arr[3] = [10, [5425, 156,], 10000, 'PHP', true, 0.52455, -15, '-132213656565', null, undefined];
			arr['P'] = 'PPPPPPP';
			arr['negative'] = -15455555;
			arr['list'] = [5, 56556,2656,565,665,656,59,[5656565656,656556,4999],5625623,2656,222,[212122,65656,999,998956,22633,22666,1484223,[10,20,30,40,50,60,[70, 71, 72, 73, 74, 75, 76,[771, 772, 773, 774, 775, [7761, 7762, 7763, 7764, [77641, 77642, 77643, 77644]]]]]]];

			var obj:Object = { a:'A', b:'B', c: { c1:'C1', c2:'C2' }, d:'D' };
			
			arr['obj'] = obj; 
			
			Debuger.create(this, stage, {
				//width : 600, 
				//height: 480,
				//x : "center",
				//y : 100,
				text : Debuger.printr(arr) // init text
			});
			
			// reset text
			Debuger.setText("Please open the Developer Tools, Enter F12.");
			trace(Debuger.getText());
			
			Debuger.appendText("appendText 1");
			trace(Debuger.getText());
			
			Debuger.appendText(Debuger.printr(arr));
			Debuger.appendText(Debuger.printr(obj));
			
			Debuger.show();	
			
			//Debuger.setPosition("center", "center");
			
			var btn:RoundButton = new RoundButton();
			btn.text.text = "Close/Hide";
			btn.text.mouseEnabled = false;
			btn.buttonMode = true;
			addChild(btn);
			
			var btn2:RoundButton = new RoundButton();
			btn2.text.text = "Open/Show";
			btn2.text.mouseEnabled = false;
			btn2.buttonMode = true;
			btn2.x = btn.x + btn.width + 10;
			addChild(btn2);
			
			$.click(btn, function(){
				Debuger.hide();
			});
			
			$.click(btn2, function(){
				Debuger.show();
			});
		}
		
		public function consoleTest()
		{			
			var obj:Object = { "as" :"ActionScript 3.0", php : "PHP 5.6", html : "HTML" };
			
			Debuger.console("time", "FLiteDeugerConsoleTest");
			
			Debuger.console("log", "flite.Debuger.console() unsupport assert, count, table and string containing the escape character.");

			Debuger.console("log", "\\n");
			
			Debuger.console("log", "flite.Debuger.console() => log.message");
			Debuger.console("error", "flite.Debuger.console() => error.message");
			Debuger.console("info", "flite.Debuger.console() => info.message");
			Debuger.console("warn", "flite.Debuger.console() => warn.message");
			Debuger.console("debug", "flite.Debuger.console() => debug.message");
			
			Debuger.console("log", "\\n");
						
			Debuger.console("group", "flite.Debuger.console() => group");
			Debuger.console("log", "flite.Debuger.console() => log.message");
			Debuger.console("error", "flite.Debuger.console() => error.message");
			Debuger.console("info", "flite.Debuger.console() => info.message");
			Debuger.console("warn", "flite.Debuger.console() => warn.message");
			Debuger.console("debug", "flite.Debuger.console() => debug.message");
			Debuger.console("groupEnd");
			
			Debuger.console("log", "\\n");
			
			Debuger.console("groupCollapsed", "flite.Debuger.console() => groupCollapsed");
			Debuger.console("log", "flite.Debuger.console() => log.message");
			Debuger.console("error", "flite.Debuger.console() => error.message");
			Debuger.console("info", "flite.Debuger.console() => info.message");
			Debuger.console("warn", "flite.Debuger.console() => warn.message");
			Debuger.console("debug", "flite.Debuger.console() => debug.message");
			Debuger.console("groupEnd");
			
			Debuger.console("log", "\\n");
			
			Debuger.console("timeEnd", "FLiteDeugerConsoleTest");
			
			//Debuger.console("trace"); // not use significance.
			
			//Debuger.console("clear"); // supported.
		}
	}
}