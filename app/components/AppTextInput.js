import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import defaultStyles from '../config/styles';

function AppTextInput({ placeholder, ...otherprops }) {
    return (
        <View style={styles.container}>
            <TextInput
                {...otherprops}
                maxLength={1}
                placeholder={placeholder}
                style={defaultStyles.text}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        color: '#040303',
        flexDirection: 'row',
        marginVertical: 2,
        padding: 4,
        width: '100%'
    },
})

export default AppTextInput