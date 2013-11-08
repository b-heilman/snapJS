;(function( $, global, undefined ){

/**
Handles the functionality and model construct for Sketch

@class Sketch 
@namespace snap.drawing.controller
@constructor
**/
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
		/**
		Maintains a pointer to the mouse tracking variable

		@property lastPosition
		@default bmoor.lib.mouseTracker
		**/
		lastPosition : bmoor.lib.mouseTracker,
		/**
		Function to fire on the mousedown event of a sketch

		@method mousedown
		@param {Event} event The event generated
		@param {Element} element The element triggering the event
		@param {snap.observer} observer The closest observer to the triggering element
		@param {snap.node} node The closest node to the triggering element
		**/
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
		/**
		Generates the default model

		@method _model
		@param parentModel The model coming down from higher in the heirarchy 
		@return {Object} The model to pass to the observer
		**/ 
		_model : function( parentModel ){
			return {};
		}
	}
});
}( jQuery, this ));
