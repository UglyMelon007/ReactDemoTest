$(function () {
	//Demo1 ReactDOM.render()是React的最基本方法
	//用于将模板转为HTML语言，并插入指定DOM节点
	ReactDOM.render(React.createElement(
		'h1',
		{
			__self: this
		},
		' Hello, World!! '
	), document.getElementById('example'));

	//Demo2
	var names = ['Zhang Wei', 'Zhang Qian'];
	ReactDOM.render(React.createElement(
		'div',
		{
			__self: this
		},
		names.map(function (name) {
			return React.createElement(
				'div',
				{
					__self: this
				},
				'Hello, ',
				name,
				'!'
			);
		})
	), document.getElementById('example'));

	//Demo3
	var arr = [React.createElement(
		'h1',
		{
			__self: this
		},
		'Hello World'
	), React.createElement(
		'h2',
		{
			__self: this
		},
		'UglyMelon007'
	)];
	ReactDOM.render(React.createElement(
		'div',
		{
			__self: this
		},
		arr
	), document.getElementById('example'));

	//Demo4,React.createClass方法用于生成一个组件类。所有组件类都必须有自己的render方法，
	//组件类的第一个字母都必须大写，组件类只能包含一个顶层标签,组件的class属性需写成className,
	//for属性需写成htmlFor
	var HelloMessage = React.createClass({
		displayName: 'HelloMessage',

		render: function () {
			return React.createElement(
				'h1',
				{
					__self: this
				},
				'Hello World , ',
				this.props.name,
				'!!'
			);
		}
	});
	ReactDOM.render(React.createElement(HelloMessage, { name: 'Zhang Wang', __self: this
	}), document.getElementById('example'));

	//Demo5,this.props对象的属性与组件属性一一对应，除了this.props.children属性，
	//它表示组件的所有子节点。若当前组件没有子节点，数据类型为undefined,如果有一
	//个子节点，数据类型为object,如果有多个子节点，灵气类型为array.
	//React提供一个工具方法React.Children来处理this.props.children.我们可以用---
	//React.Children.map来遍历子节点，而不用担心数据类型问题。
	var NodeList = React.createClass({
		displayName: 'NodeList',

		render: function () {
			return React.createElement(
				'ol',
				{
					__self: this
				},
				React.Children.map(this.props.children, function (child) {
					return React.createElement(
						'li',
						{
							__self: this
						},
						child
					);
				})
			);
		}
	});
	ReactDOM.render(React.createElement(
		NodeList,
		{
			__self: this
		},
		React.createElement(
			'span',
			{
				__self: this
			},
			'Hello'
		),
		React.createElement(
			'span',
			{
				__self: this
			},
			'World'
		)
	), document.getElementById('example'));

	//Demo6,组件类PropTypes属性，可以用来验证组件实例的属性是否符合某些要求。
	//React.PropTypes.string 属性必须为string类型
	//isRequired 属性必须不为空
	//需要引用react-with-addons.js文件（不可为压缩js),
	//更多设置请看http://facebook.github.io/react/docs/reusable-components.html
	//getDefaultProps方法可以用来设置组件属性的默认值
	var MyTitle = React.createClass({
		displayName: 'MyTitle',

		propTypes: {
			title: React.PropTypes.string.isRequired
		},

		getDefaultProps: function () {
			return {
				title: "I'm Default　Value"
			};
		},

		render: function () {
			return React.createElement(
				'h1',
				{
					__self: this
				},
				' ',
				this.props.title,
				' '
			);
		}
	});

	var data = 123;
	ReactDOM.render(React.createElement(MyTitle, {
		__self: this
	}), document.getElementById('example'));

	//Demo7,组件并不是真正的DOM节点，而是存在于内存中的一种数据结构，叫做虚拟DOM,
	//只有当它插入文档后，才会变成真实的DOM.
	//更多事件，请看https://facebook.github.io/react/docs/events.html
	var MyComponent = React.createClass({
		displayName: 'MyComponent',

		handleClick: function () {
			// Explicitly focus the text input using the raw DOM API.
			if (this.myTextInput !== null) {
				alert(this.myTextInput.value);
			}
		},
		render: function () {
			// The ref attribute is a callback that saves a reference to the
			// component to this.myTextInput when the component is mounted.
			return React.createElement(
				'div',
				{
					__self: this
				},
				React.createElement('input', { type: 'text', ref: demo => this.myTextInput = demo, __self: this
				}),
				React.createElement('input', { type: 'button', value: 'Focus the text input', onClick: this.handleClick, __self: this
				})
			);
		}
	});

	ReactDOM.render(React.createElement(MyComponent, {
		__self: this
	}), document.getElementById('example'));

	//Demo8,React的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，
	//导致状态改变，从而触发重新渲染UI
	//getInitialState方法用于定义初始状态,也就是一个对象，这个对象可以通过this.state属性读取
	//当用户点击组件，导致状态变化，this.setState方法就修改状态值，每次修改以后，自动调用--
	//render方法，再次渲染组件。
	var LikeButtion = React.createClass({
		displayName: 'LikeButtion',

		getInitialState: function () {
			return { like: false };
		},
		handleClick: function (event) {
			this.setState({ like: !this.state.like });
		},
		render: function () {
			var text = this.state.like ? 'like' : 'haven\'t like';
			return React.createElement(
				'p',
				{ onClick: this.handleClick, __self: this
				},
				'You ',
				text,
				' this. Click to toggle.'
			);
		}
	});

	ReactDOM.render(React.createElement(LikeButtion, {
		__self: this
	}), document.getElementById('example'));

	//Demo9,用户在表单填入的内容，属于用户与组件的互动，所以不能用this.props读取
	//通过定义一个onChange回调函数，然后通过event.target.value读取用户输入的值。
	//textarea,select,radio元素都属于这种情况，更多介绍请看http://facebook.github.io/react/docs/forms.html
	var Input = React.createClass({
		displayName: 'Input',

		getInitialState: function () {
			return { value: 'hello !' };
		},
		handleChange: function (event) {
			this.setState({ value: event.target.value });
		},
		render: function () {
			var value = this.state.value;
			return React.createElement(
				'div',
				{
					__self: this
				},
				React.createElement('input', { type: 'text', value: value, onChange: this.handleChange, __self: this
				}),
				React.createElement(
					'p',
					{
						__self: this
					},
					value
				)
			);
		}
	});

	ReactDOM.render(React.createElement(Input, {
		__self: this
	}), document.getElementById('example'));

	//Demo10,组件的生命周期分三个状态,五个函数：
	//Mounting:已插入真实DOM(componentWillMount(), componentDidMount())
	//Updating:正在被重新渲染(componentWillUpdate(object nextProps, object nextState), componentDidUpdate(object prevProps, object prevState)
	//Unmounting:已被移出真实DOM componentWillUnmount()
	//以及两种特殊状态的处理函数
	//componentWillReceiveProps(object nextProps) 已加载组件收到新的参数时调用
	//shouldComponentUpdate(object nextProp, object nextState) 组件决断是否重新渲染时调用
	//详细请看：http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
	var Hello = React.createClass({
		displayName: 'Hello',

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
			return React.createElement(
				'div',
				{ style: { opacity: this.state.opacity }, __self: this
				},
				'Hello ',
				this.props.name
			);
		}
	});

	ReactDOM.render(React.createElement(Hello, { name: 'UM007', __self: this
	}), document.getElementById('example'));

	//Demo11,组件的数据来源，通常是通过Ajax请求从服务获取，可以使用commponentDidMount方法来设置Ajax请求
	//等到请求成功，再用this.setState方法重新渲染UI
	var UserGist = React.createClass({
		displayName: 'UserGist',

		getInitialState: function () {
			return {
				username: '',
				lastGistUrl: ''
			};
		},
		componentDidMount: function () {
			$.get(this.props.source, function (result) {
				var lastGist = result[0];
				if (this.isMounted()) {
					this.setState({
						username: lastGist.owner.login,
						lastGistUrl: lastGist.html_url
					});
				}
			}.bind(this));
		},
		render: function () {
			return React.createElement(
				'div',
				{
					__self: this
				},
				this.state.username,
				'\'s last gist is',
				React.createElement(
					'a',
					{ href: this.state.lastGistUrl, __self: this
					},
					'Here'
				)
			);
		}
	});
	ReactDOM.render(React.createElement(UserGist, { source: 'https://api.github.com/users/UglyMelon007/gists', __self: this
	}), document.getElementById('example'));

	//Demo12,获取对象传递给组件
	var RepoList = React.createClass({
		displayName: 'RepoList',

		getInitialState: function () {
			return {
				data: null,
				error: null,
				loading: true
			};
		},
		componentDidMount() {
			this.props.promise.then(value => this.setState({ loading: false, data: value }), error => this.setState({ loading: false, error: error }));
		},
		render: function () {
			if (this.state.loading) {
				return React.createElement(
					'span',
					{
						__self: this
					},
					'loading...'
				);
			} else if (this.state.error !== null) {
				return React.createElement(
					'span',
					{
						__self: this
					},
					'Error:',
					this.state.eror.message
				);
			} else {
				var repos = this.state.data.items;
				var repoList = repos.map(function (repo) {
					return React.createElement(
						'li',
						{
							__self: this
						},
						React.createElement(
							'a',
							{ href: repo.html_url, __self: this
							},
							repo.name
						),
						'(',
						repo.stargazers_count,
						' stars) ',
						React.createElement('br', {
							__self: this
						}),
						repo.description
					);
				});

				return React.createElement(
					'main',
					{
						__self: this
					},
					React.createElement(
						'h1',
						{
							__self: this
						},
						'Most Popular JS Projects in Github'
					),
					React.createElement(
						'ol',
						{
							__self: this
						},
						repoList
					)
				);
			}
		}
	});

	ReactDOM.render(React.createElement(RepoList, { promise: $.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars'), __self: this
	}), document.body);
});
