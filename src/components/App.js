import React, {Component, Fragment} from 'react'
import {handleInitialData} from '../actions/shared'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid} from 'react-bootstrap'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import TakePoll from './TakePoll'
import NewPoll from "./NewPoll"
import Leaderboard from './Leaderboard'
import PrivateRoute from './PrivateRoute'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const {loading} = this.props
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {!loading &&
                    <Grid>
                        <Route path='/' exact component={Login}/>
                        <PrivateRoute path='/home' component={Home}/>
                        <PrivateRoute path='/question/:questionId' component={TakePoll}/>
                        <PrivateRoute path='/add' component={NewPoll}/>
                        <PrivateRoute path='/leaderboard' component={Leaderboard}/>
                    </Grid>
                    }
                </Fragment>
            </Router>
        )
    }
}

function mapPropsToState({users}) {
    return {
        loading: (Object.keys(users).length === 0)
    }
}

export default connect(mapPropsToState)(App)