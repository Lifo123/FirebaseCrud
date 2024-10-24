import { useEffect, useRef } from "react";

type RowProps = {
    data: any;
    id: number;
};

export default function Box({ data, id }: RowProps) {
    const boxRef: any = useRef(null);
    useEffect(() => {
        if (data.isValid !== null) {
            setTimeout(() => {
                boxRef.current.classList.add('validate')
                setTimeout(() => {
                    boxRef.current.setAttribute('data-valid', data.isValid || 'none')
                }, 300); 

            }, (id) * 170);
        } else {
            boxRef.current.classList.remove('validate')
            boxRef.current.removeAttribute('data-valid')
        }

    }, [data?.isValid])


    return (
        <span className={`box-letter br-6 f-center fs-6 fw-900 ${data.char ? 'active' : ''}`} key={id} data-box={id} ref={boxRef}>
            {data.char}
        </span>
    )

}