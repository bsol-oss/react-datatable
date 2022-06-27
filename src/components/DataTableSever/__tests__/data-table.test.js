import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import DataTableServer from '../index'
import { serverColumns } from '../../DataTable/stories/sample.js'
import { theme } from '../../../const/theme'

i18next.use(initReactI18next).init({
    // init launch for forcing preload translation file
    resources: {
        'zh-HK': {
            common: {
                All: '全部',
                'Total Items': '總項目',
                'Filtered Items': '過濾項目',
                'Selected Items': '選定項目',
            },
        },
        en: {
            common: {
                All: 'All',
                'Total Items': 'Total Items',
                'Filtered Items': 'Filtered Items',
                'Selected Items': 'Selected Items',
            },
        },
    },
    lng: ['en', 'zh-HK'],
    fallbackLng: 'en',
    preload: ['zh-HK', 'en'],
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
})

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
                    bgColor: '#37c',
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

const TableComp = (props = {}) => {
    let columns = props.columns || serverColumns
    columns = columns.map((col) => ({
        ...col,
        disableFilters: !!props.disableFilters,
        disableSortBy: !!props.disableSortBy,
    }))

    return (
        <ChakraProvider theme={theme1}>
            <DataTableServer
                isColumnResizable={true}
                apiUrl="https://c3dev.nicecar.cc/api/masterdata/getProductMasterServer"
                columns={serverColumns}
                authorizationKey="authKey"
                {...props}
            />
        </ChakraProvider>
    )
}

describe('DataTableServer should display options correctly', () => {
    test('disable column filter', () => {
        const { queryAllByPlaceholderText } = render(
            <TableComp
                showToggleButtons={true}
                disableFilters={true}
                disableSortBy={true}
                disableWidth={true}
            />
        )

        // Should have no column search input
        const individualSearchElms = queryAllByPlaceholderText('Search...')
        expect(individualSearchElms.length).toBe(0)
    })
})

describe('DataTableServer should display additional options correctly', () => {
    test('should hide elements correctly', () => {
        const { container, queryByText, queryByPlaceholderText } = render(
            <TableComp
                view="GRID"
                showToggleButtons={true}
                showTotalRecords={false}
                showGlobalSearch={false}
                showTableHeader={false}
            />
        )
        // Hide total records text
        expect(queryByText(/Total Items/)).toBeFalsy()

        // Hide global search input
        const globalSearchElm = container.querySelector(
            'span[class^=Styles__GlobalSearchBox]'
        )
        expect(globalSearchElm).toBeFalsy()

        // Hide table header
        expect(queryByPlaceholderText(/SKUID/i)).toBeFalsy()
    })
})
