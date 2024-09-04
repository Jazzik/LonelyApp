// import { TextInput, TouchableOpacity, View } from "react-native";
// import { InputToolbar } from "react-native-gifted-chat";
// import { StyleSheet } from "react-native";

// const CustomInputToolbar = (props) => (
//     <View style={styles.toolbarContainer}>
//       <InputToolbar
//         {...props}
//         containerStyle={styles.inputToolbar}
//         renderComposer={(composerProps) => (
//           <TextInput
//             {...composerProps}
//             style={styles.textInput}
//           />
//         )}
//         renderSend={(sendProps) => (
//           <TouchableOpacity
//             style={styles.sendButton}
//             onPress={() => sendProps.onSend({ text: sendProps.text })}
//           >
//             <Text style={styles.sendButtonText}>Send</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );

//   const styles = StyleSheet.create({
//     toolbarContainer: {
//       backgroundColor: 'lightgray', // Цвет фона контейнера ввода сообщений
//       padding: 10,
//     },
//     inputToolbar: {
//       borderTopWidth: 0, // Убираем верхнюю границу
//       paddingHorizontal: 0, // Убираем горизонтальные отступы
//     },
//     textInput: {
//       backgroundColor: 'white', // Цвет фона TextInput
//       borderRadius: 20,
//       paddingHorizontal: 10,
//       flex: 1,
//     },
//     sendButton: {
//       backgroundColor: 'blue', // Цвет фона кнопки отправки
//       borderRadius: 20,
//       padding: 10,
//       marginLeft: 10,
//     },
//     sendButtonText: {
//       color: 'white',
//     },
//   });
