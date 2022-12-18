import React, { useState } from "react";

function AppointmentSearchBox({ query, onQueryChange, sortBy, onSortByChange, orderBy, onOrderByChange }) {
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
                    <a className="dropdown-item" href="/#"
                        onClick={(e) => { onSortByChange("petName") }}>Pet Name {sortBy === "petName" ? "*" : ""}</a>
                    <a className="dropdown-item" href="/#"
                        onClick={(e) => { onSortByChange("ownerName") }}>Owner Name {sortBy === "ownerName" ? "*" : ""}</a>
                    <a className="dropdown-item" href="/#"
                        onClick={(e) => { onSortByChange("aptDate") }}>Date {sortBy === "aptDate" ? "*" : ""}</a>

                    <a className="dropdown-item" href="/#"
                        onClick={(e) => { onOrderByChange("asc") }}>Order By : ASC {orderBy === "asc" ? "*" : ""}</a>
                    <a className="dropdown-item" href="/#"
                        onClick={(e) => { onOrderByChange("desc") }}>Order By : DESC {orderBy === "desc" ? "*" : ""}</a>
                </div>
            </div>
        </div>
    )
}

export default AppointmentSearchBox;