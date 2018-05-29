import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeAuthedUser} from '../actions/authedUser'
import {Grid, Row, Col} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import User from './User'
import Dashboard from './Dashboard'
import Nav from './Nav'
import {fakeAuth} from '../utils/api'


class Home extends Component {

    state = {
        toLogout: false
    }

    handleLoggingout = () => {
        fakeAuth.signout(() => this.props.dispatch(removeAuthedUser()))

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
            <Grid>
                <Row>
                    <Nav/>
                </Row>
                <Row>
                    <Col md={3}>
                        <div className='center'>
                            <h3>Currently Logged in as:</h3>
                            <User id={authedUser}/>
                            <button className='btn' onClick={this.handleLoggingout}>Logout</button>
                        </div>
                    </Col>
                    <Col md={9}>
                        <Dashboard/>
                    </Col>
                </Row>

            </Grid>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Home)