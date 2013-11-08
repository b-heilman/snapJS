;(function( $, global, undefined ){

/**
Handles the model construct of the model

@class Menu 
@namespace snap.drawing.controller
@constructor
**/
bMoor.constructor.define({
	name : 'Menu',
	namespace : ['snap','drawing','controller'],
	parent : ['snap','controller','Abstract'],
	require: [
		['snap','drawing','lib','stroke','Brush']
	],
	controller : {
		// link the internal model to a stream, allowing values to be pushed out to it
		streamPush : {
			'drawing.options' : {
				'color'  : 'color',
				'width'  : 'width',
				'stroke' : 'stroke'
			}
		}
	},
	properties : {
		/**
		Generates the default model

		@method _model
		@param parentModel The model coming down from higher in the heirarchy 
		@return {Object} The model to pass to the observer
		**/ 
		_model : function( parentModel ){
			return {
				color  : 'black',
				width  : 1,
				stroke : 'snap.drawing.lib.stroke.Brush'
			};
		}
	}
});

}( jQuery, this ));
