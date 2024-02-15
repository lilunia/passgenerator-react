import './Input.css'
export const Input = ({ value, onChange }) => {
	return (
		<label htmlFor='length-id'>
			Password length:
			<input type='number' value={value} min='3' step='1' id='length-id' onChange={onChange} />
		</label>
	)
}
