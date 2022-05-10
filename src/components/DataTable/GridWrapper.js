import React, { useState, useEffect, useCallback } from 'react'
import { FixedSizeGrid } from 'react-window'

const GridWrapper = ({
    width: divWidth,
    height: divHeight,
    gridCellMinWidth,
    gridCellMaxWidth,
    rows: data,
    rowHeight,
    children,
    prepareRow,
}) => {
    const [gridCols, setGridCols] = useState(3)

    //calculates how many columns based on component width and props
    //gridCols
    useEffect(() => {
        let w = 0

        if (gridCellMaxWidth) w = divWidth / gridCellMaxWidth + 1
        else if (gridCellMinWidth) w = divWidth / gridCellMinWidth

        setGridCols(Math.max(Math.floor(w), 1))
    }, [divWidth, gridCellMinWidth, gridCellMaxWidth])

    const RenderCellWrapper = useCallback(
        ({ columnIndex, rowIndex, style, itemData }) => {
            const actualRowIndex = gridCols * rowIndex + (columnIndex + 1) - 1

            if (!data[actualRowIndex]) return null
            prepareRow(data[actualRowIndex])

            return (
                <>
                    {children({
                        style,
                        actualRowIndex,
                        data: data[actualRowIndex],
                        columnIndex,
                        rowIndex,
                    })}
                </>
            )
        },
        [data, gridCols]
    )

    return (
        <FixedSizeGrid
            style={{ margin: '0 auto' }}
            columnCount={gridCols}
            columnWidth={Math.floor(divWidth / gridCols)}
            rowCount={Math.ceil(data.length / gridCols)}
            rowHeight={rowHeight}
            height={Math.min(divHeight, Math.ceil(data.length / gridCols) * rowHeight)}
            width={divWidth}
        >
            {RenderCellWrapper}
        </FixedSizeGrid>
    )
}

export default GridWrapper
