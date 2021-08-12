import React, {Component} from "react";
import {render} from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Cards from "./components/cards";
import  CardInfo from "./components/cardInfo";


export default class App extends Component{
    constructor(props){
       super(props); 
    }

    render(){
        return( <div className="App">
        <Router>
   
          <Switch>
            <Route path="/" exact component={() => <Cards />} />
            <Route path="/CardInfo" exact component={() => <CardInfo />} />
         
          </Switch>
       
        </Router>
  
       
      </div>);
    }
}


const appDiv = document.getElementById('app');
render(<App />, appDiv);


