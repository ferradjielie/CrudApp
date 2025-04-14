// Import des composants de base de React Native
import { Text, View, TextInput, Pressable, StyleSheet , FlatList} from "react-native";

// Pour gérer les zones de sécurité en haut/bas de l'écran sur iOS/Android
import { SafeAreaView } from "react-native-safe-area-context";

// Hook d'état
import { useState } from "react";

// Données initiales (simulées) importées depuis un fichier local
import { data } from "@/data/todos";

// Icône de suppression importée depuis Expo Vector Icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import {Inter_500Medium, useFonts} from "@expo-google-fonts/inter"

export default function Index() {
  // On trie les données pour que les tâches récentes soient en haut
const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));

// 🧠 État pour stocker ce que l'utilisateur tape dans le champ texte
const [text, setText] = useState('');

const [loaded,error] = useFonts({
    Inter_500Medium, 
})

if (!loaded && !error) {
    return null
}

// ➕ Fonction pour ajouter une nouvelle tâche
const addTodo = () => {
    // On vérifie que l'utilisateur a tapé quelque chose (pas juste des espaces)
    if (text.trim()) {
        // On génère un nouvel ID : +1 par rapport au plus haut ID existant
        const newId = todos.length > 0 ? todos[0].id + 1 : 1;

        // On crée une nouvelle liste de tâches avec la nouvelle en haut
        setTodos([
            { id: newId, title: text, completed: false },
            ...todos
        ]);

        // On vide le champ texte
        setText('');
    }
};

// ✅ Fonction pour cocher/décocher une tâche (completed: true/false)
const toggleTodo = (id) => {
    setTodos(
        todos.map(todo =>
            // Si l'ID correspond, on inverse le completed
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
};

// 🗑️ Fonction pour supprimer une tâche
const removeTodo = (id) => {
    // On filtre la liste pour retirer la tâche avec l'ID correspondant
    setTodos(todos.filter(todo => todo.id !== id));
};

    // 📦 Fonction pour afficher chaque élément de la liste
    const renderItem = ({ item }) => (
        <View style={styles.todoItem}>
            {/* Titre de la tâche - click = toggle */}
            <Text style={[styles.todoText, item.completed && styles.completedText]}
                onPress={() => toggleTodo(item.id)}
            >
              {item.title}
            </Text>

            {/* Icône de suppression */}
            <Pressable onPress={() => removeTodo(item.id)}>
                <MaterialCommunityIcons name="delete-circle" size={36} color="red" />
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Input + bouton Ajouter */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new todo"
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={setText}
                />
                <Pressable onPress={addTodo} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
            </View>

            {/* Liste des tâches */}
            <FlatList
               data={todos}                         // données à afficher
               renderItem={renderItem}             // fonction qui retourne un composant pour chaque item
               keyExtractor={todo => todo.id}      // clé unique par élément
               contentContainerStyle={{ flexGrow: 1 }} // permet de scroll même si peu d’éléments
            />
        </SafeAreaView>
    );
}

// 🎨 Feuille de styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "black"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
    },
    input: {
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 18,
        fontFamily : "Inter_500Medium",
        minWidth: 0,
        color: "white",
    },
    addButton: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
    },
    addButtonText: {
        fontSize: 18,
        color: "black"
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width : "100%",
        maxWidth : 1024,
        marginHorizontal : "auto",
        pointerEvents : "auto"
    },
    todoText: {
        flex : 1,
        color: 'white',
        fontFamily : "Inter_500Medium",
        fontSize: 18
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray'
    }
});

// -----------------------------
// 🧠 Concepts utilisés dans ce fichier
// -----------------------------

/*
🔹 useState
Hook de React qui permet de créer des variables réactives dans un composant.
Il retourne un tableau contenant [valeur, fonctionPourModifierValeur].
À chaque appel de cette fonction, le composant se re-render automatiquement avec la nouvelle valeur.

Exemple ici :
const [text, setText] = useState('');
Quand l'utilisateur écrit dans le champ, on met à jour "text" grâce à setText().
*/

/*
🔹 JSX
C’est une syntaxe qui ressemble à du HTML, mais utilisée dans React.
Elle permet d’écrire l’interface directement dans le code JavaScript.
Attention, ce n’est pas du vrai HTML (par ex. "class" devient "className", ou ici "style={...}").

Exemple :
<View><Text>Mon texte</Text></View>
*/

/*
🔹 FlatList
Composant optimisé de React Native pour afficher des listes longues.
Il est plus performant que .map() car il ne rend que ce qui est visible à l’écran.

Props utilisées ici :
- data : les données à afficher (todos)
- renderItem : fonction qui retourne l'affichage d’un élément
- keyExtractor : identifiant unique pour chaque item (ici todo.id)
*/

/*
🔹 Props (Propriétés)
Ce sont les "arguments" qu’on passe à un composant React pour le configurer.
Par exemple :
renderItem={renderItem} passe la fonction renderItem comme prop à FlatList.
*/

/*
🔹 Composants Fonctionnels
Il s’agit d’une fonction JavaScript qui retourne un élément JSX.
Dans React moderne, la majorité des composants sont écrits comme ça.
Exemple ici : function Index() { ... }
*/

/*
🔹 StyleSheet
API de React Native pour créer des styles CSS-like.
On crée un objet styles avec StyleSheet.create({...}).
Ensuite, on applique les styles via style={styles.nomDuStyle}.

⚠️ Ce n’est pas du CSS : les propriétés sont en camelCase, et les valeurs sont souvent en nombres.
*/

/*
🔹 SafeAreaView
Composant qui protège le contenu de l’interface pour ne pas qu’il soit caché par les bords de l’écran (notamment sur iPhone avec une encoche ou sur Android avec la barre du bas).
C’est un wrapper conseillé pour tous les écrans d’une app mobile.
*/

/*
🔹 Immutabilité
En React, on ne modifie jamais directement un tableau ou un objet.
On crée une **copie** avec des changements (spread operator, map, filter…).

Exemple ici dans toggleTodo :
todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
)

On copie chaque todo, et si l’ID correspond, on change uniquement la propriété completed.
*/

/*
🔹 Event Handlers
Ce sont des fonctions déclenchées par les actions utilisateur (clic, saisie, etc.).
Exemples ici :
- onPress (clic sur bouton ou texte)
- onChangeText (saisie clavier dans TextInput)
*/

/*
🔹 Icons Expo (@expo/vector-icons)
Bibliothèque incluse dans Expo qui permet d’utiliser des icônes populaires facilement.
Ici on utilise "MaterialCommunityIcons" et l’icône delete-circle pour supprimer une tâche.

Syntaxe :
<MaterialCommunityIcons name="delete-circle" size={36} color="red" />
*/

/*
🔹 Spread Operator (...)
Permet de copier un tableau ou un objet rapidement dans un autre.
Très utilisé pour garder l’immuabilité en React.

Exemple :
{ ...todo, completed: true } crée une copie de "todo" avec completed modifié.
Ou :
[ { id: 1, ...todos } ] → ajoute un nouvel objet en début de tableau.
*/
