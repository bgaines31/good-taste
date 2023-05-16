require('dotenv').config('.env');
const express = require('express');
const app = express();
const { User, Recipe, Op } = require('./db');
const bcrypt = require('bcrypt');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const setUser = (req, res, next) => {
  try {
    const auth = req.header('Authorization');
    if (!auth) {
      next();
    } else {
      const [, token] = auth.split(' ');
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
    next(error);
  }
};

//SIGN UP -- DONE
app.post('/signup', async (req, res, next) => {
  const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  };
  try {
    const { username, password, name, email, passwordNoJWT } =
      req.body;
    const hashedPassword = await hashPassword(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      name,
      email,
      passwordNoJWT,
    });
    const token = jwt.sign({ username, id: user.id }, JWT_SECRET);
    res.send({
      message: 'successfully created user ' + user.username,
      token: token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// LOGIN -- DONE
app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.sendStatus(401);
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.sendStatus(401);
      } else {
        const token = jwt.sign({ username, id: user.id }, JWT_SECRET);
        res.send({
          message: 'successfully logged in ' + user.name,
          token: token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// READ ALL -- DONE with JWT
app.get('/recipes', setUser, async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
    } else {
      const userRecipes = await Recipe.findAll({
        where: {
          ownerId: req.user.id,
        },
      });
      console.log(userRecipes)
            res.send(userRecipes);
          
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
  
});

// READ ONE -- DONE with JWT
app.get('/recipes/:id', setUser, async (req, res, next) => {
  try {
    let recipe = await Recipe.findByPk(req.params.id);
    if (!req.user) {
      res.sendStatus(401);
    } else if (recipe.ownerId != req.user.id) {
      console.log(req.body.ownerId);
      console.log(req.user.id);
      res.sendStatus(401);
    } else {
      res.send(recipe);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get('/users', async (req, res, next) => {
  try {
    allUsers = await User.findAll();
    res.send(allUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// NEW RECIPE -- DONE with JWT
app.post('/recipes', setUser, async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    const { title, meal, ingredients, directions, cookTime } =
      req.body;
    await Recipe.create({
      title,
      meal,
      ingredients,
      directions,
      cookTime,
      ownerId: req.user.id,
    });
    res.json(await Recipe.findAll({ where: {
      ownerId: req.user.id,
    },}));
  }
});

// DELETE -- DONE with JWT
app.delete('/recipes/:id', setUser, async (req, res) => {
  let recipe = await Recipe.findByPk(req.params.id);
  if (!req.user) {
    res.sendStatus(401);
  } else if (recipe.ownerId != req.user.id) {
    console.log(req.body.ownerId);
    console.log(req.user.id);
    res
      .status(401)
      .send("this is not your recipe to delete! don't be rude!");
  } else {
    let deletedRecipe = await Recipe.destroy({
      where: { id: req.params.id },
    });
    res.send(await Recipe.findAll({ where: {
      ownerId: req.user.id,
    },}));
  }
});

// UPDATE -- DONE with JWT
app.put('/recipes/:id', setUser, async (req, res) => {
  let recipe = await Recipe.findByPk(req.params.id);
  if (!req.user) {
    res.sendStatus(401);
  }
   else if (recipe.ownerId != req.user.id) {
    console.log(req.body.ownerId);
    console.log(req.user.id);
    res
      .status(401)
      .send(
        'this is not your recipe to update! stop trying to control everything!'
      );
  }
   else {
    await Recipe.update(req.body, { where: { id: req.params.id } });
    res.send(await Recipe.findAll({ where: {
      ownerId: req.user.id,
    },}));
  }
});

app.listen(PORT, () => {
  console.log(`Recipes are ready at http://localhost:${PORT}`);
});

module.exports = app;
