;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Glyph',
	namespace : ['snap','glyphing','controller'],
	parent : ['snap','controller','Abstract'],
	controller : {
		className : 'glyphing-glyph',
		actions : {
			'mouseenter' : 'enter',
			'mouseleave' : 'leave'
		}
	},
	properties : {
		enter : function( event, element, observer, node ){
			node.$.addClass('glyph-active');
		},
		leave : function( event, element, observer, node ){
			node.$.removeClass('glyph-active');
		}
	}
});

}( jQuery, this ));
