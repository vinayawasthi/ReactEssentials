import React, { useState, useEffect, useCallback } from "react";
import AppointmentAddOrUpdate from "./AppointmentAddOrUpdate";
import AppointmentInfo from './AppointmentInfo';
import AppointmentSearchBox  from './AppointmentSearchBox';

function AppointmentList() {
    let [appointments, setAppointments] = useState([])
    let [query, SetQuery] = useState("")
    let [sortBy, SetSortBy] = useState("aptDate")
    let [orderBy, SetOrderBy] = useState("desc");

    const fetchData = useCallback(() => {
        fetch('./data.json')
            .then((response) => response.json())
            .then((data) => {
                setAppointments(data);
                console.log(appointments);
            });
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const filterAppointments = appointments.filter((x, i) => {
        return (
            x.petName.toLowerCase().includes(query.toLowerCase()) ||
            x.ownerName.toLowerCase().includes(query.toLowerCase()) ||
            x.aptNotes.toLowerCase().includes(query.toLowerCase())
        )
    }).sort((a, b) => {
        let order = (orderBy === 'asc') ? 1 : -1;
        return (a[sortBy] > b[sortBy] ? 1 : -1) * order;
    })

    const SaveAppointment= (appointment)=>{
        const ids = appointments.map((x)=> {
            return x.id
        });
        const max = Math.max(...ids);
        appointment.id = max+1;
        appointments.push(appointment);
    }

    return (
        <div className="container">
            <AppointmentAddOrUpdate onSaveAppointment={(x) => { SaveAppointment(x) }} />
            <div className="searchbox">
                <AppointmentSearchBox
                    query={query}
                    onQueryChange={(query) => { SetQuery(query) }}
                    sortBy={sortBy}
                    onSortByChange={(sortBy) => { SetSortBy(sortBy) }}
                    orderBy={orderBy}
                    onOrderByChange={(orderBy) => { SetOrderBy(orderBy) }} />
            </div>
            <div className="appointments">
                {filterAppointments.map((appointment, i) => {
                    return <AppointmentInfo
                        key={appointment.id}
                        appointment={appointment}
                        onDeleteAppointment={
                            appointmentId => setAppointments(appointments.filter(appointment => appointment.id !== appointmentId))
                        } />
                })}
            </div>
        </div>

    )
}

export default AppointmentList;