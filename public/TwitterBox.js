var TwitterBox = React.createClass({
  propTypes: {
    tweetsArray: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  render: function() {
    var tweets = this.props.tweetsArray.map(function(t){
      return <TwitterCard user_name={ t.user_name }
                          text={ t.text }
                          profile_img={ t.profile_img }
                          created_at={ t.created_at } />
    });
    return (
      <div>
        { tweets }
      </div>
      )
  } 
});