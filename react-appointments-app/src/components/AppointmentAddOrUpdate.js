import React, { useState } from "react";
function AppointmentAddOrUpdate({ onSaveAppointment }) {
    const resetAppointment = {
        petName: "",
        ownerName: "",
        aptDate: "",
        aptTime: "",
        aptNotes: ""
    }

    const [appointment, setAppointment] = useState(resetAppointment)

    const changeHandle = (e) => {
        e.preventDefault();
        if (e.target.name == "petName") {
            const petName = e.target.value;
            appointment.petName=e.target.value;
        }
        else if (e.target.name == "ownerName") {
            const ownerName = e.target.value;
            appointment.ownerName=ownerName;
        }
        else if (e.target.name == "aptDate") {
            const aptDate = e.target.value;
            appointment.aptDate=aptDate;
        }
        else if (e.target.name == "aptTime") {
            const aptTime = e.target.value;
            appointment.aptTime= aptTime;
        }
        else if (e.target.name == "aptNotes") {
            const aptNotes = e.target.value;
            appointment.aptNotes=aptNotes;
        }
        
        setAppointment({...appointment});
    }

    const publish =(e)=>{
        e.preventDefault();
        onSaveAppointment({
            petName:appointment.petName,
            ownerName:appointment.ownerName,
            aptNotes:appointment.aptNotes,
            appDate:appointment.aptDate + " " + appointment.aptTime
        });
        setAppointment({...resetAppointment});
    }

    return (
        <div className="accordion text-primary" id="a1">
            <div className="card">
                <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                        <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Add Appointment
                        </button>
                    </h2>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="petName">Pet Name</label>
                                <input id="petName" name="petName"
                                    type="text"
                                    className="form-control"
                                    value={appointment.petName}
                                    onChange={(e) => { changeHandle(e) }}
                                    required={true} aria-describedby="petNameHelp" />
                                <small id="petNameHelp" className="form-text text-muted">We'll never share your detail with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ownerName">Owner Name</label>
                                <input id="ownerName" name="ownerName"
                                    value={appointment.ownerName}
                                    onChange={(e) => { changeHandle(e) }}
                                    type="text" className="form-control"
                                    required={true} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="aptDate">Appointment Date</label>
                                <input id="aptDate" name="aptDate"
                                    value={appointment.aptDate}
                                    onChange={(e) => { changeHandle(e) }}
                                    type="date" className="form-control"
                                    required={true} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="aptTime">Appointment Time</label>
                                <input id="aptTime" name="aptTime"
                                    type="time" className="form-control"
                                    value={appointment.aptTime}
                                    onChange={(e) => { changeHandle(e) }}
                                    required={true} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="aptNotes">Notes</label>
                                <textarea id="aptNotes" name="aptNotes"
                                    value={appointment.aptNotes}
                                    onChange={(e) => { changeHandle(e) }}
                                    className="form-control"
                                    required={true} />
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={(e) => { publish(e); }}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentAddOrUpdate;