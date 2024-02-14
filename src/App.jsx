import { useState } from 'react'
import { Checkbox } from './components/Checkbox/Checkbox'
import { Button } from './components/Button/Button'
import './App.css'

function App() {
	const [isPassGenerate, setIsPassGenerate] = useState(false)
	const [newPass, setNewPass] = useState('')
	const [hiddenPass, setHiddenPass] = useState('')
	const [passLength, setPassLength] = useState(4)
	const [isSpecialChar, setIsSpecialChar] = useState(false)
	const [isNumbers, setIsNumbers] = useState(false)
	const [isUppercase, setIsUppercase] = useState(false)
	const [isPassShown, setIsPassShown] = useState(true)
	// const [errorMessage, setErrorMessage] = useState('')

	const generatePass = () => {
		const letters = 'abcdefghijklmnopqrstuvwxyz'
		const characters = '~`!@#$%^&*()_-+={}[];:|?<>,?'
		const numbers = '0123456789'
		const UpLetters = letters.toUpperCase()
		let tabChecks = 0
		let chosenSigns = letters
		let genPass = []

		setIsPassShown(true)
		setHiddenPass('')

		if (isSpecialChar) {
			chosenSigns += characters
			genPass.push(characters[Math.floor(Math.random() * characters.length)])
			tabChecks++
		}
		if (isNumbers) {
			chosenSigns += numbers
			genPass.push(numbers[Math.floor(Math.random() * numbers.length)])
			tabChecks++
		}
		if (isUppercase) {
			chosenSigns += UpLetters
			genPass.push(UpLetters[Math.floor(Math.random() * UpLetters.length)])
			tabChecks++
		}

		for (let i = 0; i < passLength - tabChecks; i++) {
			genPass.push(chosenSigns[Math.floor(Math.random() * chosenSigns.length)])
		}
		setNewPass(genPass)
	}

	return (
		<>
			<div className='password-generator'>
				<label htmlFor='length-id'>
					Password length:
					<input
						type='number'
						value={passLength}
						min='4'
						step='1'
						id='length-id'
						onChange={e => {
							setPassLength(e.target.value)
						}}
					/>
				</label>
				<div className='options'>
					<Checkbox
						htmlFor='special-id'
						type='checkbox'
						id='special-id'
						checked={isSpecialChar}
						onChange={() => {
							setIsSpecialChar(prev => !prev)
						}}
					>
						Special characters
					</Checkbox>
					<Checkbox
						htmlFor='numbers-id'
						type='checkbox'
						id='numbers-id'
						checked={isNumbers}
						onChange={() => {
							setIsNumbers(prev => !prev)
						}}
					>
						Numbers
					</Checkbox>
					<Checkbox
						htmlFor='uppercase-id'
						type='checkbox'
						id='uppercase-id'
						checked={isUppercase}
						onChange={() => {
							setIsUppercase(prev => !prev)
						}}
					>
						Upper case
					</Checkbox>
				</div>
				<Button
					className='generate-button'
					onClick={() => {
						generatePass()
						setIsPassGenerate(true)
					}}
				>
					Generate a password
				</Button>
				{isPassGenerate && (
					<div className='generated-form'>
						<strong>Your password is:</strong>
						<div className='generated-pass'>
							{isPassShown ? newPass : hiddenPass}
						</div>
						<div className='pass-options'>
							<Button
								className='hideshow-pass'
								onClick={() => {
									setIsPassShown(prev => !prev)
									setHiddenPass('*'.repeat(passLength))
								}}
							>
								{isPassShown ? 'Hide' : 'Show'}
							</Button>
							<Button
								className='copy-pass'
								onClick={() => {
									navigator.clipboard.writeText(newPass.join(''))
									alert('Your password was copied!')
								}}
							>
								Copy
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default App
