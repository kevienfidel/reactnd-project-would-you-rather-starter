import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {Grid, Row, Col} from 'react-bootstrap'
import {createSelector} from 'reselect'

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
        console.log('unanswered: ', unansweredPolls)
        console.log('answered: ', answeredPolls)

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

const getUnansweredPolls = createSelector(
    state => state.questions,
    state => Object.keys(state.users[state.authedUser].answers),
    state => Object.keys(state.questions),
    (questions, answeredPolls, questionsId) => questionsId.filter((id) => (!answeredPolls.includes(id)))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
)

const getAnsweredPolls = createSelector(
    state => state.questions,
    state => Object.keys(state.users[state.authedUser].answers),
    (questions, answers) => answers.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
)


function mapStateToProps(state) {
    const {users, questions} = state
    return {
        users,
        questions,
        answeredPolls: getAnsweredPolls(state),
        unansweredPolls: getUnansweredPolls(state)
    }
}


export default connect(mapStateToProps)(Dashboard)