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
		}
	},
	properties : {
		_model : function( parentModel ){
			return {};
		}
	}
});
}( jQuery, this ));
