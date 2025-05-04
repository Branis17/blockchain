const hre = require("hardhat");

async function main() {
  const contractAddress = "ADRESSE_DU_CONTRAT_ICI";
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");

  const contract = await HelloWorld.attach(contractAddress);

  
  const currentMessage = await contract.message();
  console.log("Message actuel :", currentMessage);

  
  const tx = await contract.update("Ton prénom ici sur la blockchain !");
  await tx.wait();

  
  const newMessage = await contract.message();
  console.log("Nouveau message :", newMessage);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
