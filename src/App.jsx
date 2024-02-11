import { useState } from 'react'
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
					<label htmlFor='special-id'>
						<input
							type='checkbox'
							id='special-id'
							checked={isSpecialChar}
							onChange={() => {
								setIsSpecialChar(prev => !prev)
							}}
						/>
						Special characters
					</label>
					<label htmlFor='numbers-id'>
						<input
							type='checkbox'
							id='numbers-id'
							checked={isNumbers}
							onChange={() => {
								setIsNumbers(prev => !prev)
							}}
						/>
						Numbers
					</label>
					<label htmlFor='uppercase-id'>
						<input
							type='checkbox'
							id='uppercase-id'
							checked={isUppercase}
							onChange={() => {
								setIsUppercase(prev => !prev)
							}}
						/>
						Upper case
					</label>
				</div>

				<button
					className='generate-button'
					onClick={() => {
						generatePass()
						setIsPassGenerate(true)
					}}
				>
					Generate a password
				</button>
				{isPassGenerate && (
					<div className='generated-form'>
						<strong>Your password is:</strong>
						<div className='generated-pass'>
							{isPassShown ? newPass : hiddenPass}
						</div>
						<div className='pass-options'>
							<button
								className='hideshow-pass'
								onClick={() => {
									setIsPassShown(prev => !prev)
									setHiddenPass('*'.repeat(passLength))
								}}
							>
								{isPassShown ? 'Hide' : 'Show'}
							</button>
							<button
								className='copy-pass'
								onClick={() => {
									navigator.clipboard.writeText(newPass.join(''))
									alert('Your password was copied!')
								}}
							>
								Copy
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default App
