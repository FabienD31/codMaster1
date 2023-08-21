const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

const secretKey = 'votre_clé_secrète';

app.use(bodyParser.json());
app.use(cors());

// Middleware pour vérifier l'authentification
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
});
}

app.post('/login', (req, res) => {

  const user = {
    id: 123, 
    username: 'toto',
    password: "titi"
  };

  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', authenticateToken, (req, res) => {
  // Cette route est protégée par le middleware authenticateToken
  // accéder aux données de l'utilisateur à partir de req.user
  res.json({ message: 'Accès autorisé', user: req.user });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});



