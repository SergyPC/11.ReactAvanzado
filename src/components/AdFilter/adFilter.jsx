import React, { Component } from 'react';
import { getAds, getTags } from '../../js/api.js';
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
// import imgNoDisponible from '../../img/noDisponible.jpg'
import { Card, CardColumns, Form, Col, Button }  from 'react-bootstrap';

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

    // loadTags = () => {
    //     // console.log("Entramos en loadTags");
    //     getTags()
    //     //.then(data => console.log("loadTags (data):", data))
    //     .then(data => this.setState({ tags: data }));
    //     // console.log("this.state.tags:", this.state.tags);
    //     // console.log("Salimos de loadTags");
    // }

    // loadAds = async (search) => {
    //     // console.log("Entramos en loadAds");
    //     // getAds(search)
    //     // .then(data => this.setState({ data: data }));

    //     console.log("Entro en loadAds - adFilter");

    //     const ads = await getAds(search);
    //     // if (ads.error) {
    //     if (ads.error === 'Error: Not logged in') {
    //         //alert('No está logado o su sesión ha expirado. Le redireccionamos a Log In para que lo vuelva a realizar.');
    //         alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
    //         this.props.history.push('/login');
    //     }
    //     else if (ads.error) {
    //         console.log(ads.error);
    //         alert('An unexpected error has occurred (Try again later).');
    //         this.props.history.push('/login');
    //     } else {
    //         this.setState({
    //             data: ads.results,
    //     });
    //     return ads.results;
    //     }

    //     // console.log("this.state.data (getAds):", this.state.data);
    //     // console.log("Salimos de getAds");
    // }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            params:{...this.state.params, [name]: value}
        })
        sessionStorage.setItem(name,value);
    }

    sendSearch = event => {
        event.preventDefault();

        // console.log("this.state.params (adFilter):",this.state.params);

        const {name, minPrice, maxPrice, venta, tag} = this.state.params;

        // console.log("Entramos en sendSearch");
        // console.log("this.state.params (sendSearch):", this.state.params)
        // console.log("name (sendSearch):", name)
        // console.log("venta (sendSearch):", venta)
        // console.log("tag (sendSearch):", tag)

        // let queryParams =`price=${this.state.params.minPrice}-${this.state.params.maxPrice}&venta=${this.state.params.venta}`;
        // if(this.state.params.name) {queryParams = queryParams + `&name=${this.state.params.name}`}
        
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
        this.props.history.push(`/adsBoard?${queryParams}`);
        sessionStorage.setItem("search", queryParams);

        this.props.loadAds(queryParams);

        // console.log("Salimos de sendSearch");

    }

    goToEditAd = (id) => {
        this.props.history.push(`/editAd/id=${id}`);
    }

    goToCreateAd = (id) => {
        // console.log ("this.props", this.props);
        // console.log ("this.props.history", this.props.history);
        this.props.history.push(`/createAd`);
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
        sessionStorage.clear();
        // sessionStorage.removeItem(name);
        this.props.history.push(`/adsBoard?`);
        this.props.loadAds('');
    }

    returnToLogin = () => {
        sessionStorage.clear();
        this.props.history.push(`/login`);
    }

    render() {
        // console.log("this.state.params (render):", this.state.params)
        // console.log("this.state.tags (render):", this.state.tags)
        
        const {name, minPrice, maxPrice, venta, tag} = this.state.params;

        return (
        // console.log("this.state.params (render):", this.state.params)
        // console.log("this.state.tags (render):", this.state.tags)
        
        //const {name, minPrice, maxPrice, venta, tag} = this.state.params;

        
            // <FilterBar data={this.state.data}/> --> convertirlo en componente de filtro
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