import React from 'react'
import { Button, ButtonGroup, Select, Input } from '@chakra-ui/react'

import { PaginationDiv } from '../DataTable/Styles'

const Pagination = ({
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    canNextPage,
    canPreviousPage,
    pageIndex,
    pageSize,
    pageSizes,
    setPageSize,
    totalCount,
}) => {
    return (
        <PaginationDiv>
            <div>
                <ButtonGroup gap="1" marginRight={'10px'}>
                    <Button
                        onClick={() => gotoPage(0)}
                        isDisabled={!canPreviousPage}
                        colorScheme="gray"
                        size="sm"
                    >
                        {'<<'}
                    </Button>{' '}
                    <Button
                        onClick={() => previousPage()}
                        isDisabled={!canPreviousPage}
                        colorScheme="gray"
                        size="sm"
                    >
                        {'<'}
                    </Button>{' '}
                    <Button
                        onClick={() => nextPage()}
                        isDisabled={!canNextPage}
                        colorScheme="gray"
                        size="sm"
                    >
                        {'>'}
                    </Button>{' '}
                    <Button
                        onClick={() => gotoPage(pageCount - 1)}
                        isDisabled={!canNextPage}
                        colorScheme="gray"
                        size="sm"
                    >
                        {'>>'}
                    </Button>{' '}
                </ButtonGroup>
                {pageSize * pageIndex + 1} - {pageSize * pageIndex + pageSize} /{' '}
                {totalCount}
            </div>
            <span>
                | Go to page:{' '}
                <Input
                    type="number"
                    value={pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0
                        gotoPage(page)
                    }}
                    width="100px"
                    marginRight="10px"
                />
            </span>
            <div>
                <Select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ border: '1px solid black' }}
                >
                    {pageSizes.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </Select>
            </div>
        </PaginationDiv>
    )
}

export default Pagination
