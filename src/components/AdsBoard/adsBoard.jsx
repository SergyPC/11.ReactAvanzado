import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import imgNoDisponible from '../../img/noDisponible.jpg'
import { CardColumns }  from 'react-bootstrap';
import Navbar from '../Navbar/navbar';
import AdFilter from '../AdFilter/adFilter';
import CardAd from '../CardAd/cardAd';

export default class AdsBoard extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     search: sessionStorage.getItem('search') ? sessionStorage.getItem('search') : '',
        //     data: [],
        //     tags: [],
        //     params: {
        //         name: sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '',
        //         minPrice: sessionStorage.getItem('minPrice') ? sessionStorage.getItem('minPrice') : '',
        //         maxPrice: sessionStorage.getItem('maxPrice') ? sessionStorage.getItem('maxPrice') : '',
        //         venta: sessionStorage.getItem('venta') ? sessionStorage.getItem('venta') : '',
        //         tag: sessionStorage.getItem('tag') ? sessionStorage.getItem('tag') : '',
        //     }
        // };
    }

    componentDidMount() {
        this.props.getUserFromStorage();
        this.props.fetchAds();
        this.props.fetchTags();
    }

    render() {
        return (
            <div>
                <Navbar />
                <AdFilter tags={this.props.tags} props={this.props} />
                <AdList ads={this.props.ads} props={this.props} /> 
            </div>
        )
    }
}

function AdList ({ads}) {
    return(
        <div>
            <CardColumns>
                {ads.map(card => {
                    //const photo = ((card.photo.indexOf("http://") > -1) || (card.photo.indexOf("https://") > -1)) ? card.photo : 'http://www.sogarca.com/wp-content/uploads/2015/06/No-disponible.jpg';
                    card.photo = ((card.photo.indexOf("http://") > -1) || (card.photo.indexOf("https://") > -1)) ? card.photo : imgNoDisponible;
                        return (<CardAd key={card._id} card={card} />);
                        // return (
                        //     <Card key={card._id}>
                        //         <Card.Img variant="top" src={card.photo} />
                        //         <Card.Body>
                        //             <Link to={`/adsBoard/${card._id}`}>
                        //                 <Card.Title>{card.name}</Card.Title>
                        //             </Link>
                        //             <Card.Text>
                        //                 Type: {card.type}
                        //                 <br />
                        //                 Price: {card.price}€
                        //                 <br /><br />
                        //                 Description:
                        //                 <br />
                        //                 {card.description}
                        //             </Card.Text>
                        //         </Card.Body>
                        //         <Card.Footer>
                        //             <small className="text-muted">Last updated: {card.updatedAt}</small>
                        //             <Link to={`/editAd/id=${card._id}`}>
                        //                 <Button variant="success" size="lg" block>
                        //                     Edit Ad
                        //                 </Button>
                        //             </Link>
                        //         </Card.Footer>
                        //     </Card>
                        // );
                    })
                }
            </CardColumns>
        </div>
    )
};
