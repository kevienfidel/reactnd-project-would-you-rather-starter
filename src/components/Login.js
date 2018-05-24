import React, {Component} from 'react'
import {connect} from 'react-redux'
import User from './User'
import {Link, withRouter} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'

class Login extends Component {

    render() {
        const {usersId} = this.props

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h3 className="center">Login as:</h3>
                    </Col>
                </Row>

                {usersId.map((id) => (
                    <Row key={id}>
                        <Col md={12}>
                            <Link to={`/home/authedUser/${id}`}>
                                <User id={id}/>
                            </Link>
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

export default withRouter(connect(mapStateToProps)(Login))