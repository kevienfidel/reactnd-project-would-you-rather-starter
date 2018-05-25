import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Nav, NavItem} from 'react-bootstrap'

class Navigation extends Component {
    render() {
        // return (
        //     <nav className='nav'>
        //         <ul>
        //             <li>
        //                 <NavLink to={`/home/authedUser/${this.props.authedUser}`} exact activeClassName='active'>
        //                     Home
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 <NavLink to='/add' exact activeClassName='active'>
        //                     New Poll
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 <NavLink to='/leaderboard' exact activeClassName='active'>
        //                     Leaderboard
        //                 </NavLink>
        //             </li>
        //         </ul>
        //     </nav>
        // )

        return (
            <Nav>
                <NavItem>
                    <NavLink to={`/home/authedUser/${this.props.authedUser}`} exact activeClassName='active'>
                        Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/add' exact activeClassName='active'>
                        New Poll
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/leaderboard' exact activeClassName='active'>
                        Leaderboard
                    </NavLink>
                </NavItem>
            </Nav>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Navigation)