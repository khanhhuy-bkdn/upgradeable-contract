const { ethers, upgrades } = require("hardhat");
const fs = require('fs');

async function main() {

  const BoxV1 = await ethers.getContractFactory("BoxV1");
  const instance = await upgrades.deployProxy(BoxV1, [12, 12]);
  await instance.deployed();

  const implementation = await upgrades.erc1967.getImplementationAddress(instance.address);

  console.log(' Box      deployed to:', instance.address);

  console.log(' Box           verify:', implementation);

  const contractAddresses = {
    "Box": instance.address,
    "BoxVerify": implementation,
  }
  await fs.writeFileSync("contracts.json", JSON.stringify(contractAddresses));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
