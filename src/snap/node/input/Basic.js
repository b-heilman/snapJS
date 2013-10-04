;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Basic',
	namespace : ['snap','node','input'],
	parent : ['snap','node','Basic'],
	properties: {
		// gets called by the data bind
		lockValue : function(){},
		val : function( value ){},
		_isValid : function( value ){ 
			return null; 
		}, // pretty much 
		_makeContent : function( data ){
			this.val( data );
		},
		_initElement : function( element ){
			this.root = this._findRoot();

			return this['snap.node.Basic']._initElement.call( this, element );
		},
		_initModel : function(){
			var model = this['snap.node.Basic']._initModel.call( this );

			if ( !this.variable && this.element.name ){
				this.variable = this.element.name;
			}else if ( this.variable && !this.element.name ){
				this.element.setAttribute( 'name', this.variable );
			}

			return model;
		},
		_bind : function(){
			this['snap.node.Basic']._bind.call( this );
			
			this.lockValue();

			this._listen();
		},
		// TODO : make alter protected for the rest
		_listen : function(){
			var 
				dis = this,
				el = this.element;
			
			el.onchange = function(){ dis._onChange(); };
		},
		_onChange : function(){
			var 
				root = this.root.observer.model,
				value = this.val(),
				valid = this._isValid( value );
			
			this._pushChange();

			if ( value == this.lockedValue ){
				this.clearState();
			}else{
				if ( valid === false ){
					this.setState( false );
				}else{
					if ( valid === true ){
						this.setState( true );
					}
				}

				if ( root.$addChange ){
					root.$addChange( this );
				}
			}
		},
		_pushChange : function(){
			this.observer.model[ this.element.name ] = this.val();
		},
		setState : function( state ){
			var root = this.root.observer.model;
			
			if ( state ){
				if ( root.$removeError ){
					root.$removeError( this );
				}

				this.$.removeClass( 'state-error' );
				this.$.addClass( 'state-valid' );
			}else{
				if ( root.$addError ){
					root.$addError( this );
				}

				this.$.addClass( 'state-error' );
				this.$.removeClass( 'state-valid' );
			}
		},
		clearState : function(){
			this.$.removeClass( 'state-error' );
			this.$.removeClass( 'state-valid' );
		}
	}
});

}( jQuery, this ));