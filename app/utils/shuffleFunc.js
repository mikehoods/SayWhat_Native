import alphabet from './alphabet'

const shuffleFunc = () => {
    const shuffledAlphabet = [...alphabet]

    for (let i = alphabet.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAlphabet[i], shuffledAlphabet[j]] = [shuffledAlphabet[j], shuffledAlphabet[i]];
    }
    for (let i in shuffledAlphabet) {
        if (alphabet[i] === shuffledAlphabet[i]) {
            do {
                var j = Math.floor(Math.random() * (alphabet.length + 1));  //random index, use var because of scoping
            } while (j === i);  // This checks reference. For equality do: arr[j] === arr_copy[i]
        
            [shuffledAlphabet[i], shuffledAlphabet[j]] = [shuffledAlphabet[j], shuffledAlphabet[i]];
        }
    }
    return shuffledAlphabet
}
    
export default shuffleFunc;