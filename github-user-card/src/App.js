import React from 'react';
import axios from 'axios'
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      gitData: [],
      gitUserFollowers: [],
      gitUserFollowersData:[],
      gitUser: 'kevinnguyen805'
    }
  }

  componentDidMount(){
    axios
      .get(`https://api.github.com/users/${this.state.gitUser}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          gitData: response.data
        })
      })
      .catch(error => console.log(error))
  }
  
  // * Once data retrieved => fetch user's follower data 
  componentDidUpdate(prevProps, prevState){
    if(this.state.gitData !== prevState.gitData){
      axios.get(`https://api.github.com/users/${this.state.gitUser}/followers`)
      .then(response => {
        this.setState({
          gitUserFollowers: response.data
        })
      })
      .catch(error => console.log(error))
    }

    if (this.state.gitUserFollowers !== prevState.gitUserFollowers){
      this.state.gitUserFollowers.map(item => {
        axios.get(item.url)
          .then(response => {
            console.log(response.data)
            this.setState({
              gitUserFollowersData: [...this.state.gitUserFollowersData, response.data]
            })
          })
        console.log(this.state.gitUserFollowersData)
      })
    }
  }

  

  // * Search for a user's Git card
  handleChanges = (event) => {
    console.log(event.target.value)
    this.setState({
      gitUser: event.target.value
    })
  }
  getUserData = event => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.gitUser}`)
    .then(response => {
      console.log(response)
      this.setState({
        gitData: response.data
      })
    })
      .catch(error => console.log(error))
  }







  render(){
    return(
      <div>
        <h1>Find My GitCard</h1>
        <div className="search">
          <input
            type="text"
            name="gitUser"
            value={this.state.gitUser}
            onChange={this.handleChanges}
            placeholder="Search Username"
          />
          <button onClick={this.getUserData}>Search for GitCard</button>
        </div>

        <div className="gitUser">
          <h2>{this.state.gitData.name}'s GitHub</h2>
          <div className="gitUser-top">
            <img src={this.state.gitData.avatar_url} alt="profile" />
            <h1>{this.state.gitData.name}</h1>
            <p>{this.state.gitData.bio}</p>
            <p>{this.state.gitData.location}</p>
          </div>

          <div className="gitUser-bottom">
              <p>Repo: {this.state.gitData.public_repos}</p>
              <p className="break"> Followers: {this.state.gitData.followers}  </p>
              <p>Following: {this.state.gitData.following}</p>
          </div>
        </div>

        {/* <div>
          {this.state.gitUserFollowers.map(item => {
            return(
              <div key={item.id}>
                <h3>{item.login}</h3>
                <img src={item.avatar_url} alt="follower profile" />
              </div>
            )
          })}
        </div> */}
        <h1>{this.state.gitData.name}'s followers</h1>
        <div className="follower-container">
  
            {
            this.state.gitUserFollowersData.map(item => {
              return(
                <div key={item.id} className="gitFollowers">
                  <div className="follower">
                  <img src={item.avatar_url} alt="follower profile" />
                  <h3>{item.name}</h3>
                  <p>{item.login}</p>
                  <p>{item.bio}</p>
                  <p>{item.location}</p>
                  </div>
                </div>
              )
            })
          }   
       </div>

      </div>
    )
  }
}

export default App;
