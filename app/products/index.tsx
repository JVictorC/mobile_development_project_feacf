import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../src/services/api";

type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

const maleCategories = ["mens-shirts", "mens-shoes", "mens-watches"];
const femaleCategories = [
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
];

export default function Products() {
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [gender, setGender] = useState<"male" | "female">("male");

    useEffect(() => {
        loadProducts();
    }, [gender]);

    async function loadProducts() {
        try {
            setLoading(true);

            const categories = gender === "male" ? maleCategories : femaleCategories;

            let allProducts: Product[] = [];

            for (let category of categories) {
                const response = await api.get<{ products: Product[] }>(
                    `/category/${category}`
                );

                allProducts = [...allProducts, ...response.data.products];
            }

            setProducts(allProducts);
        } catch (error) {
            console.log("Erro ao carregar produtos", error);
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        router.replace("/login");
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#111" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Produtos</Text>

                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* TABS */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        gender === "male" && styles.activeTab,
                    ]}
                    onPress={() => setGender("male")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            gender === "male" && styles.activeTabText,
                        ]}
                    >
                        Masculino
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tab,
                        gender === "female" && styles.activeTab,
                    ]}
                    onPress={() => setGender("female")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            gender === "female" && styles.activeTabText,
                        ]}
                    >
                        Feminino
                    </Text>
                </TouchableOpacity>
            </View>

            {/* LISTA */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/product/${item.id}`)}
                        style={styles.card}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={{ uri: item.thumbnail }}
                            style={styles.image}
                            resizeMode="cover"
                        />

                        <View style={styles.cardInfo}>
                            <Text numberOfLines={2} style={styles.productTitle}>
                                {item.title}
                            </Text>

                            <Text style={styles.price}>R$ {item.price}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        elevation: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#111",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "600",
    },
    tabsContainer: {
        flexDirection: "row",
        margin: 15,
        backgroundColor: "#eee",
        borderRadius: 25,
        padding: 5,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: "#111",
    },
    tabText: {
        color: "#555",
        fontWeight: "600",
    },
    activeTabText: {
        color: "#fff",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 15,
        padding: 12,
        elevation: 3,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginRight: 15,
    },
    cardInfo: {
        flex: 1,
        justifyContent: "space-between",
    },
    productTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2e7d32",
    },
});