;(function( global, undefined ){

/**
The stroke to be used with a sketch that will allow for cleaning an area

@class Erase 
@namespace snap.drawing.lib.stroke
@constructor
**/
bMoor.constructor.define({
	name : 'Erase',
	namespace : ['snap','drawing','lib','stroke'],
	construct : function( ctx, settings ){
		this.ctx = ctx;
		this.width = settings.width;
		this.offset = this.width / 2;
	},
	properties : {
		/**
		Begin the cleaing of a path

		@method start
		@param {Integer} x The x coordinate of the area to clear
		@param {Integer} y The y coordinate of the area to clear
		**/
		start : function( x, y ){
			this._clear( x, y );
		},
		/**
		Move along the cleaing of a path

		@method move
		@param {Integer} x The x coordinate of the area to clear
		@param {Integer} y The y coordinate of the area to clear
		**/
		move : function( x, y ){
			this._clear( x, y );
		},
		/**
		End the cleaing of a path

		@method end
		@param {Integer} x The x coordinate of the area to clear
		@param {Integer} y The y coordinate of the area to clear
		**/
		end : function( x, y ){
			this._clear( x, y );
		},
		/**
		Clears a block of the context

		@method _clear
		@param {Integer} x The x coordinate of the area to clear
		@param {Integer} y The y coordinate of the area to clear
		**/
		_clear : function( x, y ){
			this.ctx.clearRect( x - this.offset, y - this.offset, this.width, this.width );
		}
	}
});

}( this ));