import React from "react";
import { API_VEHICLE_LIST } from '../Constants'
import { Container, Row, Col, Button } from "react-bootstrap"

class Vehicles extends React.Component {

    constructor(prop) {
        super(prop);
        this.state = {
            loading: false,
            vehicles: null,
            error: ""
        };
    }

    setVehicles(vehicles) {
        this.setState({ ...this.state, vehicles: vehicles });
    }

    setLoading(loading) {
        this.setState({ ...this.state, loading: loading });
    }
    
    setError(error) {
        this.setState({ ...this.state, error: error });
    }

    getVehicles() {
        if (this.state.loading) return;

        this.setState({ ...this.state, loading: true });

        fetch(API_VEHICLE_LIST)
            .then((response) => response.json())
            .then((x) => {
                console.log(x);
                this.setState({ ...this.state, vehicles: x, loading: false });
            })
            .catch((x) => {
                this.setState({ ...this.state, error: x.message, loading: false });
            });
    }

    componentDidMount() {
        this.getVehicles();
    }

    render() {
        const { loading, vehicles, error } = this.state;
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
        } else if (vehicles != null) {
            return (
                <Container>
                    {vehicles.items.map((vehicle, i) => {
                        return (
                            <Row key={vehicle.id}>
                                <Col>
                                    <div className="py-4">
                                        <p><b>Person Name</b>: {vehicle.person.name}</p>
                                        <p><b>Person's Email</b>: {vehicle.person.email}</p>
                                        <p><b>Person's Phone</b>: {vehicle.person.phone}</p>
                                        <p key={vehicle.make.id}><b>Manufacture</b>: {vehicle.make.name}</p>
                                        <p key={vehicle.model.id}><b>Model</b>: {vehicle.model.name}</p>
                                        <p><b>Registered</b>: {vehicle.isRegistered ? "Yes" : "No"}</p>
                                        <div><b>Features</b>:
                                            <ul>
                                                {
                                                    vehicle.features.map((f) => {
                                                        return (
                                                            <li key={f.id}>{f.name}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div>
                                            <a className="btn btn-primary" href={"/update-vehicle?id="+String(vehicle.id)}>Update</a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )
                    })}
                </Container>
            );
        } else {
            return "";
        }
    }
}


// function x(
//     const [vehicles, setVehicles] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//       if (loading) return;
//       setLoading(true);
//       fetch(API_VEHICLE_LIST)
//         .then((response) => response.json())
//         .then((x) => {
//           setVehicles(x);
//         })
//         .then(() => setLoading(false))
//         .catch((x) => {
//           setError(x);
//           setLoading(false);
//         });
//     }, [])


//     if (loading) {
//       return 'loading...';
//     } else {
//       if (vehicles) {
//         return (
//           <ul>
//             {vehicles.items.map((vehicle) => {
//               return <li key={vehicle.id}>
//                 <p>{vehicle.person.name}</p>
//                 <p>{vehicle.person.email}</p>
//                 <p>{vehicle.person.phone}</p>
//                 <p key={vehicle.make.id}>{vehicle.make.name}</p>
//                 <p key={vehicle.model.id}>{vehicle.model.name}</p>
//                 <ul>
//                   {
//                     vehicle.features.map((f) => {
//                       return (
//                         <li key={f.id}>{f.name}</li>
//                       )
//                     })
//                   }
//                 </ul>
//               </li>
//             })}
//           </ul>
//         )
//       }
//       else {
//         return (
//           <>
//             <Header name="Rajasthan" />
//             <Main dishes={dishObject} />
//             <Footer year={new Date().getFullYear()} />
//           </>
//         )
//       }
//     }  
// )


export default Vehicles;