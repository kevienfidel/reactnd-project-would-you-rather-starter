import React, {Component, Fragment} from 'react'
import {handleInitialData} from '../actions/shared'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import TakePoll from './TakePoll'
import NewPoll from "./NewPoll"
import Leaderboard from './Leaderboard'

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
                    {loading === true
                        ? null
                        : <div>
                            <Route path='/' exact component={Login}/>
                            <Route path='/home/authedUser/:userId' component={Home}/>
                            <Route path='/question/:questionId' component={TakePoll}/>
                            <Route path='/add' component={NewPoll}/>
                            <Route path='/leaderboard' component={Leaderboard}/>
                        </div>
                    }
                </Fragment>
            </Router>
        )
    }
}

function mapPropsToState({users, authedUser}) {
    return {
        loading: (Object.keys(users).length === 0),
        isLoggedIn: !!authedUser
    }
}

export default connect(mapPropsToState)(App)