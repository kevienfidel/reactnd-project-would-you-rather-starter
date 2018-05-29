import React, {Component} from 'react'
import {handleSaveQuestion} from '../actions/questions'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from './Nav'
import {Grid, Row, Col} from 'react-bootstrap'

class NewPoll extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }

    handleChange = (e) => {

        const text = e.target.value
        const name = e.target.name

        this.setState(() => ({
            [name]: text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {optionOneText, optionTwoText} = this.state
        const {dispatch, authedUser} = this.props

        dispatch(handleSaveQuestion({optionOneText, optionTwoText, authedUser}))


        this.setState(() => ({
            toHome: true
        }))
    }

    render() {
        const {authedUser} = this.props
        const {optionOneText, optionTwoText, toHome} = this.state
        const isInvalid = (optionOneText === '') ? true : (optionTwoText === '')

        if (toHome) {
            return <Redirect to={`/home/authedUser/${authedUser}`}/>
        }

        return (
            <Grid>
                <Row>
                    <Nav/>
                </Row>
                <Row>
                    <Col md={4}>
                        <h2>Would you rather...</h2>
                    </Col>
                    <Col md={8}>
                        <form className='new-question' onSubmit={this.handleSubmit}>
                            <textarea placeholder="Option 1"
                                      value={optionOneText}
                                      onChange={this.handleChange}
                                      className='textarea'
                                      maxLength={280}
                                      name='optionOneText'/>
                            <textarea placeholder="Option 2"
                                      value={optionTwoText}
                                      onChange={this.handleChange}
                                      className='textarea'
                                      maxLength={280}
                                      name='optionTwoText'/>
                            <button className='btn'
                                    type='submit'
                                    disabled={isInvalid}>
                                Submit
                            </button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewPoll)

