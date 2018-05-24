import React, {Component} from 'react'
import {connect} from 'react-redux'

class Profile extends Component {

    render() {
        const {users, id} = this.props

        return (
            <div className="user">
                <img
                    src={users[id].avatarURL}
                    alt={`Avatar of ${users[id].name}`}
                    className='avatar'
                />
                <div>
                    <div>
                        <span>{users[id].name}</span>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Profile)