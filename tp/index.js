//const Block = require('./block');

//const hash = Block.hash("2025-04-29", "abc123", "mon bloc");
//console.log("Hash généré :", hash);

const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

// GET /blocks - retourne la chaîne
app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

// POST /mine - ajoute un bloc avec des données
app.post('/mine', (req, res) => {
  const { data } = req.body;
  const block = blockchain.addBlock(data);
  res.json({
    message: '✅ Nouveau bloc miné avec succès',
    block
  });
});

// Port d'écoute
const PORT = process.env.HTTP_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur IsiChain en écoute sur le port ${PORT}`);
});
