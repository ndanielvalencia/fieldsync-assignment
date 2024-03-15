import React from 'react';
import './Page.css';
import {User} from '../types';
import {fetchUsers} from '../redux/usersSlice';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * The root component of the application.
 * Renders the main layout of the app.
 */

export default function HomePage() {

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const isExternalFetching = useAppSelector((state) => state.users.isExternalFetching);
  const error = useAppSelector((state) => state.users.error);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    dispatch(fetchUsers()); // Dispatching the fetchUsers action when the button is clicked
  };

  let content;
  if (isExternalFetching) {
    content = (
      <div className="loading-spinner">
        <LoadingSpinner/>
      </div>
    );
  } else if (error) {
    content = (
      <div className="error-message">
        <p style={{ color: 'red' }}>An error occurred while processing data. Please try again later.</p>
      </div>
    );
  } else {
    content = (
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Welcome to the HomePage component</h1>
        <button onClick={handleSubmit}>Download Users</button>
        {content}
      </header>
    </div>
  );
}
