;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Abstract',
	namespace : ['snap','model'],
	construct : function( data ){
		this._initModel( data );
		this._initDefaults();
	},
	properties : {
		toObject : function(){
			var 
				key,
				rtn = {};

			for( key in this ) {
				if ( this.hasOwnProperty(key) && typeof(this[key]) != 'function' ){
					rtn[key] = this[key];
				}
			}

			return rtn;
		},
		toJson : function(){
			return JSON.stringify( this.toObject() );
		},
		set : function( key, val ){
			if ( this._validations[key] ){
				if ( this._validations[key](val) ){
					this[key] = val;
				}
			}else{
				this[key] = val;
			}
		},
		_validations : {},
		_initModel : function( data ){
			var key;

			for( key in data ) if ( data.hasOwnProperty(key) ){
				this.set( key, data[key] );
			}

		},
		_initDefaults : function(){
			var 
				key,
				defaults = this._defaults;

			for( key in defaults ){
				if( !this[key] ){
					this.set( key, defaults[key] );
				}
			}
		},
		_defaults : {}
	}
});

}( jQuery, this ));
