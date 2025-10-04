import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../state-management/authStore";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEmpty, setIsEmpty] = useState<[boolean, boolean]>([false, false]);
    const {login: setAuth} = useAuthStore();
    const navigate = useNavigate();
    const handleTogglePassword = () => setShowPassword(!showPassword);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [login, { loading, error }] = useMutation(LOGIN);

    // Handle Apollo error state
    useEffect(() => {
        if (!error) return;

        // GraphQL errors
        const gqlError = error.graphQLErrors?.[0];
        const code = gqlError?.extensions?.code;

        if (code === "UNAUTHENTICATED") {
            setErrorMessage("Username or password is incorrect.");
            return;
        }
        if (code === "INTERNAL_SERVER_ERROR") {
            setErrorMessage("Internal server error. Please try again later.");
            return;
        }

        // Network errors
        if (error.networkError) {
            console.log(error.networkError);
            if (error.networkError.message.includes("ERR_INTERNET_DISCONNECTED")) {
                setErrorMessage("Network error. Please check your internet connection.");
            } else {
                setErrorMessage("Unable to reach the server. Please try again later.");
            }
            return;
        }

        // Default fallback
        setErrorMessage("An unexpected error occurred. Please try again later.");
    }, [error]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();       

        if (!usernameRef.current || !passwordRef.current) return;

        if (
            usernameRef.current.value.length === 0 ||
            passwordRef.current.value.length === 0
        ) {
            setIsEmpty([
                usernameRef.current.value.length === 0,
                passwordRef.current.value.length === 0,
            ]);
            return;
        }

        const { data } = await login({
            variables: {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            },
        });
        setAuth(data.login.token);

        navigate("/");
    };

    const usernameOnChange = () => {
        if (usernameRef.current && usernameRef.current.value.length > 0) {
            setIsEmpty([false, isEmpty[1]]);
        }
        setErrorMessage("");
    };

    const passwordOnChange = () => {
        if (passwordRef.current && passwordRef.current.value.length > 0) {
            setIsEmpty([isEmpty[0], false]);
        }
        setErrorMessage("");
    };

    return (
        <VStack as="article">
            <Heading as="h1">Login</Heading>
            <Box as="form" onSubmit={onSubmit}>
                <FormControl isInvalid={isEmpty[0]} mb={4}>
                    <FormLabel>Username</FormLabel>
                    <InputGroup display="flex" flexDirection="column">
                        <Input
                            placeholder="Enter your username"
                            maxLength={16}
                            ref={usernameRef}
                            onChange={usernameOnChange}
                        />
                    </InputGroup>
                    {isEmpty[0] && (
                        <FormErrorMessage>Username is required</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isInvalid={isEmpty[1]}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup display="flex" flexDirection="column">
                        <Input
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            maxLength={32}
                            ref={passwordRef}
                            onChange={passwordOnChange}
                        />
                        <InputRightElement>
                            <Button onClick={handleTogglePassword} variant="ghost">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {isEmpty[1] && (
                        <FormErrorMessage>Password is required</FormErrorMessage>
                    )}
                </FormControl>
                {errorMessage.length !== 0 && (
                    <Text color="red" mt={2}>
                        {errorMessage}
                    </Text>
                )}
                <Button
                    colorScheme="green"
                    width="100%"
                    type="submit"
                    mt={4}
                    isLoading={loading} // <--- disable & show spinner
                >
                    Sign In
                </Button>
            </Box>
        </VStack>
    );
};

export default Login;
