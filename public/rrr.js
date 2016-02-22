var styles = {};

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

styles.tabPanels = {
  padding: 10
};


var Home = React.createClass({
  render: function() {
    return (
      <div>
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-6">
              <img src="/images/some_dude.png" className="img-responsive cstm-center" alt="Image"/>
            </div>
            <div className="col-md-6">
              <h3>Billy Bob</h3>
              <p>Pen Salesman</p>
              <p>Mega Pen Corp </p>
              <p>1-800-pens4-life</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <ul className="social-icons">
                <li><a href="https://github.com/fresh5447" target="_blank"><i className="fa fa-github-alt"></i></a></li>
                <li><a href="https://www.linkedin.com/in/douglas-walter-0951aa61?trk=nav_responsive_tab_profile" target="_blank"><i className="fa fa-linkedin-square"></i></a></li>
                <li><a href="https://twitter.com/Just_Be_Dougin" target="_blank"><i className="fa fa-twitter-square"></i></a></li>
              </ul>
            </div>
            <div className="col-md-6">
            </div>
          </div>
        </div>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h3>Skills</h3>
                <ul>
                  <li><h4>Able to count to 1000</h4></li>
                  <li><h4>SUPER fast at talking</h4></li>
                  <li><h4>Not very funny</h4></li>
                </ul>
              </div>
              <div className="col-md-6">
                <img src="/images/skill_set.jpg" className="img-responsive cstm-img " alt="Image"/>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              <h3>Super Duper Portfolio</h3>
              <div className="row">
                <div className="col-md-5"><div className="panel panel-default">
                  <div className="panel-body">
                    <img src="/images/cool_stuff.gif" className="img-responsive" alt="Image"/>
                  </div>
                  <div className="panel-footer">
                    <p>Super Project Name</p>
                  </div>
                </div></div>
                <div className="col-md-5"><div className="panel panel-default">
                  <div className="panel-body">
                    <img src="/images/cool_stuff.gif" className="img-responsive" alt="Image"/>
                  </div>
                  <div className="panel-footer">
                    <p>Super Project Name</p>
                  </div>
                </div></div>
              </div>
              <div className="row">
                <div className="col-md-5"><div className="panel panel-default">
                  <div className="panel-body">
                    <img src="/images/cool_stuff.gif" className="img-responsive" alt="Image"/>
                  </div>
                  <div className="panel-footer">
                    <p>Super Project Name</p>
                  </div>
                </div></div>
                <div className="col-md-5"><div className="panel panel-default">
                  <div className="panel-body">
                    <img src="/images/cool_stuff.gif" className="img-responsive" alt="Image"/>
                  </div>
                  <div className="panel-footer">
                    <p>Super Project Name</p>
                  </div>
                </div></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              <form action="" method="POST" role="form">
                <legend>contact me</legend>
              
                <div className="form-group">
                  <label htmlFor="">your name</label>
                  <input type="text" className="form-control cstm-form-input" id="" />
                </div>
              
                <div className="form-group">
                  <label htmlFor="">your email</label>
                  <input type="text" className="form-control cstm-form-input" id="" />
                </div>

                <div className="form-group">
                  <label htmlFor="">message</label>
                  <input type="text" className="form-control cstm-form-input" id="" />
                </div>
                
              
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </section>
      </div>
      )
  }
});


var Tabs = React.createClass({

  handleTabClick: function(activeTabIndex){
    this.props.onActiveTab(activeTabIndex)
  },

  renderTabs: function() {
    var self = this;
    return this.props.data.map(function(tab, index){
      var style = self.props.activeTabIndex ? styles.activeTab : styles.tab;
    var clickHandler = self.handleTabClick.bind(this, index);
    return (
        <div key={tab.name} style={style} onClick={clickHandler}>
          {tab.name}
        </div>
      );
    })
  },

  renderPanel: function() {
    var tab = this.props.tab[this.props.activeTabIndex];
    return (
      <div>
        <p>{tab.description}</p>
      </div>
    );
  },

  render: function() {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    );
  }
});

var Blog = React.createClass({
  getInitialState: function(){
    return {
      blogs: []
    }
  },
  getAllBlogs: function(){
    $.ajax({
      url: '/api/blogs',
      method: 'GET'
    }).done(function(data){
      this.setState({blogs: data})
    }.bind(this))
  },

  componentDidMount: function(){
    this.getAllBlogs();
  },

  render: function(){
    var blogs = this.state.blogs.map(function(blog){
      return (
        <div>
          <h3> {blog.title} </h3>
        </div>
        )
    })
    return (
      <div className="jumbotron">
        <div className="container">
          <h3>my blog</h3>
          { blogs }
        </div>
      </div>
      )
  }
});

var App = React.createClass({
  getInitialState: function(){
    return {
      activeTabIndex: 0
    }
  },
  handleActiveTabIndex: function(activeTabIndex){
    this.setState({
      activeTabIndex: activeTabIndex
    })
  },
  render: function(){

    return (
      <div>
        <Tabs 
        data={this.props.tabs}
        activeTabIndex={this.state.activeTabIndex}
        onActiveTab={this.handleActiveTabIndex}
        />
        <Home />
        <Blog />
      </div>
      )
  }
});

DATA = [
  { name: 'Step 1', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { name: 'Step 2', description: 'Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui id est.' },
  { name: 'Step 3', description: 'Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.' },
];


React.render(<App tabs={DATA}/>,
            document.getElementById('navBar'));