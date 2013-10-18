;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Menu',
	namespace : ['snap','drawing','controller'],
	parent : ['snap','controller','Abstract'],
	require: [
		['snap','drawing','lib','stroke','Brush']
	],
	controller : {
		streamPush : {
			'drawing.options' : {
				'color'  : 'color',
				'width'  : 'width',
				'stroke' : 'stroke'
			}
		}
	},
	properties : {
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
