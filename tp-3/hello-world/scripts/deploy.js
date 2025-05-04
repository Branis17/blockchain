const hre = require("hardhat");

async function main() {
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy("Bonjour, Blockchain !");
  await hello.waitForDeployment();
  console.log(`Contrat déployé à l'adresse : ${hello.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
