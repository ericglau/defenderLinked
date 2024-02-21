const { DeployClient } = require('@openzeppelin/defender-sdk-deploy-client');

async function main() {

  require('dotenv').config();

  const client = new DeployClient({ apiKey: process.env.API_KEY, apiSecret: process.env.API_SECRET });
  
  const buildInfo = require('./build-info.json');
  
  const deploymentRequest = {
    artifactPayload: JSON.stringify(buildInfo),
    contractName: "MyContract",
    contractPath: "contracts/MyContract.sol",
    network: "sepolia",
    licenseType: "MIT",
    constructorInputs: [],
    verifySourceCode: true,
    libraries: {
      "contracts/Version.sol:Version": "0x11ae63f7cf126ea9005de2854000752c9dae4afc"
    },
  };
  
  const deploymentResponse = await client.deployContract(deploymentRequest);
  console.log(deploymentResponse);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
