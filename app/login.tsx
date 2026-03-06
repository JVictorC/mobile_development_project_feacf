import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../src/context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");



    function validate() {
        let valid = true;

        // Regex simples de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setEmailError("O email é obrigatório");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Digite um email válido");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("A senha é obrigatória");
            valid = false;
        } else if (password.length < 6) {
            setPasswordError("A senha deve ter no mínimo 6 caracteres");
            valid = false;
        } else {
            setPasswordError("");
        }

        return valid;
    }

    function handleLogin() {
        if (!validate()) return;

        if (!email || !password) return;

        login(email);
        router.replace("/products");
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.inner}
            >
                {/* Título */}
                <View style={styles.header}>
                    <Text style={styles.title}>Bem-vindo</Text>
                    <Text style={styles.subtitle}>Faça login para continuar</Text>
                </View>

                {/* Card */}
                <View style={styles.card}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        secureTextEntry
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                    {passwordError ? (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputError: {
        borderWidth: 1,
        borderColor: "#ff4d4f",
    },

    errorText: {
        color: "#ff4d4f",
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 25,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#111",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        elevation: 5,
    },
    input: {
        backgroundColor: "#f2f2f2",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#111",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});