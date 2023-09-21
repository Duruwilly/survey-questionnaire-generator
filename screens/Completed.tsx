import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../components/common/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/slices/userSlice'

const CompletedScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <SafeAreaView>
                        <View style={styles.container}>
                            <Text style={{ marginBottom: 20, fontSize: 17 }}>You've completed your questionnaire</Text>
                            <Button route={true} onPress={() => {
                                dispatch(logOut())
                                navigation.navigate("login");
                            }}>
                                Return back to home
                            </Button>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default CompletedScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        padding: 24,
        ...Platform.select({
            ios: {
                marginTop: 0,
            },
            android: {
                marginTop: 50,
            },
        }),
    },
})