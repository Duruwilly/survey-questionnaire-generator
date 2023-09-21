import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Platform, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import Title from '../components/common/Title';
import FormInput from '../components/common/InputField';
import Checkbox from 'expo-checkbox';
import { RadioButton } from 'react-native-paper';
import Button from '../components/common/Button';

const Questions = ({ navigation, route }: any) => {
    const { name } = useSelector((state: RootState) => state.userReducer)
    const { categorizedQuestions } = useSelector((state: RootState) => state.questionReducer)

    const { questionLength } = route.params;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const currentQuestionData = categorizedQuestions[currentQuestionIndex]

    useEffect(() => {
        const { currentIndex } = route.params;

        setCurrentQuestionIndex(currentIndex)
    }, [route.params])

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionLength - 1) {

            const nextId = currentQuestionIndex + 1
            navigation.navigate("questions", {
                currentIndex: nextId,
                questionLength: categorizedQuestions.length
            })
        }
    }

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        } else {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <SafeAreaView>
                        <Text style={[styles.userName, styles.container]}>Welcome {name}</Text>
                        <View style={styles.container}>
                            <Pressable onPress={() => {
                                handlePreviousQuestion();
                                // dispatch(resetCategories());
                            }}
                                style={[styles.leftIcon]}>
                                <AntDesign name="arrowleft" size={18} color="black" />
                            </Pressable>
                            <Text style={styles.stepsText}>{`${questionLength} steps`}</Text>
                            {
                                currentQuestionData && (
                                    <View>
                                        <Title>{currentQuestionData.category}</Title>
                                        {
                                            currentQuestionData.questions.map((item, questionIndex) => (
                                                <View key={questionIndex} style={styles.questionContainer}>
                                                    <View style={styles.questionsNuber}>
                                                        <Text style={{ color: "white" }}>{`${(questionIndex + 1).toString().padStart(2, "0")}`}</Text>
                                                    </View>
                                                    <Text style={styles.question}>
                                                        {item.question}{item.required === "yes" && <Text style={styles.required}>*</Text>}
                                                    </Text>
                                                    {item.inputType === "text" && (
                                                        <FormInput value='' onChangeText={() => { }} />
                                                    )}
                                                    {item.inputType === "checkbox" && (
                                                        item.choices.map((choice, index) => (
                                                            <View key={index} style={styles.checkboxContainer}>
                                                                <Checkbox
                                                                    style={[styles.checkbox]}
                                                                //    value={isChecked}
                                                                //    onValueChange={toggleCheckBox}
                                                                //    color={isChecked ? Colors.primary800 : Colors.primary500}
                                                                />
                                                                <Text>{choice}</Text>
                                                            </View>
                                                        ))
                                                    )}
                                                    {item.inputType === "radio" && (
                                                        item.choices.map((choice, index) => (
                                                            <View key={index} style={styles.checkboxContainer}>
                                                                <RadioButton
                                                                    value=""
                                                                // status={checked === 'first' ? 'checked' : 'unchecked'}
                                                                // onPress={() => setChecked('first')}
                                                                />
                                                                <Text>{choice}</Text>
                                                            </View>
                                                        ))
                                                    )}
                                                </View>
                                            ))
                                        }
                                    </View>
                                )
                            }
                            <View style={{ marginTop: 20 }}>
                                <Button
                                    disabled={currentQuestionIndex + 1 === questionLength}
                                    onPress={() => {
                                        handleNextQuestion()
                                    }
                                    }>
                                    Next
                                </Button>
                            </View>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default Questions

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        position: "relative",
        padding: 24,
        ...Platform.select({
            ios: {
                marginTop: 0,
            },
            // android: {
            //     marginTop: 50,
            // },
        }),
    },
    userName: {
        fontSize: 16,
        fontWeight: "500"
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
    stepsText: {
        marginRight: 25,
        position: "absolute",
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        fontWeight: "500"
    },
    questionContainer: {
        position: "relative",
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
        padding: 12,
        marginVertical: 8
    },
    questionsNuber: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "red",
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10
    },
    question: {
        marginTop: 27,
        fontWeight: "500",
        fontSize: 16
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginVertical: 10
    },
    required: {
        color: "red"
    },
    checkbox: {
        borderRadius: 5,
        width: 20,
        height: 20
    },
})