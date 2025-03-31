import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View, Platform, UIManager } from 'react-native';
import { Button, Card, RadioButton, Text, TextInput, TouchableRipple } from 'react-native-paper';
import questions from "@/constants/questions.json";
import useColors from '@/hooks/useColors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, FadeIn, FadeOut, LinearTransition, interpolate } from 'react-native-reanimated';
import Match from '@/components/Match';

export default function TabOneScreen() {
  const { testId } = useLocalSearchParams();
  const [qId,setqId] = React.useState(questions[0].uid);
  const colors = useColors();
  const question = questions.find((question) => question.uid === qId);
  const randomWidth = useSharedValue(1);
  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(interpolate(randomWidth.value,[0,1],[0,1]), {
        duration:randomWidth.value === 1 ? 600 : 10, // Animation duration in milliseconds
        easing: Easing.inOut(Easing.ease), // Smooth easing
      }),
      paddingTop: withTiming(interpolate(randomWidth.value,[0,1],[15,0]), {
        duration:randomWidth.value === 1 ? 600 : 10, // Animation duration in milliseconds
        easing: Easing.inOut(Easing.ease), // Smooth easing
      })
    };
  });

  useEffect(() => {
    randomWidth.set(0); // Reset to 1 when qId changes
    setTimeout(() => { randomWidth.set(1);}, 10); // Wait for the animation to finish before setting qId
  },[qId])

  return (
    <Animated.View style={[styles.container]} >
      <View style={styles.header}>
        <Text style={styles.title}>#{testId}</Text>
        <Text style={styles.title}>Q {qId}</Text>
      </View>
      <Animated.ScrollView style={[{flex:1},style]} contentContainerStyle={[styles.content]} >
        <Text variant='displaySmall' style={{marginTop:16}}>
          {question?.Question}
        </Text>
        {question?.QuestionType === 1 ? <TextInput
          mode="outlined"
          placeholder='Type your answer here...'
          multiline
          numberOfLines={4}
          style={{width:"100%",marginTop:24,paddingVertical:16}}
        /> : null}
        {question?.QuestionType === 2 ? <View style={{width:"100%",marginTop:24}}>
          <RadioButton.Group onValueChange={() => {}} value={""}>
            {
              question?.Options.map((option) => (
                <RadioButton.Item
                  key={option}
                  label={option}
                  value={option}
                  status={question?.Answer === option ? 'checked' : 'unchecked'}
                  style={{flexDirection:"row-reverse",paddingLeft:0}}
                />
              ))
            }
          </RadioButton.Group> 
        </View> : null}
        {question?.QuestionType === 3 ? <Match />
        : null}
        {question?.QuestionType === 4 ? <View style={{width:"100%",marginTop:24}}>
          <RadioButton.Group onValueChange={() => {}} value={""}>
            {
              ["True","False"].map((option) => (
                <RadioButton.Item
                  key={option}
                  label={option}
                  value={option}
                  status={question?.Answer === option ? 'checked' : 'unchecked'}
                  style={{flexDirection:"row-reverse",paddingLeft:0}}
                />
              ))
            }
          </RadioButton.Group> 
        </View> : null}
      </Animated.ScrollView>
      <View style={styles.footer}>
       {qId !== questions.length ? <Button mode="contained" buttonColor={colors.errorContainer} textColor={colors.error} style={{marginRight:"auto"}} onPress={() => (console.log("Terminate"))}>
          Terminate
        </Button>:
        <Button mode="contained" buttonColor={colors.tertiaryContainer} textColor={colors.tertiary} style={{marginRight:"auto"}} onPress={() => (console.log("Submit"))}>
          Submit
        </Button>}
        {qId !==1 && <Button mode="contained" onPress={() => setqId((prev) => prev - 1)}>
          Prev
        </Button>}
        {qId !== questions.length && <Button mode="contained" onPress={() => setqId((prev) => prev + 1)}>
          Next
        </Button>}
      </View>
    </Animated.View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    paddingBottom:0
  },
  header:{
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  footer:{
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16
  },
  content:{
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});