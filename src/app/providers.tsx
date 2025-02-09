'use client';

import { theme } from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Providers({children}: {children: ReactNode}) {
    return (
        <ChakraProvider value={theme}>
            {children}
        </ChakraProvider>
    )
}