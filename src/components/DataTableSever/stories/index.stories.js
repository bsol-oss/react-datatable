import React from 'react'
import styled from '@emotion/styled'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
    TiArrowSortedDown,
    TiArrowSortedUp,
    TiArrowUnsorted,
} from 'react-icons/ti'

import {
    props,
    serverColumns,
    serverColumns1,
} from '../../DataTable/stories/sample'
import DataTableServer from '../index'
import {
    Cell as DataTableGrid,
    Row as DataTableRow,
} from '../../DataTable/Styles'
import { theme } from '../../../const/theme'
import GlobalStyles from '../../../const/globalStyles'

export default { title: 'Data Table Server', component: DataTableServer }

const CustomTableContainer = styled.div`
    .action-wrapper {
        padding: 4rem 0;
    }
`

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
                bgColor: '#fff',
                fontSize: 1,
                borderWidth: 1,
                widgetSize: 'md',
                Actions: {
                    bgColor: 'orange',
                    GlobalSearch: {
                        bgColor: '#f77',
                        iconColor: '#0f0',
                        size: 'sm',
                    },
                    TotalRecords: {
                        fontSize: 0.8,
                        padding: 0.5,
                    },
                    ToggleButtons: {
                        colorScheme: 'gray',
                        size: 'sm',
                    },
                },
                Header: {
                    fontSize: 1,
                    fontWeight: 600,
                    widgetSize: 'sm',
                    bgColor: '#fff',
                    borderBottomWidth: '1px',
                    borderColor: '#f00',
                    Search: {
                        size: 'lg',
                        bgColor: '#000',
                        variant: 'unstyled',
                    },
                    Slider: {
                        size: 'xs',
                    },
                    Range: {
                        size: 'lg',
                        bgColor: '#a3e',
                    },
                    Dropdown: {
                        size: 'sm',
                        bgColor: '#eee',
                    },
                },
                Body: {
                    Row: {
                        fontSize: 0.8,
                        borderWidth: '1px',
                        borderColor: '#abc',
                        hoverBorderWidth: '3px',
                        hoverBorderColor: '#00f',
                    },
                    Cell: {
                        fontSize: 1.2,
                    },
                },
            },
        },
    })
)

export const ServerDefaultTableView = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <CustomTableContainer>
            <DataTableServer
                apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
                columns={serverColumns}
                authorizationKey="authKey"
            />
        </CustomTableContainer>
    </ChakraProvider>
)

export const DefaultLoadingView = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            loading={true}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const WithSingleSelectable = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            selectable={'single'}
            onSelect={(value) => console.log(value, '@selected-item')}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const WithMultiSelectable = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            selectable={'multi'}
            onSelect={(values) => console.log(values, '@selected-items')}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const WithCellHeightWidthVariations = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            columns={serverColumns1}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const DefaultGridView = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            view="GRID"
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const DefaultTableViewNoToggle = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            showToggleButtons={false}
            view="GRID"
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const CustomGrid = () => {
    const Grid = ({ children, ...props }) => (
        <DataTableGrid onClick={() => alert(`haha ${props.index}`)} {...props}>
            {children}
        </DataTableGrid>
    )
    return (
        <ChakraProvider theme={theme1}>
            <GlobalStyles />
            <DataTableServer
                {...props}
                showToggleButtons={false}
                view="GRID"
                wrapper={{ GridWrapper: Grid }}
                cellHeight={250}
                cellMaxWidth={300}
                cellMinWidth={100}
                apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
                columns={serverColumns}
                authorizationKey="authKey"
            />
        </ChakraProvider>
    )
}

export const CustomRow = () => {
    const Row = ({ children, ...props }) => {
        return (
            <DataTableRow
                onClick={() => alert(`haha ${props.index}`)}
                {...props}
            >
                {children}
            </DataTableRow>
        )
    }
    const Cell = ({ children, ...props }) => {
        console.log(props)
        return (
            <DataTableGrid
                onClick={() => alert(`hehe ${props.index}`)}
                {...props}
            >
                {children}
            </DataTableGrid>
        )
    }

    return (
        <ChakraProvider theme={theme1}>
            <GlobalStyles />
            <DataTableServer
                {...props}
                view="ROWCONDENSED"
                wrapper={{ RowWrapper: Row, CellWrapper: Cell }}
                apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
                columns={serverColumns}
                authorizationKey="authKey"
            />
        </ChakraProvider>
    )
}

export const WithRecordTotalComponent = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            recordTotalComponent={() => <div>random total</div>}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const WithglobalSearchBarComponent = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            globalSearchBarComponent={() => <div>random global total</div>}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const CustomSortIcon = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            view="GRID"
            arrowIcons={{
                Asc: TiArrowSortedUp,
                Desc: TiArrowSortedDown,
                Unsorted: TiArrowUnsorted,
            }}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)

export const WithIsColumnResizable = () => (
    <ChakraProvider theme={theme1}>
        <GlobalStyles />
        <DataTableServer
            {...props}
            view="GRID"
            isColumnResizable={true}
            apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
            columns={serverColumns}
            authorizationKey="authKey"
        />
    </ChakraProvider>
)
