import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Button } from "react-native-paper";

export default () => {
    const options = {
        left: ["Jesus", "Adam", "Noah", "Isaac"],
        right: ["Israel", "Messiah", "Flood", "Eden"]
    };

    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [selectedRight, setSelectedRight] = useState<string | null>(null);
    const [matches, setMatches] = useState<{ left: string; right: string; color: string }[]>([]);

    // Predefined Material Design-inspired color palette
    const materialColors = [
        "#FF5722", // Deep Orange
        "#4CAF50", // Green
        "#2196F3", // Blue
        "#FFC107", // Amber
        "#9C27B0", // Purple
        "#E91E63", // Pink
        "#00BCD4", // Cyan
        "#8BC34A", // Light Green
        "#FF9800", // Orange
        "#607D8B"  // Blue Grey
    ];

    // Function to generate a random color from the palette
    const generateRandomColor = () => {
        return materialColors[Math.floor(Math.random() * materialColors.length)];
    };

    // Function to calculate contrast color (black or white) based on background color
    const getContrastColor = (hexColor: string) => {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? "#000000" : "#FFFFFF"; // Black for light colors, white for dark colors
    };

    const handleLeftSelect = (option: string) => {
        // Check if the option is already matched
        const existingMatch = matches.find((match) => match.left === option);
        if (existingMatch) {
            // Remove the match if clicked again
            setMatches((prevMatches) => prevMatches.filter((match) => match.left !== option));
            return;
        }
        setSelectedLeft(option);
        setSelectedRight(null); // Reset right selection when a new left option is selected
    };

    const handleRightSelect = (option: string) => {
        // Check if the option is already matched
        const existingMatch = matches.find((match) => match.right === option);
        if (existingMatch) {
            // Remove the match if clicked again
            setMatches((prevMatches) => prevMatches.filter((match) => match.right !== option));
            return;
        }
        if (!selectedLeft) {
            Alert.alert("Select a left option first!");
            return;
        }
        setSelectedRight(option);
        // Assign a random color to the pair
        const color = generateRandomColor();
        setMatches((prevMatches) => [...prevMatches, { left: selectedLeft, right: option, color }]);
        setSelectedLeft(null); // Reset after matching
        setSelectedRight(null);
    };

    const getMatchColor = (option: string, side: "left" | "right") => {
        const match = matches.find((match) => match[side] === option);
        if (match) {
            return match.color; // Use the unique color assigned to the pair
        }
        return undefined;
    };

    const getButtonTextColor = (option: string, side: "left" | "right") => {
        const matchColor = getMatchColor(option, side);
        if (matchColor) {
            return matchColor; // Use contrast color for matched buttons
        }
        return undefined; // Default text color
    };

    return (
        <View style={{ width: "100%", marginTop: 24, gap: 16, flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flex: 1, gap: 16 }}>
                {options.left.map((option) => (
                    <Button
                        key={option}
                        onPress={() => handleLeftSelect(option)}
                        mode={option === selectedLeft ? "contained" : "outlined"}
                        contentStyle={{ paddingVertical: 24 }}
                        textColor={getButtonTextColor(option, "left")}
                    >
                        {option}
                    </Button>
                ))}
            </View>
            <View style={{ flex: 1, gap: 16 }}>
                {options.right.map((option) => (
                    <Button
                        key={option}
                        onPress={() => handleRightSelect(option)}
                        mode={"outlined"}
                        contentStyle={{ paddingVertical: 24 }}
                        textColor={getButtonTextColor(option, "right")}
                    >
                        {option}
                    </Button>
                ))}
            </View>
        </View>
    );
};