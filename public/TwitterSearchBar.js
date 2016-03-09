var TwitterSearchBar = React.createClass({
  getInitialState: function() {
    return { newKeyword: '' }
  },
  handleKeywordChange: function(e) {
    this.setState({
      newKeyword: e.target.value
    })
  },
  handleFormSubmit: function(e) {
    e.preventDefault();

    var newKeyword = this.state.newKeyword.trim();

    this.props.onKeywordSubmit(newKeyword);
  },

  render: function() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <input onChange={this.handleKeywordChange} 
                  value={this.state.keyword} type="text" placeholder="search" />
          <button>go </button>
        </div>
      </form>
      )
  }
});