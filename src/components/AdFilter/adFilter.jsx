import React, { Component } from 'react';
//import { getAds, getTags } from '../../js/api.js';
//import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
// import imgNoDisponible from '../../img/noDisponible.jpg'
import { Form, Col, Button }  from 'react-bootstrap';

export default class AdFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: sessionStorage.getItem('search') ? sessionStorage.getItem('search') : '',
            data: [],
            tags: [],
            params: {
                name: sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '',
                minPrice: sessionStorage.getItem('minPrice') ? sessionStorage.getItem('minPrice') : '',
                maxPrice: sessionStorage.getItem('maxPrice') ? sessionStorage.getItem('maxPrice') : '',
                venta: sessionStorage.getItem('venta') ? sessionStorage.getItem('venta') : '',
                tag: sessionStorage.getItem('tag') ? sessionStorage.getItem('tag') : '',
            }
        };
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            params:{...this.state.params, [name]: value}
        })
        sessionStorage.setItem(name,value);
    };

    sendSearch = event => {
        event.preventDefault();
        const {name, minPrice, maxPrice, venta, tag} = this.state.params;

        let queryParams = "true";

        queryParams = name !== '' ? queryParams += `&name=${name}` : queryParams += '';
        queryParams = venta !== '' ? queryParams += `&venta=${venta}` : queryParams += '';
        queryParams = tag ? queryParams += `&tag=${tag}` : queryParams += '';
        if(minPrice && maxPrice) {
            queryParams = queryParams += `&price=${minPrice}-${maxPrice}`
        }
        else {
            if(minPrice || maxPrice) {
                queryParams = (!minPrice && maxPrice) ? queryParams += `&price=0-${maxPrice}` : queryParams += `&price=${minPrice}-999999999999999999999999999999999999`;
            }
        }

        this.setState({search: queryParams});
        this.props.props.history.push(`/adsBoard?${queryParams}`);
        sessionStorage.setItem("search", queryParams);
        this.props.props.fetchAds(queryParams);
    }

    goToEditAd = (id) => {
        this.props.props.history.push(`/editAd/id=${id}`);
    }

    goToCreateAd = (id) => {
        this.props.props.history.push(`/createAd`);
    }

    clearFilter = () => {
        this.setState({
            params: { ...this.state.params,
                name: '',
                minPrice: '',
                maxPrice: '',
                venta: '',
                tag: '',
            }
        })
        // sessionStorage.clear();
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('minPrice');
        sessionStorage.removeItem('maxPrice');
        sessionStorage.removeItem('venta');
        sessionStorage.removeItem('tag');
        this.props.props.history.push(`/adsBoard?`);
        this.props.props.fetchAds('');
    }

    returnToLogin = () => {
        sessionStorage.clear();
        this.props.props.history.push(`/login`);
    }

    render() {
        const {name, minPrice, maxPrice, venta, tag} = this.state.params;
        return (
            <div>
                <form onSubmit={this.sendSearch}>
                    <Form.Group controlId="exampleForm.ControlSelect1">

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCreateAd">
                                <Button variant="dark" size="lg" block onClick={this.goToCreateAd}>
                                    Create Ad
                                </Button>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="2.5" controlId="formGridTypeSearch">
                                <Form.Label className='label'>What are you looking for?</Form.Label>
                                <Form.Control as="select" 
                                        name="venta"
                                        onChange={this.handleChange}
                                        // value={sessionStorage.getItem("venta")}>
                                        value={venta}>
                                    <option value="" defaultValue>Select Buy/Sell</option>
                                    <option value="false">Buy</option>
                                    <option value="true">Sell</option>
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md="2.5" controlId="formGridTypeTags">
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control as="select" 
                                    name="tag"
                                    onChange={this.handleChange}
                                    value={tag}>
                                    {/* value={sessionStorage.getItem("tag")}> */}
                                        <option value="" defaultValue>Select tag</option>
                                        {this.props.tags.map(itemTag => {
                                            if (itemTag !== null) {
                                                return (
                                                    <option key={itemTag} value={itemTag}>{itemTag}</option>
                                                );
                                            }
                                        })}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLookingFor">
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter what you are looking for"
                                    // value= {this.state.params.name}
                                    value= {name}
                                    name="name"
                                    onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridMinPrice">
                                <Form.Label className='label'>Minimal price</Form.Label>
                                <Form.Control type="number" 
                                    placeholder="Enter minimal price" 
                                    onChange={this.handleChange}
                                    name="minPrice" 
                                    // value = {sessionStorage.getItem("minPrice")} />
                                    value = {minPrice} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMaxPrice">
                                <Form.Label className='label'>Maximum price</Form.Label>
                                <Form.Control type="number" 
                                    placeholder="Enter maximum price" 
                                    onChange={this.handleChange}
                                    name="maxPrice" 
                                    // value= {sessionStorage.getItem("maxPrice")}/>
                                    value= {maxPrice}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="8" controlId="formGridSearch">
                                <Button type="submit" variant="primary" size="lg" block>
                                    Search ADs
                                </Button>
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="formGridClearFilter">
                                <Button variant="warning" size="lg" block onClick={this.clearFilter}>
                                    ClearFilter
                                </Button>
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="formGridLogOut">
                                <Button variant="danger" size="lg" block onClick={this.returnToLogin}>
                                    Log Out
                                </Button>
                            </Form.Group>
                        </Form.Row>

                    </Form.Group>
                </form>
            </div>
        )
    }
}