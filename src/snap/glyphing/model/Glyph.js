;(function( $, global, undefined ){
bMoor.constructor.define({
	name : 'Glyph',
	namespace : ['snap','glyphing','model'],
	statics : {
		minWidth  : 20,
		minHeight : 20
	},
	construct : function( list, box, centerLeft, centerTop, width, height ){
		var settings = this.__static;

		this.settings = settings;

		this.parentList = list;
		this.box = box;
		this.active = false;

		this.width = width || settings.minWidth;
		
		this.left = centerLeft - this.width / 2;
		this.height = height || settings.minHeight;
		this.top = centerTop - this.height / 2;
		this.angle = 0;
		this.opacity = 1;

		this.instanceClass = 'snap.glyphing.node.Glyph';
	},
	properties : {
		activate : function(){
			this.parentList.activate( this );
		},
		deactivate : function(){
			this.parentList.deactivate( this );
		},
		toJson : function(){
			return JSON.stringify( this.toObject() );
		},
		toObject : function(){
			return {
				top     : this.top,
				left    : this.left,
				height  : this.height,
				width   : this.width,
				opacity : this.opacity,
				angle   : this.angle
			};
		}
	}
});
}( jQuery, this ));
