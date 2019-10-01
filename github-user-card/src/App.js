import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      gitData: []
    }
  }



  render(){
    return(
      <div>
        {this.state.gitData}
      </div>
    )
  }
}

export default App;
