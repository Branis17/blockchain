const { cryptoHash } = require('./crypto-hash');
const { INITIAL_DIFFICULTY } = require('./config');

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: '---',
  hash: 'genesis-hash',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: []
};

module.exports = { GENESIS_DATA };
