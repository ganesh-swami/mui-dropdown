"use client"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDropdown from '@/components/mui-dropdown'
import MultipleSelect from '@/components/multiSelect'

export default function Home (){
  const theme = createTheme();
    return(
      <ThemeProvider theme={theme}>
        <MuiDropdown />
        <MultipleSelect />
      </ThemeProvider>
    )
}
