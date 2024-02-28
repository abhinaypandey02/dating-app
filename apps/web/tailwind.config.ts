import defaultTheme from "config/theme";
import type {Config} from 'tailwindcss';

const config:Config={
    content:['./app/**/*.tsx','../../packages/ui/**/*.tsx'],
    theme:{
        extend:{
            ...defaultTheme
        }
    } 
}
export default config