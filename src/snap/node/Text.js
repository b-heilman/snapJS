;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Text',
	namespace : ['snap','node'],
	parent : ['snap','node','Basic'],
	node : {
		className : 'node-text'
	},
	properties: {
		_makeContent : function( content ){
			this.element.innerHTML = String(content)
				.replace(/&/g, '&amp;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
		}
	}
});

}( jQuery, this ));