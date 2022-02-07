const { expect } = require("chai");

describe("Box", function () {
  before(async () => {
    [owner] = await ethers.getSigners();

    Box = await ethers.getContractFactory("BoxV1");
    BoxV2 = await ethers.getContractFactory("BoxV2");

    instance = await upgrades.deployProxy(Box, [42, 42]);
    implementationV1 = await upgrades.erc1967.getImplementationAddress(instance.address);

    await instance.setData(owner.address);
    upgraded = '';
  });

  it('1. Test address migration V1 to V2', async () => {
    upgraded = await upgrades.upgradeProxy(instance.address, BoxV2);
    //proxy
    expect(instance.address).to.equal(upgraded.address);
    //implement
    const implementationV2 = await upgrades.erc1967.getImplementationAddress(upgraded.address);
    expect(implementationV1).to.not.equal(implementationV2);
  });

  it('2. Test balance', async () => {
    const balanceMsgV1 = (await upgraded.balances(owner.address)).toString();
    const balanceMsgV2 = (await upgraded.balances(owner.address)).toString();
    expect(balanceMsgV1).to.equal(balanceMsgV2);

    const value = await upgraded.perimeter();
    expect(value.toString()).to.equal('168');

    const totalAmountV1 = await instance.getTotalAmount();
    const totalAmountV2 = await upgraded.getTotalAmount();
    expect(totalAmountV1.toString()).to.equal(totalAmountV2.toString());
  });

  it('3. Test function perimeter', async () => {
    const value = await upgraded.perimeter();
    expect(value.toString()).to.equal('168');
  });

  it('4. Test mapping totalAmount', async () => {
    const totalAmountV1 = await instance.getTotalAmount();
    const totalAmountV2 = await upgraded.getTotalAmount();
    expect(totalAmountV1.toString()).to.equal(totalAmountV2.toString());
  });

  it('5. Test mapping deposit', async () => {
    const depositV1 = await instance.getDeposit(owner.address);
    const depositV2 = await upgraded.getDeposit(owner.address);
    expect(depositV1.toString()).to.equal(depositV2.toString());
  });
});
