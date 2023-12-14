import './NoCoach.css'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

function NoCoachFound(){
    return (
        <>
        <Navbar page='default'></Navbar>
        <div class='no-coach-card'>
            <h1 id='no-coach-title'>Sorry, no coach found</h1>
            <hr id='horizontal-break'></hr>
            <p id='no-coach-text'>You do not have a coach, or the coach you have requested has not approved your request yet. 
                Navigate to the <Link to='/ExploreCoaches'><span id='no-coach-explore-coach'>Explore Coaches</span></Link> page to search for a coach suitable for you, or to check on the status of your request.</p>
        </div>
        </>
    )
}

export default NoCoachFound