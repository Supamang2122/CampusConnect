import { useState } from 'react';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { createUser } from '../apis/apis';
import { useRouter } from 'next/router';

export default function Signup(){
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPw, setSignupPw] = useState("");
    const [signupPwVerify, setSignupPwVerify] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [showPsw, setShowPsw] = useState(false);
    const [showPswVerify, setShowPswVerify] = useState(false);
    const handlePswClick = () => setShowPsw(!showPsw);
    const handlePswVerifyClick = () => setShowPswVerify(!showPswVerify);

    const router = useRouter();

    const handleSignUp = () => {
      createUser({
        user_name: signupEmail,
        password: signupPw
      }).then((resp) => {
        console.log(resp);
        router.push('/home');
      });
    };

    return(
      <div>
          <Flex align={"center"} justify={"center"}>
            <Stack spacing={6} w={"full"} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign Up</Heading>
              </Stack>
              <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <Text color="white" fontSize="md">{errMsg}</Text>
                  <FormControl id="email">
                    <FormLabel color="white">Email address</FormLabel>
                    <Input color="white" type="email" name="email" placeholder="Enter email" value={signupEmail} onChange={(event) => setSignupEmail(event.target.value)} _placeholder={{color: "gray.300"}}/>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel color="white">Password</FormLabel>
                    <InputGroup>
                      <Input color="white" type={showPsw ? "text" : "password"} name="password" placeholder="Password" value={signupPw} onChange={(event) => setSignupPw(event.target.value)} _placeholder={{color: "gray.300"}}/>
                      <InputRightElement h="full">
                        <Button colorScheme="gray" onClick={handlePswClick}>
                          {showPsw ? <ViewIcon/> : <ViewOffIcon/>}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl id="passwordVerify">
                    <FormLabel color="white">Re-enter Password</FormLabel>
                    <InputGroup>
                      <Input color="white" type={showPswVerify ? "text" : "password"} name="passwordVerify" placeholder="Re-enter Password" value={signupPwVerify} onChange={(event) => setSignupPwVerify(event.target.value)} _placeholder={{color: "gray.300"}}/>
                      <InputRightElement h="full">
                        <Button colorScheme="gray" onClick={handlePswVerifyClick}>
                          {showPswVerify ? <ViewIcon/> : <ViewOffIcon/>}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button colorScheme="teal" onClick={handleSignUp}>Sign up</Button>
                </Stack>
              </Box>
            </Stack>
          </Flex>
      </div>
    );
}