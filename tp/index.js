const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const P2PServer = require('./p2p-server'); 

const app = express();
const blockchain = new Blockchain();       
const p2pServer = new P2PServer(blockchain); 

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
  const { data } = req.body;
  const block = blockchain.addBlock(data);
  p2pServer.syncChain(); 
  res.json({ message: '✅ Bloc miné et synchronisé', block });
});

const HTTP_PORT = process.env.HTTP_PORT || 3001;
app.listen(HTTP_PORT, () => {
  console.log(`🚀 Serveur IsiChain en écoute sur le port ${HTTP_PORT}`);
});

p2pServer.listen();
