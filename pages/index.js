import React from "react";
import firebase from "../lib/firebase";

const RFPItem = rfp => (
  <div>
    <h4>Company: {rfp.company}</h4>
    <div>Created At: {rfp.createdAt}</div>
    <div>Email: {rfp.email}</div>
    <div>Location: {rfp.location}</div>
    <div>Status: {rfp.status}</div>
  </div>
);

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
    const rfpData = Object.values(rfps);  // convert object to an array
    return (
      <div>{loading ? "..." : rfpData.map(RFPItem)}</div>
    );
  }
}
