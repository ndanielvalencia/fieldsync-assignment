import React, {useState} from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './HomePage.css';
import {Link} from 'react-router-dom';

/**
 * The root component of the application.
 * Renders the main layout of the app.
 */
export default function HomePage() {
  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Welcome to the HomePage component</h1>
      </header>
    </div>
  );
}
