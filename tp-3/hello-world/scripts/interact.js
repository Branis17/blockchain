const hre = require("hardhat");

async function main() {
  const contractAddress = "0xA30c2c3dfC6aCEf59E58519b7C06A7C45d8CD68f"; 
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");

  const contract = await HelloWorld.attach(contractAddress);

  
  const currentMessage = await contract.message();
  console.log("Message actuel :", currentMessage);

  
  const tx = await contract.update("branis blockchain !");
  await tx.wait();

  
  const newMessage = await contract.message();
  console.log("Nouveau message :", newMessage);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
