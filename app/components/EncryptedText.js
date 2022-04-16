import { StyleSheet, Text, View } from 'react-native';
import AppTextInput from './AppTextInput';
// import styles from '../config/styles';

function EncryptedText({ onChange, words } ) {
    return (
            <View style={styles.container}>
                {words.split(" ").map((word, i) => {
                    return (
                        <View style={styles.word} key={i}>
                            {word.split("").map((char, j) => {
                                return (
                                    <View key={j}>
                                        {char.match(/[A-Za-z]/) ?
                                            char.match(/[A-Z]/) ?
                                                <View style={styles.char_view}>
                                                    <AppTextInput />
                                                    <Text>{char}</Text>
                                                </View>
                                                :<View style={styles.char_view}>
                                                    <AppTextInput autoCapitalize="none" />
                                                    <Text>{char}</Text>
                                                </View>
                                        :<View style={styles.char_view}>
                                            <Text style={styles.punctuation}>{char}</Text>
                                            <Text style={styles.punctuation}>{char}</Text>
                                        </View>
                                        }
                                    </View>    
                                )
                            })}
                        </View>
                    )
                })}
            </View>
    )

        // <View className={ViewName}>{words.split(" ").map((word, i) => {
        //     return (
        //         <View className="word_View" key={i}> {word.split("").map((char, j) => {
        //             return (
        //                 <View key={j} className="char_container">
        //                     {char.match(/[A-Za-z]/) ?
        //                         char.match(/[A-Z]/) ?
        //                             <View>
        //                                 <AppTextInput className={`char_input ${char.toLowerCase()}`} maxLength="1" onChange={onChange} type="text" />
        //                             </View>
        //                             :<View>
        //                                 <AppTextInput className={`char_input ${char}`} maxLength="1" onChange={onChange} type="text" />
        //                             </View>
        //                         : <Text className="puzzle_p">{char}</Text>
        //                     }
        //                     <Text className="puzzle_p">{char}</Text>
        //                 </View>
        //             )
        //         })}</View>
        //     )
        // })}</View>
}

const styles = StyleSheet.create({
    char_view: {
        alignItems: 'center',
        marginHorizontal: 2
    },
    container: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    punctuation: {
        height: 30,
        lineHeight: 35,
        marginBottom: 2,
        paddingTop: 4
    },
    word: {
        flexDirection: 'row',
        margin: 5
    }
})

export default EncryptedText