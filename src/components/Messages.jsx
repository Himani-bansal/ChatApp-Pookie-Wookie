import React from 'react'
import { Avatar, HStack, Text } from '@chakra-ui/react'

const Messages = ({ text, uri, user = "others" }) => {
    return (

        <HStack borderRadius={"2xl"} bg={"teal.500"} paddingX={"4"} paddingY={"2"} alignSelf={user == "me" ? "flex-end" : "flex-start"} mx={2} >
            {
                user == "others" && <Avatar src={uri} size={"sm"} />
            }
         

            <Text>{text}</Text>
            {
                user == "me" && <Avatar src={uri} size={"sm"} />
            }

        </HStack >

    )
}

export default Messages
