;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Container',
	namespace : ['snap','glyphing','node'],
	parent : ['snap','node','List'],
	require: [
		['bmoor','lib','MouseTracker'],
		['snap','glyphing','model','Glyph'],
		['snap','observer','Collection'],
		['snap','glyphing','controller','Container']
	],
	statics : {
		settings : {
			keepBoxed : true
		},
		glyphSettings : {}
	},
	properties : {
		defaultTemplate : 'default',
		defaultController : ['snap','glyphing','controller','Container'],
		templates : {
			'default' : function(){/*
<div snap-node="<#= this.instanceClass #>"></div>
			*/}
		},
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

				console.log( model.box );
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

}( jQuery, this ));
