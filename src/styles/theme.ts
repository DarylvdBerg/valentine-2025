import {createSystem, defaultConfig} from '@chakra-ui/react'
export const theme = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                brand: {
                    text: {value: '#000000'},
                    subtext: {value: '#666666'},
                    primary: {value: '#D72638'},
                    secondary: {value: '#FF677D'},
                    accent: {value: '#efd1dd'},
                    background: {value: '#f4ede8'},
                }
            }
        }
    }
})