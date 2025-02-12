'use client';

import { theme } from "@/styles/theme";
import { chakra, ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Providers({children}: {children: ReactNode}) {
    return (
        <ChakraProvider value={theme}>
            <chakra.main backgroundColor='brand.background'>
                {children}
            </chakra.main>
        </ChakraProvider>
    )
}