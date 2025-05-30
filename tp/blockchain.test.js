const Blockchain = require('./blockchain');
const Block = require('./block');

describe("Blockchain", () => {
  let blockchain;
  let blockchain2;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it("starts with genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block", () => {
    const data = 'foo';
    blockchain.addBlock(data);
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
  });

  it("validates a valid chain", () => {
    blockchain2.addBlock('bar');
    expect(Blockchain.isValidChain(blockchain2.chain)).toBe(true);
  });

  it("invalidates a chain with a corrupt genesis block", () => {
    blockchain2.chain[0].data = 'corrupted data';
    expect(Blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it("invalidates a corrupt chain", () => {
    blockchain2.addBlock('bar');
    blockchain2.chain[1].data = 'tampered data';
    expect(Blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it("replaces the chain with a valid longer chain", () => {
    blockchain2.addBlock('block1');
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).toEqual(blockchain2.chain);
  });

  it("does not replace the chain with one of less than or equal length", () => {
    blockchain.addBlock('original');
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).not.toEqual(blockchain2.chain);
  });
});
