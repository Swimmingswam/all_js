package  {
	
	import flash.display.MovieClip;
	
	public class guandao extends MovieClip {
		
		public var heights:int;
		public var isadd:Boolean;
		public function guandao(he:int,space:int) {
			// constructor code
			isadd = false;
			if(he==0)
			{
				heights = Math.floor(Math.random()*(244 - space) + 80);
			    g1.height = heights - 25;
			}
			else
			{
				heights = 404 - space - he - 25;
				g1.height = heights - 25;
			}
		}

	}
	
}

