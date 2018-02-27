import React, { Component } from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import Table from './protected/Table'
import Map from './protected/Map'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import styles from '../styles/index.css'
import Header from '../styledComponents/Header';
import Wrapper from '../styledComponents/Wrapper'
import Nav from '../styledComponents/Nav'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <Wrapper>
          <Header>
            <Link to="/" className={styles.logo}>Sierra Aviation Group</Link>
                <Nav>
                  <ul>
                    <li><Link to="/map">Wheelchair Map</Link></li>
                    <li><Link to="/table">Table</Link></li>
                  </ul>
                </Nav>
                <div className={styles.accountActions}>
                <ul>
                  <li>
                    {this.state.authed
                      ? <Link to="/"
                          onClick={() => {
                            logout()
                          }}
                          className={styles.a}>Logout</Link>
                      : <span>
                          <Link to="/login" className="navbar-brand">Login</Link>
                          <Link to="/register" className="navbar-brand">Register</Link>
                        </span>}
                    </li>
                </ul>
      </div>
          </Header>
          <div className={styles.container}>
            <div className={styles.row}>
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <PrivateRoute authed={this.state.authed} path='/table' component={Table} />
                <PrivateRoute authed={this.state.authed} path='/map' component={Map} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </Wrapper>
      </BrowserRouter>
    );
  }
}
