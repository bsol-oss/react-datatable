import React from 'react'
import axios from 'axios'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import DefaultDataTable from './DefaultDataTable'
import DataTable from '../components/DataTable'
import Table from '../components/Table'
import Header from '../components/Header'
import TableTitle from '../components/functionalcomponents/TableTitle'
import GlobalSearch from '../components/functionalcomponents/GlobalSearch'
import Footer from '../components/Footer'
import Pagination from '../components/footercomponents/Pagination'
import SelectedNumber from '../components/footercomponents/SelectedNumber'
import columns from '../components/ProvideByConsumer/Columns'
import PageSizeControl from '../components/footercomponents/PageSizeControl'
import theme from '../theme'
import TableHeader from '../components/bodycomponents/TableHeader'
import TableBody from '../components/bodycomponents/TableBody'

// import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/DataTable',
    component: DefaultDataTable,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
}

export default meta

export const DefaultTable = () => (
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
            <Header>
                <TableTitle>Default DataTable</TableTitle>
                <GlobalSearch />
            </Header>
            <Table
                columns={columns}
                apiUrl="http://localhost:8081/api/g/subaream/all"
                axios={axios}
            >
                <TableHeader />
                <TableBody height="400px" />
            </Table>
            <Footer>
                <Pagination>
                    <SelectedNumber />
                    <PageSizeControl pages={[5, 10, 25, 50, 100]} />
                </Pagination>
            </Footer>
        </DataTable>
    </ChakraProvider>
)

export const WithoutGlobalSearch = () => (
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
            <Header>
                <TableTitle>DataTable without Global search</TableTitle>
            </Header>
            <Table
                columns={columns}
                apiUrl="http://localhost:8081/api/g/subaream/all"
                axios={axios}
            >
                <TableHeader />
                <TableBody height="400px" />
            </Table>
            <Footer>
                <Pagination>
                    <SelectedNumber />
                    <PageSizeControl pages={[5, 10, 25, 50, 100]} />
                </Pagination>
            </Footer>
        </DataTable>
    </ChakraProvider>
)

export const WithoutPageSelection = () => (
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
            <Header>
                <TableTitle>DataTable without page selection</TableTitle>
            </Header>
            <Table
                columns={columns}
                apiUrl="http://localhost:8081/api/g/subaream/all"
                axios={axios}
            >
                <TableHeader />
                <TableBody height="400px" />
            </Table>
            <Footer>
                <Pagination>
                    <SelectedNumber />
                </Pagination>
            </Footer>
        </DataTable>
    </ChakraProvider>
)

export const WithoutTableHeader = () => (
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
            <Header>
                <TableTitle>DataTable without tableheader</TableTitle>
                <GlobalSearch />
            </Header>
            <Table
                columns={columns}
                apiUrl="http://localhost:8081/api/g/subaream/all"
                axios={axios}
            >
                <TableBody height="400px" />
            </Table>
            <Footer>
                <Pagination>
                    <SelectedNumber />
                    <PageSizeControl pages={[5, 10, 25, 50, 100]} />
                </Pagination>
            </Footer>
        </DataTable>
    </ChakraProvider>
)

export const WithoutFooter = () => (
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DataTable>
            <Header>
                <TableTitle>DataTable without footer</TableTitle>
                <GlobalSearch />
            </Header>
            <Table
                columns={columns}
                apiUrl="http://localhost:8081/api/g/subaream/all"
                axios={axios}
            >
                <TableHeader />
                <TableBody height="400px" />
            </Table>
        </DataTable>
    </ChakraProvider>
)
