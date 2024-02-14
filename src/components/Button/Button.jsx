import './Button.css'

export const Button = ({ children, className, onClick }) => {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	)
}
