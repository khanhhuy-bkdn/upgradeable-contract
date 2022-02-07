const contract = require('../contracts.json');
const hre = require('hardhat');

async function main() {
  console.log('=====================================================================================');
  console.log('VERIFY:');
  console.log('=====================================================================================');

  try {
    await hre.run("verify:verify", {
      address: "0x9dc515CC61e2ef807b5069CF4A2Fad6d295249E1",
      //constructorArguments: [12,12],
      //contract: "contracts/BoxV1.sol:BoxV1",
    });
  } catch (e) {
    console.log(e.message);
  }

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
