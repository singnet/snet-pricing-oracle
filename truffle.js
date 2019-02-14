let HDWalletProvider = require("truffle-hdwallet-provider");
let Web3 = require("web3");

let provider = (endpoint) => {
    if (process.env.HDWALLET_MNEMONIC) {
        return new HDWalletProvider(process.env.HDWALLET_MNEMONIC, endpoint);
    } else {
        return new Web3.providers.HttpProvider(endpoint);
    }
}

let truffleOptions = {
    networks: {
        local: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Any network ID
        },
        develop : {
            host: "127.0.0.1",
            port: 9545,
            network_id: "*",
        },
        localhd: {
            provider: () => provider("http://127.0.0.1:8545"),
            network_id: "*" // Any network ID
        },
        kovan: {
            gasPrice: 500000000,
            provider: () => provider("https://kovan.infura.io"),
            network_id: "42" // Kovan network ID
        },
    },
    mocha: {
        enableTimeouts: false,
        reporter: 'eth-gas-reporter',
        reporterOptions : {
            currency: 'USD',
            onlyCalledMethods: 'true',
            showTimeSpent: 'true'
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};

let reporterArg = process.argv.indexOf('--reporter');
if (reporterArg >= 0) {
    truffleOptions['mocha'] = {
        reporter: process.argv[reporterArg + 1]
    };
}

module.exports = truffleOptions;