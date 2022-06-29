import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

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
                        variant="outline"
                        onClick={() => gotoPage(0)}
                        isDisabled={!canPreviousPage}
                        colorScheme="gray"
                        size="xs"
                    >
                        {'<<'}
                    </Button>{' '}
                    <Button
                        variant="outline"
                        onClick={() => previousPage()}
                        isDisabled={!canPreviousPage}
                        colorScheme="gray"
                        size="xs"
                    >
                        {'<'}
                    </Button>{' '}
                    <Button
                        variant="outline"
                        onClick={() => nextPage()}
                        isDisabled={!canNextPage}
                        colorScheme="gray"
                        size="xs"
                    >
                        {'>'}
                    </Button>{' '}
                    <Button
                        variant="outline"
                        onClick={() => gotoPage(pageCount - 1)}
                        isDisabled={!canNextPage}
                        colorScheme="gray"
                        size="xs"
                    >
                        {'>>'}
                    </Button>{' '}
                </ButtonGroup>
                {pageSize * pageIndex + 1} - {pageSize * pageIndex + pageSize} /{' '}
                {totalCount}
            </div>
            <div>
                <select
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
                </select>
            </div>
        </PaginationDiv>
    )
}

export default Pagination
