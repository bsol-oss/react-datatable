import styled from '@emotion/styled'

export const CellForGridSKUStyle = styled.div`
    color: gray;
    font-size: 10px;
    text-align: left;
    padding: 4px;
    display: none;
`

export const CellForGridNameStyle = styled.div`
    font-weight: 700;
    color: #000;
    line-height: 28px;
`

export const CellForGridImgStyle = styled.div`
    text-align: center;
    padding: 5px;
    height: 150px;
    width: 150px;
    img {
        height: auto;
        width: 100%;
    }
`

export const CellForGridTextStyle = styled.div`
    color: #a0a0a0;
    line-height: 20px;
`

export const CellForInfoStyle = styled.div`
    display: none;
`

export const CellStyle = styled.div`
    font-size: 0.75rem;
    padding: 0 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const CellForPriceStyle = styled.div`
    display: flex;
    justify-content: flex-start;
    font-weight: 900;
    color: #000;
    font-family: 'Roboto Mono', monospace;
`

export const Cell = styled.div`
    cursor: pointer;
    background-color: white;
    padding: 1rem;

    .product-row {
        display: flex;
        .proInfo {
            padding-top: 40px;
            margin-left: 20px;
        }
    }
`
