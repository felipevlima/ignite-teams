import Groups from "@screens/Groups";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { useFonts,  Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import theme from './src/theme'
import { Loading } from "@components/Loading";

import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" backgroundColor="transparent" translucent/>
      {fontsLoaded ?  (

         <Routes />
 
      ) : (
        <Loading/> 
      )}
    </ThemeProvider>
  );
}
