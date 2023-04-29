import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonGroup, Flex, Select, Input } from '@chakra-ui/react'

import { PaginationDiv } from '../DataTable/Styles'
import { defaultValues } from '../../const/theme'

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
    const { t } = useTranslation()
    const start = pageSize * pageIndex + 1
    const end = pageSize * pageIndex + pageSize
    return (
        <PaginationDiv>
        <Flex
            justifyContent={'space-between'}
            color={defaultValues.colorSet1.serverText}
            alignItems={'center'}
        >
            <div>
                {/* <ButtonGroup gap="1" marginRight={'10px'}>
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
            </ButtonGroup> */}
                {t('Showing')} {start} {t('to')}{' '}
                {end < totalCount ? end : totalCount} {t('of')}{' '}
                {totalCount} {t('results')}
            </div>
            <div>
                <ButtonGroup gap="1" marginRight={'10px'}>
                    <Button
                        onClick={() => previousPage()}
                        isDisabled={!canPreviousPage}
                        colorScheme="gray"
                        size="sm"
                        variant="outline"
                        width={['70px', '90px']}
                        fontSize={['12px', '14px']}
                    >
                        {t('Previous')}
                    </Button>{' '}
                    <Button
                        onClick={() => nextPage()}
                        isDisabled={!canNextPage}
                        colorScheme="gray"
                        size="sm"
                        variant="outline"
                        width={['60px', '80px']}
                        fontSize={['12px', '14px']}
                    >
                        {t('Next')}
                    </Button>
                </ButtonGroup>
            </div>
        </Flex>

        {/* <span>
            | Go to page:{' '}
            <Input
                type="number"
                value={pageIndex + 1}
                onChange={e => {
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
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
                style={{ border: '1px solid black' }}
            >
                {pageSizes.map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </Select>
        </div> */}
    </PaginationDiv>
    )
}

export default Pagination
