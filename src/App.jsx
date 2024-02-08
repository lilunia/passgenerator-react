import { useState } from 'react'
import './App.css'

function App() {
	const [isPassGenerate, setIsPassGenerate] = useState(false)
	const [newPass, setNewPass] = useState('')
	const [passLength, setPassLength] = useState('4')
	const [isSpecialChar, setIsSpecialChar] = useState(false)
	const [isNumbers, setIsNumbers] = useState(false)
	const [isUppercase, setIsUppercase] = useState(false)
	const [numberOfChecks, setNumberOfChecks] = useState(1)
	let passwordArr = []
	let genLetter, genCharacter, genNumber, genUpperLetter
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

	const generatePass = (passLength, signs, nums, ucase) => {
		let capitalizeArr = letters.map(letter => letter.toUpperCase())

		genCharacter = characters[Math.floor(Math.random() * characters.length)]
		genNumber = numbers[Math.floor(Math.random() * numbers.length)]
		genLetter = letters[Math.floor(Math.random() * letters.length)]
		genUpperLetter = letters[Math.floor(Math.random() * letters.length)].toUpperCase()

		console.log(`numberOfChecks: ${numberOfChecks}`)
		if (passLength) {
			if (signs === true && nums === true && ucase === true) {
				passwordArr.push(genUpperLetter, genCharacter, genNumber)
				allSignArr.push(...letters, ...numbers, ...characters, ...capitalizeArr)
			} else if (signs === true && nums === true) {
				passwordArr.push(genCharacter, genNumber)
				allSignArr.push(...letters, ...numbers, ...characters)
			} else if (signs === true && ucase === true) {
				passwordArr.push(genCharacter, genUpperLetter)
				allSignArr.push(...letters, ...characters, ...capitalizeArr)
			} else if (nums === true && ucase === true) {
				passwordArr.push(genNumber, genUpperLetter)
				allSignArr.push(...letters, ...numbers, ...capitalizeArr)
			} else if (signs === true) {
				passwordArr.push(genCharacter)
				allSignArr.push(...letters, ...characters)
			} else if (nums === true) {
				passwordArr.push(genNumber)
				allSignArr.push(...letters, ...numbers)
			} else if (ucase === true) {
				passwordArr.push(genUpperLetter)
				allSignArr.push(...letters, ...capitalizeArr)
			} else {
				passwordArr.push(genLetter)
				allSignArr.push(...letters)
			}
		}
		const flatArr = allSignArr.flat(Infinity)
		for (let i = 0; i < passLength - numberOfChecks; i++) {
			passwordArr.push(flatArr[Math.floor(Math.random() * flatArr.length)])
			passwordArr.sort(() => {
				return 0.5 - Math.random()
			})
		}
		setNewPass(passwordArr)
	}

	const countChecks = () => {
		console.log(isSpecialChar)
		console.log(isNumbers)
		console.log(isUppercase)
		if (isSpecialChar === true && isNumbers === true && isUppercase === true) {
			setNumberOfChecks(prevNumber => {
				return prevNumber === 0 ? prevNumber + 3 : 3
			})
		} else if (
			(isSpecialChar === true && isNumbers === true) ||
			(isSpecialChar === true && isUppercase === true) ||
			(isNumbers === true && isUppercase === true)
		) {
			setNumberOfChecks(prevNumber => {
				return prevNumber === 0 ? prevNumber + 2 : 2
			})
		} else if (isSpecialChar === false && isNumbers === false && isUppercase === false) {
			setNumberOfChecks(prevNumber => {
				return prevNumber === 0 ? prevNumber + 1 : 1
			})
		} else {
			setNumberOfChecks(prevNumber => {
				return prevNumber === 0 ? prevNumber + 1 : 1
			})
		}
		console.log(`numOfChecks ${numberOfChecks}`)
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
							}}
						/>
						Special characters
					</label>
					<label htmlFor='numbers-id'>
						<input
							type='checkbox'
							id='numbers-id'
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
						countChecks()
						generatePass(passLength, isSpecialChar, isNumbers, isUppercase)
						setIsPassGenerate(true)
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
