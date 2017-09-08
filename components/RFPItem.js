import React from "react";
import firebase from "../lib/firebase";
import EditRfp from "./Edit";

export default class extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      editing: false,
    };
  }

  componentDidMount() {
    this.rfpsRef = firebase.database().ref("rfps");
  }

  handleDelete() {
    if (confirm("Delete?")) {
      const itemRef = this.rfpsRef.child(this.props.id);
      itemRef.remove(() => {
        console.log("removed item: " + this.props.id);
      });
    }
  }

  handleUpdate(newData) {
    const itemRef = this.rfpsRef.child(this.props.id);
    itemRef.update(newData)
  }

  toggleEdit() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  render() {
    const { data, id } = this.props;
    return (
      <div>
        <h4>Company: {data.company} (id: {id})</h4>
        <div>Created At: {data.createdAt}</div>
        <div>Email: {data.email}</div>
        <div>Location: {data.location}</div>
        <div>Status: {data.status}</div>
        <button onClick={this.handleDelete}>Delete</button>
        <button onClick={this.toggleEdit}>Toggle Edit</button>
        {this.state.editing ? <EditRfp data={data} handleUpdate={this.handleUpdate} /> : ""}
      </div>
    );
  }
}
