import React from "react";
import DSORow from "./DSORow";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function DSOList(props) {
  const mapData = props.objList;

  return props.objList.state === "loading" ? (
    <CircularProgress />
  ) : (
    mapData?.map((dso, i) => (
      <DSORow
        dso={dso}
        key={i}
        addToScheduler={(selected) => props.addToScheduler(selected)}
      />
    ))
  );
}
