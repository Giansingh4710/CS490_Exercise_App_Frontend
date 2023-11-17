import React, { useEffect } from "react";
import { useState } from "react";
import "./CoachesOverview.css";

/*
components broken down:
    CoachesOverveiw 
        * the overall container where a user can search, filter and view the results for coaches 
        * holds all of the following components

    CoachOrSentRequest
        * The heading area, holds 2 tabs, Coaches or Sent Requests, user cna click on either tab
       
    SearchForCoachByName
        * the search bar and button 
       
    FilterForCoaches
        * the filters, & has 3 dropdown componenets ReviewDropdown, LocationDropdown, AvailabilityDropdown
       
    CoachList
        * the container that will hold all the coaches available based on the filter and search
    
    Coach Card
        * an individual card that holds the name of the coach 
*/
export default function CoachesOverview({
  listOfCoaches,
  setListOfCoaches,
  selectedCoach,
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

  var listOfMockCoaches = [
    {
      name: "John Smith",
      specialty: "Fitness Trainer",
      experienceYears: 5,
      rating: 4.5,
    },
    {
      name: "Emma Johnson",
      specialty: "Yoga Instructor",
      experienceYears: 3,
      rating: 4.7,
    },
    {
      name: "Michael Brown",
      specialty: "Nutritionist",
      experienceYears: 6,
      rating: 4.6,
    },
    {
      name: "Sophia Davis",
      specialty: "Personal Trainer",
      experienceYears: 4,
      rating: 4.8,
    },
    {
      name: "David Martinez",
      specialty: "Wellness Coach",
      experienceYears: 7,
      rating: 4.4,
    },
  ];

  return (
    <div className="coaches-overview">
      <CoachOrSentRequest
        viewCoachesOrSentRequests={viewCoachesOrSentRequests}
        handleOnSentRequestsTabClick={handleOnSentRequestsTabClick}
        handleOnCoachesTabClick={handleOnCoachesTabClick}
      />
      <SearchForCoachByName />
      <FilterForCoaches />
      <CoachList
        listOfCoaches={listOfMockCoaches}
        setSelectedCoach={setSelectedCoach}
        selectedCoach={selectedCoach}
      />
    </div>
  );
}

export function CoachOrSentRequest({
  viewCoachesOrSentRequests,
  handleOnSentRequestsTabClick,
  handleOnCoachesTabClick,
}) {
  return (
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
      <div className="divider">|</div>
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
  return (
    <div className="filter-container">
      <div className="filter-label">Filters</div>
      <div className="filter-select-container">
        <ReviewDropdown />
        <LocationDropdown />
        <AvailabilityDropdown />
      </div>
    </div>
  );
}

export function ReviewDropdown() {
  var reviews = ["☆+", "☆☆+", "☆☆☆+", "☆☆☆☆+", "☆☆☆☆☆+"];
  return (
    <div className="select-reviews-dropdown">
      <select
        required
        name="selectList"
        id="selectList"
        placeholder="Select rating"
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      >
        {/* <option value="">Example Placeholder</option> */}

        {reviews?.map((c) => (
          <option value={c.id} key={c.id}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
export function LocationDropdown() {
  var locations = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  return (
    <div className="select-location-dropdown">
      <select
        name="selectList"
        id="selectList"
        placeholder="Select location"
        // onChange={(evt) => setSelectedAvailability(evt.target.value)}
        // value={selectedAvailability}
      >
        {locations?.map((c) => (
          <option value={c} key={c.id}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
export function AvailabilityDropdown() {
  var availability = ["morning", "afternoon", "night"];
  return (
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
  );
}

export function CoachList({ listOfCoaches, setSelectedCoach, selectedCoach }) {
  console.log(listOfCoaches);
  return (
    <div>
      {listOfCoaches?.length <= 0 ? (
        <div>No Coaches Available!</div>
      ) : (
        listOfCoaches?.map((coach) => (
          <CoachCard
            coach={coach}
            setSelectedCoach={setSelectedCoach}
            selectedCoach={selectedCoach}
          />
        ))
      )}
    </div>
  );
}

export function CoachCard({ coach, setSelectedCoach, selectedCoach }) {
  const handleOnCoachClick = () => {
    setSelectedCoach(coach);
    console.log(selectedCoach);
  };
  return (
    <div
      className={
        coach.name === selectedCoach.name
          ? "coach-card coach-card-selected"
          : "coach-card"
      }
      onClick={handleOnCoachClick}
    >
      <p>{coach.name}</p>
    </div>
  );
}
