import React from "react";
import { useState } from "react";
import "./CoachesOverview.css";

export default function CoachesOverview({
  listOfCoaches,
  setListOfCoaches,
  setSelectedCoach,
}) {
  const [viewCoachesOrSentRequests, setViewCoachesOrSentRequests] =
    useState("Coaches");
  const [viewFilters, setViewFilters] = useState(false);

  const handleOnSentRequestsTabClick = () => {
    setViewCoachesOrSentRequests("Sent Requests");
  };

  const handleOnCoachesTabClick = () => {
    setViewCoachesOrSentRequests("Coaches");
  };

  return (
    <div className="coaches-overview">
      <div className="coaches-or-sent-requests-tab">
        <div
          className={
            viewCoachesOrSentRequests === "Coaches"
              ? "coaches-tab selected"
              : "coaches-tab"
          }
          onClick={handleOnCoachesTabClick}
        >
          <p className="tab">Coaches</p>
        </div>
        <div>|</div>
        <div
          className={
            viewCoachesOrSentRequests === "Sent Requests"
              ? "sent-requests-tab selected"
              : "sent-requests-tab"
          }
          onClick={handleOnSentRequestsTabClick}
        >
          <p className="tab">Sent Requests</p>
        </div>
      </div>
      <SearchForCoachByName />
      <div>Show filters</div>
      <FilterForCoaches />
      {listOfCoaches?.length <= 0 ? (
        <div>No Coaches Available!</div>
      ) : (
        listOfCoaches?.map((coach) => <CoachCard name={coach.name} />)
      )}
    </div>
  );
}

export function SearchForCoachByName() {
  return (
    <div className="coach-search">
      <input
        className="search-input"
        type="text"
        name="search"
        placeholder="search for a coach"
      />
      <button className="search-btn">
        <i className="material-icons">search</i>
      </button>
    </div>
  );
}

export function FilterForCoaches() {
  var availability = ["morning", "afternoon", "night"];
  return (
    <div className="select-availability">
      <div className="select-availability-dropdown">
        <select
          name="selectList"
          id="selectList"
          placeholder="Select availability"
          // onChange={(evt) => setSelectedAvailability(evt.target.value)}
          // value={selectedAvailability}
        >
          {availability?.map((c) => (
            <option value={c} key={c.id}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function CoachCard({ nameOfCoach }) {
  return (
    <div className="coach-card">
      <p>{nameOfCoach}</p>
    </div>
  );
}
