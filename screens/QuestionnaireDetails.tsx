import {
    StyleSheet,
    Text,
    View,
    Platform,
    SafeAreaView,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'
import Title from '../components/common/Title'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import Button from '../components/common/Button';
import { useState } from 'react';
import { addSurveyDetails, surveyDetails } from '../redux/slices/surveyDetails';
import WarningText from '../components/common/WarningText';

const QuestionnaireDetails = ({ navigation }: any) => {
    const { name } = useSelector((state: RootState) => state.userReducer)
    const [emptyInputCheck, setEmptyInputCheck] = useState<boolean>(false)

    const dispatch = useDispatch()

    const [details, setDetails] = useState<surveyDetails>({
        surveyName: "",
        surveyDesc: "",
        numberOfCategory: ""
    })

    const handleChange = (name: keyof surveyDetails, value: string) => {
        setDetails({ ...details, [name]: value });
    };

    const handleNavigate = () => {
        if (details.surveyName === "" || details.surveyDesc === "" || /^\s*$/.test(details.surveyName)) {
            setEmptyInputCheck(true)
            setTimeout(() => {
                setEmptyInputCheck(false)
            }, 3000)
        } else {
            dispatch(addSurveyDetails(details))
            navigation.navigate("question", {
                id: 1,
                numberOfCategory: parseInt(details.numberOfCategory),
            })
        }
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <SafeAreaView>
                        <View style={styles.container}>
                            <Text style={styles.userName}>Hey {name}</Text>
                            <Title>Enter details and get{'\n'}started</Title>
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Survey Name'
                                    value={details.surveyName}
                                    onChangeText={(text: string) => handleChange('surveyName', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Survey Description'
                                    multiline={true}
                                    value={details.surveyDesc}
                                    onChangeText={(text: string) => handleChange('surveyDesc', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Number of category'
                                    value={details.numberOfCategory}
                                    onChangeText={(text: string) => handleChange('numberOfCategory', text)}
                                />
                                <View style={{ marginTop: 20 }}>
                                    <Button route={true} onPress={() => handleNavigate()}>
                                        Continue
                                    </Button>
                                    {emptyInputCheck && <WarningText />}
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default QuestionnaireDetails

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
                marginTop: 50,
            },
        }),
    },
    userName: {
        fontSize: 16,
        fontWeight: "500"
    },
    input: {
        backgroundColor: "white",
        borderRadius: 9,
        width: "100%",
        padding: 12,
        marginVertical: 8
    },
    leftIcon: {
        backgroundColor: "white",
        borderRadius: 9999,
        width: 32,
        height: 32,
        marginLeft: 25,
        position: "absolute",
        left: 0,
        justifyContent: "center",
        alignItems: "center"
    },
})