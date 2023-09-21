import { StyleSheet, Text } from "react-native"

const Title = ({ children }: { children: string | string[] }) => {
    return (
        <Text style={styles.titleText}>{children}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    titleText: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: "700",
        // color: "#1F1F1F"
        color: "black"
    }
})