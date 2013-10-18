;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Sketch',
	namespace : ['snap','drawing','node'],
	parent : ['snap','node','Basic'],
	require: [
		['bmoor','lib','MouseTracker'],
		['snap','drawing','lib','Context'],
		['snap','drawing','lib','stroke','Brush'],
		['snap','drawing','controller','Sketch']
	],
	node : {
		className : 'drawing-sketch',
		helpers : {
			lastPosition : bmoor.lib.mouseTracker
		},
		actions : {
			'mousedown' : function ( event, node, helpers ) {
				var 
					lastPosition = helpers.lastPosition,
					offset = node.$.offset(),
					model = node.observer.model,
					stroke = new (bMoor.get( model.stroke ))( node.ctx, model ),
					onMove = function( event ){
						stroke.move( event.pageX - offset.left, event.pageY - offset.top );
					},
					onUp = function(){
						onOut();
					},
					onOut = function(){
						stroke.end( lastPosition.x - offset.left, lastPosition.y - offset.top );
						
						$(document.body).unbind( 'mousemove', onMove );
						$(document.body).unbind( 'mouseup', onUp );
						$(document.body).unbind( 'mouseout', onOut );
					};

				stroke.start( lastPosition.x - offset.left, lastPosition.y - offset.top );
				
				$(document.body).bind( 'mousemove', onMove );
				$(document.body).bind( 'mouseup', onUp );
				$(document.body).bind( 'mouseout', onOut );
				
				return false;
			}
		}
	},
	properties : {
		defaultController : ['snap','drawing','controller','Sketch'],
		_initElement : function( element ){
			var $el;

			if ( element.nodeName != 'CANVAS' ){
				var canvas = document.createElement('canvas');
				
				element.style.position = 'relative';
				canvas.style.position = 'absolute';
				canvas.style.left = '0px';
				canvas.style.top = '0px';
				canvas.style.width = '100%';
				canvas.style.height = '100%';
				
				element.appendChild( canvas );
				element = canvas;
			}
			
			$el = this['snap.node.Basic']._initElement.call( this, element );
			
			this.ctx = new snap.drawing.lib.Context( element, 3 );
			
			element.style.cssText += '-moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; user-select: none;';
			element.setAttribute('unselectable', 'on');
			element.onselectstart = function() { if (dragging) return false; };

			return $el;
		},
		save : function(){
			return this.ctx.toDataURL();
		},
		load : function( dataURL, cb ){
			var 
				ctx = this.ctx,
				img = new Image();
			
			img.onload = function(){
				ctx.clear();
				ctx.drawImage(this, 0, 0);
				
				if ( cb ){
					cb();
				}
			};
			
			img.src = dataURL;
		},
		resize : function(){
			this.ctx.calcSize();
		},
		locked : true,
		lock : function(){
			this.$.removeClass( 'unlocked' );
			this.locked = true;
			
			return this;
		},
		unlock : function(){
			this.$.addClass( 'unlocked' );
			this.locked = false;
			
			return this;
		}
	}
});
}( jQuery, this ));
