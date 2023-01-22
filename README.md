# POC-movies-TypeScript

## About

An api to register the movies I want to watch, made to practice TypeScript

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want

4. Copy and paste the dump.sql in your database

4. Configure the `.env` file using the `.env.example`

5. Run the back-end in a development environment:

```bash
npm run dev
```

## Building and starting for production

```bash
npm run build
npm start
```

## Routes


### POST: 
/movie - Body: { "name": "Interestelar", "platformId": 5, "genreId": 2 }

/platform - Body: { "name": "Prime Video"}

/genre - Body: { "name": "Ficção científica"}

### GET: 
/movies - Returns : [{
    "id": 1,
    "name": "Interestelar",
    "platform": "Prime Video",
    "genre": "Ficção científica",
    "watchedStatus": true
  }, ...]

  /platforms - Returns : [
  {
    "id": 1,
    "name": "Prime Video"
  },
  {
    "id": 2,
    "name": "Netflix"
  },
  {
    "id": 3,
    "name": "HBO max"
  }, ...]

  /genres - Returns : [
  {
    "id": 1,
    "name": "Ficção científica"
  },
  {
    "id": 2,
    "name": "Aventura"
  },
  {
    "id": 3,
    "name": "Mistério"
  }, ...]

  /total-movies - Returns : {
  "totalMovies": "14"
}

### PATCH: 
/movie/:id - Toggle the watchedStatus to true/false

### DELETE: 
/movie/:id - Delete the movie


