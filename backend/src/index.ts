import express from "express";
import fs from "fs";
import { Database } from "sqlite3";
import path from "path";

const app = express();
const port = 3000;
const csvContent: string = fs.readFileSync("src/data/movies.csv", {
  encoding: "utf-8",
});
const lines: string[] = csvContent.split("\n");
console.log("lines", typeof lines, lines);

type Movie = {
  ID: number;
  Titre: string;
  "Année(s)": number;
  Prix: number;
  Horaires: string;
};

type Ad = {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
  category_id: number;
};

type Categarys = {
  id: number;
  category: string;
};

const db = new Database(path.join(__dirname, "../good_corner.sqlite"));

const sqlQuery = fs.readFileSync(
  path.join(__dirname, "../queries.sql"),
  "utf-8"
);

db.exec(sqlQuery, (err) => {
  if (err) {
    console.error("Error executing SQL:", err.message);
    return;
  }
});

const dataToObject = (data: string[]): Movie[] => {
  console.log("data", typeof data);

  const result: any = [];
  data.forEach((row: string, index: number) => {
    if (index >= 1) {
      const addDataComat: string[] = row.split(`;`);
      const delQuote: string[] = addDataComat.map((el) => el.replace(/"/g, ""));

      let movie: any = {};

      const addComatHead = data[0].split(`;`);

      addComatHead.forEach((head: any, jindex: any) => {
        movie[head] = delQuote[jindex];
      });

      movie.ID = parseInt(movie.ID);
      movie["Année(s)"] = parseInt(movie["Année(s)"]);
      movie.Prix = parseFloat(movie.Prix);

      result.push(movie);
    }
  });

  return result;
};

const dataMoviesArray: any = dataToObject(lines);

const message: string = "Hi there!";
console.log(message);
app.use(express.json());

const ads = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ads", (req, res) => {
  res.json(ads);
});

app.post("/ads", (req, res) => {
  const newAd = req.body;
  const lastIndex: number = ads.length - 1;
  const id: number = ads[lastIndex].id + 1;

  newAd.id = id;

  ads.push(newAd);

  res.send({ id: id, message: "succes" });
});

app.delete("/ads/:id", (req, res) => {
  const id: number = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send("Invalid id");
    return;
  }
  const adsId: number = ads.findIndex((ad) => ad.id === id);

  if (adsId === -1) {
    res.status(404).send("Ad not found");
    return;
  }

  ads.splice(adsId, 1);

  res.send({ message: "Ad deleted", id: id });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.put("/ads/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  const ad = req.body;

  if (isNaN(id)) {
    res.status(400).send("Invalid id");
    return;
  }

  const adsIndex = ads.findIndex((ad) => ad.id === id);

  if (adsIndex === -1) {
    res.status(404).send("Ad not found");
    return;
  }

  ads[adsIndex] = { ...ad, id: id };

  res.send({ message: "Ad updated", id: id, ad: ad });
});

app.get("/movies/count", (req, res) => {
  res.json({ count: dataMoviesArray.length });
});

app.get("/movies/totalBudget", (req, res) => {
  let totalBudget = 0;
  dataMoviesArray.forEach((movie: Movie) => {
    totalBudget += movie.Prix;
  });

  res.json({ totalBudget: totalBudget, textBudget: `${totalBudget}€` });
});

app.get(`/movies`, (req, res) => {
  if (req.query.minYear) {
    const minYear: number = +req.query.minYear;
    const filteredForYear = dataMoviesArray.filter(
      (movie: Movie) => movie["Année(s)"] >= minYear
    );
    res.json(filteredForYear);
  }

  if (req.query.requestedTime) {
    const requestedTime: string = req.query.requestedTime.toString();
    const filteredForTime = dataMoviesArray.filter((movie: Movie) =>
      movie.Horaires.includes(requestedTime)
    );
    res.json(filteredForTime);
  }

  res.json(dataMoviesArray);
});

app.post("/movies", (req, res) => {
  const newMovie = req.body;
  const lastIndex: number = dataMoviesArray.length - 1;
  const id: number = dataMoviesArray[lastIndex].ID + 1;

  newMovie.ID = id;

  dataMoviesArray.push(newMovie);

  res.send({ id: id, message: "succes" });
});

app.get("/movies/:id", (req, res) => {
  const id: number = parseInt(req.params.id);

  const movie = dataMoviesArray.find((movie: Movie) => movie.ID === id);

  if (!movie) {
    res.status(404).send("Movie not found");
    return;
  }

  res.json(movie);
});

app.put("/movies/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  const movie = req.body;

  const movieIndex = dataMoviesArray.findIndex(
    (movie: Movie) => movie.ID === id
  );

  if (isNaN(id)) {
    res.status(400).send("Invalid id");
    return;
  }

  if (movieIndex === -1) {
    res.status(404).send("Movie not found");
    return;
  }

  dataMoviesArray[movieIndex] = { ...movie, ID: id };

  res.send({ message: "Movie updated", id: id, movie: movie });
});

app.delete("/movies/:id", (req, res) => {
  const id: number = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send("Invalid id");
    return;
  }

  const Movie: number = dataMoviesArray.findIndex(
    (movie: Movie) => movie.ID === id
  );

  if (Movie === -1) {
    res.status(404).send("Movie not found");
    return;
  }

  dataMoviesArray.splice(Movie, 1);

  res.send({ message: "Movie deleted", id: id });
});

app.get("/ad", (req, res) => {
  db.all("SELECT * FROM ad", (err, rows) => {
    if (req.query.city) {
      const city = req.query.city;
      rows = rows.filter((ad: any) => ad.location === city);
      res.send(rows);
    } else if (req.query.minPrice) {
      const minPrice: number = +req.query.minPrice;
      rows = rows.filter((ad: any) => ad.price >= minPrice);

      if (rows.length === 0) {
        res.status(404).send("No ad found");
      }
      res.send(rows);
    } else {
      db.all(
        "SELECT a.id as adid, c.id as catid ,c.name FROM ad as a inner join categories  as c ON a.category_id=c.id",
        (err, rows) => {
          res.send(rows);
        }
      );
    }
  });
});

app.delete("/ad", (req, res) => {
  if (req.body.id) {
    const id: number = parseInt(req.body.id);
    if (isNaN(id)) {
      return res.status(400).send("Invalid id");
    }

    db.run("DELETE FROM ad WHERE id = ?", id, (err: Error | null) => {
      if (err) {
        res.status(500).send("Error deleting ad");
        return;
      }
      res.send({ message: "Ad deleted", id: id });
    });
  }
});
