import { useEffect, useState } from "react";
import { 
  useAuthenticator, 
  Flex, 
  Text, 
  Divider, 
} from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import CustomSignUp from './CustomSignUp';


import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react/styles/reset.layer.css' // global CSS reset
import '@aws-amplify/ui-react/styles/base.layer.css' // base styling needed for Amplify UI
import '@aws-amplify/ui-react/styles/button.layer.css' // component specific styles


const client = generateClient<Schema>();

function App() {


  const { user, signOut } = useAuthenticator();
  // const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  
  return (
    <main>
      
      <Flex 
        position="absolute"
        top="1rem"
        right="1rem"
        direction="row"
        alignItems="center"
        gap="0.5rem"
        >
        <Text>{user?.signInDetails?.loginId}</Text>
        <Divider 
          orientation="vertical" />
        <button onClick={signOut}>Sign out</button>
      </Flex>      
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
          onClick={() => deleteTodo(todo.id)}
          key={todo.id}>
          {todo.content}
        </li>
        ))}
      </ul>
      <div>
        <CustomSignUp />
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      
    </main>
  );
  

}

export default App;
