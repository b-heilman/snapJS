;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Container',
	namespace : ['snap','glyphing','controller'],
	parent : ['snap','controller','Abstract'],
	controller : {
		className : 'glyphing-container',
		globals : {
			'keydown' : 'keys'
		},
		actions : {
			'mousedown' : {
				'' : 'creation'
			}
		}
	},
	properties : {
		lastPosition : bmoor.lib.mouseTracker,
		keys : function( event, share ){
			var model = this.observer.model;

			if( !($(event.target).is(':input') ) ){
				if ( (event.keyCode == 8 || event.keyCode == 46) ){
					// delete : esc / delete
					if ( !model.locked && model.active ){
						model.active.$remove = true;
						model.deactivate();
					}
					
					event.stopPropagation();
					event.preventDefault();
				}else if ( event.keyCode == 16 ){
					// next : shift
					if ( model.active ){
						var pos = model.find( model.active );
						
						if ( pos == -1 || pos == model.length - 1 ){
							model.activate( model[0] );
						}else{
							model.activate( model[pos + 1] );
						}
					}else{
						model.activate( model[0] );
					}
					
					event.stopPropagation();
					event.preventDefault();
				}else if ( event.keyCode == 27 ){
					this.observer.model.deactivate();
					
					event.stopPropagation();
					event.preventDefault();
				}
			}
		},
		creation : function( event, element, observer, node ){
			var 
				model = this.observer.model,
				offset = node.$.offset(),
				glyph = node._makeGlyph(
					model.box,
					this.lastPosition.x - offset.left,
					this.lastPosition.y - offset.top
				);

			if ( !model.locked ){
				model.unshift( glyph );
				glyph.activate();
				this.creationDrag( glyph );
			}

			event.stopPropagation();
			event.preventDefault();
		},
		creationDrag : function( glyph ){
			var 
				startPos = {
					x : this.lastPosition.x,
					y : this.lastPosition.y
				},
				onStart = {
					width  : glyph.width,
					height : glyph.height,
					top    : glyph.top,
					left   : glyph.left
				},
				onMove = null,
				onMouseup = null,
				onMouseout = null;
					
			onMouseup = function(){
				$(document.body).unbind( 'mouseup', onMouseup );
				$(document.body).unbind( 'mouseout', onMouseout );
				$(document.body).unbind( 'mousemove', onMove );
			};
			
			onMouseout = function( event ){
				if ( event.relatedTarget === null || event.relatedTarget.tagName.toUpperCase() === 'HTML' ){
					onMouseup();
				}
			};
			
			onMove = function( event ){
				var
					xDiff = Math.abs( startPos.x - event.pageX ),
					yDiff = Math.abs( startPos.y - event.pageY ),
					width = onStart.width + xDiff + xDiff,
					height = onStart.height + yDiff + yDiff;
				
				if ( width > glyph.settings.minWidth ){
					glyph.width = width;
					glyph.left = onStart.left - xDiff;
				}
				
				if ( height > glyph.settings.minHeight ){
					glyph.height = height;
					glyph.top = onStart.top - yDiff;
				}
			};
				
			$(document.body).mousemove( onMove );
			$(document.body).mouseup( onMouseup );
			$(document.body).mouseout( onMouseout );
		}
	}
});

}( jQuery, this ));
