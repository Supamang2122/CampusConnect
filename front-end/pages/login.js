import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { auth } from '../special/FirebaseConfig';

export default function Login(){
    const [signinEmail, setSigninEmail] = useState("");
    const [signinPw, setSigninPw] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const router = useRouter();

    const onLogin = () => {
      signInWithEmailAndPassword(auth, signinEmail, signinPw)
      .then(() => {
        router.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return(
      <div>
          <Flex align={"center"} justify={"center"}>
            <Stack spacing={6} w={"full"} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign In</Heading>
              </Stack>
              <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <Text color="white" fontSize="md">{errMsg}</Text>
                  <FormControl id="email">
                    <FormLabel color="white">Email address</FormLabel>
                    <Input color="white" type="email" name="email" placeholder="Enter email" value={signinEmail} onChange={(event) => setSigninEmail(event.target.value)} _placeholder={{color: "gray.300"}}/>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel color="white">Password</FormLabel>
                    <Input color="white" type="password" name="password" placeholder="Password" value={signinPw} onChange={(event) => setSigninPw(event.target.value)} _placeholder={{color: "gray.300"}}/>
                  </FormControl>
                  <Button colorScheme="teal" onClick={onLogin}>Log in</Button>
                </Stack>
              </Box>
            </Stack>
          </Flex>
      </div>
    );
}