import React, {
    useState,
    useEffect,
    useRef,
    useReducer,
    useMemo,
    forwardRef,
    useImperativeHandle,
} from 'react'
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
    PaginationDiv,
} from '../DataTable/Styles'
import { Actions, HeaderServer, Body } from '../DataTable/defaultWrappers'
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
const DataTableServer = forwardRef(
    (
        {
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
            showLoading = true,
            selectable = false,
            disableWidth = false, // Mainly for test, 'disableWidth = true' will fix error of AutoSizer not rendering table body
            onDataLoaded = () => {},
            onDataLoadError = () => {},
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
            pageSizes = [5, 10, 15, 20, 25, 30],
            loadingComponent: LoadingComponent = null,
            errorComponent: ErrorComponent = null,
            paginationComponent = null,
            authorizationKey = null,
            extraKeyPair = null,
            axios = null,
        },
        ref
    ) => {
        // DataTableServer view (default): view = 'ROW'
        // Grid view: view = 'GRID'
        // Condensed view: view = 'ROWCONDENSED'

        const [view, setView] = useState(initialView)
        const [error, setError] = useState(null)
        const [keyword, setKeyword] = useState('')

        const {
            ActionsWrapper = Actions,
            HeaderWrapper = HeaderServer,
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
                filterCount,
                queryPageFilter,
                queryFieldsFilter,
                queryPageSortBy,
            },
            dispatch,
        ] = useReducer(reducer, initialState(pageSizes && pageSizes[0]))

        const {
            data,
            error: dataError,
            isLoading,
            isFetching,
            isRefetching,
            isFetched,
            isSuccess,
            refetch,
        } = useQuery(
            [
                `DataTableServer_${apiUrl}`,
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
                    queryPageSortBy,
                    extraKeyPair,
                    axios
                ),
            {
                keepPreviousData: true,
                staleTime: Infinity,
                onError: onDataLoadError,
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
                data: useMemo(() => {
                    return isSuccess ? data?.results || [] : []
                }, [isSuccess, data]),
                defaultColumn,
                initialState: {
                    pageIndex: queryPageIndex,
                    pageSize: queryPageSize,
                    sortBy: queryPageSortBy,
                },
                manualFilters: true,
                manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching, we'll also have to provide our own pageCount.
                manualSortBy: true,
                pageCount: isSuccess
                    ? Math.ceil(filterCount / queryPageSize)
                    : 0,
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
                                <Center
                                    minWidth="30px"
                                    marginLeft="5px"
                                    marginRight="10px"
                                >
                                    <Checkbox
                                        {...row.getToggleRowSelectedProps()}
                                    />
                                </Center>
                            ),
                            CellForGrid: ({ row }) => (
                                <Center
                                    minWidth="30px"
                                    marginLeft="5px"
                                    marginRight="10px"
                                >
                                    <Checkbox
                                        {...row.getToggleRowSelectedProps()}
                                    />
                                </Center>
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

        // Expose "refetch" method to parent component
        useImperativeHandle(
            ref,
            () => {
                return {
                    refetch,
                }
            },
            []
        )

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
        }, [sortBy])

        useEffect(() => {
            dispatch({ type: 'PAGE_FILTER_CHANGED', payload: keyword })
            if (keyword.length > 0 && pageIndex > 0) {
                gotoPage(0)
            }
        }, [keyword])

        useEffect(() => {
            if (data?.count !== undefined) {
                dispatch({
                    type: 'TOTAL_COUNT_CHANGED',
                    payload: data.count,
                })
            }
        }, [data?.count])

        useEffect(() => {
            if (data?.filterCount !== undefined) {
                dispatch({
                    type: 'FILTER_COUNT_CHANGED',
                    payload: data.filterCount,
                })
            }
        }, [data?.filterCount])

        useEffect(() => {
            if (isFetched) onDataLoaded(data, dataError)
        }, [isFetched])

        useEffect(() => {
            if (isLoading) console.log('1 - isLoading')
            if (isFetching) console.log('2 - isFetching')
            if (isRefetching) console.log('3 - isRefetching')
        }, [isLoading, isFetching, isRefetching])

        useEffect(() => {
            dispatch({ type: 'FIELDS_FILTER_CHANGED', payload: filters })
            if (filters.length > 0 && pageIndex > 0) {
                gotoPage(0)
            }
        }, [filters])

        if ((dataError || (data && !data.ok)) && ErrorComponent) {
            return <ErrorComponent />
        }

        if (isLoading || isFetching || isRefetching) {
            if (!showLoading) return null
            return LoadingComponent ? <LoadingComponent /> : <p>Loading...</p>
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
                        filters.length > 0 || keyword.length > 0
                            ? filterCount
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
                    <PaginationDiv>{paginationComponent}</PaginationDiv>
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
                        filterCount={filterCount}
                    />
                )}
                {!!error && <div>{error}</div>}
            </MainWrapper>
        )
    }
)

const TableWrapper = forwardRef((props, ref) => {
    return (
        <QueryClientProvider client={queryClient}>
            <DataTableServer {...props} ref={ref} />
        </QueryClientProvider>
    )
})

export default withTheme(TableWrapper)
