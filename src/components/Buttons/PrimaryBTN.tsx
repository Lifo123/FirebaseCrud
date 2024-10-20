import './Buttons.css'

export default function PrimaryBTN({ text = "Button", funct = () => {
    console.log('Clicked');
} }) : JSX.Element {
    //Functions
    

    return (
        <span className='primary-btn d-flex br-4' onClick={funct}>
            {text}
        </span>
    )
}