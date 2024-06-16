# Cinema Reservation API

This is a web API project for managing cinema reservations.

## Authors
- Hadrien PERIER (hperier1998)
- Jeremy MAGNE (RayZiaX)

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

The api listens on the IP address http://localhost:3000/api/{endpoint route} or http://127.0.0.1:5002/api/{endpoint route}

The API endpoints (routes) available in this project are as follows:

- `POST /movie/{movieUi}/reservations`: Create a reservation for a movie.
- `POST /reservations/{uid}/confirm`: Confirm a reservation.
- `GET /movie/{movieUi}/reservations`: Retrieve reservations for a movie.
- `GET /reservations/{uid}`: Retrieves reservation details.
- `GET /cinema`: List the cinemas.
- `POST /cinema`: Create a cinema.
- `GET /cinema/:uid`: Retrieve cinema by id.
- `PUT /cinema/:uid`: Update a cinema.
- `DELETE /cinema/:uid`: Delete a cinema.
- `POST /cinema/{cinemaUid}/rooms`: Create room associate at cinema.
- `GET /cinema/{cinemaUid}/rooms`: Get all rooms associate at cinema.
- `GET /cinema/{cinemaUid}/rooms/{uid}`: Retrieve room associate at cinema by id
- `PUT /cinema/{cinemaUid}/rooms/{uid}`: Update room associate at cinema by id
- `DELETE /cinema/{cinemaUid}/rooms/{uid}`: Delete room associate at cinema by id.
- `GET /cinema/{cinemaUid}/rooms/{roomUid}/sceances`: List the sessions in a room.
- `POST /cinema/{cinemaUid}/rooms/{roomUid}/sceances`: Create a session in a room.
- `PUT /cinema/{cinemaUid}/rooms/{roomUid}/sceances/{uid}`: Modify a session in a room.
- `DELETE /cinema/{cinemaUid}/rooms/{roomUid}/sceances/{uid}`: Delete a session in a room.

| Verb   | Authorization | Path                                           | Input                                  | Output                                              | Description                                      |
|--------|---------------|------------------------------------------------|----------------------------------------|-----------------------------------------------------|--------------------------------------------------|
| POST   | Client        | `/movie/{movieUid}/reservations`               | `{sceance, nbSeats, room}`              | `{uid, rank, status, createdAt, updatedAt, expiresAt}` | Allows entering the reservation process          |
| POST   | Client        | `/reservations/{uid}/confirm`                  |                                        |                                                     | Allows confirming the reservation if the status allows |
| GET    | Admin         | `/movie/{movieUid}/reservations`               |                                        | `[{uid, rank, status, createdAt, updatedAt, expiresAt}]` | Lists all current reservations for a movie       |
| GET    | Admin/Owner   | `/reservations/{uid}`                         |                                        | `{uid, rank, status, createdAt, updatedAt, expiresAt}` | Retrieves the details of a reservation           |
| GET    | Client        | `/cinema`                                     |                                        | `[{uid, name, createdAt, updatedAt}]`                | Lists all cinemas                                |
| GET    | Client        | `/cinema/{uid}`                               |                                        | `{uid, name, createdAt, updatedAt}`                  | Displays a cinema                                |
| POST   | Admin         | `/cinema`                                     | `{uid, name}`                          | `{uid, name, createdAt, updatedAt}`                  | Creates a cinema                                 |
| PUT    | Admin         | `/cinema/{uid}`                               | `{uid, name}`                          | `{uid, name, createdAt, updatedAt}`                  | Modifies a cinema                                |
| DELETE | Admin         | `/cinema/{uid}`                               |                                        |                                                     | Deletes a cinema                                 |
| GET    | Client        | `/cinema/{cinemaUid}/rooms`                   |                                        | `[{uid, seats, name, createdAt, updatedAt}]`         | Lists all rooms in a cinema                      |
| GET    | Client        | `/cinema/{cinemaUid}/rooms/{uid}`             |                                        | `{uid, seats, name, createdAt, updatedAt}`           | Displays a room in a cinema                      |
| POST   | Admin         | `/cinema/{cinemaUid}/rooms`                   | `{uid, seats, name, createdAt, updatedAt}` | `{uid, seats, name, createdAt, updatedAt}`           | Creates a room in a cinema                       |
| PUT    | Admin         | `/cinema/{cinemaUid}/rooms/{uid}`             | `{uid, seats, name, createdAt, updatedAt}` | `{uid, seats, name, createdAt, updatedAt}`           | Modifies a room in a cinema                      |
| DELETE | Admin         | `/cinema/{cinemaUid}/rooms/{uid}`             |                                        |                                                     | Deletes a room in a cinema                       |
| GET    | Client        | `/cinema/{cinemaUid}/rooms/{roomUid}/sceances`|                                        | `[{uid, movie, date}]`                                | Lists all sessions in a room                     |
| POST   | Admin         | `/cinema/{cinemaUid}/rooms/{roomUid}/sceances`| `{movie, date}`                        | `{uid, movie, date}`                                  | Creates a session in a room                      |
| PUT    | Admin         | `/cinema/{cinemaUid}/rooms/{roomUid}/sceances/{uid}` | `{movie, date}`             | `{uid, movie, date}`                                  | Modifies a session in a room                     |
| DELETE | Admin         | `/cinema/{cinemaUid}/rooms/{roomUid}/sceances/{uid}` |                                        |                                                     | Deletes a session in a room                      |
