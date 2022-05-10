import React from 'react'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'

import { MdViewModule, MdFormatAlignJustify, MdWrapText, MdSearch } from 'react-icons/md'
import { ButtonGroup, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

const Action = ({
    showGlobalSearch,
    showToggleButtons,
    showTotalRecords,
    enabledView,
    view,
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    setView,
    totalCount,
    selectedCount,
    recordTotalComponent,
    globalSearchBarComponent,
    searchedCount,
}) => {
    const theme = useTheme()
    const toggleButtonTShirtSize =
        theme.components?.DataTable?.Actions?.ToggleButtons?.size ||
        theme.components?.DataTable?.widgetSize ||
        'sm'
    const toggleButtonSize = {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
    }[toggleButtonTShirtSize]

    const GlobalSearchBarComponent = globalSearchBarComponent || null
    const RecordTotalComponent = recordTotalComponent || null

    return (
        <ActionWrapper className="action-wrapper">
            {showGlobalSearch &&
                (GlobalSearchBarComponent ? (
                    <GlobalSearchBarComponent
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                ) : (
                    <DefaultGlobalSearchBar
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                ))}
            
            {showToggleButtons && (
                <ButtonGroup
                    gridArea="toggleButtons"
                    data-testid="sort-icon-container"
                    size={theme.components?.DataTable?.ToggleButtons?.size || 'sm'}
                    colorScheme={theme.components?.DataTable?.ToggleButtons?.colorScheme || 'gray'}
                    justifyContent="flex-end"
                >
                    {enabledView.includes('GRID') && (
                        <IconButton
                            aria-label="Display as Grid"
                            variant={view === 'GRID' ? 'solid' : 'ghost'}
                            icon={
                                <MdViewModule
                                    onClick={() => setView('GRID')}
                                    size={toggleButtonSize}
                                />
                            }
                            size={toggleButtonTShirtSize}
                        />
                    )}
                    {enabledView.includes('ROW') && (
                        <IconButton
                            aria-label="Display as Row"
                            variant={view === 'ROW' ? 'solid' : 'ghost'}
                            icon={
                                <MdWrapText
                                    onClick={() => setView('ROW')}
                                    size={toggleButtonSize}
                                />
                            }
                            size={toggleButtonTShirtSize}
                        />
                    )}
                    {enabledView.includes('ROWCONDENSED') && (
                        <IconButton
                            aria-label="Display as Condensed Row"
                            variant={view === 'ROWCONDENSED' ? 'solid' : 'ghost'}
                            icon={
                                <MdFormatAlignJustify
                                    onClick={() => setView('ROWCONDENSED')}
                                    size={toggleButtonSize}
                                />
                            }
                            size={toggleButtonTShirtSize}
                        />
                    )}
                </ButtonGroup>
            )}
            {showTotalRecords &&
                (RecordTotalComponent ? (
                    <RecordTotalComponent
                        total={totalCount}
                        filtered={searchedCount}
                        selected={selectedCount || null}
                    />
                ) : (
                    <RecordTotal
                        total={totalCount}
                        filtered={searchedCount}
                        selected={selectedCount || null}
                    />
                ))}
        </ActionWrapper>
    )
}

export const ActionWrapper = styled.div`
    grid-area: action;
    display: grid;
    grid-template-areas: 'globalSearch toggleButtons recordTotal';
    grid-template-columns: auto 1fr auto;
    grid-gap: 0.25rem;
    justify-content: ${({ theme }) =>
        theme.components?.DataTable?.Actions?.justify || 'space-between'};
    align-items: stretch;
    background-color: ${({ theme }) => theme.components?.DataTable?.Actions?.bgColor || '#fff'};
`

const DefaultGlobalSearchBar = ({ globalFilter, setGlobalFilter }) => {
    const preset = {
        xs: 6,
        sm: 8,
        md: 10,
        lg: 12,
    }

    const theme = useTheme()
    const bgColor = theme.components?.DataTable?.Actions?.GlobalSearch?.bgColor || '#fff'
    const iconColor = theme.components?.DataTable?.Actions?.GlobalSearch?.iconColor || '#ccc'
    const size =
        theme.components?.DataTable?.Actions?.GlobalSearch?.size ||
        theme.components?.DataTable?.widgetSize ||
        'sm'
    const h = preset[size || 'sm']

    return (
        <InputGroup data-testid="global-search-container">
            <Input
                size={size}
                bgColor={bgColor}
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <InputRightElement
                width={h}
                height={h}
                children={<MdSearch size={h * 3} color={iconColor} />}
            />
        </InputGroup>
    )
}

const RecordTotal = ({ total = null, filtered = null, selected = null }) => {
    const { t } = useTranslation()
    return (
        <TotalRecordWrapper>
            {total && (
                <TotalRecordsSpan>
                    {t('Total Items')}: {total}
                </TotalRecordsSpan>
            )}
            {filtered !== null && (
                <TotalRecordsSpan>
                    {t('Filtered Items')}: {filtered}
                </TotalRecordsSpan>
            )}
            {selected && (
                <TotalRecordsSpan>
                    {t('Selected Items')}: {selected}
                </TotalRecordsSpan>
            )}
        </TotalRecordWrapper>
    )
}

const TotalRecordWrapper = styled.div`
    grid-area: recordTotal;
    justify-self: center;
    align-self: center;
    display: flex;
    flex-flow: row wrap;
`

const TotalRecordsSpan = styled.span`
    font-size: ${({ theme }) =>
        theme.components?.DataTable?.Actions?.TotalRecords?.fontSize ||
        theme.components?.DataTable?.fontSize ||
        1}rem;
    padding: 0
        ${({ theme }) =>
            theme.components?.DataTable?.Actions?.TotalRecords?.padding ||
            theme.components?.DataTable?.Actions?.TotalRecords?.fontSize ||
            theme.components?.DataTable?.fontSize ||
            0.75}rem;
    white-space: nowrap;
`

export default Action
