;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Select',
	namespace : ['snap','node','input'],
	parent : ['snap','node','input','Basic'],
	properties: {
		_initElement : function ( element ){
			var 
				$el = this['snap.node.input.Basic']._initElement.call( this, element ),
				selected,
				i,
				c;

			selected = this._select( '[selected]', element );

			if ( selected.length ){
				for( i = 0, c = selected.length; i < c; i++ ){
					selected[i].removeAttribute('selected');
				}
				selected = selected[ selected.length-1 ];
			}else{
				selected = element.options[0];
			}

			this.val( selected.value );

			return $el;
		},
		lockValue : function(){
			if ( this.oldOption ){
				this.oldOption.removeAttribute( 'selected' );
			}

			this.oldOption = this.element.options[ this.element.selectedIndex ];
			this.oldOption.setAttribute( 'selected', true );
		},
		val : function( value ){
			if ( value ){
				var dex;
				
				for( var options = this.element.options, i = 0, c = options.length; i < c; i++ ){
					if ( options[i].value == value ){
						dex = i;
						i = c;
					}
				}
				
				if ( !dex ){
					dex = 0;
				}
				
				this.element.selectedIndex = dex;
			}else{
				return this.element.options[this.element.selectedIndex].value;
			}
		}
	}
});

}( jQuery, this ));