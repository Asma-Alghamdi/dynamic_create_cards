import React from "react";
//import "./Box.css";
import { Card } from "react-bootstrap";
import { Component } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {Link, useLocation} from "react-router-dom";

function Result() {

    let location = useLocation();

	console.log(location);

	return (<>
    
     
            <Card>
                <Card.Img
                    variant="top"
                    style={{width: "100%", height: "400px", margin: "auto"}}
                    src={location.state.image} 
                />{" "}
                <Card.Body>
                    <Card.Title className="mt-5">Card by read</Card.Title>
                    <Card.Text>
                        {location.state.text} <br />
                        {location.state.title} <br />

                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Link to="/"  className="btn btn-primary">

             
                Back
           
        </Link>
 
    </>);

}
export default Result;



