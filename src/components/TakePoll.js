import React, {Component, Fragment} from 'react'
import {handleSaveAnswer} from '../actions/questions'
import {connect} from 'react-redux'
import {Grid, Row, Col} from 'react-bootstrap'
import Nav from './Nav'


class TakePoll extends Component {

    handleClick = (e, info) => {
        const {dispatch} = this.props
        e.preventDefault()

        dispatch(handleSaveAnswer(info))
    }

    render() {
        const {questionId, users, questions, isAnswered, answer, authedUser, questionNotFound, totalVotes} = this.props

        if (questionNotFound) {
            return (
                <Grid>
                    <Nav/>
                    <div className='center'>Error 404: Question not found.</div>

                </Grid>
            )
        }

        return (
            <Grid>
                <Row>
                    <Nav/>
                </Row>
                {!isAnswered && (
                    <Fragment>
                        <Row>
                            <Col md={12}>
                                <div className='center'>
                                    <img
                                        src={users[questions[questionId].author].avatarURL}
                                        alt={`Avatar of ${users[questions[questionId].author].name}`}
                                        className='avatar'
                                    />
                                    <span>{users[questions[questionId].author].name}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <h3 className='center'>Would you rather... </h3>
                            </Col>
                        </Row>
                        <Row className='question'>
                            <Col md={6} style={{height: '500px'}}>
                                <button className='button button1'
                                        onClick={(e) =>
                                            this.handleClick(e, {
                                                answer: 'optionOne',
                                                authedUser,
                                                qid: questionId
                                            })}>{questions[questionId].optionOne.text}</button>
                            </Col>
                            <Col md={6} style={{height: '500px'}}>
                                <button className='button button1'
                                        onClick={(e) =>
                                            this.handleClick(e, {
                                                answer: 'optionTwo',
                                                authedUser,
                                                qid: questionId
                                            })}>{questions[questionId].optionTwo.text}</button>
                            </Col>
                        </Row>
                    </Fragment>
                )}
                {isAnswered && (
                    <Fragment>
                        <Row>
                            <Col md={12}>
                                <div className='center'>
                                    <img
                                        src={users[questions[questionId].author].avatarURL}
                                        alt={`Avatar of ${users[questions[questionId].author].name}`}
                                        className='avatar'
                                    />
                                    <span>{users[questions[questionId].author].name}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <h3 className='center'>Would you rather... </h3>
                            </Col>
                        </Row>

                        <Row className='options'>
                            <Col className={answer === questions[questionId].optionOne.text ? 'selected' : ''} md={6}
                                 style={{height: '480px'}}>
                                <div>
                                    <h1>{parseInt((questions[questionId].optionOne.votes.length / totalVotes) * 100)}% </h1>
                                    <p>Votes: {questions[questionId].optionOne.votes.length}</p>
                                    <p>{questions[questionId].optionOne.text}</p>
                                </div>

                            </Col>
                            <Col className={answer === questions[questionId].optionTwo.text ? 'selected' : ''} md={6}
                                 style={{height: '480px'}}>
                                <div>
                                    <h1>{parseInt((questions[questionId].optionTwo.votes.length / totalVotes) * 100)}% </h1>
                                    <p>Votes: {questions[questionId].optionTwo.votes.length}</p>
                                    <p>{questions[questionId].optionTwo.text}</p>
                                </div>
                            </Col>
                        </Row>
                    </Fragment>
                )}
            </Grid>
        )
    }
}

function mapStateToProps({users, questions, authedUser,}, props) {
    const {questionId} = props.match.params
    const isAnswered = authedUser ? !!users[authedUser].answers[questionId] : false

    return {
        users,
        questions,
        questionId,
        authedUser,
        isAnswered,
        answer: isAnswered ? questions[questionId][users[authedUser].answers[questionId]].text : null,
        questionNotFound: !questions[questionId],
        totalVotes: isAnswered? questions[questionId].optionOne.votes.length + questions[questionId].optionTwo.votes.length: 0
    }
}

export default connect(mapStateToProps)(TakePoll)