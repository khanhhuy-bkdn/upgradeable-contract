// Loading env configs for deploying and public contract source
require('dotenv').config();

// Using hardhat-ethers plugin for deploying
// See here: https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
//           https://hardhat.org/guides/deploying.html
require('@nomiclabs/hardhat-ethers');

// Testing plugins with Waffle
// See here: https://hardhat.org/guides/waffle-testing.html
require("@nomiclabs/hardhat-waffle");

// This plugin runs solhint on the project's sources and prints the report
// See here: https://hardhat.org/plugins/nomiclabs-hardhat-solhint.html
require("@nomiclabs/hardhat-solhint");

// Verify and public source code on etherscan
require('@nomiclabs/hardhat-etherscan');

require('@openzeppelin/hardhat-upgrades');

// Hardhat task list
require('./tasks/generateAccounts');

const {
  generatePrivateKeys,
  generateAccountsForHardhatNetwork
} = require('./common/utils');

const {
  GENERATE_ACCOUNT_AMOUNT,
  GENERATE_ACCOUNT_SECRET,
} = require('./common/constant');

const privateKeys = generatePrivateKeys(
  GENERATE_ACCOUNT_AMOUNT,
  GENERATE_ACCOUNT_SECRET
);

 const config = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      accounts: generateAccountsForHardhatNetwork(GENERATE_ACCOUNT_AMOUNT, GENERATE_ACCOUNT_SECRET),
    },
    eth_testnet: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: privateKeys,
      gas: 8100000,
      gasPrice: 8000000000,
    },
    localhost: {
      accounts: privateKeys,
      chainId: 31337
    },
  },
  etherscan: {
    apiKey: `${process.env.VERIFY_SCAN_KEY}`
  },
  solidity: {
    compilers: [
      {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
    deploy: 'deploy',
    deployments: 'deployments',
  },
  mocha: {
    timeout: 200000,
    useColors: true,
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
      configFile: './mocha-report.json',
    },
  }
};

module.exports = config;
