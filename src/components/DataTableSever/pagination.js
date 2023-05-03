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
                fontSize={'0.85rem'}
            >
                <div>
                    {t('Showing')} {start < totalCount ? start : totalCount}{' '}
                    {t('to')} {end < totalCount ? end : totalCount} {t('of')}{' '}
                    {totalCount} {t('results')}
                </div>

                <div>
                    Go to page:{' '}
                    <Input
                        type="number"
                        value={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0
                            gotoPage(page)
                        }}
                        width="70px"
                        marginRight="10px"
                        size="sm"
                    />
                </div>
                <div>
                    <Select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        style={{
                            border: '1px solid black',
                            fontSize: '12px',
                            borderColor: '#e2e8f0',
                        }}
                        width={'120px'}
                        size="sm"
                    >
                        {pageSizes.map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </div>
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
                </div>
            </Flex>
        </PaginationDiv>
    )
}

export default Pagination