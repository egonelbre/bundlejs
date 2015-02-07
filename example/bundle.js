/* page/items */
var ノpageノitems = {};
(function($pkg){	
	
	/* page/items/registry.js */
	var Views = {};
	
	function Register(type, component){
		Views[type] = component;
	}
	
	$pkg.Register = Register;
	
	function ComponentFor(item){
		return Views[item.type];
	}
	
	$pkg.ComponentFor = ComponentFor;

})(ノpageノitems);

/* page */
var ノpage = {};
(function($pkg){	
	
	/* page/page.js */
	function Page(){
		this.title = "Hello";
		this.story = [
			{type: "paragraph", text: "alpha"},
			{type: "paragraph", text: "beta"},
			{type: "paragraph", text: "gamma"},
			{type: "paragraph", text: "delta"}
		];
	}
	Page.prototype = {};
	
	$pkg.Page = Page;	
	
	/* page/view.js */
	var items = ノpageノitems;
	
	
	var View = React.createClass({
		render: function(){
			var page = this.props.page;
			
			var components = page.story.map(function(item, i){
				var element = items.ComponentFor(item);
				return React.createElement(element, {
					key: i,
					item: item
				});
			});
			
			return React.DOM.section({}, 
				React.DOM.h1({}, page.title),
				components
			);
		}
	});
	
	$pkg.View = View;

})(ノpage);

/* page/items/basic */
var ノpageノitemsノbasic = {};
(function($pkg){	
	
	/* page/items/basic/paragraph.js */
	var items = ノpageノitems;
	
	
	var Paragraph = React.createClass({
		render: function(){
			var item = this.props.item;
			return React.DOM.p({}, item.text);
		}
	});
	
	items.Register("paragraph", Paragraph);
	
	$pkg.Paragraph = Paragraph;

})(ノpageノitemsノbasic);

/*  */
var ノ = {};
(function($pkg){	
	
	/* Application.js */
	var page = ノpage;
	var basic = ノpageノitemsノbasic;
	
	
	var MainPage = new page.Page();
	
	var Application = React.createClass({
		render: function(){
			var MainPage = this.props.page;
			return React.createElement(page.View, {page: MainPage});
		}
	});
	
	React.render(
		React.createElement(Application, {page: MainPage}),
		document.getElementById("application")
	);

})(ノ);
