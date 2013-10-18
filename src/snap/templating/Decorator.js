;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Decorator',
	namespace : ['snap','templating'],
	require : {
		references : { 'bMoor.module.Resource' : ['bmoor','lib','Resource'] }
	},
	properties : {
		prepared : {},
		get : function( id, data, raw ){
			return this.run( this.prepare(id,raw), data );
		},
		prepare : function( id, raw ){
			var 
				proto,
				type = typeof(id);
			
			if ( type == 'string' ){
				if ( raw ){
					proto = this._wrapped( id );
					proto.isTemplate = true;

					return proto;
				}else{
					if ( !this.prepared[id] ){
						proto = this._wrapped( bMoor.module.Resource.loadTemplate(id) );
						proto.isTemplate = true;

						this.prepared[id] = proto;
					}

					return this.prepared[id];
				}
			}else if ( type == 'function' ){
				// TODO : more tests, but for now assume function is a template
				return content;
			}
		}
	}
});

}( jQuery, this ));