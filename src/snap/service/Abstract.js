;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Abstract',
	namespace : ['snap','service'],
	require : [
		['snap','model','Abstract']
	],
	construct : function(){
		var instance;

		if ( this.instanceClass !== null && typeof(this.instanceClass) != 'function' ){
			instance = bMoor.get( this.instanceClass );

			if ( !instance ){
				throw this.__class+' could not find '+this.instanceClass;
			}else{
				this.instanceClass = instance;
			}
		}
	},
	properties : {
		instanceClass : null,
		parseService : function( url ){
			// make a url like www.something.com/:group/:id dynamic
			return new Function( 'model', 
				'return "' + url.replace( /:([^\/?&]+)/g, '"+model.$1+"' ) + '";' 
			);
		},
		_get : function(){
			return [];
		},
		get : function(){
			var 
				i,
				c,
				instanceClass = this.instanceClass,
				data;

			if ( !this.data ){
				data = this._get();

				if ( instanceClass ){
					for( i = 0, c = data.length; i < c; i++ ){
						data[i] = new instanceClass( data[i] );
					}
				}

			this.data = data;
			}

			return this.data;
		},
		push : function( data ){
			var
				instanceClass = this.instanceClass;

			if ( instanceClass ){
				this.data.push( new instanceClass(data) );
			}else{
				this.data.push( data );
			}
		},
		wrap : function( data ){
			var
				instanceClass = this.instanceClass;

			if ( instanceClass ){
				return new instanceClass( data );
			}else{
				return data;
			}
		}
	}
});

}( jQuery, this ));