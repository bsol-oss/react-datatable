import React, { useMemo } from 'react'
import { FixedSizeList } from 'react-window'
import { useTheme } from '@chakra-ui/react'

import {
    ViewContainer,
    Row as DefaultRow,
    Cell as DefaultCell,
} from '../Styles'
import GridWrapper from '../GridWrapper'

const browserFontSize =
    typeof document === 'object'
        ? parseFloat(getComputedStyle(document.body).fontSize) || 16
        : 16

const Body = ({
    width,
    height,
    view,
    columns,
    rows,
    prepareRow,
    Row: SuppliedRow,
    Cell: SuppliedCell,
    setError,
    isMainWrap,
    isHeader,
    cellMaxWidth,
    cellMinWidth,
    cellHeight,
}) => {
    const Row = SuppliedRow || DefaultRow
    const Cell = SuppliedCell || DefaultCell

    const theme = useTheme()

    const RenderCell = ({
        actualRowIndex,
        data,
        columnIndex,
        rowIndex,
        style,
    }) => {
        const reactTableProp = data.getRowProps()
        // console.log(data)
        return (
            <Cell
                key={reactTableProp['key']}
                style={style}
                index={actualRowIndex}
                columnIndex={columnIndex}
                row={rowIndex}
                data={data.values}
            >
                {data.cells.map(({ column, render }, i) =>
                    render('CellForGrid')
                )}
            </Cell>
        )
    }

    const RenderRow = ({ index, style }) => {
        const row = rows[index]
        prepareRow(row)
        // console.log(row)
        return (
            <Row
                index={index}
                key={index}
                style={style}
                isCondensed={view === 'ROWCONDENSED'}
                data={row.values}
            >
                {row.cells.map(({ render, getCellProps }) => (
                    <div {...getCellProps()}>{render('Cell')}</div>
                ))}
            </Row>
        )
    }

    const rowHeight = useMemo(
        () => {
            const rowHeightMultiplier = 2
            const fontSize =
                (theme.components?.DataTable?.fontSize || 1) * browserFontSize

            switch (view) {
                case 'ROW':
                    let rows = 1
                    let cumulatedHeight = 0
                    let remainingRowWidth = width
                    let currentRowHeight = 0
                    for (const c of columns) {
                        currentRowHeight = Math.max(
                            currentRowHeight,
                            c.height || fontSize * rowHeightMultiplier
                        )

                        // react-table default width is 150px
                        if (remainingRowWidth > (c.width || 150)) {
                            remainingRowWidth -= c.width || 150
                        } else {
                            rows += 1
                            cumulatedHeight += currentRowHeight
                            // currentRowHeight = 0
                            remainingRowWidth = width
                        }
                        // console.log({rows, cumulatedHeight, currentRowHeight, remainingRowWidth})
                    }

                    cumulatedHeight += currentRowHeight
                    //4px for padding top
                    return cumulatedHeight + 16
                case 'ROWCONDENSED':
                    let h = 0
                    for (const c of columns) {
                        h = Math.max(
                            h,
                            c.height || fontSize * rowHeightMultiplier
                        )
                    }
                    return h
                case 'GRID':
                    return cellHeight
                default:
                    setError(`view error, current view is ${view}`)
                    return 0
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [view, width]
    )

    return (
        <ViewContainer
            view={view}
            isMainWrap={isMainWrap}
            isHeader={isHeader}
            className="body-wrapper"
        >
            {view == 'GRID' && (
                <GridWrapper
                    width={width}
                    height={height}
                    gridCellMinWidth={cellMinWidth || null}
                    gridCellMaxWidth={cellMaxWidth || 250}
                    rows={rows}
                    rowHeight={cellHeight || 300}
                    prepareRow={prepareRow}
                >
                    {RenderCell}
                </GridWrapper>
            )}
            {view == 'ROW' && (
                <FixedSizeList
                    height={height}
                    itemCount={rows.length}
                    itemSize={rowHeight}
                    width={width}
                >
                    {RenderRow}
                </FixedSizeList>
            )}
            {view == 'ROWCONDENSED' && (
                <FixedSizeList
                    height={height}
                    itemCount={rows.length}
                    itemSize={rowHeight}
                    width={width}
                >
                    {RenderRow}
                </FixedSizeList>
            )}
        </ViewContainer>
    )
}

export default Body
