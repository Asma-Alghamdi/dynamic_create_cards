import React from "react";
import "./Box.css";
import { Card } from "react-bootstrap";
import { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Result from "./result";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;




export default class Cards extends Component {
  axios = require("axios");
  constructor(props) {
    super(props);
    this.state = {
      cardsInfo: [],
      titles:[],
      customCard: [],
      option: '',
    };

    this.renderCard = this.renderCard.bind(this);
    this.test = this.test.bind(this);
    this.getTitles = this.getTitles.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.getContect = this.getContect.bind(this);
    this.test();
    this.getTitles();

  }

  renderCard(card, index) {
    return (
      <Card key={index} className="box">
        <Card.Img className="bodyImg" variant="top" src={card.image} />
        <Card.Body className="bodytext">
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
          <Link
            to={{
              pathname: "/CardInfo",
              state: card,
            }}
            style={{ textDecoration: 'none' }}
            className="buttonStyle"
          >
            Show
          </Link>
        </Card.Body>
      </Card>
    );
  }

  onClickNext() {
    console.log("yes");
    return <div></div>;
  }
  test() {
    axios.get("http://localhost:8000/card").then((res) => {
      const cardInfo = res.data;
      this.setState({
        cardsInfo :cardInfo,
      });
    });
  
  }

  getTitles(){
    axios.get("http://localhost:8000/title").then((res) => {
      const title = res.data;
    
      this.setState({
        titles :title,
      });
    });
    
  }

  handleOptionSelect (e){
    this.setState({
      option :e.currentTarget.innerText,
    });
  }

  getContect (e){
    const t = this.state.cardsInfo;
    if(e === ''){
      return(t.map(this.renderCard));
    }else{
      return(t.filter(person => person.title === e).map(this.renderCard));
    };
  }



  render() {
    const t = this.state.cardsInfo;
    const m= this.state.titles;
    console.log(m);
    const l = this.state.option;
    console.log(l);
    
    return (
      <div style={{ padding: 60, margin:40,}} className='rowC'>
      <Grid container direction="column" justify="top" spacing={1}>
        <Grid item xs={4}>
          <div style={{ paddingRight: 30, } } className='fillterPosisition'>
            <p className="font-weight-bold">FILTER</p>
           
            <Autocomplete
              id="combo-box-demo1"
              options={m}
              getOptionLabel={(option) => option.title}
              style={{ width: 215, marginBottom: 8 }}
              onInputChange={this.handleOptionSelect}
              renderInput={(params) => (
                <TextField {...params} label="Title" variant="outlined" />
              )}
              
            />
          
        
          
   
          </div>
        </Grid>
        <div className="grid">{this.getContect(l)}</div>
      </Grid>
      </div>
    );
  }
}
