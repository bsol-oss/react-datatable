import React, { useCallback } from 'react'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import styled from '@emotion/styled'

export const HeaderWrapper = styled.div`
    grid-area: header;
    background: ${({ theme: { dataTable } }) => dataTable.background};

    @media screen and (max-width: 414px) {
        grid-area: body1;
    }
`

export const TableHeaderRow = styled.div`
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TableHeaderTitle = styled.div`
    /* display: inline-flex ; */
    width: 100%;
    align-items: center;
    text-align: center;
    
    white-space: nowrap;
    overflow: hidden;

    font-size: ${({ theme: { dataTable } }) => dataTable.fontSize}rem;
    font-weight: ${({ theme: { dataTable } }) => dataTable.headerFontWeight};
    
    padding-bottom: ${({ theme: { dataTable } }) =>
        `${dataTable.fontSize * 0.5}rem`};

    & > div.input  {
        margin : ${({ theme: { dataTable } }) =>
            dataTable.fontSize * -0.5}rem 0;
    }
}

`
export const TitlesWrapper = styled.div`
    padding: ${({ theme: { dataTable } }) => dataTable.fontSize}rem 0rem;
    display: flex;
    flex-direction: column;
    width: 80%;
`

export const TableHeaderSearchBox = styled.span`
    text-align: center;
`

const CatalogHeaderWrapper = ({ headerGroups, view }) => {
    const renderArrow = useCallback((direction) => {
        if (direction === 'down')
            return <MdExpandMore data-testid="arrow-down" size={18} />
        if (direction === 'up')
            return <MdExpandLess data-testid="arrow-up" size={18} />
        return <MdExpandLess size={18} color={'transparent'} />
    }, [])

    return (
        <HeaderWrapper>
            {headerGroups.map((headerGroup, i) => (
                <TableHeaderRow key={i} isCondensed={view === 'ROWCONDENSED'}>
                    {headerGroup.headers.map((column, i) => (
                        <TitlesWrapper key={i}>
                            <TableHeaderTitle
                                {...column.getSortByToggleProps()}
                                key={i}
                            >
                                {column.render('Header')}
                                {column.isSorted
                                    ? column.isSortedDesc
                                        ? renderArrow('down')
                                        : renderArrow('up')
                                    : renderArrow()}
                            </TableHeaderTitle>
                            {!column.disableFilters && (
                                <TableHeaderSearchBox key={i + 'i'}>
                                    {column.canFilter
                                        ? column.render('Filter')
                                        : null}
                                </TableHeaderSearchBox>
                            )}
                        </TitlesWrapper>
                    ))}
                </TableHeaderRow>
            ))}
        </HeaderWrapper>
    )
}

export default CatalogHeaderWrapper
