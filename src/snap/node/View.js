;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'View',
	namespace : ['snap','node'],
	parent : ['snap','node','Basic'],
	references : { 
		'bMoor.module.Templator' : ['snap','templating','JQote']
	},
	node : {
		className : 'node-view'
	},
	onDefine : function( settings ){
		var key;

		if ( this.templates ){
			for( key in this.templates ){
				this.templates[ key ] = bMoor.module.Templator.prepare( 
					bMoor.module.Resource.parseTemplate( this.templates[key] ), true
				);
			}
		}
	},
	properties : {
		defaultTemplate : null,
		findTemplate : function( template ){
			var 
				el = this.element,
				node;

			while( el ){
				node = el.node;

				if ( node.templates && node.templates[template] ){
					return node.templates[ template ];
				}else{
					console.log( node );
					el = this._findElementWithProperty( 'node',el.parentNode );
				}
			}
		},
		_makeTemplate : function( model ){
			var 
				t,
				template;
				 
			if ( template = this._getAttribute('template') ){
				if ( template.charAt(0) == '>' ){
					this.watchTemplateVar = template.substring(1);
					template = this._unwrapVar( model, template.substring(1) );
				}else if ( template.charAt(0) == '$' ){
					template = this._unwrapVar( this.templates, template.substring(1) );
				}

				// see if it is a node defined template, otherwise it might be global
				if ( template ){
					return this.findTemplate( template ) || bMoor.module.Templator.prepare( template );
				}
			} else if ( this.defaultTemplate 
					&& (template = this.findTemplate(this.defaultTemplate))
					&& template.isTemplate ){
				return template;
			} 

			return null;
		},
		_makeContent : function( data, alterations ){
			var template = this._makeTemplate( data );
			
			if ( template ){
				this._setContent( bMoor.module.Templator.run(template,data) );
				return true;
			}else return false;
		},
		_setContent : function( content ){
			var 
				next,
				element,
				el = document.createElement( 'div' );
			
			el.innerHTML = content;

			this.element.innerHTML = '';

			element = el.firstChild;
			while( element ){
				next = element.nextSibling;
				
				this.element.appendChild( element );

				this._finalizeElement( element );

				element = next;
			}
		},
		_needUpdate : function( alterations ){
			return ( this.watchTemplateVar && alterations[this.watchTemplateVar] ) 
				|| this['snap.node.Basic']._needUpdate.call( this, alterations );
		},
		_finalizeElement : function( element ){
			if ( element.nodeType != 3 ){
				bMoor.module.Bootstrap.build( element );
			}
		}
	}
});

}( jQuery, this ));