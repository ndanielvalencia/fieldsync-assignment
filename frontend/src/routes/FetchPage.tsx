import React from 'react';
import './Page.css';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchInternalUsers} from '../redux/usersSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import {isEmpty} from '../utils/utils';
import {InternalUser} from '../types';



export default function FetchPage() {

    const dispatch = useAppDispatch();
    const internalUsers = useAppSelector((state) => state.users.internalUsers);
    const isInternalFetching = useAppSelector((state) => state.users.isInternalFetching);
    const isInternalFetched = useAppSelector((state) => state.users.isInternalFetched);
    const error = useAppSelector((state) => state.users.error);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await dispatch(fetchInternalUsers()); 
    }

    let content;

    if (isInternalFetching) {
        content = (
            <div className="loading-spinner">
                <LoadingSpinner/>
            </div>
        );
    } else if (error != null){
        content = (
            <div className="error-message">
                <p style={{ color: 'red' }}>An error occurred while processing data. Please try again later.</p>
            </div>
        );
    } else if (isInternalFetched){
        if (isEmpty(internalUsers)){
            content = (
                <div>
                    <p>The internal source had no users to be fetched. Please save them first from the Save page.</p>
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
                    {(internalUsers as InternalUser[]).map((user: InternalUser) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.company}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
    }

    return (
        <div>
            <h1>Fetch</h1>
            <p>Click the button below to fetch data from the server</p>
            <button onClick = {handleSubmit} 
                    disabled = {(error != null) || (isInternalFetched && !isEmpty(internalUsers))}>Fetch</button>
            {content}
        </div>
    )
}