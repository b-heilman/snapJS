;(function( $, global, undefined ){

var nodesCount = 0;

bMoor.constructor.define({
	name : 'Basic',
	namespace : ['snap','node'],
	parent : ['snap','Core'],
	require : {
		classes : [ 
			['snap','observer','Map'],
			['snap','observer','Collection']
		],
		references : { 
			'bMoor.module.Templator' : ['snap','templating','JQote'],
			'bMoor.module.Bootstrap' : ['snap','lib','Bootstrap']
		}
	},
	// this is a reference to the class
	onDefine : function( settings ){
		var 
			dis = this,
			node;
		
		if ( settings.node ){
			node = settings.node;
			
			if ( node.className ){
				this.className = node.className;
				
				if ( this.baseClass ){
					if ( node.singleClass ){
						this.baseClass = node.className;
					}else{
						this.baseClass = node.className + ' ' + this.baseClass;
					}
				}else{
					this.baseClass = node.className;
				}
			}
		}
	},
	node : {
		className : 'node-basic'
	},
	construct : function( element, attributes, delay ){
		this._parseAttributes( attributes );
		
		if ( delay ){
			this.element = element;
		}else{
			this.init( element );
		}
	},
	properties : {
		defaultController : null, // remember to preload this
		init : function( element ){
			if ( !element ){
				element = this.element;
			}
			
			this.classBindings = [];
			this.makeClass = null;
			this.observing = false;
			this.nodeId = nodesCount++;
			
			this.$ = this._initElement( element );

			if ( !this.$ ){
				throw this.__class+' forgot to return a jQuery object';
			}

			this.$.data( 'node', this ); // TODO : kinda wanna get ride of this?
			element.node = this;

			this.observer = this._observe( this._initModel() );
			
			this._bind();

			this._finalize();
		},
		_initElement : function( element ){
			var 
				dis = this,
				controller,
				attr;

			if ( !element ){
				throw this.__class+' was never passed an element';
			}

			this['snap.Core']._initElement.call( this, element );

			// install a default controller
			// TODO : a better way to do this?
			if ( !element.controller && this.defaultController ){
				controller = bMoor.get( this.defaultController );

				if ( !controller ){
					throw 'defaultController could not be found for node ('
						+ this.__class + ') : ' + this.defaultController;
				}else{
					new controller( element );
				}
			}
			
			attr = this._getAttribute( 'class' );

			if ( attr ){
				element.origClassName = element.className;

				this.makeClass = new Function( 'model', 'return "' 
					+ attr
						.replace( /\{\{([^\?]+)\?([^:]+):([^\}]+)\}\}/g, 
							function( match, arg1, arg2, arg3 ){
								dis.classBindings.push( arg1 );
								return '"+(model.'+arg1+'?"'+arg2+'":"'+arg3+'")+"';
							}
						)
						.replace( /\{\{([^\/?&]+)\}\}/g, function( match, arg1 ){
								dis.classBindings.push( arg1 );
								return '"+model.'+arg1+'+"';
							}
						) 
					+ '";' );
			}else{
				element.className = this.baseClass + ' ' + element.className;
			}

			return $( element );
		},
		_initModel : function(){
			var 
				attr,
				info,
				scope,
				model = this['snap.Core']._initModel.call( this );
			
			if ( !this.element.controller ){
				attr = this._getAttribute( 'observe' );
				
				if ( attr ){
					scope = attr.split('.');
					info = this._unwrapVar( model, scope, true );

					if ( info.value instanceof snap.observer.Map ){
						model = info.value.model;
					}else if ( typeof(info.value) == 'object' ){
						model = info.scope;
						this.variable = info.variable;
					}else{
						throw 'Trying to observe, but no observer.Map found';
					}

					this.observing = true;
				}else{
					// TODO : merge with snap.controller.Abstract

					attr = this._getAttribute( 'scope', this.element.name );
					
					if ( attr ){
						scope = attr.split('.');
						info = this._unwrapVar( model, scope, true );

						if ( !info ){
							// TODO : what do I do?
						}else if ( typeof(info.value) == 'object' ){
							// if scope is a model, make it he model we watch
							this.variable = null;
							model = info.value;
						}else{
							this.variable = info.variable;
							model = info.scope;
						}
					}
				}
			}
			
			return model;
		},
		_bind : function(){
			var dis = this;
			
			this.viewBindings = this._makeBindings();

			this.observer.bind( function( alterations ){
				if ( dis._needUpdate(alterations) ) {
					dis._prepContent( this.model, alterations );
				}

				dis._onAlteration( this.model, alterations );

				if ( dis.makeClass && dis._needClassUpdate(alterations) ){
					dis._updateClass( this.model );
				}
			});
		},
		_onAlteration : function( model, alterations ){},
		_makeBindings : function(){
			var attr = this._getAttribute('binding');

			// control when this node updates itself
			if ( attr ){
				if ( attr[0] == '-' ){
					return [];
				}else if ( attr[0] == '*' ){
					return null;
				}else return attr.split(',');
			}else if ( this.variable ){
				return [ this.variable ];
			}else return [];
		},
		_needClassUpdate : function( alterations ){
			var 
				i,
				c,
				isNeeded = false,
				bindings = this.classBindings;

			if ( alterations.binding ){
				return true;
			}

			for( i = 0, c = bindings.length; i < c && !isNeeded; i++ ){
				isNeeded = alterations[ bindings[i] ];
			}
			
			return isNeeded;
		},
		_updateClass : function( data ){
			var element = this.element;

			element.className = this.baseClass + ' ' + element.origClassName + ' ' + this.makeClass( data );
		},
		// TODO : change to _needContentUpdate
		_needUpdate : function( alterations ){
			var 
				i,
				c,
				isNeeded,
				bindings = this.viewBindings;

			if ( alterations.binding ){
				return true;
			}

			if ( bindings ){
				isNeeded = false;

				for( i = 0, c = bindings.length; i < c && !isNeeded; i++ ){
					isNeeded = alterations[ bindings[i] ];
				}
			}else{
				isNeeded = true;
			}
			
			return isNeeded;
		},
		_prepContent : function( data, alterations ){
			var dis = this;

			if ( this.variable ){
				value = data[this.variable];

				if ( typeof(value) == 'function' ){ 
					value = data[this.variable](); 
				}
			}else{
				value = data;
			}

			// set up the observer for any children created
			this._pushObserver( this.element, this.observing ? this._observe(value) : this.observer );

			if ( this._makeContent( value, alterations ) ){
				bMoor.module.Bootstrap.done(function(){
					dis._finalizeContent();
				});
			}
		},
		// TODO : change to _updateContent
		_makeContent : function( data, alterations ){ return true; },
		_finalizeContent : function(){},
		_finalize : function(){}
	}
});

}( jQuery, this ));
