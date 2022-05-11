import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { props } from './sample'
import DataTable from '../index'
import { theme } from '../../../const/theme'
import GlobalStyles from '../../../const/globalStyles'

export default { title: 'Data Table - Default View', component: DataTable }

const theme1 = extendTheme(
    Object.assign({}, theme, {
        config: {
            cssVarPrefix: 'c',
        },
        breakpoints: {
            mobile: '480px',
            tablet: '768px',
            desktop: '1280px',
            desktopPlus: '1280px',
        },
        styles: {
            global: {
                'html, body': {
                    fontFamily:
                        "'Amazon Ember', Arial, sans-serif, 'Noto Sans HK'",
                },
                a: {
                    color: 'blue.800',
                },
            },
        },
    })
)

export const DefaultTableView = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTable {...props} isColumnResizable={true} />
    </ChakraProvider>
)
