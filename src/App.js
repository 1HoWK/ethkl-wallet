import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { abi } from "./abi";
import { useState } from "react";
import  ButtonAppBar from "./components/nav";

function App() {
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [balance, setBalance] = useState();

  const getBlock = async () => {
    // connectivity to web3 app
    const connectMetaMaskWallet = new ethers.BrowserProvider(window.ethereum);
    const block = await connectMetaMaskWallet.getBlockNumber();
    // get latest block number
    console.log(block);
    // get connected  address
    const address = await connectMetaMaskWallet.getSigner();
    console.log(address.address);

    // create contract

    const token = new ethers.Contract(
      "0xc170bd5653B0d499eE2cAa700E4338B7549424eD",
      abi,
      address
    );

    // display token name and symbol
    const name = await token.name();
    setName(name);

    const symbol = await token.symbol();
    setSymbol(symbol);

    // get connected address balance

    const balance = await token.balanceOf(address.address);
    setBalance(balance);

    //
  };

  const mintNasiToken = async () => {
    // connectivity to web3 app
    const connectMetaMaskWallet = new ethers.BrowserProvider(window.ethereum);
    const block = await connectMetaMaskWallet.getBlockNumber();
    // get latest block number
    console.log(block);
    // get connected  address
    const address = await connectMetaMaskWallet.getSigner();
    console.log(address.address);

    // create contract

    const token = new ethers.Contract(
      "0xc170bd5653B0d499eE2cAa700E4338B7549424eD",
      abi,
      address
    );

    await token.mint(address.address, ethers.parseEther("100000"));
  };

  getBlock();

  return (
    <div>
      <ButtonAppBar />
      <p>ETH KL Intro to EtherJS</p>

      <p>{name}</p>
      <p>{balance + " " + symbol}</p>
      <button onclick={() => mintNasiToken()}>Mint Nasi Token</button>
    </div>
  );
}

export default App;
