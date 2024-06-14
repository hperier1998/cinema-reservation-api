# Cinema Reservation API

This is a web API project for managing cinema reservations.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [SQLite3](https://www.sqlite.org/download.html)

## Getting Started

1. Clone this repository to your local machine:

```git clone https://github.com/hperier1998/cinema-reservation-api/```

2. Navigate to the project directory:

```cd cinema-reservation-api```

3. Install dependencies:

```npm install```

## Running the Server

To start the server, run the following command:

```node server.js```

The server will start listening on port 3000 by default.

## API Documentation

The API endpoints available in this project are as follows:

- `POST /api/movie/:movieUid/reservations`: Create a reservation for a movie.
- `POST /api/reservations/:uid/confirm`: Confirm a reservation.
- `GET /api/movie/:movieUid/reservations`: Retrieve reservations for a movie.
- `GET /reservations/{uid}`: Retrieves reservation details.
