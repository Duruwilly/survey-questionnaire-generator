import { useState } from "react"
import { Platform, SafeAreaView, StyleSheet, View } from "react-native"
import FormInput from "../components/common/InputField"
import { Picker } from '@react-native-picker/picker';
import Button from "../components/common/Button";
import { addUser, userDetails } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/common/Title";
import WarningText from "../components/common/WarningText";
import { RootState } from "../redux/store/store";
import { resetCategories } from "../redux/slices/questionsSlice";

const Login = ({ navigation }: any) => {
    const { role, name } = useSelector((state: RootState) => state.userReducer)
    const { categorizedQuestions } = useSelector((state: RootState) => state.questionReducer)
    const [emptyInputCheck, setEmptyInputCheck] = useState<boolean>(false)

    const [user, setUser] = useState<userDetails>({
        name: "",
        role: ""
    })

    const dispatch = useDispatch()

    const handleChange = (name: keyof userDetails, value: string) => {
        setUser({ ...user, [name]: value });
        // dispatch(addUser({ name: value, role: value }))
    };

    const handleLogin = () => {
        if (user.name === "" || user.role === "" || /^\s*$/.test(user.name)) {
            setEmptyInputCheck(true)
            setTimeout(() => {
                setEmptyInputCheck(false)
            }, 3000)
        } else {
            // dispatch(resetCategories());
            dispatch(addUser(user))
            // setUser({ ...user, name: "", role: "" })
            navigation.navigate(role === "creator" ? "questionnaireDetails" : "questions", {
                currentIndex: 0,
                questionLength: categorizedQuestions.length
            })
        }
    }

    return (
        <View style={styles.screen}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Title>Kindly fill in{'\n'}the following details</Title>
                    <View style={{ marginTop: 30 }}>
                        <FormInput
                            value={user.name}
                            onChangeText={(text: string) => handleChange('name', text)}
                            placeholder="Enter your name"
                        />
                        <Picker
                            style={{ backgroundColor: "white", borderRadius: 9, marginTop: 10 }}
                            selectedValue={user.role}
                            onValueChange={(itemValue) =>
                                handleChange("role", itemValue)
                            }>
                            <Picker.Item label="Select role type" value="" />
                            <Picker.Item label="user" value="user" />
                            <Picker.Item label="creator" value="creator" />
                        </Picker>
                        <View style={{ marginTop: 20 }}>
                            <Button route={true} onPress={() => handleLogin()}>
                                Continue
                            </Button>
                            {emptyInputCheck && <WarningText />}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // paddingHorizontal: 24
    },
    container: {
        padding: 24,
        ...Platform.select({
            ios: {
                marginTop: 0,
            },
            android: {
                marginTop: 30,
            },
        }),
    },
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