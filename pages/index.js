import React from "react";
import firebase from "../lib/firebase";
import AddRfp from "../components/Add";
import RFPItem from "../components/RFPItem";

export default class extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, rfps: {} };
  }

  componentDidMount() {
    // Create a reference to the RFPs in the database
    const rfpsRef = firebase.database().ref("rfps");

    // When this handler mounts (and on subsequent changes),
    // load the data into the component state
    rfpsRef.on("value", snapshot => {
      const rfps = snapshot.val();
      console.log(rfps);
      this.setState(() => ({ loading: false, rfps }));
    });
  }

  render() {
    const { loading, rfps } = this.state;
    const rfpKeys = Object.keys(rfps);
    return (
      <div>
        <h1>Add an RFP</h1>
        <AddRfp />
        <h1>RFPs</h1>
        <div>
          {loading
            ? "Loading..."
            : rfpKeys.map(id => <RFPItem key={id} id={id} data={rfps[id]} />)}
        </div>
      </div>
    );
  }
}
