const Block = require('./block');
const { cryptoHash } = require('./crypto-hash');
const { GENESIS_DATA } = require('./genesis');

describe('Block', () => {
  const timestamp = 2000;
  const lastHash = 'foo-hash';
  const hash = 'bar-hash';
  const data = ['blockchain', 'data'];
  const nonce = 1;
  const difficulty = 1;
  const block = new Block({ timestamp, lastHash, hash, data, nonce, difficulty });

  it('sets the `timestamp`, `lastHash`, `hash`, `data`, `nonce` and `difficulty` properties', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
  });

  describe('genesis()', () => {
    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it('sets the `lastHash` to be the `hash` of the last block', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('sets a `timestamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it('creates a SHA-256 `hash` based on proper inputs', () => {
      expect(minedBlock.hash)
        .toEqual(
          cryptoHash(
            minedBlock.timestamp,
            minedBlock.lastHash,
            minedBlock.data,
            minedBlock.nonce,
            minedBlock.difficulty
          )
        );
    });

    it('sets a `hash` that matches the difficulty', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty))
        .toEqual('0'.repeat(minedBlock.difficulty));
    });

    it('adjusts the difficulty', () => {
      const possibleResults = [lastBlock.difficulty + 1, lastBlock.difficulty - 1];
      expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
    });
  });
});
