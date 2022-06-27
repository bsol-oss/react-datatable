import React from 'react'
import styled from '@emotion/styled'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import {
    props,
    sampleSliderColumns,
    sampleNumberRangeColumns,
    condensedColumns,
    serverColumns,
} from '../../DataTable/stories/sample'
import CatalogHeaderWrapper from '../../DataTable/stories/CatalogHeaderWrapper'
import { Cell } from '../../DataTable/Styles'
import DataTableServer from '../index'
import { theme } from '../../../const/theme'
import GlobalStyles from '../../../const/globalStyles'

export default {
    title: 'Data Table Server Catalog',
    component: DataTableServer,
}

const theme1 = extendTheme(
    Object.assign({}, theme, {
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
        components: {
            Button: {
                defaultProps: {
                    colorScheme: 'yellow',
                },
            },
            Spinner: {
                defaultProps: {
                    emptyColor: 'gray.200',
                    color: 'blue.500',
                    thickness: '8px',
                },
            },
            DataTable: {
                background: '#fff',
                fontSize: '1rem',
                headerFontWeight: 700,
                borderWidth: 1,
                GlobalSearch: {
                    bgColor: '#fff',
                    iconColor: '#0f0',
                    size: 'xs',
                },
            },
        },
    })
)

const CatalogMainWrapper = styled.div`
    background: #f8f8f8;

    display: grid;
    grid-template-areas:
        'header action'
        'header body'
        'header body'
        'header error';
    grid-template-columns: 1fr 4fr;

    @media screen and (max-width: 414px) {
        grid-template-areas:
            'header action'
            'header body1'
            'header body'
            'header error';
        grid-template-columns: 0;
    }
`

export const DefaultCatalogSetup = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
            wrapper={{
                MainWrapper: CatalogMainWrapper,
                HeaderWrapper: CatalogHeaderWrapper,
            }}
        />
    </ChakraProvider>
)

export const WithCustomGlobalSearch = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            globalSearchBarComponent={() => <div>custom search component</div>}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
            wrapper={{
                MainWrapper: CatalogMainWrapper,
                HeaderWrapper: CatalogHeaderWrapper,
            }}
        />
    </ChakraProvider>
)

export const CatalogSetupWithSliderFilter = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            columns={sampleSliderColumns}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            authorizationKey="authKey"
            wrapper={{
                MainWrapper: CatalogMainWrapper,
                HeaderWrapper: CatalogHeaderWrapper,
            }}
        />
    </ChakraProvider>
)

export const CatalogSetupWithNumberRangeFilter = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            columns={sampleNumberRangeColumns}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            authorizationKey="authKey"
            wrapper={{
                MainWrapper: CatalogMainWrapper,
                HeaderWrapper: CatalogHeaderWrapper,
            }}
        />
    </ChakraProvider>
)

export const CatalogSetupWithRowCondensed = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <Cell>
            <DataTableServer
                {...props}
                view="ROWCONDENSED"
                columns={condensedColumns}
                apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
                authorizationKey="authKey"
                wrapper={{
                    MainWrapper: CatalogMainWrapper,
                    HeaderWrapper: CatalogHeaderWrapper,
                }}
            />
        </Cell>
    </ChakraProvider>
)
