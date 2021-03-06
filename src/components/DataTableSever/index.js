import React, { useState, useEffect, useRef, useReducer, useMemo } from 'react'
import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
import {
    useTable,
    useSortBy,
    useFilters,
    useRowSelect,
    useBlockLayout,
    useResizeColumns,
    usePagination,
} from 'react-table'
import { withTheme } from '@emotion/react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Checkbox as ChakraCheckbox, Center } from '@chakra-ui/react'

import Pagination from './pagination'
import { fetchData, initialState, reducer } from './serverHelper'
import { Search } from '../DataTable/Filters'
import {
    AutoSizeWrapper,
    Loader,
    MainWrapper as Main,
} from '../DataTable/Styles'
import { Actions, Header, Body } from '../DataTable/defaultWrappers'
import { defaultHeaderTextWrap } from '../DataTable/defaultWrappers/header'

const queryClient = new QueryClient()

const Checkbox = ({ checked, indeterminate, ...props }) => (
    <ChakraCheckbox
        zIndex={99}
        isChecked={checked}
        isIndeterminate={indeterminate}
        {...props}
    />
)

/**
 * Main DataTableServer Function
 */
const DataTableServer = ({
    loading = false,
    columns,
    wrapper = {},
    height = 500,
    view: initialView = 'ROW',
    enabledView = ['ROW', 'ROWCONDENSED', 'GRID'],
    showToggleButtons = true,
    showTotalRecords = true,
    showGlobalSearch = true,
    showTableHeader = true,
    selectable = false,
    disableWidth = false, // Mainly for test, 'disableWidth = true' will fix error of AutoSizer not rendering table body
    onSelect = () => {},
    recordTotalComponent = null,
    globalSearchBarComponent = null,
    isHeader = false, // solve design issue when brandHeader is available
    cellMaxWidth,
    cellMinWidth,
    cellHeight,
    arrowIcons = {},
    isColumnResizable = false,
    apiUrl = '',
    pageSizes = [10, 20, 30, 40, 50],
    paginationComponent = null,
    authorizationKey = null,
}) => {
    // DataTableServer view (default): view = 'ROW'
    // Grid view: view = 'GRID'
    // Condensed view: view = 'ROWCONDENSED'

    const [view, setView] = useState(initialView)
    const [error, setError] = useState(null)
    const [keyword, setKeyword] = useState('')

    const {
        ActionsWrapper = Actions,
        HeaderWrapper = Header,
        BodyWrapper = Body,
        MainWrapper = Main,
        RowWrapper,
        CellWrapper,
    } = wrapper

    const defaultColumn = useMemo(
        //we receive Search component
        () => ({
            Filter: Search,
        }),
        []
    )
    //***
    // This is header filters

    // Memoize columns
    const cols = useMemo(() => defaultHeaderTextWrap(columns), [columns])

    const [
        {
            queryPageIndex,
            queryPageSize,
            totalCount,
            queryPageFilter,
            queryFieldsFilter,
            queryPageSortBy,
        },
        dispatch,
    ] = useReducer(reducer, initialState(pageSizes && pageSizes[0]))

    const {
        isLoading,
        error: dataError,
        data,
        isSuccess,
    } = useQuery(
        [
            'DataTableServer',
            queryPageIndex,
            queryPageSize,
            queryPageFilter,
            queryFieldsFilter,
            queryPageSortBy,
        ],
        () =>
            fetchData(
                apiUrl,
                authorizationKey,
                queryPageIndex,
                queryPageSize,
                queryPageFilter,
                queryFieldsFilter,
                queryPageSortBy
            ),
        {
            keepPreviousData: true,
            staleTime: Infinity,
        }
    )

    const {
        getTableProps,
        headerGroups,
        rows,
        totalColumnsWidth,
        prepareRow,
        preGlobalFilteredRows,
        selectedFlatRows,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { selectedRowIds, pageIndex, pageSize, sortBy, filters },
    } = useTable(
        {
            columns: cols,
            data: useMemo(
                () => (isSuccess ? data.results : []),
                [isSuccess, data]
            ),
            defaultColumn,
            initialState: {
                pageIndex: queryPageIndex,
                pageSize: queryPageSize,
                sortBy: queryPageSortBy,
            },
            manualFilters: true,
            manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching, we'll also have to provide our own pageCount.
            manualSortBy: true,
            pageCount: isSuccess ? Math.ceil(totalCount / queryPageSize) : 0,
            autoResetSortBy: false,
            autoResetExpanded: false,
            autoResetPage: false,
            enableMultiSort: true,
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        useBlockLayout,
        useResizeColumns,
        (hooks) => {
            if (selectable) {
                hooks.visibleColumns.push((columns) => [
                    // Adding a column for selection
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => {
                            if (selectable === 'multi')
                                return (
                                    <Center>
                                        <Checkbox
                                            {...getToggleAllRowsSelectedProps()}
                                        />
                                    </Center>
                                )
                            else return ''
                        },
                        disableFilters: true,
                        width: 20,
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        ),
                        CellForGrid: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        ),
                    },

                    ...columns,
                ])
            }
        }
    )

    // Hook to get previous value
    function usePrevious(value) {
        const ref = useRef()
        // Store current value in ref
        useEffect(() => {
            ref.current = value
        }, [value]) // Only re-run if value changes
        // Return previous value (happens before update in useEffect below)
        return ref.current
    }

    const prevSelected = usePrevious(selectedRowIds)

    // Calling onSelect based on selectedRowIds and selectable
    useEffect(() => {
        if (selectable === 'single') {
            const current = Object.keys(selectedRowIds)
            const previous = Object.keys(prevSelected || {})

            if (current.length === 1)
                onSelect(selectedFlatRows.map((row) => row.original))
            // Unselect previous
            if (current.length === 2)
                rows[parseInt(previous[0])].toggleRowSelected()
        }

        if (selectable === 'multi')
            onSelect(selectedFlatRows.map((row) => row.original))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRowIds])

    useEffect(() => {
        dispatch({ type: 'PAGE_CHANGED', payload: pageIndex })
    }, [pageIndex])

    useEffect(() => {
        dispatch({ type: 'PAGE_SIZE_CHANGED', payload: pageSize })
        gotoPage(0)
    }, [pageSize, gotoPage])

    useEffect(() => {
        dispatch({ type: 'PAGE_SORT_CHANGED', payload: sortBy })
    }, [sortBy, gotoPage])

    useEffect(() => {
        dispatch({ type: 'PAGE_FILTER_CHANGED', payload: keyword })
    }, [keyword])

    useEffect(() => {
        if (data?.count) {
            dispatch({
                type: 'TOTAL_COUNT_CHANGED',
                payload: data.count,
            })
        }
    }, [data?.count])

    useEffect(() => {
        dispatch({ type: 'FIELDS_FILTER_CHANGED', payload: filters })
    }, [filters])

    if (dataError) {
        return <p>Error</p>
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    const commonProps = {
        view,
        totalColumnsWidth,
        columns,
        height,
        selectedRowIds,
        getTableProps,
        setView,
        setError,
        cellMaxWidth,
        cellMinWidth,
        cellHeight,
        isColumnResizable,
    }

    return (
        <MainWrapper view={view} className="main-wrapper">
            <ActionsWrapper
                headerGroups={headerGroups}
                showGlobalSearch={showGlobalSearch}
                showToggleButtons={showToggleButtons}
                showTotalRecords={showTotalRecords}
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={keyword}
                setGlobalFilter={setKeyword}
                enabledView={enabledView}
                totalCount={totalCount}
                searchedCount={
                    headerGroups &&
                    headerGroups[0].headers &&
                    headerGroups[0].headers
                        .map((header) => header.filterValue !== undefined)
                        .includes(true)
                        ? rows.length
                        : null
                }
                selectedCount={selectedFlatRows.length || null}
                globalSearchBarComponent={globalSearchBarComponent}
                recordTotalComponent={recordTotalComponent}
                {...commonProps}
            />
            {showTableHeader && (
                <HeaderWrapper
                    headerGroups={headerGroups}
                    view={view}
                    arrowIcons={arrowIcons}
                    isColumnResizable={isColumnResizable}
                />
            )}
            {loading && <Loader />}
            {!loading && (
                <AutoSizeWrapper>
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <BodyWrapper
                                headerGroups={headerGroups}
                                rows={rows}
                                width={width}
                                prepareRow={prepareRow}
                                Row={RowWrapper}
                                Cell={CellWrapper}
                                isMainWrap={!!wrapper.MainWrapper}
                                isHeader={isHeader}
                                {...commonProps}
                            />
                        )}
                    </AutoSizer>
                </AutoSizeWrapper>
            )}
            {paginationComponent ? (
                <>{paginationComponent}</>
            ) : (
                <Pagination
                    gotoPage={gotoPage}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    canNextPage={canNextPage}
                    canPreviousPage={canPreviousPage}
                    pageIndex={pageIndex}
                    setPageSize={setPageSize}
                    pageCount={pageCount}
                    pageSize={pageSize}
                    pageSizes={pageSizes}
                    totalCount={totalCount}
                />
            )}
            {!!error && <div>{error}</div>}
        </MainWrapper>
    )
}

const TableWrapper = (props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <DataTableServer {...props} />
        </QueryClientProvider>
    )
}

export default withTheme(TableWrapper)
