import React from "react";
import { useState } from "react";
import "./ExploreCoaches.css";
import CoachesOverview from "./CoachesOverview/CoachesOverview";
import CoachView from "./CoachView/CoachView";

// components broken down:
// ExploreCoaches is the overall page
// CoachOverview is the search/filter area for coaches
// CoachCard is the individual result with the name of the coach based on the search/filter results
// CoachView is the details page for the coach selected

export default function ExploreCoaches() {
  const [listOfCoaches, setListOfCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");
  return (
    <div className="explore-coaches">
      <CoachesOverview
        listOfCoaches={listOfCoaches}
        setListOfCoaches={setListOfCoaches}
      />
      <CoachView
        selectedCoach={selectedCoach}
        setSelectedCoach={setSelectedCoach}
      />
    </div>
  );
}
