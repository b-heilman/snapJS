/*! bmoor 2013-10-10 */
!function(a,b,c){"use strict";function d(a){console&&console.log&&(console.log(a),console.trace())}function e(){}function f(){this.args=arguments}function g(){}var h=document.getElementsByTagName("script"),i=h[h.length-1],j={},k={templator:["bmoor","templating","JQote"],templatorTag:"#",jsRoot:i.hasAttribute("root")?i.getAttribute("root"):i.getAttribute("src").match(/^(.*)\/b[Mm]oor(\.min)?\.js/)[1]};String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var l={parse:function(a){return a?"string"==typeof a?a.split("."):a.length?a.slice(0):a:[]},get:function(a,c){var d,e,f=b;if(a&&("string"==typeof a||a.length)){a=this.parse(a),c&&(d=a.length-1,e=a[d],a[d]=e.charAt(0).toLowerCase()+e.slice(1));for(var g=0;g<a.length;g++){var h=a[g];f[h]||(f[h]={}),f=f[h]}}return f},exists:function(a,c){var d,e,f=b;if(a){if("string"==typeof a||a.length){a=this.parse(a),c&&(d=a.length-1,e=a[d],a[d]=e.charAt(0).toLowerCase()+e.slice(1));for(var g=0;g<a.length;g++){var h=a[g];if(!f[h])return null;f=f[h]}return f}return a}return null}},m={requests:0,onReady:[]};!function(){var a={},b={};m.parseResource=function(a){var b=a.match(/^(.*)\/(js|src)/);return b?b[1]:a.match(/^[js|src]/)?null:null},m.reset=function(){b={".":{fullName:!1},">":this.parseResource(k.jsRoot),"/":k.jsRoot,jquery:{"/":k.jsRoot+"/jquery",".":{fullName:!0}}}},m.reset(),m.setRoot=function(a){b["/"]=a,b[">"]=this.parseResource(a)},m.setLibrary=function(a,d,e,f){var g=b,h=l.parse(a);for(e||(e={});h.length;){var i=h.shift();g[i]===c&&(g[i]={}),g=g[i]}g["/"]=d,g["."]=e,g["*"]=f===!0,g[">"]=this.parseResource(d)},m.delLibrary=function(a){for(var c=b,d=null,e=null,f=l.parse(a);f.length&&c;){var g=f.shift();c[g]?(d=c,e=g,c=c[e]):c=null}c&&delete d[e]},m.getLibrary=function(a,c){for(var d=b,e=b,f=l.parse(a),g=c?null:f.pop(),h=f.slice(0);f.length;){var i=f[0];if(!d[i])break;d=d[f.shift()],d["/"]&&(e=d,h=f.slice(0))}return e["*"]?{root:e["/"],path:[],name:g,settings:e["."],resource:e[">"]}:{root:e["/"],path:h,name:g,settings:e["."],resource:e[">"]}},m.loadSpace=function(b,f,g,h,i){function j(){i===c&&(i={}),h===c&&(h=[]),g.apply(i,h)}function k(a){var c=l.exists(b);!c||c instanceof e||c.prototype&&c.prototype.__defining?setTimeout(k,10):g?(clearTimeout(a),j()):clearTimeout(a)}var m;if(b=l.parse(b),"function"==typeof f?(i=h,h=g,g=f,f=b):f||(f=b),m=l.exists(b))m instanceof e?k():j();else{var n=this.getLibrary(f),o=n.root+(n.path.length?"/"+n.path.join("/"):"")+"/"+(n.settings.fullName?f.join("."):n.name),p=function(c){var e,f,g,h=a[o];for(e=setTimeout(function(){l.exists(b)||d("loaded file : "+c+"\n but no class : "+b.join("."))},5e3),f=0,g=h.length;g>f;f++)h[f](e);a[o]=!0};a[o]?a[o].push(k):"boolean"==typeof a[o]?k():(a[o]=[k],bMoor.module.Resource.loadScriptSet(o+".js",o+".min.js",p))}},m.done=function(a){0===this.requests?a():this.onReady.push(a)},m.require=function(a,b,c){function d(){var a,c,d,e,f=[];if(m--,0===m){for(k.requests--,m--,c=0,a=p,d=a?a.length:0;d>c;c++)f.push(l.get(a[c]));if(b.apply({},f),0===k.requests){for(;k.onReady.length;)e=k.onReady.shift(),e();k.onReady=[]}}}var e,f,g,h,i,j,k=this,m=1,n=null,o=null,p=null;for(a.substring?(o=p=[a],n={}):a.length?(o=p=a,n={}):(n=a.references?a.references:{},o=a.classes?a.classes:[],p=a.aliases?a.aliases:[]),this.requests++,i=0,h=o,j=h?h.length:0;j>i;i++)f=l.parse(h[i]),m++,this.loadSpace(f,d);for(g in n)f=l.parse(g),m++,this.loadSpace(f,n[g],d);if(a.scripts&&(m++,bMoor.module.Resource.loadScript(a.scripts,d,c?c+"/js/":"js/")),a.styles)for(g in a.styles)m++,e=a.styles[g],"/"!=e.charAt(0)&&(e=c?c+"/css/"+e:"css/"+e),bMoor.module.Resource.loadStyle(e,d);if(a.templates)for(g in a.templates)m++,e=a.templates[g],"/"!=e.charAt(0)&&(e=c?c+"/template/"+e:"template/"+e),bMoor.module.Resource.loadScript(e,d);d()}}(),function(){function c(a,b,c){var d=typeof c,e=b[a];"function"==d?b[a]=function(){var a,b=this._wrapped;return this._wrapped=e,a=c.apply(this,arguments),this._wrapped=b,a}:"string"==d&&(b[a]+=" "+c)}function d(a,c,d){var e=c.parent?l.get(c.parent):null,f=c.namespace?l.parse(c.namespace):[],g=c.namespace?l.get(f):b;if(e&&(e.prototype.__name||(e.prototype.__name=c.parent),a.extend(d,e),e.prototype.__onDefine))if(c.onDefine){var h=c.onDefine;c.onDefine=function(a,b,c,d){e.prototype.__onDefine.call(this,a,b,c,d),h.call(this,a,b,c,d)}}else c.onDefine=e.prototype.__onDefine;d.prototype.__construct=c.construct?c.construct:e?e.prototype.__construct:function(){},d.prototype.__defining=!0,g[c.name]=d,f.push(c.name),d.prototype.__class=f.join("."),d.prototype.__name=f.pop(),c.onDefine&&(d.prototype.__onDefine=c.onDefine),c.aliases&&a.alias(d,c.aliases),a.statics(d,c.statics),c.properties&&a.properties(d,c.properties)}var h=[],i=!1,k=0;g.prototype.define=function(c){function g(){var e,f=l.exists(c.parent);if(f&&f.prototype.__defining)setTimeout(g,10);else if(d(j,c,q),c.onDefine&&(e=c.onDefine.apply(q.prototype,[c,p,c.name,q])),e||(e=p[c.name]),c.onReady&&a(document).ready(function(){m.done(function(){c.onReady(e)})}),delete q.prototype.__defining,k--,0===k)for(;h.length;){var i=h.pop();i(a,b)}}var j=this,n=c.require,o=m.getLibrary(c.namespace,!0).resource,p=l.get(l.parse(c.namespace)),q=function(){i||this.__construct.apply(this,arguments[0]instanceof f?arguments[0].args:arguments)};if(k++,!c.name)throw"Need name for class";p[c.name]=new e,n?n.length&&(n={classes:n}):n={},c.parent&&(n.classes?n.classes.push(c.parent):n.classes=[c.parent]),c.aliases&&(n.aliases=c.aliases),m.require(n,g,o)},g.prototype.singleton=function(a){var b=a.onDefine?a.onDefine:function(){};a.onDefine=function(a,c,d,e){var f,g=new e,h=d.charAt(0).toLowerCase()+d.slice(1);return c[h]=g,b.apply(this,[a,c,d,e,g]),a.module&&(f=a.module,f=f.charAt(0).toUpperCase()+f.slice(1).toLowerCase(),j[f]=g),g},this.define(a)},g.prototype.factory=function(a){var b=a.onDefine?a.onDefine:function(){};a.onDefine=function(a,c,d,e){var f={},g=function(){return Array.prototype.push.call(arguments,e),a.factory.apply(f,arguments)};c[d.charAt(0).toLowerCase()+d.slice(1)]=g,b.apply(this,arguments)},this.define(a)},g.prototype.decorator=function(a){var b,d;a.properties||(a.properties={}),b=a.properties._decorate,d=a.construct,delete a.properties._decorate,delete a.construct,a.properties._decorate=function(a,e){var f;d&&(e?c("__construct",a,function(){this._wrapped&&this._wrapped.apply(this,arguments),d.apply(this,arguments)}):d.apply(a));for(f in this)"__construct"!==f&&"_decorate"!==f&&(a[f]?c(f,a,this[f]):a[f]=this[f]);return b&&b.call(a),a},this.singleton(a)},g.prototype.mutate=function(a,b){var c,d,e=a.onDefine?a.onDefine:function(){};if(a.decorators){for(d="string"==typeof a.decorators?d.split(","):a.decorators,a.require?a.require.length&&(a.require={classes:a.require}):a.require={},a.require.classes||(a.require.classes=[]),c=0;c<d.length;c++)a.require.classes.push(d[c]);a.onDefine=function(a,b,c,f){var g,h,i;for(e.apply(this,[a,b,c,f]),g=0,i=d,h=i.length;h>g;g++)l.get(i[g],!0)._decorate(this,!0);for(g in a.noOverride)this[g]=a.noOverride[g]}}b?this.singleton(a):this.define(a)},g.prototype.properties=function(a,b){for(var c in b)a.prototype[c]=b[c]},g.prototype.statics=function(b,c){b.prototype.__static?(b.prototype.__static={},a.extend(b.prototype.__static,c)):b.prototype.__static=c?c:{}},g.prototype.alias=function(a,b){for(var c in b){var d=b[c];a.prototype["__"+d]=l.get(c).prototype}},g.prototype.extend=function(a,b){i=!0,a.prototype=new b,a.prototype.constructor=a,a.prototype[b.prototype.__class]=b.prototype,i=!1},g.prototype.loaded=function(c){k?h.push(c):c(a,b)}}(),b.bMoor={module:j,setTemplate:function(a,b){this.templates[a]=b},templates:{},require:function(){m.require.apply(m,arguments)},get:function(a,b){return l.exists(a,b)},settings:k,autoload:m,constructor:new g},function(){var b={};bMoor.constructor.singleton({name:"Resource",namespace:["bmoor","lib"],module:"Resource",onReady:function(a){var b,c=document.getElementsByTagName("script");bMoor.setTemplate=function(b,c){a.setTemplate(b,c)};for(b in bMoor.templates)a.setTemplate(b,bMoor.templates[b]);for(var d=0,e=c.length;e>d;d++){var f=c[d];f.id&&(f.src&&(a.__static.loadedScripts[f.src]=f.id),"text/html"==f.getAttribute("type")&&a.setTemplate(f.id,f.innerHTML))}},statics:{loadedScripts:{}},properties:{loadScriptSet:function(){var b=Array.prototype.slice.call(arguments,0),c=b.pop(),e=b.shift(),f=e,g=function(){a.getScript(e).done(c).fail(function(a,c,h){b.length?(e=b.shift(),g()):d("failed to load file : "+f+"\nError : "+h)})};g()},loadScript:function(b,c,e){var f,g=this;"string"==typeof b&&(b=[b]),f=(e||"")+b.shift(),a.getScript(f).done(function(){b.length?g.loadScript(b,c,e):c()}).fail(function(a,b,c){d("failed to load file : "+f+"\nError : "+c)})},loadStyle:function(b,c){var d,e,f,g=null;e=document.createElement("link"),e.setAttribute("href",b),e.setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.sheet?(f="sheet",d="cssRules",g=setInterval(function(){try{e[f]&&e[f][d]&&e[f][d].length&&(clearInterval(g),c())}catch(a){}},10)):a(e).bind("load",c),a("head").append(e)},loadImage:function(b,c){var d=new Image;"#"==b[0]&&(b=a(b)[0].src),d.onload=c,d.src=b},loadTemplate:function(d,e,f){var g,h=null,i=bMoor.templates;if(f===c&&"string"!=typeof e&&(f=e,e=null),"#"===d[0]&&(d=d.substring(1)),!i[d])if(b[e]){var j=loadedScript[e];i[j]?i[d]=i[j]:this.setTemplate(d,document.getElementById(j).innerHTML)}else if(null!==(g=document.getElementById(d)))this.setTemplate(d,g.innerHTML);else{if(null===e)throw"loadTemplate : "+d+" requested, and not found, while src is null";h=this,a.ajax(e,{success:function(a){h.setTemplate(a),f(i[d])}})}if(null===h){if(!f)return i[d];f(i[d])}return null},setTemplate:function(a,b){var c=bMoor.templates;switch(typeof b){case"string":c[a]=b.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]/g,"");break;case"function":c[a]=b.toString().split(/\n/).slice(1,-1).join("\n")}}}},!0)}()}(jQuery,this),function(){bMoor.constructor.singleton({name:"Bouncer",namespace:["bmoor","lib"],module:"Schedule",construct:function(){this._stack=[],this._done=[],this._pauseAfter=null,this._lock=!1},properties:{runPause:30,runWindow:300,_setTime:function(){this._pauseAfter=(new Date).getTime()+this.runWindow},add:function(a){this._stack.push(a)},done:function(a){this._done.push(a)},_run:function(){if(this._lock=!1,this._stack.length)this.run();else if(this._done.length){for(;this._done.length;)this.add(this._done.shift());this.run()}else this._pauseAfter=null},run:function(){var a,b=this;this._stack.length&&!this._lock?(this._lock=!0,a=this._stack.shift(),0===this.runWindow?(a(),this._run()):(null===this._pauseAfter&&this._setTime(),a(),(new Date).getTime()>this._pauseAfter?setTimeout(function(){b._pauseAfter=null,b._run()},this.runPause):this._run())):this._run()}}})}(jQuery,this),function(){bMoor.constructor.singleton({name:"KeyboardTracker",namespace:["bmoor","lib"],onReady:function(a){$(document.body).on("keydown",function(b){a.activeKeys[b.which]=!0}),$(document.body).on("keyup",function(b){delete a.activeKeys[b.which]})},properties:{activeKeys:{},isDown:function(a){return this.activeKeys[a]}}})}(this),function(){bMoor.constructor.singleton({name:"MouseTracker",namespace:["bmoor","lib"],onReady:function(a){$(document.body).on("mousemove",function(b){a.x=b.pageX,a.y=b.pageY})}})}(this),function(){bMoor.constructor.singleton({name:"WaitFor",namespace:["bmoor","lib"],construct:function(){},require:{references:{"bMoor.module.Resource":["bmoor","lib","Resource"]}},module:"Wait",properties:{_waiting:0,_done:[],_return:function(){var a;for(this._waiting--;this._done.length&&this._waiting<1;)a=this._done.pop(),a()},done:function(a){this._waiting<1?a():this._done.unshift(a)},require:function(a,b){var c=this;return this._waiting++,bMoor.autoload.require(a,function(){b&&b(),c._return()}),this},loadScript:function(a,b){var c=this;return this._waiting++,bMoor.module.Resource.loadScript(a,function(){b&&b(),c._return()}),this},loadStyle:function(a,b){var c=this;return this.waiting++,bMoor.module.Resource.loadStyle(a,function(){b&&b(),c._return()}),this},loadImage:function(a,b){var c=this;return this._waiting++,bMoor.module.Resource.loadImage(a,function(){b&&b(),c._return()}),this},loadTemplate:function(a,b,c){var d=this;return this._waiting++,bMoor.module.Resource.loadTemplate(a,b,function(){c&&c(),d._return()}),this}}})}(jQuery,this);;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Abstract',
	namespace : ['snap','model'],
	construct : function( data ){
		this._initModel( data );
		this._initDefaults();
	},
	properties : {
		toObject : function(){
			var 
				key,
				rtn = {};

			for( key in this ) {
				if ( this.hasOwnProperty(key) && typeof(this[key]) != 'function' ){
					rtn[key] = this[key];
				}
			}

			return rtn;
		},
		toJson : function(){
			return JSON.stringify( this.toObject() );
		},
		set : function( key, val ){
			if ( this._validations[key] ){
				if ( this._validations[key](val) ){
					this[key] = val;
				}
			}else{
				this[key] = val;
			}
		},
		_validations : {},
		_initModel : function( data ){
			var key;

			for( key in data ) if ( data.hasOwnProperty(key) ){
				this.set( key, data[key] );
			}

		},
		_initDefaults : function(){
			var 
				key,
				defaults = this._defaults;

			for( key in defaults ){
				if( !this[key] ){
					this.set( key, defaults[key] );
				}
			}
		},
		_defaults : {}
	}
});

}( jQuery, this ));
;;(function( global, undefined ){
	var snapid = 0;

	bMoor.constructor.define({
		name : 'Map',
		namespace : ['snap','observer'],
		// this will use the observer pattern to allow element to bind to a model
		construct : function( model ){
			this.snapid = snapid++;
			this.cleaned = {};
			this.listeners = [];
			this.interval = null;
			this.root = this;
			
			this.init( model );
		},
		properties : {
			init : function( model ){
				this.spy( model );
				model._ = this;
			},
			spy : function( model ){
				if ( this.model && this.model._ == this ){
					delete this.model._;
				}

				this.model = model;

				if ( !this.interval ){
					this.start();
				}else{
					this.flush( {modelSwitch:true} );
				}
			},
			simplify : function(){
				var 
					key,
					model = this.model,
					simple = {};

				// TODO : what about models inside of models?
				for( key in model ) if ( model.hasOwnProperty(key) && key[0] != '_' && key[0] != '$' ){
					val = model[ key ];

					if ( typeof(val) == 'function' ){
						val = model[ key ]();
					}

					simple[ key ] = val;
				}

				return simple;
			},
			isEmpty : function(){
				var 
					model = this.model,
					key;

				for( key in model ) if ( model.hasOwnProperty(key) && key[0] != '_' && key[0] != '$' ){
					return false;
				}

				return true;
			},
			start : function( interval ){
				var 
					dis = this,
					val;
				
				if ( !this.interval ){
					this._clean();
					
					this.flush( {start:true} );

					this.interval = setInterval( function(){ dis.flush( {} ); }, interval || 50 );
				}
				
				return this;
			},
			stop : function(){
				clearInterval( this.interval );
				this.interval = null;
				
				this.flush( {stop:true} );

				return this;
			},
			flush : function( settings ){
				var 
					changes,
					key;

				changes = this._clean();

				if ( this._needNotify(changes) ){
					for( key in settings ){
						changes[ key ] = settings[ key ];
					}
					
					this._notify( changes );
				}
			},
			bind : function( func, noFlush ){
				this.listeners.push( func );
				
				// if we are running, then we should make a call back
				if ( !noFlush ){
					this._onBind( func );
				}
				
				return this;
			},
			_cleanse : function(){
				return this.model;
			},
			_clean : function(){
				var
					list,
					i,
					c,
					val,
					model = this._cleanse(),
					changes = {},
					cleaned = this.cleaned;
				
				for( var key in model ) if ( model.hasOwnProperty(key) && key[0] != '_' ){
					val = model[key];

					if ( typeof(val) == 'function' ){
						continue;
					}else{
						// TODO : how do I detect deletion?
						if ( val !== cleaned[key] ){
							changes[ key ] = true;

							if ( val === undefined ){
								delete cleaned[ key ];
							}else{
								cleaned[ key ] = val;
							}
						}
					}
				}

				return changes;
			},
			_needNotify : function( changes ){
				return !$.isEmptyObject( changes );
			},
			run : function( func, changes ){
				func.call( this, changes );
			},
			_notify : function( changes ){
				var
					list,
					i,
					c;
				
				for( i = 0, list = this.listeners, c = list.length; i < c; i++ ){ 
					this.run( list[i], changes );
				}

				return this;
			},
			_onBind : function( func ){
				this.run( func, {binding:true} );
			}
		}
	});
}( this ));
;;(function( global, undefined ){
	// TODO : allow traits, so I can pull in functionality from Model.js
	bMoor.constructor.mutate({
		name : 'Collection',
		namespace : ['snap','observer'],
		parent: ['snap','observer','Map'],
		construct : function( model ){
			var 
				dis = this;

			this['snap.observer.Map'].__construct.call( this, model );

			this.removals = [];

			// TODO : is this the best way to do this?
			model.remove = function( obj ){
				var index = this.find( obj );
				
				if ( index != -1 ){
					this.splice( index, 1 );
				}
			};

			model.find = function( obj, fromIndex ){
				var 
					i, 
					j;

				if ( this.indexOf ){
					return this.indexOf( obj, fromIndex );
				}else{
					if (fromIndex === null) {
						fromIndex = 0;
					} else if (fromIndex < 0) {
						fromIndex = Math.max(0, this.length + fromIndex);
					}

					for ( i = fromIndex, j = this.length; i < j; i++ ) {
						if (this[i] === obj)
							return i;
					}

					return -1;
				}
			};

			// keeping the removals for the next clean cycle
			model.pop = function(){
				dis.removals.push( Array.prototype.pop.call(this) );
			};

			model.shift = function(){
				dis.removals.push( Array.prototype.shift.call(this) );
			};

			model.splice = function(){
				dis.removals = dis.removals.concat( Array.prototype.splice.apply(this, arguments) );
			};
		},
		properties : {
			_clean : function(){
				var
					i,
					val,
					key,
					list,
					model = this.model,
					changes = {},
					cleaned = this.cleaned,
					removals,
					moves = {};

				for( key in model ) if ( model.hasOwnProperty(key) && key[0] != '_' ){
					val = model[key];
					
					if ( typeof(val) == 'function' ){
						continue;
					} else {
						i = parseInt( key, 10 );

						if ( isNaN(i) ){
							if ( val != cleaned[key] ){
								changes[ key ] = true;
								cleaned[ key ] = val;
							}
						} else {
							// TODO : do i really want to do this?
							if ( !val._ ){
								new snap.observer.Map( val );
							}

							if ( val.$remove ){
								// allow for a model to force its own removal
								this.model.splice( i, 1 );
							}else if ( val._.index === undefined ){
								// new row added
								moves[ key ] = val;
							}else if ( val._.index != i ){
								moves[ key ] = val;
							}
							
							val._.index = i;
						}
					}
				}

				changes.removals = this.removals;
				changes.moves = moves;

				this.removals = [];

				return changes;
			},
			_needNotify : function( changes ){
				var key;

				for( key in changes ) if ( changes.hasOwnProperty(key) ){
					if ( key == 'removals' ){
						if ( changes.removals.length ){
							return true;
						}
					}else if ( key == 'moves' ){
						if ( !$.isEmptyObject(changes.moves) ){
							return true;
						}
					}else{
						return true;
					}
				}

				return false;
			},
			_onBind : function( func ){
				// TODO : maybe change the list to play nice with the binding setting
				this.run( func, {binding:true, moves:this.model} );
			},
			run : function( func, changes ){
				func.call( this, changes );
			},
		}
	});
}( this ));
;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Core',
	namespace : ['snap'],
	require : {
		classes : [ 
			['snap','observer','Map'],
			['snap','observer','Collection']
		]
	},
	properties : {
		getModel : function(){
			if ( this.observer ){
				return this.observer.model;
			}else return null;
		},
		__warn : function( warning ){
			this__log( 'warn', warning );
		},
		__error : function( error ){
			this.__log( 'error', error );
			throw error;
		},
		__log : function(){
			Array.prototype.unshift.call( arguments, this.__class + ' -> ' );
			console.log.apply( console, arguments );
		},
		_initElement : function( element ){
			this.element = element;
		},
		_initModel : function(){
			var observer = this._findObserver();

			return  observer ? observer.model : global;
		},
		_observe : function( model ){
			var observer = null;

			if ( model ){
				if ( model._ ){
					observer = model._;
				}else{
					if ( model.length === undefined ){
						observer = new snap.observer.Map( model );
					}else{
						observer = new snap.observer.Collection( model );
					}
				}
			}

			return observer;
		},
		_parseAttributes : function( attributes ){
			this._attributes = attributes;
		},
		_unwrapVar : function( context, variable, smart ){
			var 
				scope,
				value = context,
				test = typeof(variable) == 'string' ? variable.split('.') : variable,
				i,
				c;

			if ( smart ){
				for( i = 0, c = test.length; i < c; i++ ){
					if ( value[test[i]] !== undefined ){
						scope = value;
						variable = test[i];
						value = value[ variable ];
					}else return undefined;
				}

				return {
					scope : scope,
					value : value,
					variable : variable
				};
			}else{
				for( i = 0, c = test.length; i < c; i++ ){
					if ( value[test[i]] !== undefined ){
						value = value[ test[i] ];
					}else return undefined;
				}

				return value;
			}
		},
		_getAttribute : function( attribute, otherwise, adjustment ){
			var attr;
			
			if ( this._attributes && this._attributes[attribute] ){
				attr = this._attributes[attribute];
			}else{
				attribute = 'snap-'+attribute;
				
				if ( this.element.hasAttribute && this.element.hasAttribute(attribute) ){
					attr = this.element.getAttribute( attribute );
				}else return otherwise;
			}
			
			return adjustment ? adjustment( attr ) : attr;
		},
		_findElementWithProperty : function( property, element ){
			var el = element || this.element;

			if ( el ){
				if ( !el.hasAttribute ){
					el = el[ 0 ];
				}

				while( el.tagName != 'HTML' ){
					if ( el[property] ){ 
						return el; 
					}
					el = el.parentNode;
				}
			}

			return null;
		},
		_findProperty : function( property, element ){
			var node = this._findElementWithProperty( property, element );

			return node ? node[ property ] : null;
		},
		_findRoot : function( element ){
			return this._findProperty( 'root', element );
		},
		_setRoot : function( controller ){
			if ( !controller ){
				controller = this.root;
			}
			
			this.element.root = controller;
		},
		_findObserver : function( element ){
			return this._findProperty( 'observer', element );
		},
		_pushObserver : function( element, observer ){
			if ( !element ){
				element = this.element;
			}

			if ( !observer ){
				observer = this.observer;
			}
			
			element.observer = observer;
		},
		_closestNode : function( constructor ){
			var
				element = this.element.parentNode,
				node;

			while( element && node === undefined ){
				if ( element.node && element.node instanceof constructor ){
					node = element.node;
				}

				element = element.parentNode;
			}

			return node;
		},
		_select : function( selector, element ){
			if ( !element ){
				element = this.element;
			}
			
			if ( element.querySelectorAll ){
				return element.querySelectorAll( selector );
			}else{
				return $( element ).find( selector );
			}
		},
		_decodeData : function( variable ) {
			// TODO : prolly inline this
			return this._unwrapVar( this.observer.model, variable );
		},
		// TODO : this should be renamed
		_decode : function( variable ){
			if ( typeof(variable) != 'string' ){
				return variable;
			}else if ( variable[0] == '{' || variable[0] == '[' ){
				return eval( variable );
			}else return eval( 'global.' + variable );
		}
	}
});

}( jQuery, this ));
;;(function( $, global, undefined ){
var installed = false;

bMoor.constructor.singleton({
	name : 'Bootstrap',
	namespace : ['snap','lib'],
	require : {
		references : { 
			'bMoor.module.Wait' : ['bmoor','lib','WaitFor'],
			'bMoor.module.Schedule' : ['bmoor','lib','Bouncer']
		}
	},
	module : 'Bootstrap',
	onReady : function( self ){
		if ( !installed ){
			var builder = self;
			
			bMoor.constructor.loaded(function(){
				installed = true;
				
				builder.check();
			});
		}
	},
	construct: function(){
		this._render.push(function(){
			document.body.className += ' snap-ready';
		});
	},
	properties: {
		_stopped : false,
		_checking : false,
		_booting : 0,
		_render : [],
		_preRender : null,
		preRender : function( cb ){
			this._preRender = cb;
		},
		done : function( id, cb ){
			if ( cb === undefined ){
				cb = id;

				// I don't need to call right away, because it will get cycled and run anyway
				if ( this._booting === 0 ){
					cb();
				}else{
					this._render.push( cb );
				}
			}else{
				if ( this._render[id] === undefined ){
					this._render[id] = [];
				}

				this._render[id].push( cb );
			}
		},
		stop : function(){
			this._stopped = true;
		},
		start : function(){
			this._stopped = false;
			this.check();
		},
		check : function(){
			if ( !this._stopped && !this._checking){
				this._checking = true;
				this.build( document.body );
				this._checking = false;
			}
		},
		_buildNode : function( waiting, element ){
			// context -> model -> scope -> variable
			var
				dis = this,
				create = element.getAttribute('snap-node'),
				requirements = [],
				visages = [];
			
			// up here, so the require loop doesn't become infinite
			element.removeAttribute('snap-node');
			
			if ( element.hasAttribute('snap-visage') ){
				visages = element.getAttribute('snap-visage').split(',');
				requirements = visages.slice(0);
			}

			requirements.push( create );
			 
			return {
				requirements : requirements,
				build : function(){
					var 
						i,
						renders,
						node = bMoor.get( create ),
						el;
					
					if ( !node ){
						throw 'Bootstrap tried to find: '+create;
					}

					try{
						el = new node( element, {}, true );
					}catch ( ex ){
						throw 'Bootstrap tried to create: '+create;
					}

					for( i = 0; i < visages.length; i++ ){
						bMoor.get( visages[i], true )._decorate( el );
					}
					
					el.init();
					
					if ( element.id && dis._render[ element.id ]){
						renders = dis._render[ element.id ];

						for( i = 0; i < renders.length; i++ ){
							renders[i]( el );
						}

						delete dis._render[ element.id ];
					}
				}
			};
		},
		_buildController : function( waiting, element ){
			var
				create = element.getAttribute('snap-controller'),
				args = [],
				requirements = [],
				stints = [],
				pos;
			
			// up here, so the require loop doesn't become infinite
			element.removeAttribute('snap-controller');
			
			if ( element.hasAttribute('snap-stint') ){
				stints = element.getAttribute('snap-stint').split(',');
				requirements = stints.slice(0);
			}

			pos = create.indexOf( '(' );
			// TODO : this is pretty weak
			if ( pos >= 0 ){
				args = create.substring( pos + 1, create.length - 1 ).trim().split(',');
				create = create.substring( 0, pos );
			}

			requirements.push( create );
			
			return {
				requirements : requirements,
				build : function(){
					var 
						i,
						controller = bMoor.get( create ),
						el;

					if ( !controller ){
						throw 'Bootstrap tried to find: '+create;
					}

					try{
						el = new controller( element, {}, args, true );
					}catch (ex) {
						throw 'Bootstrap tried to create: '+create;
					}

					for( i = 0; i < stints.length; i++ ){
						bMoor.get( stints[i], true )._decorate( el );
					}

					el.init();
				}
			};
		},
		build : function( element ){
			var 
				i,
				c,
				dis = this,
				waiting = bMoor.module.Wait,
				schedule = bMoor.module.Schedule,
				res,
				nodes,
				builds = [],
				requirements = [];
			
			// right now I just want DOM elements
			if ( element.hasAttribute ){
				this._booting++;
				
				if ( dis._preRender ){
					dis._preRender();
					dis._preRender = null;
				}

				if ( element.hasAttribute('snap-controller') ){
					res = this._buildController( waiting, element );
					requirements = requirements.concat( res.requirements );
					builds.unshift( res.build );
				}

				for( nodes = this.select(element,'[snap-controller]'), i = 0, c = nodes.length; i < c; i++){
					res = this._buildController( waiting, nodes[i] );
					requirements = requirements.concat( res.requirements );
					builds.unshift( res.build );
				}

				if ( element.hasAttribute('snap-node') ){
					res = this._buildNode( waiting, element );
					requirements = requirements.concat( res.requirements );
					builds.unshift( res.build );
				}


				for( nodes = this.select(element,'[snap-node]'), i = 0, c = nodes.length; i < c; i++){
					res = this._buildNode( waiting, nodes[i] );
					requirements = requirements.concat( res.requirements );
					builds.unshift( res.build );
				}
				
				schedule.done(function(){
					var op;

					while( dis._render.length){
						op = dis._render.shift();
						op();
					}

					dis._booting--;
				});

				waiting.require( requirements );
				waiting.done( function(){
					while( builds.length ){
						schedule.add( builds.pop() );
					}
					
					schedule.run(); 
				});
			}
		},
		select : function( element, selector ){
			if ( element.querySelectorAll ){
				return element.querySelectorAll( selector );
			}else{
				return $(element).find( selector );
			}
		}
	}
});

}( jQuery, this ));
;;(function( global, undefined ){
	bMoor.constructor.factory({
		name : 'Stream',
		namespace : ['snap','lib'],
		require : {
			classes : [ 
				['snap','observer','Map'],
			]
		},
		factory : function( stream, defintion ){
			if ( !this[stream] ){
				this[stream] = new defintion();
			}

			return this[stream];
		},
		construct : function(){
			this._listeners = [];
			this._data = {};
		},
		// TODO : revisit this to simplify the logic...
		properties : {
			// map : my var -> stream var, or a function
			// reverse : stream var -> my var, or a function
			pushing : function( observer, map ){
				var 
					func,
					key,
					dis = this;

				// registers anything going from the observer into the stream
				if ( typeof(map) == 'object' ){
					func = function( alterations ){
						var key;

						for( key in alterations ) if ( alterations.hasOwnProperty(key) ){
							if ( map[key] ) {
								dis.push( map[key], this.model[key] );
							}
						}
					};
				}else if ( map === true ){
					func = function( alterations ){
						var key;

						for( key in alterations ) if ( alterations.hasOwnProperty(key) ){
							dis.push( key, this.model[key] );
						}
					};
				}

				if ( func ){
					observer.bind( func );
					this.push( observer.model );
				}
			},
			pulling : function( observer, map ){
				var 
					key,
					type = typeof(map),
					func;

				// registers anything going from the stream into the observer
				if ( type === 'object' ) {
					func = function( key, val ){
						var field = map[ key ];
						
						if ( field ) {
							observer.model[ field ] = val;
						}
					};
				}else if ( type !== 'function' ) {
					func = function( key, val ){
						observer.model[ key ] = val;
					};
				}else{
					func = map;
				}

				for( key in this._data ){
					console.log( key, this._data[key] );
					func( key, this._data[key] );
				}

				this._listeners.push( func );
			},
			pull : function(){
				var 
					t = {},
					key;

				for( key in this._data ){
					t[ key ] = this._data[ key ];
				}

				return t;
			},
			push : function( key, val ){
				var list, i, c;

				// snap shot of the current state
				this._data[ key ] = val;

				if ( arguments.length == 2 ){
					for( i = 0, list = this._listeners, c = list.length; i < c; i++ ){
						list[i]( key, val );
					}
				}else{
					for( i in key ){
						this.push( i, key[i] );
					}
				}
			}
		}
	});
}( this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Abstract',
	namespace : ['snap','service'],
	require : [
		['snap','model','Abstract']
	],
	construct : function(){
		var instance;

		if ( this.instanceClass !== null && typeof(this.instanceClass) != 'function' ){
			instance = bMoor.get( this.instanceClass );

			if ( !instance ){
				throw this.__class+' could not find '+this.instanceClass;
			}else{
				this.instanceClass = instance;
			}
		}
	},
	properties : {
		instanceClass : null,
		parseService : function( url ){
			// make a url like www.something.com/:group/:id dynamic
			return new Function( 'model', 
				'return "' + url.replace( /:([^\/?&]+)/g, '"+model.$1+"' ) + '";' 
			);
		},
		_get : function(){
			return [];
		},
		get : function(){
			var 
				i,
				c,
				instanceClass = this.instanceClass,
				data;

			if ( !this.data ){
				data = this._get();

				if ( instanceClass ){
					for( i = 0, c = data.length; i < c; i++ ){
						data[i] = new instanceClass( data[i] );
					}
				}

			this.data = data;
			}

			return this.data;
		},
		push : function( data ){
			var
				instanceClass = this.instanceClass;

			if ( instanceClass ){
				this.data.push( new instanceClass(data) );
			}else{
				this.data.push( data );
			}
		},
		wrap : function( data ){
			var
				instanceClass = this.instanceClass;

			if ( instanceClass ){
				return new instanceClass( data );
			}else{
				return data;
			}
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Decorator',
	namespace : ['snap','templating'],
	require : {
		references : { 'bMoor.module.Resource' : ['bmoor','lib','Resource'] }
	},
	properties : {
		prepared : {},
		get : function( id, data, raw ){
			return this.run( this.prepare(id,raw), data );
		},
		prepare : function( id, raw ){
			if ( raw ){
				return this._wrapped( id );
			}else{
				if ( !this.prepared[id] ){
					this.prepared[id] = this._wrapped( bMoor.module.Resource.loadTemplate(id) );
				}

				return this.prepared[id];
			}
		}
	}
});

}( jQuery, this ));;/*
* jQote2 - client-side Javascript templating engine
* Copyright (C) 2010, aefxx
* http://aefxx.com/
*
* Dual licensed under the WTFPL v2 or MIT (X11) licenses
* WTFPL v2 Copyright (C) 2004, Sam Hocevar
*
* Date: Fri, May 4th, 2012
* Version: 0.9.8
* ---------
* TODO : I am using this library so I don't write anything new, just a stop gap
*/
;(function($) {
    var JQOTE2_TMPL_UNDEF_ERROR = 'UndefinedTemplateError',
        JQOTE2_TMPL_COMP_ERROR = 'TemplateCompilationError',
        JQOTE2_TMPL_EXEC_ERROR = 'TemplateExecutionError';

    var ARR = '[object Array]',
        STR = '[object String]',
        FUNC = '[object Function]';

    var n = 1, tag = '%',
        qreg = /^[^<]*(<[\w\W]+>)[^>]*$/,
        type_of = Object.prototype.toString;

    function raise(error, ext) {
        throw ($.extend(error, ext), error);
    }

    function dotted_ns(fn) {
        var ns = [];

        if ( type_of.call(fn) !== ARR ) return false;

        for ( var i=0,l=fn.length; i < l; i++ )
            ns[i] = fn[i].jqote_id;

        return ns.length ?
            ns.sort().join('.').replace(/(\b\d+\b)\.(?:\1(\.|$))+/g, '$1$2') : false;
    }

    function lambda(tmpl, t) {
        var f, fn = [], t = t || tag,
            type = type_of.call(tmpl);

        if ( type === FUNC )
            return tmpl.jqote_id ? [tmpl] : false;

        if ( type !== ARR )
            return [$.jqotec(tmpl, t)];

        if ( type === ARR )
            for ( var i=0,l=tmpl.length; i < l; i++ )
                if ( f = lambda(tmpl[i], t) ) fn.push(f[0]);

        return fn.length ? fn : false;
    }

    $.fn.extend({
        jqote: function(data, t) {
            var dom = '';

            this.each(function(i) {
                var fn = $.jqotec(this, t);

                dom += fn.call(data, i, 0, data, fn);
            });

            return dom;
        }
    });

    $.each({app: 'append', pre: 'prepend', sub: 'html'}, function(name, method) {
        $.fn['jqote'+name] = function(elem, data, t) {
            var ns, regexp, str = $.jqote(elem, data, t),
                $$ = !qreg.test(str) ?
                    function(str) {return $(document.createTextNode(str));} : $;

            if ( !!(ns = dotted_ns(lambda(elem))) )
                regexp = new RegExp('(^|\\.)'+ns.split('.').join('\\.(.*)?')+'(\\.|$)');

            return this.each(function() {
                var dom = $$(str);

                $(this)[method](dom);

                ( dom[0].nodeType === 3 ?
                    $(this) : dom ).trigger('jqote.'+name, [dom, regexp]);
            });
        };
    });

    $.extend({
        jqote: function(elem, data, t) {
            var str = '', t = t || tag,
                fn = lambda(elem, t);

            if ( fn === false )
                raise(new Error('Empty or undefined template passed to $.jqote'), {type: JQOTE2_TMPL_UNDEF_ERROR});

            for ( var i=0,l=fn.length; i < l; i++ )
                str += fn[i].call(data, i, 0, data, fn[i]);

            return str;
        },

        jqotec: function(template, t) {
            var cache, elem, tmpl, t = t || tag,
                type = type_of.call(template);

            if ( type === STR && qreg.test(template) ) {
                elem = tmpl = template;

                if ( cache = $.jqotecache[template] ) return cache;
            } else {
                elem = type === STR || template.nodeType ?
                    $(template) : template instanceof jQuery ?
                        template : null;

                if ( !elem[0] || !(tmpl = elem[0].innerHTML) && !(tmpl = elem.text()) )
                    raise(new Error('Empty or undefined template passed to $.jqotec'), {type: JQOTE2_TMPL_UNDEF_ERROR});

                if ( cache = $.jqotecache[$.data(elem[0], 'jqote_id')] ) return cache;
            }

            var str = '', index,
                arr = tmpl.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]/g, '')
                    .split('<'+t).join(t+'>\x1b')
                        .split(t+'>');

            for ( var m=0,l=arr.length; m < l; m++ )
                str += arr[m].charAt(0) !== '\x1b' ?
                    "out+='" + arr[m].replace(/(\\|["'])/g, '\\$1') + "'" : (arr[m].charAt(1) === '=' ?
                        ';out+=(' + arr[m].substr(2) + ');' : (arr[m].charAt(1) === '!' ?
                            ';out+=$.jqotenc((' + arr[m].substr(2) + '));' : ';' + arr[m].substr(1)));

            str = 'try{' +
                ('var out="";'+str+';return out;')
                    .split("out+='';").join('')
                        .split('var out="";out+=').join('var out=') +
                '}catch(e){e.type="'+JQOTE2_TMPL_EXEC_ERROR+'";e.args=arguments;e.template=arguments.callee.toString();throw e;}';

            try {
                var fn = new Function('i, j, data, fn', str);
            } catch ( e ) { raise(e, {type: JQOTE2_TMPL_COMP_ERROR}); }

            index = elem instanceof jQuery ?
                $.data(elem[0], 'jqote_id', n) : elem;

            return $.jqotecache[index] = (fn.jqote_id = n++, fn);
        },

        jqotefn: function(elem) {
            var type = type_of.call(elem),
                index = type === STR && qreg.test(elem) ?
                    elem : $.data($(elem)[0], 'jqote_id');

            return $.jqotecache[index] || false;
        },

        jqotetag: function(str) {
            if ( type_of.call(str) === STR ) tag = str;
        },

        jqotenc: function(str) {
            return str.toString()
                    .replace(/&(?!\w+;)/g, '&#38;')
                        .split('<').join('&#60;').split('>').join('&#62;')
                            .split('"').join('&#34;').split("'").join('&#39;');
        },

        jqotecache: {}
    });

    $.event.special.jqote = {
        add: function(obj) {
            var ns, handler = obj.handler,
                data = !obj.data ?
                    [] : type_of.call(obj.data) !== ARR ?
                        [obj.data] : obj.data;

            if ( !obj.namespace ) obj.namespace = 'app.pre.sub';
            if ( !data.length || !(ns = dotted_ns(lambda(data))) ) return;

            obj.handler = function(event, dom, regexp) {
                return !regexp || regexp.test(ns) ?
                    handler.apply(this, [event, dom]) : null;
            };
        }
    };
})(jQuery);;;(function( $, global, undefined ){

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
			return $.jqotec( content );
		},
		run : function( prepared, data ){
			return $.jqote( prepared, data );
		}
	}
}, true);

}( jQuery, this ));;;(function( $, global, undefined ){

var nodesCount = 0;

bMoor.constructor.define({
	name : 'Basic',
	namespace : ['snap','node'],
	parent : ['snap','Core'],
	require : {
		classes : [ 
			['snap','observer','Map'],
			['snap','observer','Collection']
		],
		references : { 
			'bMoor.module.Templator' : ['snap','templating','JQote'],
			'bMoor.module.Bootstrap' : ['snap','lib','Bootstrap']
		}
	},
	onDefine : function( settings ){
		var 
			dis = this,
			node;
		
		if ( settings.node ){
			node = settings.node;
			
			if ( node.className ){
				this.className = node.className;
				
				if ( this.baseClass ){
					if ( node.singleClass ){
						this.baseClass = node.className;
					}else{
						this.baseClass = node.className + ' ' + this.baseClass;
					}
				}else{
					this.baseClass = node.className;
				}
			}
			
			$(document).ready(function(){
				var 
					action,
					act,
					className = '.'+dis.className.split(' ')[0], // the primary class should always be on the left
					helpers = node.helpers ? node.helpers : {},
					makeGlobal = function( action, func ){
						// this seems highly inefficient, is there a better way?
						// -> maybe have the contructor build a list of all instances, keep it somewhere?
						$(document.body).on( action, function(event){
							func( event, $(className), helpers );
						});
					},
					// TODO : maybe subselect goes away from here and into the controller?
					makeSplitAction = function( action, subselect, func ){
						if ( subselect === '' ){
							$(document.body).on( action, className, function( event ){
								func.call( this, event, this.node, helpers );
							});
						}else{
							$(document.body).on( action, className+' '+subselect, function( event ){
								func.call( this, event, $(this).closest(className)[0].node, helpers );
							});
						}
					}, 
					makeAction = function( action, func ){
						if ( typeof(func) == 'function' ){
							$(document.body).on( action, className, function( event ){
								func.call( this, event, this.node, helpers );
							});
						}else{
							for( var a in func ){
								makeSplitAction( action, a, func[a] );
							}
						}
					};
				
				// TODO : should prolly just make these an each
				for( action in node.globals ){
					makeGlobal( action, node.globals[action] );
				}
				
				for( action in node.actions ){
					makeAction( action, node.actions[action] );
				}
			});
		}
	},
	node : {
		className : 'node-basic'
	},
	construct : function( element, attributes, delay ){
		this._parseAttributes( attributes );
		
		if ( delay ){
			this.element = element;
		}else{
			this.init( element );
		}
	},
	properties : {
		defaultController : null, // remember to preload this
		init : function( element ){
			this.classBindings = [];
			this.makeClass = null;
			this.observing = false;

			if ( !element ){
				element = this.element;
			}
			this.nodeId = nodesCount++;
			
			this.$ = this._initElement( element );

			if ( !this.$ ){
				throw this.__class+' forgot to return a jQuery object';
			}

			this.$.data( 'node', this ); // TODO : kinda wanna get ride of this?
			element.node = this;

			this.observer = this._observe( this._initModel() );
			
			this._bind();

			this._finalize();
		},
		_initElement : function( element ){
			var 
				dis = this,
				controller,
				attr;

			if ( !element ){
				throw this.__class+' was never passed an element';
			}

			this['snap.Core']._initElement.call( this, element );

			// install a default controller
			// TODO : a better way to do this?
			if ( !element.controller && this.defaultController ){
				controller = bMoor.get( this.defaultController );

				if ( !controller ){
					throw 'defaultController could not be found for node ('
						+ this.__class + ') : ' + this.defaultController;
				}else{
					new controller( element );
				}
			}
			
			attr = this._getAttribute( 'class' );

			if ( attr ){
				element.origClassName = element.className;

				this.makeClass = new Function( 'model', 'return "' 
					+ attr
						.replace( /\{\{([^\?]+)\?([^:]+):([^\}]+)\}\}/g, 
							function( match, arg1, arg2, arg3 ){
								dis.classBindings.push( arg1 );
								return '"+(model.'+arg1+'?"'+arg2+'":"'+arg3+'")+"';
							}
						)
						.replace( /\{\{([^\/?&]+)\}\}/g, function( match, arg1 ){
								dis.classBindings.push( arg1 );
								return '"+model.'+arg1+'+"';
							}
						) 
					+ '";' );
			}else{
				element.className = this.baseClass + ' ' + element.className;
			}

			return $( element );
		},
		_initModel : function(){
			var 
				attr,
				info,
				scope,
				model = this['snap.Core']._initModel.call( this );
			
			if ( !this.element.controller ){
				attr = this._getAttribute( 'observe' );
				
				if ( attr ){
					scope = attr.split('.');
					info = this._unwrapVar( model, scope, true );

					if ( info.value instanceof snap.observer.Map ){
						model = info.value.model;
					}else if ( typeof(info.value) == 'object' ){
						model = info.scope;
						this.variable = info.variable;
					}else{
						throw 'Trying to observe, but no observer.Map found';
					}

					this.observing = true;
				}else{
					// TODO : merge with snap.controller.Abstract

					attr = this._getAttribute( 'scope', this.element.name );
					
					if ( attr ){
						scope = attr.split('.');
						info = this._unwrapVar( model, scope, true );

						if ( !info ){
							// TODO : what do I do?
						}else if ( typeof(info.value) == 'object' ){
							// if scope is a model, make it he model we watch
							this.variable = null;
							model = info.value;
						}else{
							this.variable = info.variable;
							model = info.scope;
						}
					}
				}
			}
			
			return model;
		},
		_bind : function(){
			var dis = this;
			
			this.viewBindings = this._makeBindings();

			this.observer.bind( function( alterations ){
				if ( dis._needUpdate(alterations) ) {
					dis._prepContent( this.model, alterations );
				}

				dis._onAlteration( this.model, alterations );

				if ( dis.makeClass && dis._needClassUpdate(alterations) ){
					dis._updateClass( this.model );
				}
			});
		},
		_onAlteration : function( model, alterations ){},
		_makeBindings : function(){
			var attr = this._getAttribute('binding');

			// control when this node updates itself
			if ( attr ){
				if ( attr[0] == '-' ){
					return [];
				}else if ( attr[0] == '*' ){
					return null;
				}else return attr.split(',');
			}else if ( this.variable ){
				return [ this.variable ];
			}else return [];
		},
		_needClassUpdate : function( alterations ){
			var 
				i,
				c,
				isNeeded = false,
				bindings = this.classBindings;

			if ( alterations.binding ){
				return true;
			}

			for( i = 0, c = bindings.length; i < c && !isNeeded; i++ ){
				isNeeded = alterations[ bindings[i] ];
			}
			
			return isNeeded;
		},
		_updateClass : function( data ){
			var element = this.element;

			element.className = this.baseClass + ' ' + element.origClassName + ' ' + this.makeClass( data );
		},
		// TODO : change to _needContentUpdate
		_needUpdate : function( alterations ){
			var 
				i,
				c,
				isNeeded,
				bindings = this.viewBindings;

			if ( alterations.binding ){
				return true;
			}

			if ( bindings ){
				isNeeded = false;

				for( i = 0, c = bindings.length; i < c && !isNeeded; i++ ){
					isNeeded = alterations[ bindings[i] ];
				}
			}else{
				isNeeded = true;
			}
			
			return isNeeded;
		},
		_prepContent : function( data, alterations ){
			var dis = this;

			if ( this.variable ){
				value = data[this.variable];

				if ( typeof(value) == 'function' ){ 
					value = data[this.variable](); 
				}
			}else{
				value = data;
			}

			// set up the observer for any children created
			this._pushObserver( this.element, this.observing ? this._observe(value) : this.observer );

			if ( this._makeContent( value, alterations ) ){
				bMoor.module.Bootstrap.done(function(){
					dis._finalizeContent();
				});
			}
		},
		// TODO : change to _updateContent
		_makeContent : function( data, alterations ){ return true; },
		_finalizeContent : function(){},
		_finalize : function(){}
	}
});

}( jQuery, this ));
;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'View',
	namespace : ['snap','node'],
	parent : ['snap','node','Basic'],
	references : { 
		'bMoor.module.Templator' : ['snap','templating','JQote']
	},
	node : {
		className : 'node-view'
	},
	properties : {
		defaultTemplate : null,
		_makeTemplate : function( model ){
			var template = this._getAttribute('template') || this.defaultTemplate;

			if ( template ){
				if ( template.charAt(0) == '>' ){
					this.watchTemplateVar = template.substring(1);
					template = this._unwrapVar( model, template.substring(1) );
				}

				return bMoor.module.Templator.prepare( template || this.defaultTemplate );
			} else return null;
		},
		_makeContent : function( data, alterations ){
			var template = this._makeTemplate( data );
			
			if ( template ){
				this._setContent( bMoor.module.Templator.run(template,data) );
				return true;
			}else return false;
		},
		_setContent : function( content ){
			var 
				next,
				element,
				el = document.createElement( 'div' );
			
			el.innerHTML = content;

			this.element.innerHTML = '';

			element = el.firstChild;
			while( element ){
				next = element.nextSibling;
				
				this.element.appendChild( element );

				this._finalizeElement( element );

				element = next;
			}
		},
		_needUpdate : function( alterations ){
			return ( this.watchTemplateVar && alterations[this.watchTemplateVar] ) 
				|| this['snap.node.Basic']._needUpdate.call( this, alterations );
		},
		_finalizeElement : function( element ){
			if ( element.nodeType != 3 ){
				bMoor.module.Bootstrap.build( element );
			}
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Text',
	namespace : ['snap','node'],
	parent : ['snap','node','Basic'],
	node : {
		className : 'node-text'
	},
	properties: {
		_makeContent : function( content ){
			this.element.innerHTML = String(content)
				.replace(/&/g, '&amp;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Debug',
	namespace : ['snap','node'],
	parent : ['snap','node','Basic'],
	node : {
		singleClass : true,
		className : 'node-debug'
	},
	properties: {
		_makeContent : function( data ){
			this.element.innerHTML = JSON.stringify( data._simplify ? data._simplify() : data );
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Script',
	namespace : ['snap','node'],
	parent : ['snap','node','Basic'],
	node : {
		singleClass : true,
		className : 'node-script'
	},
	properties: {
		_makeContent : function( content ){
			var script = document.createElement('script');
			script.text = content;
			
			this.element.parentNode.insertBefore( script, this.element );
			this.element.parentNode.removeChild( this.element );
			
			this.element = script;
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Style',
	namespace : ['snap','node'],
	parent : ['snap','node','Basic'],
	node : {
		singleClass : true,
		className : 'node-style'
	},
	properties: {
		_makeContent : function( content ){
			if ( this.element.styleSheet ){
				this.element.styleSheet.cssText = content;
			} else {
				this.element.innerHTML = '';
				this.element.appendChild( document.createTextNode(content) );
			}
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Switch',
	namespace : ['snap','node'],
	parent : ['snap','node','View'],
	properties : {
		_makeTemplate : function( model ){
			var 
				template;

			if ( model ){
				template = this._unwrapVar( model, this._getAttribute('template') );
				if ( !template ){
					template = this._getAttribute('defaultTemplate');
				}else{
					this.watchTemplateVar = this._getAttribute('template');
				}
				
				if ( template ){
					return bMoor.module.Templator.prepare( template );
				}
			}

			return null;
		},
		_needUpdate : function( alterations ){
			return alterations.modelSwitch 
				|| this['snap.node.View']._needUpdate.call( this, alterations);
		}
	}
});

}( jQuery, this ));
;;(function( $, global, undefined ){

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
				mount = this._getAttribute('mount');
				mountBelow = this._getAttribute('mountBelow');

				if ( mount ){
					mount = this.$.find('[mount]')[0];
				}

				if ( mountBelow ){
					element = this.$.find('[mountBelow]')[0];
				}

				// TODO : this isn't entirely right, need to clean up
				this.mountPoint = {
					base : mount ? mount
						: ( element ? element.parentNode
							: ( this.isTable 
								? this.element.getElementsByTagName( 'tbody' )[0]
								: this.element
							)
						),
					below : element,
					above : element
				};
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
				console.log( data );
				for( i = 0, c = data.length; i < c; i++ ){
					console.log( i, data[i]._.snapid );
					if ( moves[i] ){
						console.log( i, moves[i]._.snapid, moves[i], data[i-1], data[i-1] ? data[i-1]._.snapid : null );
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
		_append : function( element ){
			var mount = this.mountPoint.above;

			if ( element.nodeType != 3 ){
				if ( mount ){
					if ( mount.nextSibling ){
						mount.parentNode.insertBefore( element, mount.nextSibling );
					}else{
						mount.parentNode.appendChild( element );
					}

					this.mountPoint.last = element;
				}else{
					this.mountPoint.base.appendChild( element );
					this.mountPoint.below = element;
					this.mountPoint.above = element;
				}
			}
		},
		// TODO : I would somehow like to use set content...
		insert : function( model, template, previous ){
			var 
				i,
				c,
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

			// TODO : rows -> nodes
			if ( previous && (prevRow = this.rows[previous._.snapid]) ){
				previous = prevRow[ prevRow.length - 1 ];
				thisRow.previous = prevRow;
			}else{
				previous = this.mountPoint.above;
			}

			for( i = 0, c = thisRow.length; i < c; i++ ){
				element = thisRow[i];

				this._insert( element, previous );
				this._finalizeElement( element );

				previous = element;
			}

			return els;
		},
		// TODO : a lot of the mountpoint is completely pointless
		_insert : function( element, mount ){
			if ( element.nodeType != 3 ){
				if ( mount ){
					if ( mount.nextSibling ){
						mount.parentNode.insertBefore( element, mount.nextSibling );
					}else{
						mount.parentNode.appendChild( element );
					}

					if ( mount == this.mountPoint.above ){
						this.mountPoint.above = element;
					}
				}else{
					// this means there is nothing else...
					this.mountPoint.base.appendChild( element );
					this.mountPoint.below = element;
					this.mountPoint.above = element;
				}
			}
		}
	}
});

}( jQuery, this ));
;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Basic',
	namespace : ['snap','node','input'],
	parent : ['snap','node','Basic'],
	properties: {
		// gets called by the data bind
		lockValue : function(){},
		val : function( value ){},
		_isValid : function( value ){ 
			return null; 
		}, // pretty much 
		_makeContent : function( data ){
			this.val( data );
		},
		_initElement : function( element ){
			this.root = this._findRoot( element );
			
			return this['snap.node.Basic']._initElement.call( this, element );
		},
		_initModel : function(){
			var model = this['snap.node.Basic']._initModel.call( this );

			if ( !this.variable && this.element.name ){
				this.variable = this.element.name;
			}else if ( this.variable && !this.element.name ){
				this.element.setAttribute( 'name', this.variable );
			}
			
			return model;
		},
		_bind : function(){
			this['snap.node.Basic']._bind.call( this );
			
			this.lockValue();

			this._listen();
		},
		// TODO : make alter protected for the rest
		_listen : function(){
			var 
				dis = this,
				el = this.element;
			
			el.onchange = function(){ dis._onChange(); };
		},
		_onChange : function(){
			var 
				root = this.root.observer.model,
				value = this.val(),
				valid = this._isValid( value );
			
			this._pushChange();

			if ( value == this.lockedValue ){
				this.clearState();
			}else{
				if ( valid === false ){
					this.setState( false );
				}else{
					if ( valid === true ){
						this.setState( true );
					}
				}

				if ( root.$addChange ){
					root.$addChange( this );
				}
			}
		},
		_pushChange : function(){
			this.observer.model[ this.element.name ] = this.val();
		},
		setState : function( state ){
			var root = this.root.observer.model;
			
			if ( state ){
				if ( root.$removeError ){
					root.$removeError( this );
				}

				this.$.removeClass( 'state-error' );
				this.$.addClass( 'state-valid' );
			}else{
				if ( root.$addError ){
					root.$addError( this );
				}

				this.$.addClass( 'state-error' );
				this.$.removeClass( 'state-valid' );
			}
		},
		clearState : function(){
			this.$.removeClass( 'state-error' );
			this.$.removeClass( 'state-valid' );
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Text',
	namespace : ['snap','node','input'],
	parent : ['snap','node','input','Basic'],
	properties: {
		// gets called by the data bind
		_listen : function(){
			var 
				dis = this,
				el = this.element;
			
			el.onkeyup = function(){ dis._onChange(); };
			el.onchange = function(){ dis._onChange(); };
		},
		lockValue : function(){
			var value = this.val();

			this.lockedValue = value;
			this.element.setAttribute( 'value', this.val() );
		},
		val : function( value ){
			if ( value === undefined ){
				value = '';
			}

			if ( arguments.length ){
				this.element.value = value;
			}else{
				return this.element.value;
			}
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Checked',
	namespace : ['snap','node','input'],
	parent : ['snap','node','Basic'],
	properties: {
		_initElement : function( element ){
			var 
				name = element.nodeName ? element.name : element[0].name,
				e,
				i;

			this.checked = [];
			this.map = {};
			this.multi = false;

			if ( name[name.length-1] == ']' ){
				name = name.substring(0, name.length-2);

				if ( element[0].type.toLowerCase() == 'checkbox' ){
					this.multi = true;
				}
			}

			this.name = name;

			if ( !element.nodeName ){
				for( i = 0; i < element.length; i++ ){
					e = element[i];
					
					this.map[ e.value ] = e;

					if ( e.checked ){
						this.checked.push( e );
					}
				}
			}

			return this['snap.node.Basic']._initElement.call( this, element );
		},
		_initModel : function( context ){
			var 
				model = this['snap.node.Basic']._initModel.call( this, context );

			if ( !this.variable ){
				this.variable = this.name;
			}

			return model;
		},
		_makeContent : function( content ){
			this.val( content );
		},
		_bind : function(){
			var dis = this;
			
			this['snap.node.Basic']._bind.call( this );

			if ( this.observer && this.variable ){
				this.alter(function( value ){
					dis.observer.model[ dis.name ] = value;
				});
			}
		},
		val : function( value ){
			var 
				i,
				el,
				checked,
				element = this.element;

			if ( value ){
				if ( element.nodeName ){
					if ( element.value == value ){
						element.checked = true;
					}else{
						element.checked = false;
					}
				}else{
					checked = this.checked;
						
					this.checked = [];
					
					for( i = 0; i < checked.length; i++ ){
						checked[ i ].checked = false;
					}
					
					if ( this.multi ){
						if ( value.length === undefined || typeof(value) === 'string' ){
							value = [ value ];
						}
						
						for( i = 0; i < value.length; i++ ){
							el = this.map[ value[i] ];
							if ( el ){
								this.checked.push( el );
								el.checked = true;
							}
						}
					}else{
						if ( value.length && typeof(value) != 'string' ){
							value = value.pop();
						}
						
						el = this.map[ value ];
						if ( el ){
							this.checked.push( el );
							el.checked = true;
						}
					}
				}
			}else{
				if ( element.nodeName ){
					if ( element.checked ){
						return element.value;
					}else{
						return null;
					}
				}else{
					if ( this.multi ){
						var rtn = [];
						
						for( i = 0, c = element.length; i < c; i++ ){
							el = element[i];
							if ( el.checked ){
								rtn.push( el.value );
							}
						}
						
						return rtn;
					}else{
						for( i = element.length - 1; i >= 0; i-- ){
							el = element[i];
							if ( el.checked ){
								return el.value;
							}
						}
						
						return null;
					}
				}
			}
		},
		alter : function( cb ){
			var 
				dis = this,
				derp = function(){
                                        cb( dis.val() );
                                };
			
			if ( this.element.nodeName ){
				this.element.onchange = derp;
			}else{
				for( var i = 0, c = this.element.length; i < c; i++ ){
					// TODO : can I limit this to one call for radio?
					this.element[i].onchange = derp;
				}
			}
		}
	}
});

}( jQuery, this ));
;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Checkbox',
	namespace : ['snap','node','input'],
	parent : ['snap','node','input','Basic'],
	properties: {
		val : function( value ){
			var element = this.element;
			
			if ( value ){
				if ( element.value == value ){
					element.checked = true;
				}else{
					element.checked = false;
				}
			}else{
				if ( element.checked ){
					return element.value;
				}else{
					return null;
				}
			}
		},
		lockValue : function(){
			if ( this.element.checked ){
				this.element.setAttribute( 'checked', true );
			}else{
				this.element.removeAttribute( 'checked' );
			}
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Button',
	namespace : ['snap','node','input'],
	parent : ['snap','node','input','Basic'],
	properties: {
		_listen : function(){
			var 
				dis = this,
				el = this.element;
			
			el.onclick = function(){ dis._onChange(); };
		},
		val : function( value ){
			if ( value ){
				if ( this.element.value == value ){
					this.$.addClass('active');
				}else{
					this.$.removeClass('active');
				}
			}else{
				return this.element.value;
			}
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Disabled',
	namespace : ['snap','node','input'],
	properties : {
		_needUpdate : function( alterations ){
			return alterations.$isValid || this._wrapped( alterations );
		},
		// TODO : make shouldn't need to be called
		_makeContent : function( content ){
			var data = this.root.observer.model;
			
			this._wrapped( content );
			
			if ( data.$isValid !== undefined ){
				this.element.disabled = !data.$isValid;
			}
		},
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Required',
	namespace : ['snap','node','input'],
	properties : {
		_isValid : function( value ){
			if ( this._wrapped(value) !== false ){
				// TODO : make this a more universal thing...
				return value !== ''; // has to be something...
			}else return false;
		},
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Select',
	namespace : ['snap','node','input'],
	parent : ['snap','node','input','Basic'],
	properties: {
		_initElement : function ( element ){
			var 
				$el = this['snap.node.input.Basic']._initElement.call( this, element ),
				selected,
				i,
				c;

			selected = this._select( '[selected]', element );

			if ( selected.length ){
				for( i = 0, c = selected.length; i < c; i++ ){
					selected[i].removeAttribute('selected');
				}
				selected = selected[ selected.length-1 ];
			}else{
				selected = element.options[0];
			}

			this.val( selected.value );

			return $el;
		},
		lockValue : function(){
			if ( this.oldOption ){
				this.oldOption.removeAttribute( 'selected' );
			}

			this.oldOption = this.element.options[ this.element.selectedIndex ];
			this.oldOption.setAttribute( 'selected', true );
		},
		val : function( value ){
			if ( value ){
				var dex;
				
				for( var options = this.element.options, i = 0, c = options.length; i < c; i++ ){
					if ( options[i].value == value ){
						dex = i;
						i = c;
					}
				}
				
				if ( !dex ){
					dex = 0;
				}
				
				this.element.selectedIndex = dex;
			}else{
				return this.element.options[this.element.selectedIndex].value;
			}
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Validation',
	namespace : ['snap','node','input'],
	construct : function(){
		var value;

		value = this._getAttribute( 'min' );
		if ( value ){
			this.minVal = parseInt( value, 10 );
		}

		value = this._getAttribute( 'max' );
		if ( value ){
			this.maxVal = parseInt( value, 10 );
		}

		value = this._getAttribute( 'match' );
		if ( value ){
			this.regEx = new RegExp( value );
		}

		value = this._getAttribute( 'delay' );
		if ( value ){
			this.validationDelay = value;
		}else{
			this.validationDelay = 0;
		}
	},
	properties : {
		_onChange : function(){
			var
				dis = this,
				wrapped = this._wrapped;

			if ( this.validationTimeout ){
				clearTimeout( this.validationTimeout );
			}

			this.validationTimeout = setTimeout(function(){
				dis.validationTimeout = null;
				wrapped.call( dis );
			}, this.validationDelay);
		},
		_isValid : function( value ){
			var 
				number,
				valid = true;

			if ( this._wrapped(value) !== false ){
				number = parseInt( value, 10 );
				
				if ( this.maxVal && (number > this.maxVal || isNaN(number)) ){
					valid = false;
				}

				if ( this.minVal && (number < this.minVal || isNaN(number)) ){
					valid = false;
				}

				if ( this.regEx && !this.regEx.test(''+value) ){
					valid = false;
				}
				
				return valid;
			}else return false;
		},
	}
});

}( jQuery, this ));
;;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Form',
	namespace : ['snap','node'],
	require: [
		['snap','node','input','Text'],
		['snap','node','input','Checked'],
		['snap','node','input','Button'],
		['snap','node','input','Select']
	],
	node : {
		className : 'node-form'
	},
	properties : {
		_finalizeContent : function(){
			var 
				dis = this,
				element = this.element,
				names = {},
				fields = [];
			
			this._wrapped();
			
			elements = element.elements;
			for( var i = 0, c = elements.length; i < c; i++ ){
				names[ elements[i].name ] = true;
			}
			
			for ( var name in names ) {
				var 
					el,
					input,
					field = elements[ name ];
				
				if ( name[name.length - 1] == ']' ){
					name = name.substring( 0, name.length - 2 );
				}
				
				fields.push( name );
				
				if ( field instanceof NodeList ){
					el = field[0];
				}else{
					el = field;
				}

				if ( !el.node ){
					if ( el.nodeName == 'BUTTON' ){
						input = new snap.node.input.Button( field );
					}else if ( el.nodeName == 'SELECT' ){
						input = new snap.node.input.Select( field );
					}else{
						if ( el.type == 'checkbox' || el.type == 'radio' ){
							input = new snap.node.input.Checked( field );
						}else if (el.type == 'button' ){
							input = new snap.node.input.Button( field );
						}else{
							input = new snap.node.input.Text( field );
						}
					}
				}
			}
		}
	}
});

}( jQuery, this ));;;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'Abstract',
	namespace : ['snap','controller'],
	parent : ['snap','Core'],
	require : {
		classes : [ 
			['snap','lib','Stream'],
		]
	},
	onDefine : function( settings ){
		var 
			service,
			controller;

		if ( settings.controller ){
			controller = settings.controller;

			// set instreams or outstreams to be mapped
			this._streamPull = controller.streamPull || {};
			this._streamPush = controller.streamPush || {};

			if ( !controller.className ){
				controller.className = 'snap-controller';
			}

			// TODO : this could prolly be merges with Node's code
			this.className = controller.className; // TODO : auto gen this?
			
			if ( this.baseClass ){
				if ( controller.singleClass ){
					this.baseClass = controller.className;
				}else{
					this.baseClass += ' ' + controller.className;
				}
			}else{
				this.baseClass = controller.className;
			}

			$(document).ready(function(){
				var
					className = '.'+controller.className, 
					subselect,
					actions,
					action,
					create = function( action, subselect, func ){
						$(document.body).on( action, className+' '+subselect, function( event ){
							var
								node = this,
								controllerEl,
								observerEl;

							observerEl = snap.Core.prototype._findElementWithProperty( 'observer', this );
							
							if ( $(observerEl).hasClass(className) ){
								controllerEl = observerEl;
							}else{
								controllerEl = $(this).closest( className )[0];
							}

							return func.call( this, event, controllerEl.controller, observerEl.observer );
						});
					};

				for( action in controller.actions ){
					actions = controller.actions[ action ];

					for( subselect in actions ){
						create( action, subselect, actions[subselect] );
					}
				}
			});
		}else{
			this._streamPull = {};
			this._streamPush = {};
		}
	},
	construct : function( element, attributes, args, delay ){
		this._parseAttributes( attributes );
		this._parseArguments.apply( this, arguments );
		
		if ( delay ){
			this.element = element;
		}else{
			this.init( element );
		}
	},
	properties : {
		init : function( element ){
			var 
				dis = this,
				derp = function( func ){
					snap.lib.stream( stream ).pulling( dis.observer, function(){
						func.apply( dis, arguments ); 
					});
				};

			if ( !element ){
				element = this.element;
			}
			
			this._initElement( element );
			
			// call the model generator, allow it to return or set this.model
			this.observer = this._observe( this._initModel() );

			this._pushObserver( this.element, this.observer );

			// jsHint is giving me an error for declaring it higher...
			for( var stream in this._streamPush ){
				snap.lib.stream( stream ).pushing( this.observer, this._streamPush[stream] );
			}

			for( stream in this._streamPull ){
				if ( typeof(this._streamPull[stream]) == 'function' ){
					derp( this._streamPull[stream] );
				}else{
					snap.lib.stream( stream ).pulling( this.observer, this._streamPull[stream] );
				}
			}
			
			this.root = this._findRoot() || this;

			if ( this._newRoot ){
				this._setRoot( this );
			}else{
				this._setRoot();
			}

			this._finalize();
		},
		_key : null,
		_newRoot : false,
		_parseArguments : function(){
			// maybe arguments should really be a hash?
			// use json decode?
			this.args = arguments;
		},
		// make models observes that are then linked...
		_model : function( parentModel ){
			return parentModel;
		},
		_initModel : function(){
			var 
				info,
				scope,
				model = this['snap.Core']._initModel.call(this);

			// TODO : merge with snap.controller.Abstract
			scope = this._getAttribute( 'scope', this.element.name );
			
			if ( scope ){
				scope = scope.split('.');
				info = this._unwrapVar( model, scope, true );

				if ( !info ){
					// TODO : what do I do?
				}else if ( typeof(info.value) == 'object' ){
					// if scope is a model, make it he model we watch
					this.variable = null;
					model = info.value;
				}else{
					this.variable = info.variable;
					model = info.scope;
				}
			}

			return this._model( model );
		},
		_initElement : function( element ){
			this['snap.Core']._initElement.call( this, element );
			
			element.controller = this;

			if ( this.baseClass ){
				element.className += ' '+this.baseClass;
			}
		},
		_finalize : function(){}
	}
});

}( jQuery, this ));
;;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Form',
	namespace : ['snap','controller'],
	properties : {
		_delay : null,
		_finalize : function(){
			var 
				$root = $(this.element),
				dis = this,
				changes = {},
				model = this.observer.model,
				errors = {},
				count = 0;

			if ( model.$isValid === undefined ){
				model.$errors = [];
				model.$messages = [];
				model.$isValid = false;

				model.$addError = function( node ){
					if ( !errors[node.nodeId] ){
						count++;
						errors[ node.nodeId ] = true;

						this.$isValid = false;
					}
				};

				model.$removeError = function( node ){
					if ( errors[node.nodeId] ){
						count--;
						delete errors[node.nodeId];

						if ( !count ){
							this.$isValid = true;
						}
					}
				};

				model.$addChange = function( node ){
					changes[ node.nodeId ] = node;

					if ( count === 0 ) {
						this.$isValid = true;
					}
				};

				model.$appoveChanges = function(){
					var key;

					for ( key in changes ) if ( changes.hasOwnProperty(key) ){
						changes[key].lockValue();
						changes[key].clearState();
					}
				};
			}

			// handle the reset requests
			$root.on( 'click', 'button[type="reset"]', function(){
				var key;

				for ( key in changes ) if ( changes.hasOwnProperty(key) ){
					changes[key].clearState();
				}

				setTimeout(function(){
					$root.find(':input').each(function(){
						if ( this.onchange ) { this.onchange(); }
					});
				},10);
			});

			// handle the submission
			$root.on( 'submit', function( event ){
				// clear the errors and messages
				model.$errors = [];
				model.$messages = [];

				dis.sendPush( function(){
					if ( model.$errors.length === 0 ){
						model.$appoveChanges();
						model.$isValid = false;
					}
				});
				
				return false;
			});
		}
	}
});

}( jQuery, this ));
;;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Serviced',
	namespace : ['snap','controller'],
	onDefine : function( settings ){
		var service;

		if ( settings.services ){
			if ( !this.services ){
				this.services = {};
			}

			for( service in settings.services ){
				this.services[ service ] = bMoor.get( settings.services[service] );
			}
		}
	},
	properties : {
		_finalize : function(){
			this.updates = {};
			this.removes = {};
			this.creates = {};
			
			if ( this.observer instanceof snap.observer.Collection ){
				this._bindCollection( this.observer );
			}else if ( this.observer ){
				this._bindMap( this.observer );
			}
			
			this._wrapped();
		},
		_delay : 2000,
		_bindMap : function( observer ){
			var 
				model = observer.model,
				dis = this,
				key = this._key,
				create = false,
				action,
				attr;

			if ( key ){
				if ( model[key] ){
					this._register( observer );
				}else{
					this._create( observer );
				}
			}else{
				this._register( observer );
			}
		},
		_bindCollection : function( collection ){
			var dis = this;

			collection.bind(function( alterations ){
				var
					i,
					c,
					additions,
					removals,
					row;

				additions = alterations.additions;
				removals = alterations.removals;

				// both of these come back as the models, reference the observer
				if ( removals ){
					for( i = 0, c = removals.length; i < c; i++ ){
						// TODO : Should I unbind somehow?
						dis._remove( removals[i]._ );
					}
				}

				if ( additions ){
					for( i = 0, c = additions.length; i < c; i++ ){
						dis._bindMap( additions[i]._ );
					}
				}
			});
		},
		_sendCreate : function( observer, cb ){ cb(); return; },
		_sendUpdate : function( observer, cb ){ cb(); return; },
		_sendRemove : function( observer, cb ){ cb(); return; },
		_get : function(){ return; },
		_register : function( observer ){
			var dis = this;

			observer.bind(function( settings ){ 
				dis._update( this, settings ); 
			}, true);
		},
		_create : function( observer ){
			var dis = this;
			
			this._register( observer );

			observer.run(function(){ 
				dis.creates[ this.snapid ] = this;
			});
			
			this._push();
		},
		_update : function( observer ){
			this.updates[ observer.snapid ] = observer;
			this._push();
		},
		_remove : function( observer ){
			this.removes[ observer.snapid ] = observer;
			this._push();
		},
		_push : function(){
			var dis = this;

			// if no delay, assume it will be something manual
			if ( this._delay ){
				if ( this._pushLock ){
					clearTimeout( this._pushLock );
				}

				this._pushLock = setTimeout(function(){
					dis._pushLock = null;
					dis.sendPush();
				}, this._delay);
			}
		},
		sendPush : function( cb ){
			// seperate the current back from any future
			var
				count = 1,
				creates = this.creates,
				removes = this.removes,
				updates = this.updates,
				snapid;

			// TODO : I really need to make this a pattern...
			function onReturn(){
				count--;
				
				if ( !count && cb ){
					cb();
				} 
			}
			
			this.creates = {};
			this.removes = {};
			this.updates = {};

			for( snapid in creates ){
				if ( !removes[snapid] ){
					// prevent a create / delete loop
					count++;
					this._sendCreate( creates[snapid], onReturn );
				}

				delete removes[snapid];
				delete updates[snapid];
			}
			
			for( snapid in updates ){
				if ( !removes[snapid] ){
					// prevent an unneeded update
					count++;
					this._sendUpdate( updates[snapid], onReturn );
				}
			}
			
			for( snapid in removes ){
				count++;
				this._sendRemove( removes[snapid], onReturn );
			}

			onReturn();
		}
	}
});

}( jQuery, this ));
