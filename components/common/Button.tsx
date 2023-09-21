import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { AntDesign, Entypo } from '@expo/vector-icons';

type propsType = {
    onPress?: () => void,
    children: string
    route?: boolean,
    disabled?: boolean
}

const Button = ({ onPress, children, route, disabled }: propsType) => {

    const buttonStyles = disabled
        ? [styles.button, styles.disabledButton]
        : styles.button;

    return (
        <View style={buttonStyles}>
            <Pressable style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} onPress={disabled ? undefined : onPress}
                android_ripple={{ color: Colors.primary }}>
                {!route && <Entypo name="plus" size={24} color="white" />}
                <Text style={styles.buttonText}>{children}</Text>
                {route && <AntDesign name="arrowright" size={24} color="white" />}
            </Pressable>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        overflow: "hidden",
        width: "100%",
        // elevation: 8,
        // shadowColor: "black",
        // shadowOffset: { width: 0, height: 50 },
        // shadowRadius: 10,
        // shadowOpacity: 0.75
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary,
        paddingVertical: 17,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    disabledButton: {
        opacity: 0.5
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "700"
    },
    pressed: {
        opacity: 0.9
    }
})