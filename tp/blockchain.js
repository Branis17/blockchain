const Block = require('./block');
if (Math.abs(lastBlock.difficulty - block.difficulty) > 1) return false;

class Blockchain {
  
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);
    return block;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (block.lastHash !== lastBlock.hash) return false;
      if (block.hash !== Block.blockHash(block)) return false;
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('⛔ Nouvelle chaîne plus courte ou égale. Rejetée.');
      return;
    }

    if (!Blockchain.isValidChain(newChain)) {
      console.log('⛔ Nouvelle chaîne invalide. Rejetée.');
      return;
    }

    console.log('✅ Chaîne remplacée par une nouvelle valide.');
    this.chain = newChain;
  }
}

module.exports = Blockchain;
