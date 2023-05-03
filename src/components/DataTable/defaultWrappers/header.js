import React from 'react'
import { BiSortAlt2, BiSortUp, BiSortDown } from 'react-icons/bi'
import { Icon, Box, useTheme } from '@chakra-ui/react'

import {
    HeaderWrapper,
    TableHeaderRow,
    TableHeaderTitle,
    TableHeaderFilter,
    TitlesWrapper,
    HeaderWrapperServer
} from '../Styles'

const Arrow = ({ direction = null, icons = {} }) => {
    const AscIcon = (icons && icons.Asc) || BiSortUp
    const DescIcon = (icons && icons.Desc) || BiSortDown
    const UnsortedIcon = (icons && icons.Unsorted) || BiSortAlt2

    const theme = useTheme()

    const fontSize = `${
        theme.components &&
        theme.components.DataTable &&
        theme.components.DataTable.Header
            ? theme.components.DataTable.Header.fontSize
            : theme.components && theme.components.DataTable
            ? theme.components.DataTable.fontSize
            : 1
    }rem`

    if (direction === 'down')
        return (
            <Icon
                as={AscIcon}
                data-testid="arrow-down"
                size={fontSize}
                boxSize={fontSize}
            />
        )

    if (direction === 'up')
        return (
            <Icon
                as={DescIcon}
                data-testid="arrow-up"
                size={fontSize}
                boxSize={fontSize}
            />
        )

    return (
        <Icon
            as={UnsortedIcon}
            data-testid="no-arrow"
            size={fontSize}
            boxSize={fontSize}
        />
    )
}

export const Header = ({
    headerGroups,
    view,
    arrowIcons,
    isColumnResizable,
}) => {
    return (
        <HeaderWrapper className="header-wrapper">
            {headerGroups.map((headerGroup, i) => (
                <TableHeaderRow key={i} view={view}>
                    {headerGroup.headers.map((column, i) => (
                        <TitlesWrapper {...column.getHeaderProps()}>
                            <TableHeaderTitle
                                {...column.getSortByToggleProps()}
                            >
                                {column.render('Header')}
                                {column.id !== 'selection' &&
                                column.Header &&
                                column.Header.props &&
                                column.Header.props.children ? (
                                    <>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <Arrow
                                                    direction="down"
                                                    icons={arrowIcons}
                                                />
                                            ) : (
                                                <Arrow
                                                    direction="up"
                                                    icons={arrowIcons}
                                                />
                                            )
                                        ) : (
                                            <Arrow
                                                direction={null}
                                                icons={arrowIcons}
                                            />
                                        )}
                                    </>
                                ) : null}

                                {isColumnResizable && (
                                    <Box
                                        color="gray.200"
                                        {...column.getResizerProps()}
                                    >
                                        |
                                    </Box>
                                )}
                            </TableHeaderTitle>
                            {!column.disableFilters && (
                                <TableHeaderFilter key={i + 'i'}>
                                    {column.canFilter
                                        ? column.render('Filter')
                                        : null}
                                </TableHeaderFilter>
                            )}
                        </TitlesWrapper>
                    ))}
                </TableHeaderRow>
            ))}
        </HeaderWrapper>
    )
}

export const HeaderServer = ({
    headerGroups,
    view,
    arrowIcons,
    isColumnResizable,
}) => {
    return (
        <HeaderWrapperServer className="header-wrapper">
            {headerGroups.map((headerGroup, i) => (
                <TableHeaderRow key={i} view={view}>
                    {headerGroup.headers.map((column, i) => (
                        <TitlesWrapper {...column.getHeaderProps()}>
                            <TableHeaderTitle
                                {...column.getSortByToggleProps()}
                            >
                                {column.render('Header')}
                                {column.id !== 'selection' &&
                                column.Header &&
                                column.Header.props &&
                                column.Header.props.children ? (
                                    <>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <Arrow
                                                    direction="down"
                                                    icons={arrowIcons}
                                                />
                                            ) : (
                                                <Arrow
                                                    direction="up"
                                                    icons={arrowIcons}
                                                />
                                            )
                                        ) : (
                                            <Arrow
                                                direction={null}
                                                icons={arrowIcons}
                                            />
                                        )}
                                    </>
                                ) : null}

                                {isColumnResizable && (
                                    <Box
                                        color="gray.200"
                                        {...column.getResizerProps()}
                                    >
                                        |
                                    </Box>
                                )}
                            </TableHeaderTitle>
                            {!column.disableFilters && (
                                <TableHeaderFilter key={i + 'i'}>
                                    {column.canFilter
                                        ? column.render('Filter')
                                        : null}
                                </TableHeaderFilter>
                            )}
                        </TitlesWrapper>
                    ))}
                </TableHeaderRow>
            ))}
        </HeaderWrapperServer>
    )
}

export const defaultHeaderTextWrap = (columns) => {
    return columns.map((col, id) => {
        if (typeof col.Header === 'string') {
            return {
                ...col,
                Header: (
                    <Box
                        paddingRight={2}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        textAlign="left"
                    >
                        {col.Header}
                    </Box>
                ),
            }
        }

        return col
    })
}

export default Header
