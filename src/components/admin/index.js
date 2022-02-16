import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ethers } from "ethers";
import { getContractInstance } from '../../utils'
import { useFormik } from 'formik';

function Admin() {

	const [contract, setContract] = useState()

	const [maxContribution, setMaxContribution] = useState()
	const [minContribution, setMinContribution] = useState()
	const [currentOwner, setcurrentOwner] = useState()
	const [locked, setLocked] = useState()

	useEffect(async () => {
		if (!contract) {
			setContract(await getContractInstance())
		} else {
			setLocked(await contract.locked())
			setMaxContribution(ethers.utils.formatEther(await contract.maxContribution()))
			setMinContribution(ethers.utils.formatEther(await contract.minContribution()))
			setcurrentOwner(await contract.owner())
			contract.on("contractChange", async () => setContract(await getContractInstance()))
		}

	}, [contract])

	const formik = useFormik({
		initialValues: {
			maxAmount: '',
			minAmount: '',
			newOwner: ''
		}
	});

	const txnMaxContribution = async (amount) => {
		contract.changeMaxContribution(ethers.utils.parseEther(amount))
	}

	const txnMinContribution = async (amount) => {
		contract.changeMinContribution(ethers.utils.parseEther(amount))
	}

	const unlockWithdrawals = async () => {
		contract.unlockWithdrawals()
	}


	return (
		<Container>
			<section>
				<h2>Owner</h2>
				<Form>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Change Max Contribution
						</Form.Label>
						<Col sm="3">
							<Form.Control id="maxAmount" value={formik.values.maxAmount} onChange={formik.handleChange} />
						</Col>
						<Col sm="3">
							<Button onClick={() => txnMaxContribution(formik.values.maxAmount)} variant="primary" >
								Submit
							</Button>
						</Col>
						<Col sm="3">
							Current: {maxContribution}
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Change Min Contribution
						</Form.Label>
						<Col sm="3">
							<Form.Control id="minAmount" value={formik.values.minAmount} onChange={formik.handleChange} />
						</Col>
						<Col sm="3">
							<Button onClick={() => txnMinContribution(formik.values.minAmount)} variant="primary">
								Submit
							</Button>
						</Col>
						<Col sm="3">
							Current: {minContribution}
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Transfer ownership
						</Form.Label>
						<Col sm="3">
							<Form.Control />
						</Col>
						<Col sm="3">
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Col>
						<Col sm="3">
							Current: {currentOwner}
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="3">
							Unlock withdrawals
						</Form.Label>
						<Col sm="3">
							<Form.Control />
						</Col>
						<Col sm="3">
							<Button onClick={unlockWithdrawals} variant="primary">
								Submit
							</Button>
						</Col>
						<Col sm="3">
							Current: {JSON.stringify(locked)}
						</Col>
					</Form.Group>
				</Form>
			</section>
		</Container>
	)
}

export default Admin
