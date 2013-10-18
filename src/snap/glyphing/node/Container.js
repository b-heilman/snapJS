;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Container',
	namespace : ['snap','glyphing','node'],
	parent : ['snap','node','List'],
	require: [
		['bmoor','lib','MouseTracker'],
		['snap','glyphing','model','Glyph'],
		['snap','observer','Collection']
	],
	node : {
		className : 'glyphing-container',
		helpers : {
			lastPosition : bmoor.lib.mouseTracker,
			activeModel : null,
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
		},
		globals : {
			'keydown' : function( event, $instances, helpers ){
				console.log( event.keyCode );
				if( !($(event.target).is(':input') ) ){
					if ( (event.keyCode == 8 || event.keyCode == 46) ){
						// delete : esc / delete
						$instances.each(function(){
							var 
								dis = this.node,
								model = dis.observer.model;
							
							if ( !model.locked && model.active ){
								dis.observer.model.active.$remove = true;
								dis.observer.model.deactivate();
							}
						});
						
						event.stopPropagation();
						event.preventDefault();
					}else if ( event.keyCode == 16 ){
						// next : shift
						$instances.each(function(){    
							var 
								dis = this.node,
								model = dis.observer.model;
							
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
						});
						
						event.stopPropagation();
						event.preventDefault();
					}else if ( event.keyCode == 27 ){
						$instances.each(function(){
							dis.observer.model.active = null;
						});
						
						event.stopPropagation();
						event.preventDefault();
					}
				}
			}
		},
		actions : {
			'mousedown' : {
				'.glyphing-glyph' : function( event, node ){
					this.node.observer.model.activate();
					
					event.stopPropagation();
					event.preventDefault();
				},
				'' : function( event, node, helpers ){
					var 
						model = node.observer.model,
						offset = node.$.offset(),
						glyph = node._makeGlyph(
							model.box,
							helpers.lastPosition.x - offset.left,
							helpers.lastPosition.y - offset.top
						);

					if ( !model.locked ){
						model.unshift( glyph );
						glyph.activate();
						
						helpers.creationDrag( glyph );
					}

					event.stopPropagation();
					event.preventDefault();
				}
			}
		}
	},
	statics : {
		settings : {
			keepBoxed : true
		},
		glyphSettings : {

		}
	},
	properties : {
		defaultTemplate : 'glyphing-container-insert',
        _initModel : function( parentModel ){
			var 
				offset,
				model = this['snap.node.List']._initModel.call( this, parentModel ),
				$img = this.$.find('img'),
				$target = $img.length ? $img : this.$,
				dis = this,
				baseSettings = {};
			
			model.settings = $.extend( true, {}, this.__static.settings, 
				this._getAttribute(
					'settings', {}, function(val){ return dis._decode(val); }
				)
			);
				
			model.glyphSettings = $.extend( true, {}, this.__static.glyphSettings, 
				this._getAttribute(
					'glyphSettings', {}, function(val){ return dis._decode(val); }
				)
			);

			model.locked = true;

			this.$.css({
				position : 'relative',
				width    : $target.innerWidth(),
				height   : $target.innerHeight()
			});
			
			if ( model.settings.keepBoxed ){
				offset = this.$.offset();
				
				model.box = {
					top    : offset.top,
					right  : offset.left + this.$.width(),
					bottom : offset.top + this.$.height(),
					left   : offset.left
				};
			}else{
				model.box = null;
			}

			return model;
		},
		_makeGlyph : function( box, leftCenter, topCenter ){
			return new snap.glyphing.model.Glyph( 
				this.observer.model, 
				this.observer.model.box, 
				leftCenter, topCenter 
			);
		},
		lock : function(){
			this.$.removeClass( 'unlocked' );
			this.observer.model.locked = true;
			
			return this;
		},
		unlock : function(){
			this.$.addClass( 'unlocked' );
			this.observer.model.locked = false;
			
			return this;
		},
		toJson : function(){
			return JSON.stringify( this.toObject() );
		},
		toObject : function(){
			var
				model = this.observer.model,
				temp = [];
				
			for( var i = 0; i < model.length; i++ ){
				temp[i] = this.model[i].toObject();
			}
			
			return temp;
		}
	}
});

bMoor.setTemplate( 'glyphing-container-insert', function(){/*
<div snap-node="<#= this.instanceClass #>"></div>
*/});

}( jQuery, this ));
