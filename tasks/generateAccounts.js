const { task } = require('hardhat/config');
const { generateAccount } = require('../common/utils');
const {
  GENERATE_ACCOUNT_AMOUNT,
  GENERATE_ACCOUNT_SECRET
} = require('../common/constant');

task('generate:accounts', 'Generate account wallet addresses')
  .addOptionalParam('amount', 'Amount of account wallet addresses that we want generate', GENERATE_ACCOUNT_AMOUNT)
  .addOptionalParam('secret', 'Secret string for hashing', GENERATE_ACCOUNT_SECRET)
  .setAction(async (taskArgs) => {
    for (let i = 0; i < taskArgs.amount; i++) {
      const account = generateAccount(i, taskArgs.secret);
      console.log(`Account ${i}`);
      console.log(`    Address    : ${account.address}`);
      console.log(`    Private key: ${account.privateKey}`);
      console.log('-----------------------------------------------------------------------------------')
    }
  });
