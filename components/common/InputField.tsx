import { StyleSheet, TextInput, View } from 'react-native'

type propsType = {
    label?: string,
    value: string,
    onChangeText: (text: string) => void,
    keyboardType?: 'default' | 'numeric' | 'email-address' | "ascii-capable" | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'phone-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password',
    secureTextEntry?: boolean,
    placeholder?: string
}

const FormInput = ({ label, value, onChangeText, keyboardType = 'default', placeholder, secureTextEntry = false }: propsType) => {
    return (
        <View>
            {/* <FormLabel title={label} /> */}
            <TextInput
                style={styles.formInput}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor="#343538"
            />
        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({
    formInput: {
        width: "100%",
        color: "black",
        fontSize: 16,
        fontWeight: "500",
        // height: 55,
        padding: 10,
        // marginVertical: Platform.select({ ios: 15, android: 6 }),
        borderBottomWidth: 3,
        borderBottomColor: "#bfbbbb",
        backgroundColor: "transparent",
        // borderRadius: 6
    },
})