;(function( global, undefined ){
	bMoor.constructor.factory({
		name : 'Stream',
		namespace : ['snap','lib'],
		require : {
			classes : [ 
				['snap','observer','Map'],
			]
		},
		factory : function( stream, defintion ){
			if ( !this[stream] ){
				this[stream] = new defintion();
			}

			return this[stream];
		},
		construct : function(){
			this._listeners = [];
			this._data = {};
		},
		// TODO : revisit this to simplify the logic...
		properties : {
			// map : my var -> stream var, or a function
			// reverse : stream var -> my var, or a function
			pushing : function( observer, map ){
				var 
					func,
					key,
					dis = this;

				// registers anything going from the observer into the stream
				if ( typeof(map) == 'object' ){
					func = function( alterations ){
						var key;

						for( key in alterations ) if ( alterations.hasOwnProperty(key) ){
							if ( map[key] ) {
								dis.push( map[key], this.model[key] );
							}
						}
					};
				}else if ( map === true ){
					func = function( alterations ){
						var key;

						for( key in alterations ) if ( alterations.hasOwnProperty(key) ){
							dis.push( key, this.model[key] );
						}
					};
				}

				if ( func ){
					observer.bind( func );
					this.push( observer.model );
				}
			},
			pulling : function( observer, map ){
				var 
					key,
					type = typeof(map),
					func;

				// registers anything going from the stream into the observer
				if ( type === 'object' ) {
					func = function( key, val ){
						var field = map[ key ];
						
						if ( field ) {
							observer.model[ field ] = val;
						}
					};
				}else if ( type !== 'function' ) {
					func = function( key, val ){
						observer.model[ key ] = val;
					};
				}else{
					func = map;
				}

				for( key in this._data ){
					console.log( key, this._data[key] );
					func( key, this._data[key] );
				}

				this._listeners.push( func );
			},
			pull : function(){
				var 
					t = {},
					key;

				for( key in this._data ){
					t[ key ] = this._data[ key ];
				}

				return t;
			},
			push : function( key, val ){
				var list, i, c;

				// snap shot of the current state
				this._data[ key ] = val;

				if ( arguments.length == 2 ){
					for( i = 0, list = this._listeners, c = list.length; i < c; i++ ){
						list[i]( key, val );
					}
				}else{
					for( i in key ){
						this.push( i, key[i] );
					}
				}
			}
		}
	});
}( this ));