import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WarningText = () => {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={[styles.warningText]}>Kindly fill in all fields!</Text>
        </View>
    )
}

export default WarningText

const styles = StyleSheet.create({
    warningText: {
        backgroundColor: "#db4b4b",
        width: "60%",
        paddingVertical: 12,
        fontWeight: "600",
        alignSelf: "center",
        textAlign: "center",
        color: "white",
        fontSize: 18
    }
})