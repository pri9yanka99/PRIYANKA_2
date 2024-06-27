import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const [a, setA] = useState(undefined);
  const [b, setB] = useState(undefined);
  const [sum ,  setSum] = useState(undefined);
  const [subtraction, setSubtraction] = useState(undefined);
  const [multiplication, setMultiplication] = useState(undefined);
  const [division, setDivision] = useState(undefined);
  const [power, setPower] = useState(undefined);
  const [modulus, setModulus] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => { 
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const getA = async() => {
    if (atm) {
      setA((await atm.getA()).toNumber());
    }
  }
  const getB = async() => {
    if (atm) {
      setB((await atm.getB()).toNumber());
    }
  }  
  const getSum = async() => {
    if (atm) {
      setSum((await atm.getSum()).toNumber());
    }
  }
  const getSubtraction = async() => {
    if (atm) {
      setSubtraction((await atm.getSubtraction()).toNumber());
    }
  }  
  const getMultiplication = async() => {
    if (atm) {
      setMultiplication((await atm.getMultiplication()).toNumber());
    }
  }
  const getDivision = async() => {
    if (atm) {
      setDivision((await atm.getDivision()).toNumber());
    }
  }  
  const getPower = async() => {
    if (atm) {
      setPower((await atm.getPower()).toNumber());
    }
  }
  const getModulus = async() => {
    if (atm) {
      setModulus((await atm.getModulus()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  }
  const deposit_number = async() => {
    if (atm) {
      var x = document.getElementById("myInput_deposit").value;
      let tx = await atm.deposit(x);
      await tx.wait();
      getBalance();

    }
  }

  const withdraw_number = async() => {
    if (atm) {
      var x = document.getElementById("myInput_withdraw").value;
      let tx = await atm.withdraw(x);
      await tx.wait();
      getBalance();
    }
  }

  const operations = async() => {
    if (atm) {
      var x = document.getElementById("a_value").value;
      var y = document.getElementById("b_value").value;
      let tx = await atm.operations(x,y);
      await tx.wait();
      getA();
      getB();
      getSum();
      getSubtraction();
      getMultiplication();
      getDivision();
      getPower();
      getModulus();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }
    if (a == undefined) {
      getA();
    }
    if (b == undefined) {
      getB();
    }
    if (sum == undefined) {
      getSum();
    }
    if (subtraction == undefined) {
      getSubtraction();
    }
    if (multiplication == undefined) {
      getMultiplication();
    }
    if (division == undefined) {
      getDivision();
    }
    if (power == undefined) {
      getPower();
    }
    if (modulus == undefined) {
      getModulus();
    }
    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p><button onClick={deposit}>Deposit 1 ETH</button></p>
        <p><button onClick={withdraw}>Withdraw 1 ETH</button></p>

        <h1>Welcome to the OHIYAAR ATM!</h1>        
        <h4>Your Account: {account}</h4>
        <h4>Your Balance: {balance}</h4>
        <p>
        <input type="number" id="myInput_deposit" placeholder="Enter deposit value : "></input>
        </p>
        <p><button onClick={deposit_number}>Deposit ETH</button></p>
        <p>
        <input type="number" id="myInput_withdraw" placeholder="Enter deposit value : "></input>
        </p>
        <p><button onClick={withdraw_number}>Withdraw ETH</button></p>

        <h2>MATHEMATICAL OPERATIONS</h2>
        <p>
        <input type="number" id="a_value" placeholder="Enter value of A : "></input>
        </p>
        <p>
        <input type="number" id="b_value" placeholder="Enter value of B : "></input>
        </p>
        <p>(Values Must be Natural Numbers , Output will be in Natural Numbers.)*</p>
        <p><button onClick={operations}>SUBMIT</button></p> 
        <p>Value of A is : {a}</p>
        <p>Value of B is : {b}</p>
        <p>Sum of A and B is : {sum}</p>
        <p>Subtraction of A and B is : {subtraction}</p>
        <p>Multiplication of A and B is : {multiplication}</p>
        <p>Division of A and B is : {division}</p>
        <p>Power of A and B is : {power}</p>
        <p>Modulus of A and B is : {modulus}</p>
      </div>

    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the METACRAFTER ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #6ee9e9;
          color: #1700ff;
        }
      `}
      </style>
    </main>
  )
}
