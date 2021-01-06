import React, { Component } from 'react'

class About extends Component {
    state = {  }
    render() {
        return (
             <div>
            <header class="mb-auto">
              <div>
                <h3 class="float-md-start mb-0">About</h3>
                 
              </div>
            </header>
          
            <main class="px-3">
             
              <p class="lead">This is a simple blog project using API, which using Mongo-Express-Node in server side and React on the frond end.The following modules were used in this project  </p>
              <ul>
                  <li>MongoDB</li>
                  <li>Expressjs</li>
                  <li>Reactjs</li>
                  <li>Nodejs</li>
                  <li>Bootstarp-CSS</li>
              </ul>
              
            </main>
            
            
          
             
          </div>
           );
    }
}

export default About;