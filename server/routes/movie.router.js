const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


// Need an endpoint for GET ('/:id') 
// calling from fetchDetails
router.get('/:id', (req, res) => {
  console.log('details id is:', req.params.id);

  // Selecting "movies"."tittle", "movies"."poster", "movies"."description",
  // Return a single row json data
  // JSON_AGG("genres"."name") AS "genres"
  // FROM movies table
  // movies_genres is a junction table which act as a middle man
  // for both movies and genres table
  // JOIN movies_genre ON movies_genres.movie_id = movies.id
  // JOIN genres ON movies_genres.genres.id = genres.id
  const query = `
    SELECT 
    "movies"."id",
    "movies"."title", 
    "movies"."poster", 
    "movies"."description",
    JSON_AGG("genres"."name") AS "genres"
    FROM "movies"
    JOIN "movies_genres"
      ON "movies_genres"."movie_id" = "movies"."id"
    JOIN "genres"
      ON "genres"."id" = "movies_genres"."genre_id"
    WHERE "movies"."id" = $1
    GROUP BY "movies"."id", "movies"."title", "movies"."poster", "movies"."description";
    `;

  const queryParams = [
    req.params.id
  ]
  
  pool.query(query, queryParams)
    .then(result => {
      console.log('Details Result is:', result);
      // sending back the info it found on that ID it got
      res.send(result.rows)
      console.log('result in details', result.rows);
      
    })
    .catch(err => {
      console.error('ERROR on GET details', err)
    })
}); // end of GET ('/:id')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;