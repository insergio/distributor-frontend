import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ethers } from "ethers";
import { getContractInstance, getAddress } from '../../utils'
import { useFormik } from 'formik';

function Contributors() {

	const [contract, setContract] = useState()
	const [currentContribution, setCurrentContribution] = useState()

	useEffect(async () => {
		if (!contract) {
			setContract(await getContractInstance())
		}else{
			setCurrentContribution(ethers.utils.formatEther(await contract.contributions(await getAddress())))
			contract.on("userChange", async (address, value) =>{ 
				if(address== await getAddress()){
					setCurrentContribution(ethers.utils.formatEther(value))
				}
			})
		}
	}, [contract])

	const formik = useFormik({
		initialValues: {
			amount: ''
		}
	});

	const txnContribute = async (amount) => {
		contract.contribute({ value: ethers.utils.parseEther(amount) })
	}

	const txnRetire = async () => {
		contract.retire()
	}

	const txnWithdraw = async () => {
		contract.txnWithdraw()
	}


	return (
		<Container>
			<section>
				<h2>Contributor</h2>
				<Form>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Contribute
						</Form.Label>
						<Col sm="3">
							<Form.Control id="amount" value={formik.values.amount} onChange={formik.handleChange} />
						</Col>
						<Col sm="3">
							<Button onClick={() => txnContribute(formik.values.amount)} variant="primary" >
								Submit
							</Button>
						</Col>
						<Col sm="3">
							Current contribution: {currentContribution}
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Retire
						</Form.Label>
						<Col sm="3">

						</Col>
						<Col sm="3">
							<Button onClick={() => txnRetire()} variant="primary">
								Submit
							</Button>
						</Col>
						<Col sm="3">
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Withdraw
						</Form.Label>
						<Col sm="3">
						</Col>
						<Col sm="3">
							<Button onClick={() => txnWithdraw()} variant="primary">
								Submit
							</Button>
						</Col>
						<Col sm="3">
						</Col>
					</Form.Group>
				</Form>
			</section>
		</Container>
	)
}

export default Contributors