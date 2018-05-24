import {getInitialData} from '../utils/api'
import {receiveUsers} from './users'
import {receiveQuestions} from './questions'
import {setAuthedUser} from './authedUser'
import {showLoading, hideLoading} from 'react-redux-loading'

export function handleInitialData(userId) {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(userId ? userId : null))
                dispatch(receiveUsers(users))
                dispatch(hideLoading())
            })
    }
}