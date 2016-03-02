var TwitterCard = React.createClass({
  getInitialState: function() {
    return {
      tweets: []
    }
  },
  loadTweetsFromServer: function() {
    var self = this;

    $.ajax({
      url: this.props.url,
      method: 'GET',
    }).done(function(data){
      self.setState({tweets: data})
    })
  },
  componentDidMount: function() {
    this.loadTweetsFromServer();
  },
  render: function(){

    console.log(this.state.tweets)

    var twitterCards = this.state.tweets.map(function(item){
    return (
        <div className="media col-sm-3">
          <div className="media-left">
            <a href="#">
              <img className="img-circle" src={ item.profile_image } alt="..."/>
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{ item.user_name }</h4>
            <p>{ item.text }</p>
            <p>{ item.created_at }</p>
          </div>
        </div>
      )
    })
    return (
        <div>
          { twitterCards }
        </div>
      )
  }
});

React.render(<TwitterCard url="/api/tweets/tigers"/>, 
  document.getElementById('twitter-card'));