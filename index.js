const { mnemonicGenerate, mnemonicValidate } = require('@polkadot/util-crypto');
const { Keyring, WsProvider, ApiPromise} = require('@polkadot/api');
  
async function main () {
    // Create mnemonic string for Alice using BIP39
    const mnemonic = mnemonicGenerate();

    console.log(`Generated mnemonic: ${mnemonic}`);

    // Validate the mnemonic string that was generated
    const isValidMnemonic = mnemonicValidate(mnemonic);

    console.log(`isValidMnemonic: ${isValidMnemonic}`);

    ws = new WsProvider('wss://api-mainnet.selendra.org');
    api = await ApiPromise.create({ provider: ws });

    const keyring = new Keyring({ 
        type: 'sr25519', 
        ss58Format: 972
    });

    const pair = keyring.createFromUri(mnemonic);

    // Retrieve the account balance via the system module
    const { data: balance } = await api.query.system.account(pair.address);

    console.log(`Account Balance: ${balance}`);

    console.log(`Account Address: ${pair.address}`);

}

main().catch(console.error).finally(() => process.exit());