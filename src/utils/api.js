import {
    _getQuestions,
    _getUsers,
    _saveQuestionAnswer,
    _saveQuestion
} from "./_DATA.js"


export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestionAnswer(info){
    return _saveQuestionAnswer(info)
}

export function saveQuestion(info){
    return _saveQuestion(info)
}

export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};