import { Box, Container, Button, Input, HStack, VStack } from "@chakra-ui/react"
import { app } from "./firebase"
import { useState, useEffect, useRef } from "react";
import './App.css';
import Message from "./components/Messages";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore"


const auth = getAuth(app);
const db = getFirestore(app)

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
}

const logoutHandler = () => {
  signOut(auth);
}


function App() {

  const [user, setUser] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      })
      setMessage("");
      divForScroll.current.scrollIntoView({ behaviour: "smooth" })
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubscribebeforeMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      )
    })


    return () => {
      unsubscribe();
      unsubscribebeforeMessage();
    }
  }, [])
  return (
    <div className="App">
      <Box bg={"pink.100"}>
        {user ? (<Container h={"100vh"}>
          <VStack h={"full"} bg={"green.100"}>
            <Button bg={"red.400"} colorScheme={"red"} w={"full"} onClick={logoutHandler}>logout</Button>

            <VStack h={"full"} w={"full"} overflowY={"auto"} css={{
              "&::-webkit-scrollbar": {
                display: "none"
              }
            }}>
              {messages.map((item) => (
                <Message
                  key={item.id}

                  user={item.uid === user.uid ? "me" : "others"} text={item.text}
                  uri={item.uri}
                />
              ))}
              <div ref={divForScroll}></div>
            </VStack>

            <form onSubmit={submitHandler} style={{ width: "100%" }}>
              <HStack>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message.." bg={"white"} />
                <Button colorScheme="blue" type={"success"}>send</Button>
              </HStack>
            </form>


          </VStack>
        </Container>) : <VStack h="100vh" justifyContent="center">
          <Button bg={"teal.500"} colorScheme="white" onClick={loginHandler}>Sign In With Google</Button>
        </VStack>}
      </Box>

    </div >
  );
}

export default App;
