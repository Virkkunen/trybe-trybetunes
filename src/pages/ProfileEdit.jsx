import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';

export default class ProfileEdit extends Component {
  state = {
    loading: false,
    name: '',
    image: '',
    email: '',
    description: '',
    updatedUser: false,
  };

  componentDidMount() {
    this.grabUser();
  }

  grabUser = async () => {
    this.setState({ loading: true });
    const info = await getUser();
    this.setState({ loading: false, ...info });
  };

  sendUser = async () => {
    this.setState({ loading: true });
    const { name, image, email, description } = this.state;
    const user = { name, image, email, description };
    await updateUser(user);
    this.setState({ loading: false, updatedUser: true });
  };

  inputChange = (e) => {
    // aprendi a desestruturar e.target
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validateSave = () => {
    const {
      name,
      image,
      email,
      description,
    } = this.state;

    const validEmail = email.match(/[a-zA-Z.\-'0-9]+@[a-zA-Z]+\.com/);
    // com alan essa
    const validLength = [name, image, description].every((field) => field.length);
    const validation = !(validEmail && validLength);
    return validation;
  };

  render() {
    const { name, email, description, loading, image, updatedUser } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && <Loading /> }
        <div className="user-card">
          <div className="user-image-edit">
            <img
              src={ image }
              alt={ name }
              data-testid="profile-image"
            />
            <label htmlFor="image">
              <input
                type="text"
                placeholder="Image link"
                name="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.inputChange }
              />
            </label>
          </div>
          <div className="user-name">
            <span className="user-card-title">Name</span>
            <label htmlFor="name">
              <input
                type="text"
                placeholder="Name"
                name="name"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.inputChange }
              />
            </label>
          </div>
          <div className="user-email">
            <span className="user-card-title">Email</span>
            <label htmlFor="email">
              <input
                type="text"
                placeholder="Email"
                name="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.inputChange }
              />
            </label>
          </div>
          <div className="user-description">
            <span className="user-card-title">Description</span>
            <label htmlFor="description">
              <input
                type="text"
                placeholder="Description"
                name="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.inputChange }
              />
            </label>
          </div>
          <button
            type="button"
            data-testid="edit-button-save"
            className="blue"
            onClick={ this.sendUser }
            disabled={ this.validateSave() }
          >
            Save
          </button>
          { updatedUser && <Redirect to="/profile" /> }
        </div>
      </div>
    );
  }
}
