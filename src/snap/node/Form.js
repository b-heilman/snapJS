;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Form',
	namespace : ['snap','node'],
	require: [
		['snap','node','input','Text'],
		['snap','node','input','Checked'],
		['snap','node','input','Button'],
		['snap','node','input','Select']
	],
	node : {
		className : 'node-form'
	},
	properties : {
		_finalize : function(){
			var 
				dis = this,
				element = this.element,
				names = {},
				fields = [];
			
			this._wrapped();
			
			elements = element.elements;
			for( var i = 0, c = elements.length; i < c; i++ ){
				names[ elements[i].name ] = true;
			}
			
			for ( var name in names ) {
				var 
					el,
					input,
					field = elements[ name ];
				
				if ( name[name.length - 1] == ']' ){
					name = name.substring( 0, name.length - 2 );
				}
				
				fields.push( name );
				
				if ( field instanceof NodeList ){
					el = field[0];
				}else{
					el = field;
				}

				if ( el.nodeName == 'BUTTON' ){
					input = new snap.node.input.Button( field );
				}else if ( el.nodeName == 'SELECT' ){
					input = new snap.node.input.Select( field );
				}else{
					if ( el.type == 'checkbox' || el.type == 'radio' ){
						input = new snap.node.input.Checked( field );
					}else if (el.type == 'button' ){
						input = new snap.node.input.Button( field );
					}else{
						input = new snap.node.input.Text( field );
					}
				}
			}
		}
	}
});

}( jQuery, this ));