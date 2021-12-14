import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { API_MAKES, API_FEATURES, API_VEHICLE } from '../Constants'

class AddOrUpdateVehicle extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            submitting: false,
            loading: false,
            makes: [],
            models: [],
            features: [],
            vehicle: {
                id: 0,
                person: {
                    name: "",
                    email: "",
                    phone: ""
                },
                isRegistered: false,
                make: null,
                model: null,
                features: []
            },
            error: ""
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.saveVehicle();
    }

    handleChange(event) {
        const vehicle = this.state.vehicle;
        const isCheckbox = event.target.type === 'checkbox';
        const value = isCheckbox ? event.target.checked : event.target.value;

        // console.log(event.target.name);
        // console.log(isCheckbox ? event.target.checked : event.target.value);

        switch (event.target.name) {
            case "personName":
                vehicle.person.name = value;
                break;
            case "personEmail":
                vehicle.person.email = value;
                break;
            case "personPhone":
                vehicle.person.phone = value;
                break;
            case "isRegistered":
                vehicle.isRegistered = value;
                break;
            case "vehicleMake":
                if(value){
                    vehicle.make = { id:parseInt(value, 10), title:""};
                    vehicle.model = null;
                    this.onMakeChange(vehicle.make.id);
                }
                break;
            case "vehicleModel":
                if(value){
                    vehicle.model = { id:parseInt(value, 10), title:""};
                }
                break;
            case "feature[]":
                if (vehicle.features.some(x => x.id == event.target.value) && !value) {
                    vehicle.features = vehicle.features.filter(x => x.id != parseInt(event.target.value, 10));
                } else {
                    vehicle.features.push({ id: parseInt(event.target.value, 10), name: "" })
                }
                break;
            default:
                break;
        }

        this.setState({ ...this.state, vehicle: vehicle })
    }

    onMakeChange(makeId) {
        if (makeId && makeId > 0 ) {
            let i = this.state.makes.find((item, i) => {
                return item.id === makeId;
            });

            const models = [];
            i.models.forEach(element => {
                models.push(element);
            });

            this.setState({ ...this.state, models: models });
        } else {
            this.setState({ ...this.state, models: [] });
        }
    }

    getMakes() {
        if (this.state.loading) return;

        this.setState({ ...this.state, loading: true });

        fetch(API_MAKES)
            .then((response) => response.json())
            .then((x) => {
                this.setState({ ...this.state, makes: x, loading: false });
                //console.log(this.state);
                if (this.props.vehicleId)
                    this.getVehicle();
            })
            .catch((x) => {
                this.setState({ ...this.state, error: x.message, loading: false });
            });
    }

    getFeatures() {
        if (this.state.loading) return;

        this.setState({ ...this.state, loading: true });

        fetch(API_FEATURES)
            .then((response) => response.json())
            .then((x) => {
                this.setState({ ...this.state, features: x, loading: false });
                //console.log(this.state);
                this.getMakes();
            })
            .catch((x) => {
                this.setState({ ...this.state, error: x.message, loading: false });
            });
    }

    getVehicle() {
        if (this.state.loading) return;

        this.setState({ ...this.state, loading: true });

        fetch(API_VEHICLE + String(this.props.vehicleId))
            .then((response) => response.json())
            .then((x) => {
                this.setState({ ...this.state, vehicle: x, loading: false });
                console.log("xxx",this.state.vehicle);
                console.log(this.state.vehicle.make.id);
                console.log(x.make.id);
                this.onMakeChange(x.make.id);
            })
            .catch((x) => {
                this.setState({ ...this.state, error: x.message, loading: false });
            });
    }

    saveVehicle() {
        if (this.state.submitting) return;

        this.setState({ ...this.state, submitting: true });

        const vehicle = this.state.vehicle;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                id:vehicle.id,
                person: vehicle.person,
                modelId: vehicle.model.id,
                isRegistered:vehicle.isRegistered,
                features: vehicle.features.map((x,i)=> { return x.id })
            })
        };
        
        console.log("body", requestOptions.body);

        fetch(API_VEHICLE, requestOptions)
            .then((response) => response.json())
            .then((x) => {
                console.log(x);
                //this.setState({...this.state, submitting:false});
                this.resetState();
            })
            .catch((x) => {
                this.setState({ ...this.state, error: x.message, submitting: false });
            });
    }

    resetState() {
        this.setState({
            ...this.state,
            submitting: false,
            loading: false,
            models: [],
            vehicle: {
                id: 0,
                person: {
                    name: "",
                    email: "",
                    phone: ""
                },
                isRegistered: false,
                make: null,
                model: null,
                features: []
            },
            error: ""
        });
        console.log(this.props.vehicleId);
        if(this.props.vehicleId){
            console.log("reset vehicle");
            this.getVehicle();
        }
        console.log(this.state);
    }

    componentDidMount() {
        this.getFeatures();
    }


    render() {
        const { loading, vehicle, error } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (loading) {
            return (
                <div className="d-flex justify-content-center py-5">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
        else if (vehicle) {
            return (
                <Container>
                    <Row>
                        <Col className="py-4">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Person Name</Form.Label>
                                    <Form.Control type="text" size="lg" placeholder="Enter Name"
                                        id="personName"
                                        name="personName"
                                        value={vehicle?.person?.name}
                                        onChange={event => { this.handleChange(event) }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Person Email</Form.Label>
                                    <Form.Control type="email" size="lg" placeholder="Enter Email"
                                        id="personEmail"
                                        name="personEmail"
                                        value={vehicle?.person?.email}
                                        onChange={event => { this.handleChange(event) }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Person Phone</Form.Label>
                                    <Form.Control type="text" size="lg" placeholder="Enter Phone"
                                        id="personPhone"
                                        name="personPhone"
                                        value={vehicle?.person?.phone}
                                        onChange={event => { this.handleChange(event) }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Is Registered</Form.Label>
                                    <div className="">
                                        <Form.Check
                                            size="lg"
                                            label=""
                                            name="isRegistered"
                                            id="isRegistered"
                                            type="checkbox"
                                            checked={vehicle?.isRegistered}
                                            onChange={event => { this.handleChange(event) }}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Make</Form.Label>
                                    <Form.Select size="lg" className="form-control"
                                        id="vehicleMake"
                                        name="vehicleMake"
                                        value={ vehicle?.make ? vehicle.make.id : ""}
                                        onChange={event => { this.handleChange(event) }} >
                                        <option>Select Make</option>
                                        {this.state.makes?.map((make, i) => {
                                            return <option key={make.id} value={make.id}>{make.name}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Select size="lg" className="form-control"
                                        id="vehicleModel"
                                        name="vehicleModel"
                                        value={ vehicle?.model ? vehicle?.model.id: ""}
                                        onChange={event => { this.handleChange(event) }}>
                                        <option>Select Model</option>
                                        {this.state.models?.map((model, i) => {
                                            return <option key={model.id} value={model.id}>{model.name}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Features</Form.Label>
                                    <div className="">
                                        {this.state.features?.map((feature, i) => {
                                            return (
                                                <Form.Check
                                                    inline
                                                    id={`feature-` + i.toString()}
                                                    name="feature[]"
                                                    type="checkbox"
                                                    key={feature.id}
                                                    value={feature.id}
                                                    label={feature.name}
                                                    checked={vehicle?.features.some(x => x.id == feature.id)}
                                                    onChange={event => { this.handleChange(event) }}
                                                />
                                            )
                                        })}
                                    </div>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Button type="submit" onClick={e => { 
                                            this.handleSubmit(e) 
                                        }}>Submit</Button>
                                        {" "}
                                        <Button type="reset" onClick={e => {
                                            e.preventDefault(); 
                                            this.resetState();
                                        }}>Reset</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )
        }
        else {
            return ""
        }
    }
}

export default AddOrUpdateVehicle;