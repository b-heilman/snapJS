;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'List',
	namespace : ['snap','node'],
	parent : ['snap','node','View'],
	require : [
		['snap','observer','Collection']
	],
	node : {
		className : 'node-list'
	},
	properties: {
		_initElement : function( element ){
			var $el = this['snap.node.View']._initElement.call( this, element );
			
			this.rows = {};
			this.isTable = ( element.tagName == 'TABLE' );
			this.mountPoint = null;

			return $el;
		},
		_makeTemplate : function(){
			var 
				mount,
				mountBelow,
				element;

			if ( !this.mountPoint ){
				// TODO : match by attribute value
				mount = this.$.find('[mount]')[0];

				if ( mount ){
					this.mountPoint = {
						'base' : mount
					};
				}else{
					this.mountPoint = {
						'base' : ( this.isTable 
							? this.element.getElementsByTagName( 'tbody' )[0]
							: this.element
						)
					};
				}

				mount = this.$.find('[mountBelow]')[0];
				if ( mount ){
					this.mountPoint.top = mount;
					if ( mount.nextSibling ){
						this.mountPoint.bottom = mount.nextSibling;
					}
				}else{
					mount = this.$.find('[mountAbove]')[0];
					if ( mount ){
						this.mountPoint.bottom = mount;
						if ( mount.previousSibling ){
							this.mountPoint.top = mount.previousSibling;
						}
					}
				}

				if ( mount ){
					if ( mount.parentNode != this.mountPoint.base ){
						this.mountPoint.base = mount.parentNode;
					}
				}
			}

			return this['snap.node.View']._makeTemplate.call( this );
		},
		_needUpdate : function( alterations ){
			// TODO : isn't this repetitive?
			return alterations.binding 
				|| ( alterations.removals && alterations.removals.length )
				|| !$.isEmptyObject( alterations.moves );
		},
		_makeContent : function( data, alterations ){
			var
				i,
				c,
				r,
				row,
				rows,
				moves,
				removals,
				template = this._makeTemplate( data );

			if ( data._ instanceof snap.observer.Collection ){
				removals = alterations.removals;
				
				if ( removals ){
					for( i in removals ){
						row = removals[ i ];
						
						// row is a Map here
						if ( typeof(row) == 'object' ){
							// this means it was removed, otherwise it would be a number
							rows = this.rows[row._.snapid]; // reference the row by snap id

							for( i = 0, c = rows.length; i < c; i++ ){
								r = rows[i];
								if ( r.parentNode ){
									r.parentNode.removeChild( r );
								}
							}

							delete this.rows[row._.snapid];
						}
					}
				}
				
				moves = alterations.moves;
				for( i = 0, c = data.length; i < c; i++ ){
					if ( moves[i] ){
						// data is the stack of objects
						// moves is a hash of the objects with their new position
						// moves get inserted after the data
						this.insert( moves[i], template, data[i-1] );
					}
				}
			}else{
				// otherwise I assume this is an array, and I just completely rewrite it every time
				$( this.mountPoint.base ).empty();
				for( i = 0, c = data.length; i < c; i++ ){
					// TODO : put them in the right place
					this.append( data[i], template, null );
				}
			}
		},
		_makeChildren : function( model, template ){
			var element = document.createElement( this.isTable ? 'table' : 'div' );
			element.innerHTML = bMoor.module.Templator.run( template, model );
					
			return this.isTable ? element.getElementsByTagName( 'tbody' )[0] : element;
		},
		add : function( data ){
			this.observer.model.push( data );
		},
		append : function( model, template ){
			var 
				els = this._makeChildren( model, template ),
				next,
				element;

			element = els.firstChild;

			while( element ){
				next = element.nextSibling;

				this._append( element );
				
				this._finalizeElement( element );
				
				element = next;
			}

			return els;
		},
		// TODO : I would somehow like to use set content...
		insert : function( model, template, previous ){
			var 
				i,
				c,
				step,
				nodes,
				node,
				next,
				prevRow,
				thisRow,
				els,
				element,
				observer = model._;

			thisRow = this.rows[ model._.snapid ];

			if ( !thisRow ){
				els = this._makeChildren( model, template );

				thisRow = this.rows[ model._.snapid ] = [];

				element = els.firstChild;

				while( element ){
					this._pushObserver( element, observer );
					thisRow.push( element );
					
					element = element.nextSibling;
				}
			}

			if ( previous && (prevRow = this.rows[previous._.snapid]) ){
				previous = prevRow[ prevRow.length - 1 ];
				thisRow.previous = prevRow;
			}else{
				previous = this.mountPoint.top;
			}

			for( i = 0, c = thisRow.length; i < c; i++ ){
				element = thisRow[i];

				this._insert( element, previous );
				this._finalizeElement( element );
				
				previous = element;
			}

			return els;
		},
		_append : function( element ){
			var below;

			if ( element.nodeType != 3 ){
				if ( !this.mountPoint.bottom ){
					this.mountPoint.base.appendChild( element );
				} else if ( !this.mountPoint.top ) {
					this.mountPoint.base.insertBefore( element, this.mountPoint.base.firstChild );
				} else {
					this.mountPount.base.insertBefore( element, this.mountPoint.bottom );
				}
			}
		},
		// TODO : a lot of the mountpoint is completely pointless
		_insert : function( element, mount ){
			if ( element.nodeType != 3 ){
				if ( !mount ){
					this.mountPoint.base.insertBefore( element, this.mountPoint.base.firstChild );
				}else if ( mount.nextSibling ){
					mount.parentNode.insertBefore( element, mount.nextSibling );
				}else{
					mount.parentNode.appendChild( element );
				}
			}
		}
	}
});

}( jQuery, this ));
