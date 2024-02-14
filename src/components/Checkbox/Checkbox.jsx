import './Checkbox.css'

export const Checkbox = ({ children, htmlFor, type, id, checked, onChange }) => {
	return (
		<label htmlFor={htmlFor}>
			<input type={type} id={id} checked={checked} onChange={onChange} />
			{children}
		</label>
	)
}
