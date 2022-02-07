const { ethers, upgrades } = require("hardhat");
const constract = require("./../contracts.json")

async function main() {
  console.log('=====================================================================================');
  console.log('UPGRADE:');
  console.log('=====================================================================================');

  const BoxV2 = await ethers.getContractFactory("BoxV2");
  const upgraded = await upgrades.upgradeProxy(constract.Box, BoxV2);

  const implementation = await upgrades.erc1967.getImplementationAddress(upgraded.address);

  console.log(' Box upgrade             : ', upgraded.address);
  console.log(' Box V2 contract verify  : ', implementation);

  console.log('=====================================================================================');
  console.log('DONE');
  console.log('=====================================================================================');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });