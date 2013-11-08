;(function( $, global, undefined ){

/**
The abstract construct that all of the snap framework is build off of

@class Core 
@namespace snap
@constructor
**/
bMoor.constructor.define({
	name : 'Core',
	namespace : ['snap'],
	require : {
		classes : [ 
			['snap','observer','Map'],
			['snap','observer','Collection']
		]
	},
	properties : {
		/**
		Returns the base model for the instance

		@method getModel
		@return {Object} The base model
		**/
		getModel : function(){
			if ( this.observer ){
				return this.observer.model;
			}else return null;
		},
		/**
		Issue a warning to the log

		@method __warn
		**/
		__warn : function( warning ){
			this__log( 'warn', warning );
		},
		/**
		Issue an error to the log, and then throw an error

		@method __error
		**/
		__error : function( error ){
			this.__log( 'error', error );
			throw error;
		},
		/**
		Write out to the log

		@method __log
		**/
		__log : function(){
			Array.prototype.unshift.call( arguments, this.__class + ' -> ' );
			console.log.apply( console, arguments );
		},
		/**
		Set the element the instance will be wrapped around

		@method _initElement
		**/
		_initElement : function( element ){
			this.element = element;
		},
		/**
		Find the closest model and pass it back

		@method _initModel
		@return {Object} The base model
		**/
		_initModel : function(){
			var observer = this._findObserver();

			return  observer ? observer.model : global;
		},
		/**
		Find the closest model and pass it back

		@method _observe
		@param {Object} model The base model the instance should observe
		@return {snap.observer} The instance's observer
		**/
		_observe : function( model ){
			var observer = null;

			if ( model ){
				if ( model._ ){
					observer = model._;
				}else{
					if ( model.length === undefined ){
						observer = new snap.observer.Map( model );
					}else{
						observer = new snap.observer.Collection( model );
					}
				}
			}

			return observer;
		},
		/**
		Accepts the attributes for the instance, add it to the internal hash

		@method _parseAttributes
		@param {Object} attributes The attributes for the instance
		**/
		_parseAttributes : function( attributes ){
			this._attributes = attributes;
		},
		/**
		Search through a variable's properties and return the value

		@method _unwrapVar
		@param {Object} context The base object to search through
		@param {String|Array} variable The variable path to follow
		@param {Boolean} smart Return back more information about the match, or just the value
		@return The matched value
		**/
		_unwrapVar : function( context, variable, smart ){
			var 
				scope,
				value = context,
				test = typeof(variable) == 'string' ? variable.split('.') : variable,
				i,
				c;

			if ( smart ){
				for( i = 0, c = test.length; i < c; i++ ){
					if ( value[test[i]] !== undefined ){
						scope = value;
						variable = test[i];
						value = value[ variable ];
					}else return undefined;
				}

				return {
					scope : scope,
					value : value,
					variable : variable
				};
			}else{
				for( i = 0, c = test.length; i < c; i++ ){
					if ( value[test[i]] !== undefined ){
						value = value[ test[i] ];
					}else return undefined;
				}

				return value;
			}
		},
		_getAttribute : function( attribute, otherwise, adjustment ){
			var attr;
			
			if ( this._attributes && this._attributes[attribute] ){
				attr = this._attributes[attribute];
			}else{
				attribute = 'snap-'+attribute;
				
				if ( this.element.hasAttribute && this.element.hasAttribute(attribute) ){
					attr = this.element.getAttribute( attribute );
				}else return otherwise;
			}
			
			return adjustment ? adjustment( attr ) : attr;
		},
		_findElementWithProperty : function( property, element ){
			var el = element || this.element;

			if ( el ){
				if ( !el.hasAttribute ){
					el = el[ 0 ];
				}

				while( el.tagName != 'HTML' ){
					if ( el[property] ){ 
						return el; 
					}
					el = el.parentNode;
				}
			}

			return null;
		},
		_findProperty : function( property, element ){
			var node = this._findElementWithProperty( property, element );

			return node ? node[ property ] : null;
		},
		_findRoot : function( element ){
			return this._findProperty( 'root', element );
		},
		_setRoot : function( controller ){
			if ( !controller ){
				controller = this.root;
			}
			
			this.element.root = controller;
		},
		_findObserver : function( element ){
			return this._findProperty( 'observer', element );
		},
		_pushObserver : function( element, observer ){
			if ( !element ){
				element = this.element;
			}

			if ( !observer ){
				observer = this.observer;
			}
			
			element.observer = observer;
		},
		_closestNode : function( constructor ){
			var
				element = this.element.parentNode,
				node;

			while( element && node === undefined ){
				if ( element.node && element.node instanceof constructor ){
					node = element.node;
				}

				element = element.parentNode;
			}

			return node;
		},
		_select : function( selector, element ){
			if ( !element ){
				element = this.element;
			}
			
			if ( element.querySelectorAll ){
				return element.querySelectorAll( selector );
			}else{
				return $( element ).find( selector );
			}
		},
		_decodeData : function( variable ) {
			// TODO : prolly inline this
			return this._unwrapVar( this.observer.model, variable );
		},
		// TODO : this should be renamed
		_decode : function( variable ){
			if ( typeof(variable) != 'string' ){
				return variable;
			}else if ( variable[0] == '{' || variable[0] == '[' ){
				return eval( variable );
			}else return eval( 'global.' + variable );
		}
	}
});

}( jQuery, this ));
