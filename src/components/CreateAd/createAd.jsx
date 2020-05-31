import React, { Component } from 'react';
import { createAd, fetchAds, getTags } from '../../js/api.js';
import Navbarr from '../Navbar/navbar';
import { Form, Col, Button }  from 'react-bootstrap';
import Swal from 'sweetalert2';

export default class CreateAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            description: '',
            tags: [],
            optionsTag: [],
            type: '',
            photo: '',

            lifestyle: false,
            mobile: false,
            motor: false,
            work: false,
        };
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(name!=='lifestyle' || name!=='mobile' || name!=='motor' || name!=='work') {
            this.setState({
                [name]: value
            });
        }

        if(name==='lifestyle' || name==='mobile' || name==='motor' || name==='work') {
            //console.log("---event.target: ", event.target.checked)
            this.setState({ [name]: event.target.checked });
        }
    }

    loadAds = async (search) => {
        const ads = await fetchAds(search);
        if (ads.error) {
            //alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `You are not logged in, or your session has been expired. We redirect you to Log In to do it again.`,
                //footer: '<a href>Why do I have this issue?</a>'
                //showConfirmButton: false,
                timer: 5000
            });
            this.props.history.push('/login');
        } else {
            this.setState({
                data: ads.results,
        });
        return ads.results;
        }
    }

    // loadTags = () => {
    //     getTags()
    //     .then(data => this.setState({ tags: data }));
    // }

    loadTags = () => {
        getTags()
        .then(data => this.setState({ optionsTag: data }));
    }

    componentDidMount() {
        // if (adCreated.error === 'Error: Not logged in') {
        //     alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
        //     this.props.history.push('/login');
        // }
        this.loadAds('');
        this.loadTags();
    }

    sendCreateAd = async (event) => {
        event.preventDefault();
        const { name, price, description, lifestyle, mobile, motor, work, type, photo } = this.state;

        let myTags = [];
        if (lifestyle)
            myTags.push('lifestyle');
        if (mobile)
            myTags.push('mobile');
        if (motor)
            myTags.push('motor');
        if (work)
            myTags.push('work');
        
        const adCreated = await createAd (name, price, description, myTags, type, photo);
        
        if (adCreated.error === 'Error: Not logged in') {
            //alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `You are not logged in, or your session has been expired. We redirect you to Log In to do it again.`,
                //footer: '<a href>Why do I have this issue?</a>'
                //showConfirmButton: false,
                timer: 5000
            });
            this.props.history.push('/login');
        }
        else if (adCreated.error) {
        //if (adCreated.error === 'Error: Not logged in') {
            console.log(adCreated.error);
            //alert('The ad could not be created (try again or later).');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `The ad could not be created (try again or later).`,
                //footer: '<a href>Why do I have this issue?</a>'
                //showConfirmButton: false,
                timer: 5000
            });
        } else {
            //alert('The ad was created successfully.');
            Swal.fire({
                icon: 'success',
                title: 'Correct Creation',
                text: `The ad was created successfully.`,
                //footer: '<a href>Why do I have this issue?</a>'
                //showConfirmButton: false,
                timer: 5000
            });
            this.props.history.push('/adsBoard?');
        }
    }

    returnToAdsBoard = () => {
        this.props.history.push(`/adsBoard?`);
    }

    returnToLogin = () => {
        this.props.history.push(`/login`);
    }

    render() {
        return (
        <div>

            <Navbarr />
            <h1 className='titleName'>Create Advertisement</h1>
            <form onSubmit={this.sendCreateAd}>

                <Form.Group controlId="formGridTitle">
                    <Form.Label className='label'>Title of the ad:</Form.Label>
                    <Form.Control type="text" 
                        name="name" 
                        maxLength="50"
                        placeholder="Add the title of the ad" 
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox"> 
                    <Form.Label className='label'>Tags of the ad:</Form.Label>
                    {this.state.optionsTag.map(item => {
                        if (item !== null) {
                            return (
                                <Form.Check type="switch" name={item} id={item} key={item} value={item} label={item} onChange={this.handleChange} />
                            );
                        }
                    })}
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridMinPrice">
                        <Form.Label className='label'>Type of ad:</Form.Label>
                        <Form.Control as="select" 
                            name="type"
                            onChange={this.handleChange}
                            value={this.state.venta} required>
                            <option value="" defaultValue>Select the type of ad (Buy/Sell)</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMaxPrice">
                        <Form.Label className='label'>Price of the ad:</Form.Label>
                        <Form.Control type="number" 
                            name="price" 
                            placeholder="Add the price of the ad" 
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                </Form.Row>
                
                <Form.Group controlId="formGridPhoto">
                    <Form.Label className='label'>Ad photo link:</Form.Label>
                    <Form.Control type="text" 
                        name="photo" 
                        maxLength="120"
                        placeholder="Add the link to the ad photo" 
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group controlId="formGridDescription">
                    <Form.Label className='label'>Description of the ad:</Form.Label>
                    <Form.Control as="textarea" 
                        name="description"
                        rows="3"
                        maxLength="85"
                        placeholder="Add the description of the ad"
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="7" controlId="formGridCreateAd">
                        <Button type="submit" variant="primary" size="lg" block>
                            Create advertisement
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="formGridReturnAds">
                        <Button variant="warning" size="lg" block onClick={this.returnToAdsBoard}>
                            Return to Ads 
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="formGridLogOut">
                        <Button variant="danger" size="lg" block onClick={this.returnToLogin}>
                            Log Out
                        </Button>
                    </Form.Group>
                </Form.Row>

            </form>
            <br />
        </div>

        )
    }
}