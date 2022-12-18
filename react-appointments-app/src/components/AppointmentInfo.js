import React, { useState } from "react";

function AppointmentInfo({ appointment, onDeleteAppointment }) {
    return (
        <div className="item card mb-3" key={appointment.id}>
            <div className="card-body text-primary">
                <p>Pet Name : {appointment.petName}</p>
                <p>Owner Name : {appointment.ownerName}</p>
                <p>Notes : <br /> {appointment.aptNotes}</p>
                <p>Appointment Date : {appointment.aptDate}</p>

                <input type="button" className="btn btn-danger push-left" value="delete" onClick={() => { onDeleteAppointment(appointment.id) }} />
            </div>
        </div>
    )
}

export default AppointmentInfo;