;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'General',
	namespace : ['snap','glyphing','controller'],
	parent : ['snap','controller','Abstract'],
	properties : {
		_model : function(){
			var glyphs = [];

			glyphs.active = null;
			glyphs.glyphClass = 'snap.glyphing.node.Glyph';
			
			return glyphs;
		}
	}
});

}( jQuery, this ));
