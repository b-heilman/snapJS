;(function( $, global, undefined ){
bMoor.constructor.define({
	name : 'Glyph',
	namespace : ['snap','glyphing','node'],
	parent : ['snap','node','View'],
	node : {
		className : 'glyphing-glyph',
		actions : {
			'mouseenter' : function( event, node ){
				node.$.addClass('glyph-active');
			},
			'mouseleave' : function( event, node ){
				node.$.removeClass('glyph-active');
			}
		}
	},
	properties : {
		defaultTemplate : 'glyphing-glyph-insert',
		_initElement : function( element ){
			element.style.position = 'absolute';

			this.active = false;

			return this['snap.node.View']._initElement.call( this, element );
		},
		_initModel : function(){
			var model = this['snap.node.View']._initModel.call( this );

			model.gap = {
				left : parseInt( this.$.css('padding-left'), 10 ) + parseInt( this.$.css('border-left-width'), 10 ),
				top  : parseInt( this.$.css('padding-top'), 10 ) + parseInt( this.$.css('border-top-width'), 10 )
			};

			return model;
		},
		_onAlteration : function( model, alterations ){
			if ( model.remove ){
				this.$.remove();
			}else if ( this.active !== model.active ){
				if ( model.active ){
					this.$.addClass('active-glyph');
				}else{
					this.$.removeClass('active-glyph');
				}
					
				this.active = model.active;
			}
			
			this.draw();
		},
		// glyph info
		isGlyph : true,
		draw : function(){
			var
				model = this.observer.model,
				rotate = 'rotate('+model.angle+'deg)';
				
			this.$.css( {
				top     : (model.top - model.gap.top)+'px',
				left    : (model.left - model.gap.left)+'px',
				width   : model.width+'px',
				height  : model.height+'px',
				opacity : model.opacity,
				'-webkit-transform' : rotate,
				'-moz-transform'    : rotate,
				'-ms-transform'     : rotate,
				'transform'         : rotate
			});
			
			return this;
		}
	}
});

bMoor.setTemplate( 'glyphing-glyph-insert', function(){/*
<div style="width: 100%; height: 100%; border: 1px solid red;"></div>
*/});

}( jQuery, this ));
