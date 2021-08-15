import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SchedulerChart from "./SchedulerChart";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  delete: {
    marginBottom: 15,
  },
  chart: {
    height: 440,
    marginTop: 30,
    paddingTop: 15,
  },
  chartTitle: {
    paddingLeft: 25,
    // paddingBottom: 15,
  },
}));

const columns = [
  { field: "id", headerName: "Object", width: 100, sortable: false },
  {
    field: "type",
    headerName: "Type",
    width: 130,
  },
  {
    field: "ra",
    headerName: "RA",
    width: 120,
    sortable: false,
  },
  {
    field: "dec",
    headerName: "Dec",
    width: 120,
    sortable: false,
  },
  {
    field: "mag",
    headerName: "Mag",
    // type: "number",
    width: 120,
  },
  {
    field: "comments",
    headerName: "Notes",
    // type: "number",
    width: 200,
    editable: true,
  },
];

export default function SchedulerTable(props) {
  const classes = useStyles();
  const [checkedItem, setCheckedItem] = useState();

  const rows = props.schedulerData.map((dso, i) => ({
    id: dso.name,
    type: dso.type,
    ra: dso.ra,
    dec: dso.dec,
    mag: dso.mag,
    comments: "Your notes here",
  }));

  const handleCheck = (e) => {
    console.log(e.toString());
    setCheckedItem(e.toString());
  };

  const handleDelete = () => {
    console.log(`delete these stuff: ${checkedItem}`);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        className={classes.delete}
        onClick={handleDelete}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <div style={{ height: 380, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={handleCheck}
        />
      </div>
      <Paper className={classes.chart}>
        <Typography variant="h6" className={classes.chartTitle}>
          Elevation of selected objects
        </Typography>
        <SchedulerChart schedulerData={props.schedulerData} />
      </Paper>
    </div>
  );
}
