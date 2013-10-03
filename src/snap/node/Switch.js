;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Switch',
	namespace : ['snap','node'],
	parent : ['snap','node','View'],
	properties : {
		_makeTemplate : function( model ){
			var 
				template;

			if ( model ){
				template = this._unwrapVar( model, this._getAttribute('template') );
				if ( !template ){
					template = this._getAttribute('defaultTemplate');
				}else{
					this.watchTemplateVar = this._getAttribute('template');
				}
				
				if ( template ){
					return bMoor.module.Templator.prepare( template );
				}
			}

			return null;
		},
		_needUpdate : function( alterations ){
			return alterations.modelSwitch 
				|| this['snap.node.View']._needUpdate.call( this, alterations);
		}
	}
});

}( jQuery, this ));
