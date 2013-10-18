;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Abstract',
	namespace : ['snap','controller'],
	parent : ['snap','Core'],
	require : {
		classes : [ 
			['snap','lib','Stream'],
		]
	},
	onDefine : function( settings ){
		var 
			service,
			controller;

		if ( settings.controller ){
			controller = settings.controller;

			// set instreams or outstreams to be mapped
			this._streamPull = controller.streamPull || {};
			this._streamPush = controller.streamPush || {};

			if ( !controller.className ){
				controller.className = 'snap-controller';
			}

			// TODO : this could prolly be merges with Node's code
			this.className = controller.className; // TODO : auto gen this?
			
			if ( this.baseClass ){
				if ( controller.singleClass ){
					this.baseClass = controller.className;
				}else{
					this.baseClass += ' ' + controller.className;
				}
			}else{
				this.baseClass = controller.className;
			}

			$(document).ready(function(){
				var
					className = '.'+controller.className.split(' ')[0], 
					subselect,
					actions,
					action,
					share = {},
					// TODO : drop this if I can
					global = function( action, func ){
						$(document.body).on( action, function(event){
							$( className ).each(function(){
								this.controller[ func ]( event, share );
							});
						});
					},
					relative = function( action, subselect, func ){
						$(document.body).on( action, className+' '+subselect, function( event ){
							var
								node = this,
								root,
								observerEl;

							observerEl = snap.Core.prototype._findElementWithProperty( 'observer', this );
							
							if ( $(observerEl).hasClass(className) ){
								root = observerEl;
							}else{
								root = $(this).closest( className )[0];
							}

							return root.controller[ func ]( event, this, root.observer, root.node, share );
						});
					};

				for( action in controller.actions ){
					actions = controller.actions[ action ];
					
					if ( typeof(actions) == 'string' ){
						relative( action, '', actions );
					}else{
						for( subselect in actions ){
							relative( action, subselect, actions[subselect] );
						}
					}
				}

				for( action in controller.globals ){
					global( action, controllers.globals[action] );
				}
			});
		}else{
			this._streamPull = {};
			this._streamPush = {};
		}
	},
	construct : function( element, attributes, args, delay ){
		this._parseAttributes( attributes );
		this._parseArguments.apply( this, arguments );
		
		if ( delay ){
			this.element = element;
		}else{
			this.init( element );
		}
	},
	properties : {
		init : function( element ){
			var 
				dis = this,
				derp = function( func ){
					snap.lib.stream( stream ).pulling( dis.observer, function(){
						func.apply( dis, arguments ); 
					});
				};

			if ( !element ){
				element = this.element;
			}
			
			this._initElement( element );
			
			// call the model generator, allow it to return or set this.model
			this.observer = this._observe( this._initModel() );

			this._pushObserver( this.element, this.observer );

			// jsHint is giving me an error for declaring it higher...
			for( var stream in this._streamPush ){
				snap.lib.stream( stream ).pushing( this.observer, this._streamPush[stream] );
			}

			for( stream in this._streamPull ){
				if ( typeof(this._streamPull[stream]) == 'function' ){
					derp( this._streamPull[stream] );
				}else{
					snap.lib.stream( stream ).pulling( this.observer, this._streamPull[stream] );
				}
			}
			
			this.root = this._findRoot() || this;

			if ( this._newRoot ){
				this._setRoot( this );
			}else{
				this._setRoot();
			}

			this._finalize();
		},
		_key : null,
		_newRoot : false,
		_parseArguments : function(){
			// maybe arguments should really be a hash?
			// use json decode?
			this.args = arguments;
		},
		// make models observes that are then linked...
		_model : function( parentModel ){
			return parentModel;
		},
		_initModel : function(){
			var 
				info,
				scope,
				model = this['snap.Core']._initModel.call(this);

			// TODO : merge with snap.controller.Abstract
			scope = this._getAttribute( 'scope', this.element.name );
			
			if ( scope ){
				scope = scope.split('.');
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

			return this._model( model );
		},
		_initElement : function( element ){
			this['snap.Core']._initElement.call( this, element );
			
			element.controller = this;

			if ( this.baseClass ){
				element.className += ' '+this.baseClass;
			}
		},
		_finalize : function(){}
	}
});

}( jQuery, this ));
