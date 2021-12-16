import React, { useState, useEffect, useCallback } from "react";

function SearchBox({ query, onQueryChange, sortBy, onSortByChange, orderBy, onOrderByChange }) {
    const [toggleSort, setToggleSort] = useState(false)

    return (

        <div className="input-group my-2">
            <input type="text" className="form-control" id="q" placeholder="Search"
                value={query}
                onChange={(e) => { onQueryChange(e.target.value) }} />
            <div className={toggleSort ? "btn-group show" : "btn-group"} role="group">
                <button id="btnSortBy" type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="false"
                    aria-expanded={toggleSort ? "true" : "false"}
                    onClick={() => { setToggleSort(!toggleSort); console.log(toggleSort); }}
                >Sort By</button>
                <div className={toggleSort ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="btnSortBy">
                    <a className="dropdown-item" href="#"
                        onClick={(e) => { onSortByChange("petName") }}>Pet Name {sortBy == "petName" ? "*" : ""}</a>
                    <a className="dropdown-item" href="#"
                        onClick={(e) => { onSortByChange("ownerName") }}>Owner Name {sortBy == "ownerName" ? "*" : ""}</a>
                    <a className="dropdown-item" href="#"
                        onClick={(e) => { onSortByChange("aptDate") }}>Date {sortBy == "aptDate" ? "*" : ""}</a>

                    <a className="dropdown-item" href="#"
                        onClick={(e) => { onOrderByChange("asc") }}>Order By : ASC {orderBy == "asc" ? "*" : ""}</a>
                    <a className="dropdown-item" href="#"
                        onClick={(e) => { onOrderByChange("desc") }}>Order By : DESC {orderBy == "desc" ? "*" : ""}</a>
                </div>
            </div>
        </div>
    )
}

function AppointmentInfo({ appointment, onDeleteAppointment }) {
    return (
        <div className="item card mb-3" key={appointment.id}>
            <div className="card-body text-primary">
                <p>Pet Name : {appointment.petName}</p>
                <p>Owner Name : {appointment.ownerName}</p>
                <p>Notes : <br /> {appointment.aptNotes}</p>
                <p>Appointment Date : {appointment.apDate}</p>

                <input type="button" className="btn btn-danger push-left" value="delete" onClick={() => { onDeleteAppointment(appointment.id) }} />
            </div>
        </div>
    )
}

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

    return (
        <div className="container">
            <div className="searchbox">
                <SearchBox
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