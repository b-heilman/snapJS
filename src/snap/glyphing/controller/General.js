;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'General',
	namespace : ['snap','glyphing','controller'],
	parent : ['snap','controller','Abstract'],
	properties : {
		_model : function(){
			var glyphs = [];

			glyphs.active = null;

			glyphs.activate = function( glyph ){
				if ( glyphs.active ){
					glyphs.active.active = false;
				}

				glyph.active = true;
				glyphs.active = glyph;
			};

			glyphs.deactivate = function( glyph ){
				if ( glyph === undefined || active === glyph ){
					active.active = false;
					glyphs.active = null;
				}
			};

			return glyphs;
		}
	}
});

}( jQuery, this ));
