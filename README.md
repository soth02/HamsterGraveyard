# Hamster Graveyard - ConsenSys Academy Final Project

Hamster Graveyard is smart contract for memorializing your deceased hamsters.  It was written primary as the final project for the Consensys Academy developer program, but also as a tribute my hamster, Hamtaro.

This project is based on the truffle react box: https://github.com/truffle-box/react-box.git

## Setup

1. You will need to install nodejs.  Please see https://github.com/nodesource/distributions/blob/master/README.md for installation    directions.  This project was created with version `node v8.10.0`.

2. You will also need to install truffle and ganache-cli.

   ```js
    npm install -g ganache-cli
    npm install -g truffle
   ```
3. Clone this repo.

4. Navigate to the `client` directory and run `npm install`.

5. Run the development console.
    ```javascript
    truffle develop
    ```
    
6. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```
7. Run tests against the solidity contracts.

    ```javascript
    test
    ```

8. In the `client` directory, run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm run start
    ```
9. Install MetaMask on your browser: https://metamask.io

10. Navigate to http://localhost:3000
