import { useState } from 'react'
import './App.css'

function App() {
	const [isPassGenerate, setIsPassGenerate] = useState(false)
	const [newPass, setNewPass] = useState('')
	const [passLength, setPassLength] = useState('4')
	const [isSpecialChar, setIsSpecialChar] = useState(false)
	const [isNumbers, setIsNumbers] = useState(false)
	const [isUppercase, setIsUppercase] = useState(false)
	const [numberOfChecks, setNumberOfChecks] = useState(0)
	let passwordArr = []
	let genLetter, genCharacter, genNumber

	const generatePass = (passLength, signs, nums, ucase) => {
		const letters = [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'r',
			's',
			't',
			'u',
			'v',
			'x',
			'y',
			'z',
		]

		const characters = [
			'~',
			'`',
			'!',
			'@',
			'#',
			'$',
			'%',
			'^',
			'&',
			'*',
			'(',
			')',
			'_',
			'-',
			'+',
			'=',
			'{',
			'}',
			'[',
			']',
			';',
			':',
			"'",
			'"',
			'|',
			'/',
			'<',
			'>',
			',',
			'.',
			'?',
		]
		const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		let allSignArr = []
		const flatArr = allSignArr.flat(Infinity)

		if (signs === true && nums === true && ucase === true) {
			genCharacter = characters[Math.floor(Math.random() * characters.length)]
			genNumber = numbers[Math.floor(Math.random() * numbers.length)]
			genLetter = letters[Math.floor(Math.random() * letters.length)].toUpperCase()
			passwordArr.push(genLetter, genCharacter, genNumber)
		} else if (signs === true && nums === true) {
			genCharacter = characters[Math.floor(Math.random() * characters.length)]
			genNumber = numbers[Math.floor(Math.random() * numbers.length)]
			passwordArr.push(genCharacter)
		} else if (signs === true && ucase === true) {
			genCharacter = characters[Math.floor(Math.random() * characters.length)]
			genLetter = letters[Math.floor(Math.random() * letters.length)].toUpperCase()
			passwordArr.push(genLetter, genCharacter)
		} else if (nums === true && ucase === true) {
			genNumber = numbers[Math.floor(Math.random() * numbers.length)]
			genLetter = letters[Math.floor(Math.random() * letters.length)].toUpperCase()
			passwordArr.push(genNumber, genLetter)
		} else if (signs === true) {
			genCharacter = characters[Math.floor(Math.random() * characters.length)]
			passwordArr.push(genCharacter)
		} else if (nums === true) {
			genNumber = numbers[Math.floor(Math.random() * numbers.length)]
			passwordArr.push(genNumber)
		} else {
			genLetter = letters[Math.floor(Math.random() * letters.length)]
			passwordArr.push(genLetter)
		}

		if (passLength) {
			console.log(passLength)
			for (let i = 0; i < passLength - 1; i++) {
				passwordArr.push(flatArr[Math.floor(Math.random() * flatArr.length)])
				passwordArr.sort(() => {
					return 0.5 - Math.random()
				})
				console.log(`nr pętli ${i}`)
				console.log(flatArr.length)
			}

			setNewPass(passwordArr)
		}
	}

	const countChecks = () => {
		(isSpecialChar === true && isNumbers === true && isUppercase === true){
			
		}
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
						max='15'
						step='1'
						id='length-id'
						onChange={e => {
							setPassLength(e.target.value)
							console.log(e.target.value)
						}}
					/>
				</label>
				<div className='options'>
					<label htmlFor='special-id'>
						<input
							type='checkbox'
							id='special-id'
							onChange={() => {
								setIsSpecialChar(prev => !prev)
								countChecks()
							}}
						/>{' '}
						Special characters
					</label>
					<label htmlFor='numbers-id'>
						<input
							type='checkbox'
							id='numbers-id'
							onChange={() => setIsNumbers(prev => !prev)}
						/>{' '}
						Numbers
					</label>
					<label htmlFor='uppercase-id'>
						<input
							type='checkbox'
							id='uppercase-id'
							onChange={() => setIsUppercase(prev => !prev)}
						/>{' '}
						Upper case
					</label>
				</div>

				<button
					className='generate-button'
					onClick={() => {
						setIsPassGenerate(true)
						console.log(passLength)
						generatePass(passLength, isSpecialChar, isNumbers, isUppercase)
					}}
				>
					Generate a password
				</button>
				{isPassGenerate && (
					<div className='generated-form'>
						<strong>Your password is:</strong>
						<div className='generated-pass'>{newPass}</div>
						<div className='pass-options'>
							<button className='hideshow-pass'>Hide</button>
							<button className='copy-pass'>Copy</button>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default App
