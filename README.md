# Hospital Management CRUD Application

## Project Overview
A comprehensive hospital management system designed to automate various administrative and clinical functions. This application facilitates the management of patient records, appointments, billing, and more, making hospital operations more efficient.

## Features
- **Patient Management**: Register and manage patient information, including history and demographics.
- **Appointment Scheduling**: Allow patients to book appointments with doctors easily.
- **Billing System**: Generate and track billing information and payment records.
- **Doctor Management**: Maintain doctor profiles, availability, and specialization.
- **Inventory Management**: Keep track of medical supplies and inventory levels.
- **Reporting and Analytics**: Generate reports for better decision-making.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Bootstrap

## Database Schema
- **Users**: Stores user credentials and roles (admin, doctor, staff).
- **Patients**: Contains information about patients (name, age, contact info).
- **Appointments**: Records details about scheduled appointments.
- **Billing**: Stores invoices and payment details.
- **Inventory**: Manages medical supplies and their quantities.

## API Endpoints
- **POST /api/patients**: Add new patient.
- **GET /api/patients/:id**: Retrieve patient information.
- **PUT /api/patients/:id**: Update patient details.
- **DELETE /api/patients/:id**: Remove a patient record.
- **POST /api/appointments**: Schedule an appointment.
- **GET /api/appointments**: List all appointments.

## Installation Instructions
1. Clone the repository: `git clone <repo-url>`
2. Navigate to the project directory: `cd crud-application`
3. Install dependencies for both frontend and backend:
   - For the backend: `npm install`
   - For the frontend: `cd client && npm install`
4. Configure the environment variables for database connection.
5. Run the application:
   - Start the backend: `npm start`
   - Start the frontend: `cd client && npm start`

## Usage Examples
- **Register a new patient**: Use the POST /api/patients endpoint with patient data.
- **View patient details**: Make a GET request to /api/patients/{id}.

This hospital management system offers a streamlined, efficient solution for managing hospital operations, improving patient care, and enhancing administrative efficiency.