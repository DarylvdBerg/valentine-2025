import {createSystem, defaultConfig} from '@chakra-ui/react'
export const theme = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                brand: {
                    primary: {value: '#D72638'},
                    secondary: {value: '#FF677D'},
                    accent: {value: '#FFB7C3'},
                    background: {value: '#FFF5F8'},
                }
            }
        }
    }
})