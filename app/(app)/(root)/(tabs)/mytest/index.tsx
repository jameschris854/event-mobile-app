import { FlatList, StyleSheet, View } from 'react-native';

import TextCard from '@/components/TextCard';
import useColors from '@/hooks/useColors';
export const TestList = [
  {
      "id": 1,
      "testName": "Mathematics Level 1",
      "progress": 75,
      "availability": "Available",
      "startDate": "2025-03-01",
      "endDate": "2025-03-31",
      "timeLimit": "60 minutes",
      "attemptsLeft": 2,
      "score": 85,
      "category": "Mathematics",
      "description": "Basic algebra and geometry test.",
      "actions": ["Resume", "View Results"]
  },
  {
      "id": 2,
      "testName": "Physics Challenge",
      "progress": 50,
      "availability": "Coming Soon",
      "startDate": "2025-04-01",
      "endDate": "2025-04-15",
      "timeLimit": "90 minutes",
      "attemptsLeft": 3,
      "score": null,
      "category": "Physics",
      "description": "Advanced physics problems covering motion and forces.",
      "actions": ["Notify Me"]
  },
  {
      "id": 3,
      "testName": "Coding Interview",
      "progress": 0,
      "availability": "Available",
      "startDate": "2025-03-05",
      "endDate": "2025-04-05",
      "timeLimit": "120 minutes",
      "attemptsLeft": 1,
      "score": null,
      "category": "Programming",
      "description": "Solve 3 algorithmic coding problems.",
      "actions": ["Start"]
  },
  {
      "id": 4,
      "testName": "History Quiz",
      "progress": 100,
      "availability": "Expired",
      "startDate": "2025-02-01",
      "endDate": "2025-02-28",
      "timeLimit": "30 minutes",
      "attemptsLeft": 0,
      "score": 92,
      "category": "History",
      "description": "World history from ancient to modern times.",
      "actions": ["View Results"]
  },
  {
      "id": 5,
      "testName": "Logical Reasoning Test",
      "progress": 30,
      "availability": "Available",
      "startDate": "2025-03-10",
      "endDate": "2025-04-10",
      "timeLimit": "45 minutes",
      "attemptsLeft": 2,
      "score": null,
      "category": "Reasoning",
      "description": "Pattern recognition and logical problem-solving.",
      "actions": ["Resume"]
  },
  ...Array.from({ length: 15 }, (_, i) => ({
      "id": i + 6,
      "testName": `Sample Test ${i + 1}`,
      "progress": Math.floor(Math.random() * 100),
      "availability": ["Available", "Coming Soon", "Expired"][Math.floor(Math.random() * 3)],
      "startDate": `2025-03-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}`,
      "endDate": `2025-04-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}`,
      "timeLimit": `${Math.floor(Math.random() * 120) + 30} minutes`,
      "attemptsLeft": Math.floor(Math.random() * 4),
      "score": Math.random() > 0.5 ? Math.floor(Math.random() * 100) : null,
      "category": ["Mathematics", "Physics", "Programming", "History", "Reasoning"][Math.floor(Math.random() * 5)],
      "description": `Description for Sample Test ${i + 1}.`,
      "actions": Math.random() > 0.5 ? ["Resume"] : ["Start"]
  }))
];
export default function mytest() {
  const colors = useColors();
  return (
    <FlatList 
    contentContainerStyle={{paddingHorizontal:16}} 
    style={{backgroundColor:colors.background}} 
    data={TestList} renderItem={({ item }) => <TextCard details={item} />}  
    keyExtractor={item => item.id.toString()}
    ItemSeparatorComponent={() => <View style={{height:16}} />}
    ListHeaderComponent={() => <View style={{height:16}} />}
    ListFooterComponent={() => <View style={{height:16}} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
