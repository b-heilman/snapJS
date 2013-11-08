;(function( $, global, undefined ){

/**
The node that allows for the user to draw

@class Sketch 
@namespace snap.drawing.node
@constructor
**/
bMoor.constructor.define({
	name : 'Sketch',
	namespace : ['snap','drawing','node'],
	parent : ['snap','node','Basic'],
	require: [
		['bmoor','lib','MouseTracker'],
		['snap','drawing','lib','Context'],
		['snap','drawing','lib','stroke','Brush'],
		['snap','drawing','controller','Sketch']
	],
	properties : {
		/**
		Sets the default controller for the node

		@property defaultController
		@default snap.drawing.controller.Sketch
		**/
		defaultController : ['snap','drawing','controller','Sketch'],
		/**
		Initializes the element for the instance

		@method _initElement
		@param {DOMElement} element The element to be wrapping
		@return {jQuery}
		**/
		_initElement : function( element ){
			var $el;

			if ( element.nodeName != 'CANVAS' ){
				var canvas = document.createElement('canvas');
				
				element.style.position = 'relative';
				canvas.style.position = 'absolute';
				canvas.style.left = '0px';
				canvas.style.top = '0px';
				canvas.style.width = '100%';
				canvas.style.height = '100%';
				
				element.appendChild( canvas );
				element = canvas;
			}
			
			$el = this['snap.node.Basic']._initElement.call( this, element );
			
			this.ctx = new snap.drawing.lib.Context( element, 3 );

			element.style.cssText += '-moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; user-select: none;';
			element.setAttribute('unselectable', 'on');
			element.onselectstart = function() { if (dragging) return false; };

			return $el;
		},
		/**
		Return back the base64 encoding of the sketch

		@method save
		@return {String} The encoding of the image
		**/
		save : function(){
			return this.ctx.toDataURL();
		},
		/**
		Populate the canvas with the image supplied.

		@method load
		@param {String} dataURL URL of the image to load
		@param {Function} cb Callback function to fire after the image is loaded
		**/
		load : function( dataURL, cb ){
			var 
				ctx = this.ctx,
				img = new Image();
			
			img.onload = function(){
				ctx.clear();
				ctx.drawImage(this, 0, 0);
				
				if ( cb ){
					cb();
				}
			};
			
			img.src = dataURL;
		},
		/**
		Force a resizing calculation of the sketch

		@method resize
		**/
		resize : function(){
			this.ctx.calcSize();
		}
	}
});
}( jQuery, this ));
