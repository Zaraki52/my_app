const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration de la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projet_ionic_api'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Configurer le middleware CORS avant les routes
app.use(cors({
  origin: 'http://localhost:8100'
}));

app.use(express.json()); // Middleware pour parser le corps des requêtes JSON

// Configurer multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Endpoint pour récupérer les données
app.get('/api/users', (req, res) => {
  let sql = 'SELECT * FROM datauser';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// Endpoint pour créer un nouvel utilisateur
app.post('/api/users', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = 'INSERT INTO datauser (name, description, image) VALUES (?, ?, ?)';
  db.query(sql, [name, description, image], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Utilisateur créé avec succès' });
  });
});
// Endpoint pour la modification d'un utilisateur
app.put('/api/users/:id', upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const userId = req.params.id;
  
    const sql = 'UPDATE datauser SET name = ?, description = ?, image = ? WHERE id = ?';
    db.query(sql, [name, description, image, userId], (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ message: 'Utilisateur modifié avec succès' });
    });
  });
  
  // Endpoint pour la suppression d'un utilisateur
  app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
  
    const sql = 'DELETE FROM datauser WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ message: 'Utilisateur supprimé avec succès' });
    });
  });
  

// Servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
