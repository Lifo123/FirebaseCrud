import './Loading.css'

interface LoadingProps {
    className?: string;
    styleParent?: React.CSSProperties;
    line?: React.CSSProperties
}

export default function Loading({
    className = '',
    line = {},
    styleParent = {}
}: LoadingProps) {
    return (
        <span className='load-bg d-flex f-center relative h-100 w-100 br-10'>
            <span className={`load-circle d-flex f-center m-auto relative ${className}`} style={styleParent}>
                <svg className='d-flex relative'>
                    <circle className='absolute' cx="70" cy="70" r="70" style={line}></circle>
                </svg>
            </span>
        </span>
    )
}