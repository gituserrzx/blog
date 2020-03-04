import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './login'
import Index from './adminIndex'

function Main () {
    return (
        <div>
            <Router>
                <Route path='/' exact component={Login}/>
                <Route path='/index/' component={Index} />
            </Router>
        </div>
    )
}
export default Main
