import React from 'react'
import axios from 'axios'
import { Box } from '@chakra-ui/react'

import DataTable from './components/DataTable'
import Table from './components/Table'
import Header from './components/Header'
import TableTitle from './components/functionalcomponents/TableTitle'
import GlobalSearch from './components/functionalcomponents/GlobalSearch'
import Footer from './components/Footer'
import Pagination from './components/footercomponents/Pagination'
import SelectedNumber from './components/footercomponents/SelectedNumber'
import PageSizeControl from './components/footercomponents/PageSizeControl'
import TableHeader from './components/bodycomponents/TableHeader'
import TableBody from './components/bodycomponents/TableBody'

const DataTableServer = ({
    height = '400px',
    tableTitle = '',
    columns = [],
    // arrowIcons = [],
    isColumnResizable = false,
    paginationComponent = null,
    globalSearchComponent = null,
    loadingComponent = null,
    errorComponent = null,
    apiUrl = '',
    pageSizes = [5, 10, 15, 20, 25, 30],
    extraSortFilters = [],
    extraFieldFilters = {},
    axiosRef = axios,
}) => {
    return (
        <Box>
            <DataTable>
                <Header>
                    {tableTitle ? <TableTitle>{tableTitle}</TableTitle> : null}
                    {globalSearchComponent ? (
                        globalSearchComponent
                    ) : (
                        <GlobalSearch />
                    )}
                </Header>
                <Table
                    columns={columns}
                    apiUrl={apiUrl}
                    extraSortFilters={extraSortFilters}
                    extraFieldFilters={extraFieldFilters}
                    LoadingComponent={loadingComponent}
                    ErrorComponent={errorComponent}
                    axios={axiosRef}
                >
                    <TableHeader
                    // arrowIcons={arrowIcons}
                    // isColumnResizable={isColumnResizable}
                    />
                    <TableBody height={height} />
                </Table>
                {paginationComponent ? (
                    paginationComponent
                ) : (
                    <Footer>
                        <Pagination>
                            <SelectedNumber />
                            <PageSizeControl pages={pageSizes} />
                        </Pagination>
                    </Footer>
                )}
            </DataTable>
        </Box>
    )
}

export default DataTableServer
