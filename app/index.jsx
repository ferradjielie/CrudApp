import  {Text, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import {data} from "@/data/todos"

export function Index() {
    const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id ))
    const [text, setText] = useState('')

    const addTodo = () => {
        if (text.trim()) {
            const newId = todos.length > 0 ? todos[0].id + 1 : 1;
            setTodos([{id : newId, title : text, completed : false, ...todos}])
                setText('')
            
        }
    }
    const toggleTodo =  (id) => {
        setTodos(todos.map(todo=>
            todo.id === id ? {...todo, compled : !todo.compled} : todo
        ))
    }
    return (
        <View
            style={{
                flex : 1,
                justifyContent : "center",
                alignItems : "center"
                }}
             >
                <Text> Edit app/index.jsx to edit this screen</Text>
        </View>
    )
}