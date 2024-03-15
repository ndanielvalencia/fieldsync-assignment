import React from 'react';
import './Page.css';
import {ExternalUser} from '../types';
import {fetchExternalUsers} from '../redux/usersSlice';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import LoadingSpinner from '../components/LoadingSpinner';
import {isEmpty} from '../utils/utils';

export default function HomePage() {

  const dispatch = useAppDispatch();
  const externalUsers = useAppSelector((state) => state.users.externalUsers);
  const isExternalFetching = useAppSelector((state) => state.users.isExternalFetching);
  const isExternalFetched = useAppSelector((state) => state.users.isExternalFetched);
  const error = useAppSelector((state) => state.users.error);


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    dispatch(fetchExternalUsers()); 
  };

  let content;
  if (isExternalFetching) {
    content = (
      <div className="loading-spinner">
        <LoadingSpinner/>
      </div>
    );
  } else if (error != null) {
    content = (
      <div className="error-message">
        <p style={{ color: 'red' }}>An error occurred while processing data. Please try again later.</p>
      </div>
    );
  } else if (isExternalFetched){

    if (isEmpty(externalUsers)) {
      content = (
        <div>
          <p>The external source had no users to be fetched.</p>
        </div>
      );
    } else {
      content = (
        <div>
          <table className="table-container">
            <thead>
              <tr>
                <th>id </th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {(externalUsers as ExternalUser[])
              .map((user: ExternalUser) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
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
  }
   

  return (
    <div className="content-container">
        <h1>Welcome Home!</h1>
        <p>Click the button to fetch the users from the external source.</p>
        <button onClick={handleSubmit} disabled={isExternalFetched || (error != null)}>Download Users</button>
        {content}
    </div>
  );
}
