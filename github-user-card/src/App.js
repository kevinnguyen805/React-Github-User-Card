import React from 'react';
import axios from 'axios'
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      gitData: []
    }
  }

  componentDidMount(){
    axios
      .get('https://api.github.com/users/kevinnguyen805')
      .then(response => {
        console.log(response.data)
        this.setState({
          gitData: response.data
        })
      })
      .catch(error => console.log(error))
  }
  


  render(){
    return(
      <div>
        <div>
          <img src={this.state.gitData.avatar_url} alt="profile" />
          <h1>{this.state.gitData.name}</h1>
          <p>{this.state.gitData.bio}</p>
          <p>{this.state.gitData.location}</p>
        </div>


        <div>
            <p>{this.state.gitData.public_repos}</p>
            <p>{this.state.gitData.followers}</p>
            <p>{this.state.gitData.following}</p>
        </div>
        

      </div>
    )
  }
}

export default App;
