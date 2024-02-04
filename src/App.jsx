import { useState } from 'react'
import './App.css'

function App() {
	const [isPassGenerate, setIsPassGenerate] = useState(false)
	const [newPass, setNewPass] = useState('')
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
		allSignArr.push(letters, characters, numbers)
		console.log(allSignArr)
		const flatArr = allSignArr.flat(Infinity)

		if (signs === true && nums === true && ucase === true) {
			genCharacter = characters[Math.floor(Math.random() * characters.length)]
			genNumber = numbers[Math.floor(Math.random() * numbers.length)]
			genLetter = letters[Math.floor(Math.random() * letters.length)].toUpperCase()

			passwordArr.push(genLetter, genCharacter, genNumber)

			if (passLength >= 4) {
				for (let i = 0; i < passLength - 3; i++) {
					passwordArr.push(flatArr[Math.floor(Math.random() * flatArr.length)])
					passwordArr.sort(() => {
						return 0.5 - Math.random()
					})
				}
			}
			setNewPass(passwordArr)
		}
	}

	return (
		<>
			<div className='password-generator'>
				<label htmlFor='length-id'>
					Password length:
					<input type='number' min='4' max='15' step='1' id='length-id' />
				</label>
				<div className='options'>
					<label htmlFor='special-id'>
						<input type='checkbox' id='special-id' /> Special characters
					</label>
					<label htmlFor='numbers-id'>
						<input type='checkbox' id='numbers-id' /> Numbers
					</label>
					<label htmlFor='uppercase-id'>
						<input type='checkbox' id='uppercase-id' /> Upper case
					</label>
				</div>

				<button
					className='generate-button'
					onClick={() => {
						setIsPassGenerate(true)
						generatePass(3, true, true, true)
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
