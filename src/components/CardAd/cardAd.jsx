import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function CardAd({ card }) {
  return (
    <Card key={card._id}>
      <Card.Img variant='top' src={card.photo} />
      <Card.Body>
        <Link to={`/adsBoard/${card._id}`}>
          <Card.Title>{card.name}</Card.Title>
        </Link>
        <Card.Text>
          Type: {card.type}
          <br />
          Price: {card.price}€
          <br />
          <br />
          Description:
          <br />
          {card.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>Last updated: {card.updatedAt}</small>
        <Link to={`/editAd/id=${card._id}`}>
          <Button variant='success' size='lg' block>
            Edit Ad
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
