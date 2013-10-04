;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Checked',
	namespace : ['snap','node','input'],
	parent : ['snap','node','Basic'],
	properties: {
		_initElement : function( element ){
			var 
				name = element.nodeName ? element.name : element[0].name,
				e,
				i;

			this.checked = [];
			this.map = {};
			this.multi = false;

			if ( name[name.length-1] == ']' ){
				name = name.substring(0, name.length-2);

				if ( element[0].type.toLowerCase() == 'checkbox' ){
					this.multi = true;
				}
			}

			this.name = name;

			if ( !element.nodeName ){
				for( i = 0; i < element.length; i++ ){
					e = element[i];
					
					this.map[ e.value ] = e;

					if ( e.checked ){
						this.checked.push( e );
					}
				}
			}

			return this['snap.node.Basic']._initElement.call( this, element );
		},
		_initModel : function( context ){
			var 
				model = this['snap.node.Basic']._initModel.call( this, context );

			if ( !this.variable ){
				this.variable = this.name;
			}

			return model;
		},
		_makeContent : function( content ){
			this.val( content );
		},
		_bind : function(){
			var dis = this;
			
			this['snap.node.Basic']._bind.call( this );

			if ( this.observer && this.variable ){
				this.alter(function( value ){
					dis.observer.model[ dis.name ] = value;
				});
			}
		},
		val : function( value ){
			var 
				i,
				el,
				checked,
				element = this.element;

			if ( value ){
				if ( element.nodeName ){
					if ( element.value == value ){
						element.checked = true;
					}else{
						element.checked = false;
					}
				}else{
					checked = this.checked;
						
					this.checked = [];
					
					for( i = 0; i < checked.length; i++ ){
						checked[ i ].checked = false;
					}
					
					if ( this.multi ){
						if ( value.length === undefined || typeof(value) === 'string' ){
							value = [ value ];
						}
						
						for( i = 0; i < value.length; i++ ){
							el = this.map[ value[i] ];
							if ( el ){
								this.checked.push( e );
								el.checked = true;
							}
						}
					}else{
						if ( value.length && typeof(value) != 'string' ){
							value = value.pop();
						}
						
						el = this.map[ value ];
						if ( el ){
							this.checked.push( el );
							el.checked = true;
						}
					}
				}
			}else{
				if ( element.nodeName ){
					if ( element.checked ){
						return element.value;
					}else{
						return null;
					}
				}else{
					if ( this.multi ){
						var rtn = [];
						
						for( i = 0, c = element.length; i < c; i++ ){
							el = element[i];
							if ( el.checked ){
								rtn.push( el.value );
							}
						}
						
						return rtn;
					}else{
						for( i = element.length - 1; i >= 0; i-- ){
							el = element[i];
							if ( el.checked ){
								return el.value;
							}
						}
						
						return null;
					}
				}
			}
		},
		alter : function( cb ){
			var 
				dis = this,
				derp = function(){
                                        cb( dis.val() );
                                };
			
			if ( this.element.nodeName ){
				this.element.onchange = derp;
			}else{
				for( var i = 0, c = this.element.length; i < c; i++ ){
					// TODO : can I limit this to one call for radio?
					this.element[i].onchange = derp;
				}
			}
		}
	}
});

}( jQuery, this ));
