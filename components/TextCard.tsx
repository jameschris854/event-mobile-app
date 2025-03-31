import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { TestList } from "@/app/(app)/(root)/(tabs)/mytest";
import useColors from "@/hooks/useColors";
import { Text, Card, ProgressBar } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { router } from "expo-router";

const TestCard = ({ details }: { details: typeof TestList[0] }) => {
    const colors = useColors();
    const styles = createStyles(colors)
    return (
        <Card onPress={() => router.navigate(`/${details.id}`)} mode="elevated">
            <Card.Title 
            title={details.testName}
            titleStyle={styles.title}
            />
            <Card.Content >
                <Text variant="bodyMedium" style={styles.cardText}>Time Limit: <Text variant="bodyMedium" style={styles.cardText}>{details.timeLimit}</Text></Text>
                <Text variant="bodyMedium" style={styles.cardText}>Attempts Left: <Text variant="bodyMedium" style={styles.cardText}>{details.attemptsLeft}</Text></Text>
                {/* <Text style={styles.info}>Score: <Text style={styles.bold}>{details.score !== null ? details.score : 'Not available'}</Text></Text> */}
                <ProgressBar progress={details.progress} style={{ marginTop: 8 }} />
                {/* <View style={styles.actionsContainer}>
                        {details.actions.map((action, index) => (
                            <TouchableOpacity key={index} style={styles.button}>
                                <Text style={styles.buttonText}>{action}</Text>
                            </TouchableOpacity>
                        ))}
                    </View> */}
            </Card.Content>
        </Card>
    );
};

export default TestCard;

const createStyles = (colors: MD3Colors) => StyleSheet.create({
    surface: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
       paddingVertical:8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 5,
    },
    category: {
        fontSize: 14,
        color: colors.secondary,
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        color: colors.secondary,
    },
    bold: {
        fontWeight: 'bold',
        color: colors.secondary,
    },
    description: {
        fontSize: 14,
        color: colors.secondary,
        marginVertical: 10,
        fontStyle: 'italic',
    },
    actionsContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    button: {
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginRight: 8,
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: colors.secondary,
        fontWeight: 'bold',
    },
});
