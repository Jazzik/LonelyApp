import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
type CustomBackButtonProps = {
  navigation: StackNavigationProp<any, any>;
};

export const CustomBackButton: React.FC<CustomBackButtonProps> = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={24} color="white" />
  </TouchableOpacity>
);
