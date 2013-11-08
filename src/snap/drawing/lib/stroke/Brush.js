;(function( global, undefined ){

/**
The stroke to be used with a sketch that will allow for cleaning an area

@class Erase 
@namespace snap.drawing.lib.stroke
@constructor
**/
bMoor.constructor.define({
	name : 'Brush',
	namespace : ['snap','drawing','lib','stroke'],
	construct : function( ctx, settings ){
		this.ctx = ctx;
		
		ctx.lineCap( 'round' );
		ctx.strokeStyle( settings.color );
		ctx.lineWidth( settings.width );
	},
	properties : {
		/**
		Begin the drawing of a path

		@method start
		@param {Integer} x The x coordinate of the area to clear
		@param {Integer} y The y coordinate of the area to clear
		**/
		start : function( x, y ){
			this.ctx.moveTo( x, y );

			this.ctx.beginPath();
		},
		/**
		Continue the drawing of a path

		@method move
		@param {Integer} x The x coordinate of the area to clear
		@param {Integer} y The y coordinate of the area to clear
		**/
		move : function( x, y ){
			this.ctx.lineTo( x, y );
			this.ctx.stroke();
		},
		/**
		End the drawing of a path

		@method end
		@param {Integer} x The x coordinate of the area to clear
		@param {Integer} y The y coordinate of the area to clear
		**/
		end : function( x, y ){
			this.ctx.lineTo( x, y );
			this.ctx.stroke();
		
			this.ctx.closePath();
		}
	}
});

}( this ));