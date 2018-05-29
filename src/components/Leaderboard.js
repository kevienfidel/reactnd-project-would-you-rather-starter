import React, {Component} from 'react'
import {connect} from 'react-redux'
import Nav from './Nav'
import {Grid, Row, Col} from 'react-bootstrap'

class Leaderboard extends Component {
    render() {
        const {rankings, users} = this.props
        return (
            <Grid>
                <Row>
                    <Nav/>
                </Row>
                <Row>
                    <h5>Leaderboard</h5>
                </Row>

                {rankings.sort((a, b) => b.score - a.score).map((val, i) => (
                    <Row key={val.user} style={{height: '100px',  border: '1px solid #dad7d7'}}>
                        <Col md={4}>
                            <span>{i + 1}</span>
                            <img
                                src={users[val.user].avatarURL}
                                alt={`Avatar of ${users[val.user].name}`}
                                className='avatar'
                            />
                            <span>{users[val.user].name}</span>
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col md={6}>
                                    <p>Number of answered questions: {Object.keys(users[val.user].answers).length}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <p>Number of answered questions: {Object.keys(users[val.user].questions).length}</p>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                ))}
            </Grid>
        )
    }
}

function mapStateToProps({users}) {
    const usersId = Object.keys(users)
    const rankings = usersId.map((id) => ({
        user: id,
        score: Object.keys(users[id].answers).length + Object.keys(users[id].questions).length
    }))

    return {
        rankings,
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)