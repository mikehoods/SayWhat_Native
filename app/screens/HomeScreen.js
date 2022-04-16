import { useEffect, useState } from 'react';
import { Image, Text, ScrollView, StyleSheet, View } from 'react-native';

import alphabet from '../utils/alphabet';
import EncryptedText from '../components/EncryptedText'
import shuffleFunc from '../utils/shuffleFunc';
import Modal from '../components/Modal';
import puzzle_bulb from '../assets/puzzle_bulb.png';
import puzzle_bulb_clicked from '../assets/puzzle_bulb_clicked.png';
import useFetch from '../hooks/useFetch';

function HomeScreen() {
    const [cryptoQuote, setCryptoQuote] = useState(null);
    const [cryptoName, setCryptoName] = useState(null);
    const [hints, setHints] = useState([]);
    const [hintsGiven, setHintsGiven] = useState([false, false, false])
    const [name, setName] = useState(null);
    const [pendingSolution, setPendingSolution] = useState(null);
    const [quote, setQuote] = useState(null);
    const [randLetters, setRandLetters] = useState([])
    const [shuffledAlphabet, setShuffledAlphabet] = useState(null);
    const [solution, setSolution] = useState(null);
    const [visible, setVisible] = useState("hidden");

    const { data, error, isLoading } = useFetch();
    const newGame = () => window.location.reload(false)
    const punctuation = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~\s]/

    const updatePendingSolution = () => {
        let inputElements = document.getElementsByClassName("char_input")
        let placeholder = []
        for (let i=0; i < inputElements.length; i++) placeholder[i] = inputElements[i].value
        setPendingSolution(placeholder.join('')) 
    }

    useEffect(() => {
        if (data) {
            setQuote(data.quote)
            // setName(data.slug.split("-").map(str => str.replace(/\b\w+/g, str => {return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()})).join(" "))
            setName(data.name)
        }   
    }, [data])

    useEffect(() => {
        if (shuffleFunc) setShuffledAlphabet(shuffleFunc)
    }, [])

    useEffect(() => {
        const encrypt = (char) => {
            if (char.match(/[A-Za-z]/)) {
                return (
                    char === char.toLowerCase() ? shuffledAlphabet[alphabet.indexOf(char.toUpperCase())].toLowerCase()
                    : shuffledAlphabet[alphabet.indexOf(char)]
                )
            }  
        }
    
        const encryptQuote = () => {
            setCryptoQuote(quote.split('').map(char => char.replace(/[A-Za-z]/, encrypt(char))).join(''))
            setCryptoName(name.split('').map(char => char.replace(/[A-Za-z]/, encrypt(char))).join(''))
            setSolution((quote + name).toLowerCase().split('').map(char => char.replace(punctuation, "")).join(''))
        }
        if (name && quote && shuffledAlphabet) encryptQuote()
    }, [quote, name, shuffledAlphabet])

    useEffect(() => {
        if (hints.length > 0) {
            let copyHints = hintsGiven
            copyHints[hints.length -1] = true
            setHintsGiven([...copyHints])
        } 
    }, [hints])

    useEffect(() => {
        if (solution && pendingSolution) {
            if (solution === pendingSolution) {
                setVisible(true)
            }
        }
    }, [pendingSolution])

    const handleChange = (e) => {
        let letter = document.getElementsByClassName(e.target.className)
        for (let i=0; i < letter.length; i++) {
            letter[i].value = e.target.value.toLowerCase()
            letter[i].style.color = "#040303"
        }
        updatePendingSolution()    
    }

    const handleClick = () => {
        const rand = Math.floor(Math.random() * 26)
        if(solution === pendingSolution) {
            return
        }
        if (randLetters.includes(rand)) {
            handleClick()
        } else {
            setRandLetters([...randLetters, rand])
            let letter = document.getElementsByClassName(`char_input ${shuffledAlphabet[rand].toLowerCase()}`)
            if (letter.length === 0) {
                letter = document.getElementsByClassName(`char_input ${shuffledAlphabet[rand]}`)
                if(letter.length === 0) handleClick()    
            } else {
                if (letter[0].value.toUpperCase() === alphabet[rand]) {
                    handleClick()
                } else {
                    for (let i=0; i < letter.length; i++) {
                        letter[i].value = alphabet[rand].toLowerCase()
                        letter[i].disabled = true
                        letter[i].style.color = '#4E9F3D'; 
                    }
                    updatePendingSolution()
                }
            }
            setHints([...hints, alphabet[rand]])               
        }      
    }

    return (
        <View style={styles.body}>
            {isLoading && <View>{isLoading}</View>}
            {error && <View>{error}</View>}
            {cryptoQuote && cryptoName && <View>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.appTitle}>Say What?</Text>
                    </View>
                    <View style={styles.hints}>{hintsGiven.map((h, i) => {
                        return (
                            hintsGiven[i] === true ?
                                <Image key={i} source={puzzle_bulb_clicked} alt='grey_lightbulb' />
                                : <Image key={i} source={puzzle_bulb} alt='lightbulb' onClick={handleClick} />
                        )
                        })}
                    </View>
                </View>
                <ScrollView>
                    <View styles={styles.quoteContainer}>
                        <EncryptedText words={cryptoQuote} onChange={(e) => handleChange(e)} />
                        <EncryptedText words={cryptoName} onChange={(e) => handleChange(e)} />
                    </View>
                </ScrollView>
            </View>}
            {/* {quote && name && <Modal style={styles.modal} name={name} onClick={newGame} quote={quote} visible={visible}/>} */}
        </View> 
    )
}

const styles = StyleSheet.create({
    appTitle: {
        color: '#FFD124',
        fontSize: 32
    },
    body: {
        alignItems: 'center',
        backgroundColor: '#0093AB',
        justifyContent: 'center'
    },
    header: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8
    },
    hints: {
        flexDirection: 'row'
    },
    modal: {
        alignItems: 'center',
        borderColor: 'black',
        justifyContent: 'center',
        padding: 20
    },
    quoteContainer: {
        backgroundColor: '#eee',
    }
})

export default HomeScreen