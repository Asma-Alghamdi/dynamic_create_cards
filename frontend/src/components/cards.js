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
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";


export default class Cards extends Component {
  axios = require("axios");
  constructor(props) {
    super(props);
    this.state = {
      cardsInfo: [],
      titles: [],
      customCard: [],
      option: "",
    };

    this.renderCard = this.renderCard.bind(this);
    this.getCards = this.getCards.bind(this);
    this.getTitles = this.getTitles.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.getContect = this.getContect.bind(this);
    this.getCards();
    this.getTitles();
  }

  //Show the collection of cards
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
            style={{ textDecoration: "none" }}
            className="buttonStyle"
          >
            Show
          </Link>
        </Card.Body>
      </Card>
    );
  }

//Get the cards with their information from the database. 
  getCards() {
    axios.get("http://localhost:8000/card").then((res) => {
      const cardInfo = res.data;
      this.setState({
        cardsInfo: cardInfo,
      });
    });
  }

  //Get a list of different titles of the cards that existed in the database.
  getTitles() {
    axios.get("http://localhost:8000/title").then((res) => {
      const title = res.data;

      this.setState({
        titles: title,
      });
    });
  }

  //Handling the changes of the filter box.
  handleOptionSelect(e) {
    this.setState({
      option: e.currentTarget.innerText,
    });
  }

  //Get the cards (the content of the page) based on the filter selected.
  getContect(e) {
    const t = this.state.cardsInfo;
    if (e === "") {
      return t.map(this.renderCard);
    } else {
      return t.filter((person) => person.title === e).map(this.renderCard);
    }
  }

  render() {
   
    const listTitles = this.state.titles;
    const userOption = this.state.option;

    return (
      <div style={{ padding: 60, margin: 40 }} className="rowC">
        <Grid container direction="column" justify="top" spacing={1}>
          <Grid item xs={4}>
            <div style={{ paddingRight: 30 }} className="fillterPosisition">
              <p className="font-weight-bold">FILTER</p>

              <Autocomplete
                id="combo-box-demo1"
                options={listTitles}
                getOptionLabel={(option) => option.title}
                style={{ width: 215, marginBottom: 8 }}
                onInputChange={this.handleOptionSelect}
                renderInput={(params) => (
                  <TextField {...params} label="Title" variant="outlined" />
                )}
              />
            </div>
          </Grid>
          <div className="grid">{this.getContect(userOption)}</div>
        </Grid>
      </div>
    );
  }
}
