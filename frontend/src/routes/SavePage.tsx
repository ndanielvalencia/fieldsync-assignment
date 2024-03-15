import React from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {postUser} from '../redux/usersSlice';
import {isEmpty} from '../utils/utils';
import {User} from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import './Page.css';


export default function SavePage() {

    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.users);
    const isPosting = useAppSelector((state) => state.users.isPosting);
    const isPosted = useAppSelector((state) => state.users.isPosted);
    const error = useAppSelector((state) => state.users.error);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (isEmpty(users)) {
            alert("No users to save. Try downloading them first from the home page.");
            return;
        } 
        
        (users as User[]).map((user: User) => {
            dispatch(postUser(user));
        });
    };

    let content;
    if (isPosting) {
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
      } else if (isPosted){
        content = (
          <div className="success-message">
              <p style={{ color: 'green' }}>Users saved successfully!</p>
          </div>
        );
      }
    return (
        <div>
            <h1>Save</h1>
            <p>Click the button to save the users to the server.</p>
            <button onClick={handleSubmit}>Save</button>
            {content}
        </div>
    )
}