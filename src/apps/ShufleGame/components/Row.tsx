import Box from "./Box";

type RowProps = {
    data: any;
    id: number;
};


export default function Row({ data, id }: RowProps) {
    
    return (
        <div className='game-row f-row g-2' data-row={id}>
            {
                data?.map((box: any, index: number) => (
                    <Box key={index} data={box} id={index} />
                ))
            }
        </div>
    )
}