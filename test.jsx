class Principal extends React.Component {
    constructor (props) {

        super(props);

        this.state = {
            checked : true,
            textLink : 'Hello World'
        }
    }

    setChange () {
        console.log('Ta dahhh');

        this.setState({
            textLink: 'Hello my friend'
        }, function(){
            PubSub.publish('AnotherComponent', this.state.textLink);
        });
    }

    render () {
        return (
            <h1>
                <a href="javascript:void(0);" onClick={this.setChange.bind(this)}>{this.state.textLink}</a>
            </h1>
        )
    }
}


class NotParent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text : 'This is my text before publish/subscriber event.'
        }

    }

    componentWillMount () {

        this.token = PubSub.subscribe('AnotherComponent', function(topic, newText) {

            console.log('Topic: ' + topic);
            console.log('New text: ' + newText);

            this.setState({
                text : 'This is my text after publish event:  ' + newText
            });

        }.bind(this));
    }

    render () {
        return (
            <div className="text">{this.state.text}</div>
        )
    }
}

ReactDOM.render(
    <Principal />,
    document.getElementById('container')
);

ReactDOM.render(
    <NotParent />,
    document.getElementById('container2')
);