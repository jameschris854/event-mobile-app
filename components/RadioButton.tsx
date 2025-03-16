import { View, Pressable, PressableProps } from "react-native";

export default function RadioButton({ selected, onPress ,...props}:{selected: boolean,onPress?:() => void} & PressableProps) {
  return (
    <Pressable{...props} onPress={onPress}>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: selected ? "#2196f3" : "gray",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#2196f3",
            }}
          />
        )}
      </View>
    </Pressable>
  );
}
