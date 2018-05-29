import React, {Component} from 'react'
import {connect} from 'react-redux'
import User from './User'
import {Redirect} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'
import {fakeAuth} from '../utils/api'
import {setAuthedUser} from '../actions/authedUser'

class Login extends Component {

    state = {
        redirectToReferrer: false
    }

    login = (e, id) => {
        e.preventDefault()
        const {dispatch} = this.props

        fakeAuth.authenticate(() => {
            dispatch(setAuthedUser(id))
            this.setState({redirectToReferrer: true})
        })
    }

    render() {
        const {usersId} = this.props
        const {from} = this.props.location.state || {from: {pathname: "/home"}}
        const {redirectToReferrer} = this.state

        if (redirectToReferrer) {
            return <Redirect to={from}/>
        }

        return (
            <Grid>
                <Row>
                    <Col className="text-center" md={12}>
                        <h3>Login as:</h3>
                    </Col>
                </Row>

                {usersId.map((id) => (
                    <Row key={id}>
                        <Col md={12}>
                            <a className='user-list' onClick={(e) => this.login(e, id)}>
                                <User id={id}/>
                            </a>
                        </Col>
                    </Row>
                ))}
            </Grid>
        )
    }
}

function mapStateToProps({users}) {
    return {
        usersId: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login)