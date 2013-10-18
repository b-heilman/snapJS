;(function( $, global, undefined ){

bMoor.constructor.mutate({
	name : 'JQote',
	namespace : ['snap','templating'],
	require : {
		references : { 'jQuery.fn.jqote' : ['jquery','jqote2'] }
	},
	module : 'Templator',
	decorators : [
		[ 'snap','templating','Decorator' ]
	],
	construct : function(){
		$.jqotetag( bMoor.settings.templatorTag );
	},
	properties : {
		get : function( content, data ){
			return this.run( this.prepare(content), data );
		},
		prepare : function( content ){
			var type = typeof( content );
			console.log( '->', content );
			if ( type == 'string' ){
				return $.jqotec( content );
			}else if ( type == 'function' ){
				// TODO : more tests, but for now assume function is a template
				return content;
			}
		},
		run : function( prepared, data ){
			return $.jqote( prepared, data );
		}
	}
}, true);

}( jQuery, this ));