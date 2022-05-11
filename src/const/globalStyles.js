import React from 'react'
import { Global, css } from '@emotion/react'

const GlobalStyles = () => (
    <Global
        styles={css`
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }

            html {
                font-family: 'Amazon Ember', Arial, sans-serif;
                font-size: 15px;
                scrollbar-width: thin;
            }

            a {
                text-decoration: none;
            }

            a:hover {
                color: #f3d078;
            }

            body::-webkit-scrollbar {
                width: 0.3rem;
                height: auto;
                background-color: #232f3e;
            }

            body::-webkit-scrollbar-track {
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                background-color: #232f3e;
                border-radius: 0.6rem;
            }

            body::-webkit-scrollbar-thumb {
                border-radius: 0.6rem;
                background-color: #232f3e;
            }

            footer {
                text-align: center;
            }
        `}
    />
)

export default GlobalStyles
