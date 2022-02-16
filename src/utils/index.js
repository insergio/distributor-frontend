import { ethers } from "ethers";
import Distributor from "../Distributor.json";

async function requestAccount() {
	await window.ethereum.request({ method: 'eth_requestAccounts' });
}

export const getAddress = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	return await signer.getAddress()
}

export const getContractInstance = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract
		let signer

		await requestAccount();
		signer = provider.getSigner();

    contract = new ethers.Contract(
      '0x89081440097Ba0C5512c67ca44563E96720b8f98',
      Distributor.abi,
      signer || provider
    );

    return contract;
  }
};

function index() {
    return (
        <div>
            
        </div>
    )
}

export default index
