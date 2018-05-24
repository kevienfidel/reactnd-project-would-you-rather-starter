import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {Grid, Row, Col} from 'react-bootstrap'

class Dashboard extends Component {

    state = {
        category: 'Unanswered Poll(s)'
    }

    handleToggleQuestion = (e) => {
        const category = e.target.value

        this.setState(() => ({
            category
        }))

    }

    render() {
        const {category} = this.state
        const {unansweredPolls, answeredPolls} = this.props

        return (
            <Grid>
                <Row>
                    <Col md={12} className='center'>
                        <select onChange={this.handleToggleQuestion}>
                            <option value='Unanswered Poll(s)'>Unanswered Polls</option>
                            <option value='Answered Poll(s)'>Answered Polls</option>
                        </select>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        {category === 'Unanswered Poll(s)' && (
                            <Question polls={unansweredPolls}/>
                        )}
                        {category === 'Answered Poll(s)' && (
                            <Question polls={answeredPolls}/>
                        )}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps({users, questions, authedUser}) {
    const answeredPolls = Object.keys(users[authedUser].answers)
    const questionsId = Object.keys(questions)
    const unansweredPolls = questionsId.filter((id) => (!answeredPolls.includes(id)))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    return {
        users,
        questions,
        answeredPolls,
        unansweredPolls
    }
}

export default connect(mapStateToProps)(Dashboard)