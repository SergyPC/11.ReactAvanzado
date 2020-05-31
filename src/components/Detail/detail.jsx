import React, {Component} from 'react';
import { getAd } from '../../js/api.js';
import { Link } from "react-router-dom";
import { Card, Form, Col, Button }  from 'react-bootstrap';
import Navbarr from '../Navbar/navbar';
import imgNoDisponible from '../../img/noDisponible.jpg';

export default class Detail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
        }
    };

    componentDidMount() {
        // Sólo se llama una vez, en el cliente, en comparación con el componentWillMount() que se llama dos veces, una vez al servidor y una vez al cliente. 
        // Se llama después del renderizado inicial cuando el cliente recibió datos del servidor y antes de que los datos se muestren en el navegador. 
        // Debido al hecho de que los datos no se cargarán hasta después del procesamiento inicial, el desarrollador NECESITA configurar correctamente el estado inicial de los componentes.
        this.loadAd(this.props.match.params._id)
    }

    returnToAdsBoard = () => {
        this.props.history.push(`/adsBoard?`);
    }

    returnToLogin = () => {
        this.props.history.push(`/login`);
    }

    loadAd = async (id) => {
        const ad = await getAd(id);
        if (ad.error === 'Error: Not logged in') {
            console.log(ad.error);
            //alert('No está logado o su sesión ha expirado. Le redireccionamos a Log In para que lo vuelva a realizar.');
            alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
            this.props.history.push('/login');
        }
        else if (ad.error) {
            console.log(ad.error);
            alert('An unexpected error has occurred (Try again later).');
            this.props.history.push('/adsBoard');
        } else {
            this.setState({
                data: ad.result
        });
        return ad.result;
        }
    }
    
    render() {
        const data = this.state.data;
        //imgNoDisponible=http://www.sogarca.com/wp-content/uploads/2015/06/No-disponible.jpg
        let photo = '';
        if(data.photo !== undefined)
            photo = ((data.photo.indexOf("http://") > -1) || (data.photo.indexOf("https://") > -1)) ? data.photo : imgNoDisponible;
        
        return (
            <>
                {/* <Navbarr data={this.state.data} /> */}
                <Navbarr />
                
                &nbsp;
                <Form.Row>
                    <Form.Group as={Col} md="10" controlId="formGridCreateAd1">
                        <Button variant="primary" size="lg" block onClick={this.returnToAdsBoard}>
                            Return to advertisements
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="formGridReturnAds1">
                        <Button variant="danger" size="lg" block onClick={this.returnToLogin}>
                            Log Out
                        </Button>
                    </Form.Group>
                </Form.Row>
            
                <Card key={data._id}>
                    <Card.Img variant="top" src={photo} />
                    <Card.Body>
                        <Link to={`/adsBoard/${data._id}`}>
                            <Card.Title>{data.name}</Card.Title>
                        </Link>
                        <Card.Text>
                            Type: {data.type}
                            <br />
                            Price: {data.price}€
                            <br /><br />
                            Description:
                            <br />
                            {data.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated: {data.updatedAt}</small>
                    </Card.Footer>
                </Card>

                <br />

                <Form.Row>
                    <Form.Group as={Col} md="10" controlId="formGridCreateAd2">
                        <Button variant="primary" size="lg" block onClick={this.returnToAdsBoard}>
                            Return to advertisements
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="formGridReturnAds2">
                        <Button variant="danger" size="lg" block onClick={this.returnToLogin}>
                            Log Out
                        </Button>
                    </Form.Group>
                </Form.Row>
            </>
        )
    };
}