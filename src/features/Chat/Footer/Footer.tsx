import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useCallback, useRef, useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatRepository from "../../../api/domain/chat/chat.repository";
import { ThemedView } from "../../../components/ThemedView/ThemedView";
import { setMessageInput } from "../../../redux/chat";
import { getMessageInput } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Send from "./Send";

function Footer() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const message = useAppSelector(getMessageInput);

  // Estados para Cámara
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const onChangeText = useCallback(
    (text: string) => {
      dispatch(setMessageInput(text));
    },
    [dispatch]
  );

  // Action Sheet
  const handleAttachPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancelar",
          "Cámara",
          "Fototeca (deshabilitada)",
          "Archivo (deshabilitada)",
          "Audio (deshabilitada)",
        ],
        cancelButtonIndex: 0,
        disabledButtonIndices: [2, 3, 4],
        title: "Adjuntar",
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          handleOpenCamera();
        }
      }
    );
  };

  const handleOpenCamera = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Permiso denegado", "Se requiere acceso a la cámara.");
        return;
      }
    }
    setShowCamera(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });

        if (photo?.uri) {
          const repository = new ChatRepository();

          await repository.sendImageMessage(photo.uri);

          console.log("✅ Imagen enviada correctamente como archivo");
        }
      } catch (error) {
        console.error("❌ Error al enviar imagen:", error);
      } finally {
        setShowCamera(false);
      }
    }
  };

  return (
    <ThemedView
      style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
    >
      <TouchableOpacity onPress={handleAttachPress} style={styles.iconButton}>
        <Ionicons name="add-circle-outline" size={30} color="#003049" />
      </TouchableOpacity>

      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={onChangeText}
        placeholder="Escribe un mensaje..."
        multiline
        numberOfLines={4}
        maxLength={1000}
        textAlignVertical="top"
        scrollEnabled={true}
      />

      <Send />

      <Modal visible={showCamera} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            ref={cameraRef}
            facing="front"
          />

          <View style={styles.cameraOverlay}>
            <TouchableOpacity
              onPress={() => setShowCamera(false)}
              style={styles.closeCamera}
            >
              <Ionicons name="close" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

export default React.memo(Footer);

const styles = StyleSheet.create({
  footerContainer: {
    borderTopWidth: 1,
    flexDirection: "row",
    width: "100%",
    gap: 8,
    alignItems: "flex-end",
    justifyContent: "center",
    borderTopColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 70,
  },
  iconButton: {
    marginBottom: 5,
    padding: 4,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: "#fff",
    minHeight: 40,
    maxHeight: 110,
  },
  camera: {
    flex: 1,
  },
  closeCamera: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
  },
});
