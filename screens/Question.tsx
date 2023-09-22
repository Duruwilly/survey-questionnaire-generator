import { SafeAreaView, StyleSheet, View, Platform, Pressable, TextInput, Text, ScrollView } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import Title from '../components/common/Title';
import Button from '../components/common/Button';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Colors } from '../constants/colors';
import { addQuestionsToCategory, questionInterface, questionType, removeQuestions } from '../redux/slices/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

const Question = ({ navigation, route }: any) => {
    const { categorizedQuestions } = useSelector((state: RootState) => state.questionReducer)
    const { id, numberOfCategory } = route.params;

    const [categoryQst, setCategoryQst] = useState<string>("")

    const dispatch = useDispatch()

    const [questions, setQuestions] = useState<questionType>([
        {
            question: "",
            inputType: "",
            choices: [],
            required: "",
        }]
    )

    const addQuestion = () => {
        setQuestions([...questions, {
            question: "",
            inputType: "",
            choices: [],
            required: "",
        }]);
    };

    const removeQuestion = (questionIndex: number) => {
        const updatedQuestion = [...questions];
        updatedQuestion.splice(questionIndex, 1);
        setQuestions(updatedQuestion)
    }

    const handleChange = (name: keyof questionInterface, value: string, questionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex], [name]: value
        };
        setQuestions(updatedQuestions);
    };

    const addChoice = (questionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            choices: [...updatedQuestions[questionIndex].choices, ''],
        };
        setQuestions(updatedQuestions);
    };

    const removeChoice = (questionIndex: number, choiceIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);
        setQuestions(updatedQuestions);
    };

    const updateChoice = (questionIndex: number, choiceIndex: number, choice: string) => {
        const updatedChoice = [...questions];
        updatedChoice[questionIndex].choices[choiceIndex] = choice;
        setQuestions(updatedChoice)
    }

    const handleNavigate = () => {
        if (id <= numberOfCategory) {
            const remainingQuestions = questions.length > 1 ? [questions[0]] : [questions[0]];

            if (remainingQuestions.length > 0) {
                remainingQuestions[0] = {
                    ...remainingQuestions[0],
                    question: "",
                    inputType: "",
                    choices: [],
                    required: "",
                };
            }

            setQuestions(remainingQuestions);
            dispatch(addQuestionsToCategory({ category: categoryQst, questions, id: (id - 1).toString() }));
            setCategoryQst("")

        };
        if (id < numberOfCategory) {
            const nextId = Number(id) + 1;
            navigation.navigate('question', { id: nextId, numberOfCategory });
        } else {
            navigation.navigate('completed');
        }
    }

    const handlePreviousQuestion = () => {
        if (id > 1) {
            dispatch(removeQuestions(Number(id - 2)))
            navigation.navigate('question', { id: id - 1, numberOfCategory });
        } else {
            navigation.goBack()
        }
    }

    console.log(categorizedQuestions);

    return (
        <View style={styles.screen}>
            <ScrollView>
                <SafeAreaView>
                    <View style={styles.container}>
                        <Pressable onPress={() => {
                            handlePreviousQuestion()
                        }}
                            style={[styles.leftIcon]}>
                            <AntDesign name="arrowleft" size={18} color="black" />
                        </Pressable>
                        <Title>Enter your questions and{'\n'}answers</Title>
                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                style={styles.input}
                                placeholder='Category'
                                value={categoryQst}
                                onChangeText={(text: string) => {
                                    setCategoryQst(text)
                                }}
                            />
                            {questions.map((question, questionIndex) => (
                                <View key={questionIndex}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Question'
                                        value={question.question}
                                        onChangeText={(text: string) => handleChange('question', text, questionIndex)}
                                    />
                                    <Picker
                                        style={{ backgroundColor: "white", borderRadius: 9, marginTop: 10 }}
                                        selectedValue={question.inputType}
                                        onValueChange={(itemValue) =>
                                            handleChange("inputType", itemValue, questionIndex)
                                        }
                                    >
                                        <Picker.Item label="Answer type" value="" />
                                        <Picker.Item label="text" value="text" />
                                        <Picker.Item label="radio" value="radio" />
                                        <Picker.Item label="checkbox" value="checkbox" />
                                    </Picker>
                                    {
                                        (question.inputType === "radio" || question.inputType === "checkbox") && (
                                            <>
                                                {question.choices.map((choice, choiceIndex) => (
                                                    <View key={choiceIndex}>
                                                        <TextInput
                                                            style={styles.input}
                                                            placeholder={`Option ${choiceIndex + 1}`}
                                                            value={choice}
                                                            onChangeText={(text: string) => updateChoice(questionIndex, choiceIndex, text)}
                                                        />
                                                        <Pressable onPress={() => removeChoice(questionIndex, choiceIndex)}>
                                                            <Text style={{ color: "#db4b4b" }}>Remove</Text>
                                                        </Pressable>
                                                    </View>
                                                ))}
                                                <Pressable onPress={() => addChoice(questionIndex)}>
                                                    <Text style={{ color: "#db4b4b", fontWeight: "500", marginTop: 0, alignSelf: "flex-end" }}>
                                                        <Entypo name="plus" size={16} color="#db4b4b" />
                                                        Add options
                                                    </Text>
                                                </Pressable>
                                            </>
                                        )
                                    }
                                    <Picker
                                        style={{ backgroundColor: "white", borderRadius: 9, marginTop: 10 }}
                                        selectedValue={question.required}
                                        onValueChange={(itemValue) =>
                                            handleChange("required", itemValue, questionIndex)
                                        }
                                    >
                                        <Picker.Item label="Required" value="" />
                                        <Picker.Item label="Yes" value="yes" />
                                        <Picker.Item label="No" value="no" />
                                    </Picker>
                                    {/* {
                                        question.inputType === "radio" || question.inputType === "checkbox" && (
                                            question.choices.map((choice, choiceIndex) => (
                                                <View key={choiceIndex}>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder={`Option ${choiceIndex + 1}`}
                                                        value={choice}
                                                        onChangeText={(text: string) => updateChoice(questionIndex, choiceIndex, text)}
                                                    />
                                                    <Pressable onPress={() => removeChoice(questionIndex, choiceIndex)}>
                                                        <Text style={{ color: "#db4b4b" }}>Remove</Text>
                                                    </Pressable>
                                                </View>
                                            ))
                                        )
                                    }
                                    {
                                        question.inputType === "radio" || question.inputType === "checkbox" &&
                                        <Pressable onPress={() => addChoice(questionIndex)}>
                                            <Text style={{ color: "#db4b4b", fontWeight: "500", marginTop: 0, alignSelf: "flex-end" }}>
                                                <Entypo name="plus" size={16} color="#db4b4b" />
                                                Add options
                                            </Text>
                                        </Pressable>
                                    } */}


                                    {questions.length > 1 && <Pressable onPress={() => { removeQuestion(questionIndex) }}>
                                        <Text style={{ color: "#db4b4b", alignSelf: "flex-end" }}>Remove</Text>
                                    </Pressable>}
                                </View>
                            ))
                            }
                        </View>
                        <Pressable onPress={addQuestion}>
                            <Text style={{ color: Colors.primary, fontWeight: "500", marginTop: 18, textAlign: "center", fontSize: 18 }}>
                                Add more question
                            </Text>
                        </Pressable>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                disabled={id > numberOfCategory}
                                onPress={() => {
                                    handleNavigate()
                                }
                                }>
                                Next
                            </Button>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default Question

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