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

var NavBar = React.createClass({
  render: function(){
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">BLOG</a>

            </div>

            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav">
                <li className=""><a href="/">Home</a></li>
                <li><a href="/blog">blog</a></li>
                <li><a href="/post">post</a></li>

              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">welcome stranger <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                      <li><a href="/login">login</a></li>
                      <li><a href="/signup">signup</a></li>
                    </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      )
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
  render: function(){
    return (
      <div>
        <NavBar />
        <Blog />
      </div>
      )
  }
});


React.render(<App/>,
            document.getElementById('navBar'));