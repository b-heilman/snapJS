;(function( $, global, undefined ){

bMoor.constructor.mutate({
	name : 'Form',
	namespace : ['snap','glyphing','node'],
	parent : ['snap','node','View'],
	decorators : [
		['snap','node','Form']
	],
	properties : {
		defaultTemplate : 'glyphing-form-insert'
	}
});

bMoor.setTemplate( 'glyphing-form-insert', function(){/*
<label>Top : <input name='top'/></label>
<label>Left : <input name='left'/></label>
<label>Width : <input name='width'/></label>
<label>Height : <input name='height'/></label>
<label>Opacity : <input name='opacity'/></label>
<label>Angle : <input name='angle'/></label>
*/} );

}( jQuery, this ));
