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