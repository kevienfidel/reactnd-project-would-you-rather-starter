import React, {Component} from 'react'
import {handleInitialData} from '../actions/shared'
import {removeAuthedUser} from '../actions/authedUser'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'
import User from './User'
import Dashboard from './Dashboard'
import Nav from './Nav'

class Home extends Component {

    state = {
        toLogout: false
    }

    componentDidMount() {
        if (this.props.authedUser === null) {
            const {userId} = this.props
            this.props.dispatch(handleInitialData(userId))
        }
    }

    handleLoggingout = () => {
        this.props.dispatch(removeAuthedUser())

        this.setState(() => ({
            toLogout: true
        }))
    }

    render() {
        const {authedUser} = this.props
        const {toLogout} = this.state


        if (toLogout) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                {typeof authedUser === 'string'
                    ? <Grid>
                        <Row>
                            <Nav/>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <h3 className='center'>Currently Logged in as:</h3>
                                <div className='center'>
                                    <User id={authedUser}/>
                                    <button className='btn' onClick={this.handleLoggingout}>Logout</button>
                                </div>
                            </Col>
                            <Col md={9}>
                                <Dashboard/>
                            </Col>
                        </Row>
                    </Grid>
                    : null}
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, props) {
    const {userId} = props.match.params
    return {
        users,
        authedUser,
        userId
    }
}

export default connect(mapStateToProps)(Home)