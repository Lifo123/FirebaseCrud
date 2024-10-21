let d7: any[] = [];
let d6: any[] = [];
let d5: any[] = [];
let d4: any[] = [];
let d3: any[] = [];


export const divide = (ES: any[]) => {
    for (let i = 0; i < ES.length; i++) {
        const char = ES[i];
        if (char.length === 7) {
            d7.push(char);
        } else if (char.length === 6) {
            d6.push(char);
        } else if (char.length === 5) {
            d5.push(char);
        } else if (char.length === 4) {
            d4.push(char);
        } else if (char.length === 3) {
            d3.push(char);
        }
    }

    console.log({ d3, d4, d5, d6, d7 });


}