import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {formatDate} from '../utils/helpers'

class Question extends Component {

    render() {
        const {polls, users, questions} = this.props
        return (
            <div>
                <ul>
                    {polls.map((questionId) => (
                        <li key={questionId}>
                            <Link to={`/question/${questionId}`} className='question'>
                                <img
                                    src={users[questions[questionId].author].avatarURL}
                                    alt={`Avatar of ${users[questions[questionId].author].name}`}
                                    className='avatar'
                                />
                                <div className='question-info'>
                                    <span>{users[questions[questionId].author].name}</span>
                                    <div> Posted: {formatDate(questions[questionId].timestamp)}</div>
                                    <h3>Would you rather... </h3>
                                    <p>{questions[questionId].optionOne.text}</p>
                                    <p>or</p>
                                    <p>{questions[questionId].optionTwo.text} ?</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users, questions}, props) {
    return {
        props,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Question)
