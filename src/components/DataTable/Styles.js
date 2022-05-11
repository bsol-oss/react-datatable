import React from 'react'
import styled from '@emotion/styled'
import { css, withTheme } from '@emotion/react'
import ContentLoader from 'react-content-loader'

import { down } from '../../const/theme'

export const MainWrapper = styled.div`
    background: ${({ theme }) =>
        theme.components?.DataTable?.bgColor || '#fff'};
    color: ${({ theme }) => theme.components?.DataTable?.color || '#000'};

    display: grid;
    grid-template-areas:
        'action'
        'header'
        'body'
        'error';

    grid-template-rows: auto;
    ${({ view }) => (view === 'ROWCONDENSED' ? 'overflow-x: auto' : '')}
`

/////loader

const LoaderDiv = withTheme(({ theme: { dataTable } }) => (
    <ContentLoader
        height={160}
        width={'100%'}
        speed={3}
        primaryColor={dataTable.loaderPrimaryColor}
        secondaryColor={dataTable.loaderSecondaryColor}
    >
        {' '}
        <circle cx="10" cy="20" r="8" />
        <rect x="25" y="15" rx="5" ry="5" width="100%" height="10" />
        <circle cx="10" cy="50" r="8" />
        <rect x="25" y="45" rx="5" ry="5" width="100%" height="10" />
        <circle cx="10" cy="80" r="8" />
        <rect x="25" y="75" rx="5" ry="5" width="100%" height="10" />
        <circle cx="10" cy="110" r="8" />
        <rect x="25" y="105" rx="5" ry="5" width="100%" height="10" />
    </ContentLoader>
))

export const Loader = styled(LoaderDiv)`
    grid-area: body;
`

///
//**** */ header.js
//////Table Header
//*** */

export const HeaderWrapper = styled.div`
    grid-area: header;
`

export const TableHeaderRow = styled.div`
    display: flex;
    justify-content: flex-start;

    background: ${({ theme }) =>
        theme.components?.DataTable?.Header?.bgColor || '#eee'};
    border-bottom: ${({ theme }) =>
            theme.components?.DataTable?.Header?.borderBottomWidth || '0px'}
        solid
        ${({ theme }) =>
            theme.components?.DataTable?.Header?.borderColor || '#aaa'};
    flex-wrap: ${({ view }) => (view === 'ROWCONDENSED' ? 'nowrap' : 'wrap')};

    ${down('tablet')} {
        justify-content: flex-start;
    }
`
export const TableHeaderTitle = styled.div`
    text-align: center;
    display: grid;
    grid-template-columns: auto ${({ theme }) =>
        theme.components?.DataTable?.Header?.fontSize ||
        theme.components?.DataTable?.fontSize ||
        1}rem 5px;

    align-items: center;
    width: 100%;

    font-size: ${({ theme }) =>
        theme.components?.DataTable?.Header?.fontSize ||
        theme.components?.DataTable?.fontSize ||
        1}rem;
    font-weight: ${({ theme }) =>
        theme.components?.DataTable?.Header?.fontWeight ||
        theme.components?.DataTable?.fontWeight ||
        400};
    }
`

export const TitlesWrapper = styled.div`
    padding: 0 2px;
    display: flex;
    flex-direction: column;
`

export const TableHeaderFilter = styled.div`
    width: 100%;
    text-align: center;
`

//////**** body.js
///    * /

export const Row = styled.div`
    font-size: ${({ theme }) =>
        theme.components?.DataTable?.Body?.fontSize ||
        theme.components?.DataTable?.fontSize ||
        1}rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    border: ${({ theme }) =>
            theme.components?.DataTable?.Body?.Row?.borderWidth || '0px'}
        solid
        ${({ theme }) =>
            theme.components?.DataTable?.Body?.Row?.borderColor || '#ccc'};
    background-color: ${({ theme }) =>
        theme.components?.DataTable?.Body?.Row?.bgColor ||
        theme.components?.DataTable?.bgColor ||
        null};

    &:hover {
        border-left: ${({ theme }) =>
                theme.components?.DataTable?.Body?.Row?.hoverBorderWidth ||
                '3px'}
            solid
            ${({ theme }) =>
                theme.components?.DataTable?.Body?.Row?.hoverBorderColor ||
                '#777'};
    }
    flex-wrap: ${({ isCondensed }) => (isCondensed ? `nowrap` : `wrap`)};
    padding: 8px 0;
`

export const AutoSizeWrapper = styled.div`
    grid-area: body;
`

export const ViewContainer = styled.div`
    & > div {
        overflow: hidden auto !important;
        ${({ isMainWrap, isHeader }) =>
            isMainWrap &&
            css`
                height: calc(
                    100vh - ${!isHeader ? '140px' : '207px'}
                ) !important;
            `}
`

export const Cell = styled.div`
    box-sizing: border-box;

    padding: ${({ theme: { dataTable, components } }) =>
        components?.DataTable?.Body?.Cell?.padding
            ? components.DataTable.Body.Cell.padding
            : dataTable.fontSize * 1.2}rem;

    border: ${({ theme: { dataTable } }) => dataTable.borderWidth}px solid
        ${({ theme: { dataTable } }) => dataTable.borderColor};

    background-color: ${({ theme: { dataTable, components } }) =>
        components?.DataTable?.bgColor
            ? components.DataTable.bgColor
            : dataTable.background};

    &:hover {
        border-left: ${({ theme: { dataTable } }) => dataTable.borderWidth}px
            solid ${({ theme: { dataTable } }) => dataTable.hoverColor};
    }
`
