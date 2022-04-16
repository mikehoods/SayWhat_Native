import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import Button from './Button'

function Modal({name, onClick, quote, visible}) {
    return (
        <View style={styles.modal} className="modal">
            <Text style={styles.header}>~ Puzzle Solved ~</Text>
            <View className="solution">
                <Text style={styles.text} className="solution-quote">"{quote}"</Text>
                <Text style={styles.text} className="solution-name">- {name}</Text>
            </View>
            <Button className="playAgain" name="New Game" onClick={onClick}>New Game</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFD124',
        padding: 6,
        textAlign: 'center'
    },
    modal: {
        justifyContent: 'center',
        padding: 10
    },
    text: {
        margin: 6,
        paddingHorizontal: 10,
        textAlign: 'center'
    }
})

export default Modal