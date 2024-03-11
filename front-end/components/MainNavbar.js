import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, Box, Button, Center, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import CreateButton from './post-list/PostCreation';

function NavLink(props){
  const {children, href} = props;
  return(
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      color={"white"}
      _hover={{
        textDecoration: "none",
        bg: "gray.7 00",
      }}
      href={href}
    >
      {children}
    </Box>
  )
};

function MainNavbar() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [showLogout, setShowLogout] = useState(false);
  const [userIcon, setUserIcon] = useState(["gray.100","0"]);

  return (
    <Box bg="gray.900" px={4} position={"fixed"} width={"100%"} zIndex={1000}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
          aria-label={"Open Menu"}
          display={{md: "none"}}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box color={"white"}>
            <Link href={showLogout ? "/home" : "/"} className="site-title nav-props">CampusConnect</Link>
          </Box>
          <HStack as={"nav"} spacing={4} display={{base: "none", md: "flex"}}>
            <CreateButton/>
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  bg={userIcon[0]}
                  src={`/images/pfp-icon-imgs/${userIcon[1]}.png`}
                  alt={"Profile Picture"}
                  name=" "/>
              </MenuButton>
              <MenuList>
                <Center>
                  <Avatar
                    size={"2xl"}
                    bg={userIcon[0]}
                    src={`/images/pfp-icon-imgs/${userIcon[1]}.png`}
                    alt={"Profile Picture"}
                    name=" "/>
                </Center>
                <Center flexDir={"column"}>
                  <h4>DisplayName</h4>
                </Center>
                <MenuDivider/>
                  <MenuItem as={Link} href={`/profile`}>Profile</MenuItem>
                <MenuDivider/>
                  <MenuItem>Settings</MenuItem>
              </MenuList>
            </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{md: "none"}}>
          <Stack as={"nav"} spacing={4}>
            <CreateButton/>
          </Stack>
        </Box>
      ) : null}

    </Box>
  );
}

export default MainNavbar;
