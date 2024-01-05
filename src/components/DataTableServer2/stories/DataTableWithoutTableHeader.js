import React from 'react'
import axios from 'axios'
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react'

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
import TableBody from '../components/bodycomponents/TableBody'

const DataTableWithoutTableHeader = () => {
    return (
        <Box position="relative">
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <DataTable>
                    <Header>
                        <TableTitle>DataTable without tableheader</TableTitle>
                        <GlobalSearch />
                    </Header>
                    <Table columns={columns}>
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
        </Box>
    )
}

export default DataTableWithoutTableHeader
