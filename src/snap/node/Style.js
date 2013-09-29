;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Style',
	namespace : ['snap','node'],
	parent : ['snap','node','Basic'],
	node : {
		singleClass : true,
		className : 'node-style'
	},
	properties: {
		_makeContent : function( content ){
			if ( this.element.styleSheet ){
				this.element.styleSheet.cssText = content;
			} else {
				this.element.innerHTML = '';
				this.element.appendChild( document.createTextNode(content) );
			}
		}
	}
});

}( jQuery, this ));