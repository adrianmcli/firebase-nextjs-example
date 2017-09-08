import React from "react";
import firebase from "../lib/firebase";

export default class extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      company: "",
      email: "",
      location: "",
    };
  }

  componentDidMount() {
    const { company, email, location } = this.props.data;
    this.setState(() => ({
      company,
      email,
      location,
    }));
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState(() => ({ [name]: value }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleUpdate(this.state);
  }

  render() {
    return (
      <form>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={this.state.company}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />
        </label>

        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </form>
    );
  }
}
