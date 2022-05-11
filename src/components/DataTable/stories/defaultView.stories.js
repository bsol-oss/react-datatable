import React from 'react'
import styled from '@emotion/styled'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { theme } from '../../../const/theme'
import DataTable from '../index'
import GlobalStyles from '../../../const/globalStyles'
import { sampleColumns1, props } from './sample'
import {
    TiArrowSortedDown,
    TiArrowSortedUp,
    TiArrowUnsorted,
} from 'react-icons/ti'

import { Cell as DataTableGrid, Row as DataTableRow } from '../Styles'

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
