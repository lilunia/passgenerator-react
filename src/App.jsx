import { useState } from 'react'
import { Input } from './components/Input/Input'
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
	const [errorMessage, setErrorMessage] = useState('')

	const generatePass = () => {
		const letters = 'abcdefghijklmnopqrstuvwxyz'
		const characters = '~`!@#$%^&*()_-+={}[];:|?<>,?'
		const numbers = '0123456789'
		const UpLetters = letters.toUpperCase()
		let tabChecks = 0
		let chosenChar = letters
		let genPass = []

		setIsPassShown(true)
		setHiddenPass('')

		if (isSpecialChar) {
			chosenChar += characters
			genPass.push(characters[Math.floor(Math.random() * characters.length)])
			tabChecks++
		}
		if (isNumbers) {
			chosenChar += numbers
			genPass.push(numbers[Math.floor(Math.random() * numbers.length)])
			tabChecks++
		}
		if (isUppercase) {
			chosenChar += UpLetters
			genPass.push(UpLetters[Math.floor(Math.random() * UpLetters.length)])
			tabChecks++
		}

		for (let i = 0; i < passLength - tabChecks; i++) {
			genPass.push(chosenChar[Math.floor(Math.random() * chosenChar.length)])
		}
		setNewPass(genPass)
	}
	const arrayOfCheckboxes = [
		{
			children: 'Special characters',
			htmlFor: 'special-id',
			id: 'special-id',
			checked: isSpecialChar,
			onChange: () => {
				setIsSpecialChar(prev => !prev)
			},
		},
		{
			children: 'Numbers',
			htmlFor: 'numbers-id',
			id: 'numbers-id',
			checked: isNumbers,
			onChange: () => {
				setIsNumbers(prev => !prev)
			},
		},
		{
			children: 'Upper case',
			htmlFor: 'uppercase-id',
			id: 'uppercase-id',
			checked: isUppercase,
			onChange: () => {
				setIsUppercase(prev => !prev)
			},
		},
	]

	return (
		<>
			<div className='password-generator'>
				<Input
					value={passLength}
					onChange={e => {
						setPassLength(e.target.value)
					}}
				/>
				<p className='error'>{errorMessage}</p>
				<div className='options'>
					{arrayOfCheckboxes.map((checkbox, index) => (
						<Checkbox key={index} type='checkbox' {...checkbox} />
					))}
				</div>
				<Button
					className='generate-button'
					onClick={() => {
						if (passLength >= 3) {
							setErrorMessage('')
							generatePass()
							setIsPassGenerate(true)
						} else {
							setIsPassGenerate(false)
							setErrorMessage(
								'Password should contain at least 3 characters!'
							)
						}
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
