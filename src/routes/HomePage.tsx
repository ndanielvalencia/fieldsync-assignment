import React, {useState, useEffect} from 'react';
import './HomePage.css';
import {User} from '../types';
import {fetchUsers} from '../redux/usersSlice';
import {useAppSelector, useAppDispatch} from '../redux/hooks';

/**
 * The root component of the application.
 * Renders the main layout of the app.
 */
export default function HomePage() {

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  const handleSubmit = async () => {
    dispatch(fetchUsers()); // Dispatching the fetchUsers action when the button is clicked
  };

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Welcome to the HomePage component</h1>
        <button onClick={handleSubmit}>Download Users</button>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}
