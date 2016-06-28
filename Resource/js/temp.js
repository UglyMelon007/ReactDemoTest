$(function() {
	//Demo1 ReactDOM.render()是React的最基本方法
	//用于将模板转为HTML语言，并插入指定DOM节点
	ReactDOM.render(<h1> Hello, World!! </h1>, document.getElementById('example') );

	//Demo2
	var names = ['Zhang Wei', 'Zhang Qian'];
	ReactDOM.render(
		<div>
		{
			names.map(function(name){
				return <div>Hello, {name}!</div>
			})
		}
		</div>,
		document.getElementById('example')
	);

	//Demo3
	var arr = [
		<h1>Hello World</h1>,
		<h2>UglyMelon007</h2>,
	];
	ReactDOM.render(
		<div>{arr}</div>,
		document.getElementById('example')
	);

	//Demo4,React.createClass方法用于生成一个组件类。所有组件类都必须有自己的render方法，
	//组件类的第一个字母都必须大写，组件类只能包含一个顶层标签,组件的class属性需写成className,
	//for属性需写成htmlFor
	var HelloMessage = React.createClass({
		render: function(){
			return <h1>Hello World , {this.props.name}!!</h1>;
		}
	});
	ReactDOM.render(
		<HelloMessage name = "Zhang Wang"/>,
		document.getElementById('example')
	);

	//Demo5,this.props对象的属性与组件属性一一对应，除了this.props.children属性，
	//它表示组件的所有子节点。若当前组件没有子节点，数据类型为undefined,如果有一
	//个子节点，数据类型为object,如果有多个子节点，灵气类型为array.
	//React提供一个工具方法React.Children来处理this.props.children.我们可以用---
	//React.Children.map来遍历子节点，而不用担心数据类型问题。
	var NodeList = React.createClass({
		render: function(){
			return (
				<ol>
				{
					React.Children.map(this.props.children, function(child){
						return <li>{child}</li>;
					})
				}
				</ol>
			);
		}
	});
	ReactDOM.render(
		<NodeList>
		<span>Hello</span>
		<span>World</span>
		</NodeList>,
		document.getElementById('example')
	);

	//Demo6,组件类PropTypes属性，可以用来验证组件实例的属性是否符合某些要求。
	//React.PropTypes.string 属性必须为string类型
	//isRequired 属性必须不为空
	//需要引用react-with-addons.js文件（不可为压缩js),
	//更多设置请看http://facebook.github.io/react/docs/reusable-components.html
	//getDefaultProps方法可以用来设置组件属性的默认值
	var MyTitle = React.createClass({
		propTypes: {	
		 title: React.PropTypes.string.isRequired,	
		},

		getDefaultProps: function(){
			return {
				title: "I'm Default　Value"
			};
		},

		render: function(){
			return <h1> {this.props.title} </h1>;
		}
	});

	var data = 123;
	ReactDOM.render(
		<MyTitle/>,	
		document.getElementById('example')
	);

	//Demo7,组件并不是真正的DOM节点，而是存在于内存中的一种数据结构，叫做虚拟DOM,
	//只有当它插入文档后，才会变成真实的DOM.
	//更多事件，请看https://facebook.github.io/react/docs/events.html
	var MyComponent = React.createClass({
		handleClick: function() {
			// Explicitly focus the text input using the raw DOM API.
			if (this.myTextInput !== null) {
				alert(this.myTextInput.value);
			}
		},
		render: function() {
			// The ref attribute is a callback that saves a reference to the
			// component to this.myTextInput when the component is mounted.
			return (
				<div>
				<input type="text" ref={(demo) => this.myTextInput = demo} />
				<input type="button" value="Focus the text input" onClick={this.handleClick} />
				</div>
			);
		}
	});

	ReactDOM.render(
		<MyComponent />,
		document.getElementById('example')
	);

	//Demo8,React的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，
	//导致状态改变，从而触发重新渲染UI
	//getInitialState方法用于定义初始状态,也就是一个对象，这个对象可以通过this.state属性读取
	//当用户点击组件，导致状态变化，this.setState方法就修改状态值，每次修改以后，自动调用--
	//render方法，再次渲染组件。
	var LikeButtion = React.createClass({
		getInitialState: function(){
			return {like: false};
		},
		handleClick: function(event){
			this.setState({like: !this.state.like});
		},
		render: function(){
			var text = this.state.like ? 'like' : 'haven\'t like';
			return (
				<p onClick = {this.handleClick}>
				You {text} this. Click to toggle.
				</p>
			);
		}
	});

	ReactDOM.render(
		<LikeButtion />,
		document.getElementById('example')
	);

	//Demo9,用户在表单填入的内容，属于用户与组件的互动，所以不能用this.props读取
	//通过定义一个onChange回调函数，然后通过event.target.value读取用户输入的值。
	//textarea,select,radio元素都属于这种情况，更多介绍请看http://facebook.github.io/react/docs/forms.html
	var Input = React.createClass({
		getInitialState: function(){
			return {value: 'hello !'};
		},
		handleChange: function(event){
			this.setState({value: event.target.value});
		},
		render: function(){
			var value = this.state.value;
			return (
				<div>
				<input type = "text" value = {value} onChange = {this.handleChange} />
				<p>{value}</p>
				</div>
			);
		}
	});

	ReactDOM.render(<Input/>, document.getElementById('example'));

	//Demo10,组件的生命周期分三个状态,五个函数：
	//Mounting:已插入真实DOM(componentWillMount(), componentDidMount())
	//Updating:正在被重新渲染(componentWillUpdate(object nextProps, object nextState), componentDidUpdate(object prevProps, object prevState)
	//Unmounting:已被移出真实DOM componentWillUnmount()
	//以及两种特殊状态的处理函数
	//componentWillReceiveProps(object nextProps) 已加载组件收到新的参数时调用
	//shouldComponentUpdate(object nextProp, object nextState) 组件决断是否重新渲染时调用
	//详细请看：http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
	var Hello = React.createClass({
		getInitialState: function () {
			return {
				opacity: 1.0
			};
		},
		componentDidMount: function () {
			this.timer = setInterval(function () {
				var opacity = this.state.opacity;
				opacity -= .01;
				if (opacity < 0.1) {
					opacity = 1.0;
				}
				this.setState({
					opacity: opacity
				});
			}.bind(this), 100);
		},
		render: function () {
			return (
				<div style={{opacity: this.state.opacity}}>
				Hello {this.props.name}
				</div>
			);
		}
	});

	ReactDOM.render(<Hello name = "UM007"/>, document.getElementById('example'));

	//Demo11,组件的数据来源，通常是通过Ajax请求从服务获取，可以使用commponentDidMount方法来设置Ajax请求
	//等到请求成功，再用this.setState方法重新渲染UI
	var UserGist = React.createClass({
		getInitialState: function(){
			return {
				username: '',
				lastGistUrl: ''
			};
		},
		componentDidMount: function(){
			$.get(this.props.source, function(result){
				var lastGist = result[0];
				if(this.isMounted()){
					this.setState({
						username: lastGist.owner.login,
						lastGistUrl: lastGist.html_url
					});
				}
			}.bind(this));
		},
		render: function(){
			return (
				<div>
				{this.state.username}'s last gist is
				<a href={this.state.lastGistUrl}>Here</a>
				</div> 
			);
		}
	});
	ReactDOM.render(<UserGist source="https://api.github.com/users/UglyMelon007/gists"/>, document.getElementById('example'));
	
	//Demo12,获取对象传递给组件
	var RepoList = React.createClass({
		getInitialState: function(){
			return {
				data: null,
				error: null,
				loading: true
			};
		},
		componentDidMount(){
			this.props.promise.then(
				value => this.setState({loading: false, data: value}),
				error => this.setState({loading: false, error: error})
			);
		},
		render: function(){
			if(this.state.loading){
				return (<span>loading...</span>);
			}else if(this.state.error !== null){
				return (<span>Error:{this.state.eror.message}</span>);
			}else{
				var repos = this.state.data.items;
				var repoList = repos.map(function(repo){
					return (
						<li>
						<a href = {repo.html_url}>{repo.name}</a>
						({repo.stargazers_count} stars) <br/>
						{repo.description}
						</li>
					);
				});

				return (
					<main>
					<h1>Most Popular JS Projects in Github</h1>
					<ol>{repoList}</ol>
					</main>
				);
			}
		}
	});

	ReactDOM.render(
		<RepoList promise = {$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')} />,
		document.body);
});
