# Wasil — IT Support Ticketing System (Frontend)

Wasil is an internal IT support ticketing platform that allows employees to request technical help while enabling managers to track, respond to, and resolve those requests efficiently. This repository contains the React-based frontend application.

---

## Development URL
http://localhost:5173

Make sure the backend is running at http://localhost:8000.

---
## Routing Table - Frontend Routing

<table border="1">
    <tr>         <th>Path</th>             <th>Component</th>     <th>Description</th>                 </tr>
    <tr>         <td>/signup</td>         <td>&lt;SignupPage&gt;</td>     <td>Sign-up page</td>         </tr>
    <tr>         <td>/home</td>         <td>&lt;HomePage&gt;</td>     <td>Log-in page</td>         </tr>
    <tr>         <td>/profiles/:id</td>         <td>&lt;ProfilePage&gt;</td>      <td>Profile detail page </td>            </tr>
    <tr>         <td>/tickets</td>         <td>&lt;TicketsIndexPage&gt;</td>      <td>Show all ticket </td>            </tr>
    <tr>         <td>/tickets/:id</td>         <td>&lt;TicketDetailPage&gt;</td>     <td>Ticket detail page with comments</td>         </tr>
    <tr>         <td>/tickets/new</td>         <td>&lt;TicketFormPage&gt;</td>      <td>Form for creating a ticket </td>            </tr>
    <tr>         <td>/tickets/edit/:id</td>         <td>&lt;TicketFormPage&gt;</td>     <td>Form for updating a ticket</td>         </tr>
    <tr>         <td>/tickets/confirm_delete/:id</td>         <td>&lt;TicketFormPage&gt;</td>     <td> Delete ticket confirmation page</td>         </tr>
</table>

<hr>
<br>
<br>

---
## User Stories

- As an employee, i want to sign up with a new profile.
- As an employee/manager, i want to log in into my Profile.
- As an employee/manager, i want to see all the tickets related to me.
- As an employee, i want to be able to do Create, Update, Read, and Delete on a ticket.
- As an employee/manager, i want to see all the messages related to my tickets.
- As an employee/manager, i want to be able to do Create, Update, Read, and Delete on a message.

<h3 style="color: yellow">**NOTE**: 'Employee' and 'Manager' are instance of 'Profile' differentiated by "isManager" attribute.</h3>

---

## Tech Stack
- React (Vite)
- React Router
- CSS
- JWT Authentication
- REST API (Django backend)

---

## Related Repositories
[Frontend (This repo)](https://github.com/Duwaysan/IT-Ticket-System-frontend)

[Backend](https://github.com/Duwaysan/IT-Ticket-System-backend)

---

## Getting Started

### Requirements
- Node.js 18+
- Backend running locally

### Installation
```bash
git clone https://github.com/Duwaysan/IT-Ticket-System-frontend
cd IT-Ticket-System-frontend
npm install
npm run dev


```
----

## Features

- User signup and login with JWT auth
- Employees create tickets assigned to managers
- Detailed ticket view with messaging system
- Users can edit or delete only their own messages
- Managers can close tickets
- Role-based display logic

## IceBox (Future Features)
- AI-powered automatic ticket suggestions
- Push notifications for replies or status changes
- File attachments for screenshots/logs
- Dark / Light theme mode