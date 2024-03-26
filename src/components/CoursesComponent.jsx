// src/ClientTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoursesComponent.css'; 

const CoursesComponent = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://34.250.175.84/msc/course/list')
      .then(response => response.json())
      .then(data => {
        if (data && data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          console.error('Invalid data structure:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);


  const formatDuration = duration => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };


  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="courses-container">
      <h1>My Courses</h1>
      <table className="courses-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Number of Lessons</th> 
            <th>Duration</th>
            <th>Price</th>
            <th>Free Access</th>
            <th>Published At</th>
            <th>Status</th>
            <th>Removed At</th> 

          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}
                className={course.status === 0 ? 'status-inactive' : (course.removedAt ? 'removed-course' : '')}

            >
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.lessons.length === 0 ? 'None' : course.lessons.length}</td> 

              <td>{formatDuration(course.duration)}</td> 
              <td>${course.price.toFixed(2)}</td> 
              <td>{course.freeAccess ? '✅' : '❌'}</td>
              <td>{formatDate(course.publishAt)}</td> 
              <td>{course.status === 1 ? 'Published' : 'Draft'}</td> 
              <td>{course.removedAt ? new Date(course.removedAt).toLocaleString() : 'NOT REMOVED'}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesComponent;
