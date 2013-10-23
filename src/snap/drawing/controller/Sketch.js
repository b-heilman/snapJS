;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Sketch',
	namespace : ['snap','drawing','controller'],
	parent : ['snap','controller','Abstract'],
	controller : {
		streamPull : {
			'drawing.options' : {
				'color'  : 'color',
				'width'  : 'width',
				'stroke' : 'stroke'
			}
		},
		className : 'drawing-sketch',
		actions : {
			'mousedown' : 'mousedown'
		}
	},
	properties : {
		lastPosition : bmoor.lib.mouseTracker,
		mousedown : function ( event, element, observer, node ){
			var 
				lastPosition = this.lastPosition,
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
		},
		_model : function( parentModel ){
			return {};
		}
	}
});
}( jQuery, this ));
