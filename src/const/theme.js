import { extendTheme } from '@chakra-ui/react'

export const defaultValues = {
    // in rem
    fontSize: {
        mini: '0.6',
        small: '0.8',
        medium: '1',
        large: '1.1',
        xl: '1.5',
    },
    fontWeight: {
        regular: 400,
        bold: 700,
    },
    // color variations
    colorSet1: {
        primary: '#232F3E',
        secondary: '#f0c14b',
        text: '#000000',
        error: 'red',
        serverText: '#808080',
    },

    colorSet2: {
        primary: '#0f4c81',
        secondary: '#93bde2',
        error: '#e77600',
    },

    backgroundColor: '#ffffff',
    lightBlueBackgroundColor: '#37475a',
    lightBackgroundColor: '#eee',
    darkBackgroundColor: ' #8a8a8a',
    errorBackgroundColor: '#fff5f5',
    glassBackgroundColor: 'rgba(0, 0, 0, 0.4)',
    transparentLightBackgroundColor: 'rgba(255, 255, 255, 0.75)',

    shadow: [
        'rgba(255, 255, 255, 0.5)',
        'rgba(228, 121, 17, 0.5)',
        'rgba(57, 73, 76, 0.35)',
    ],

    // in rem
    borderRadius: {
        small: '0.15',
        normal: '0.5',
        big: '1',
        large: '3',
    },

    // in px
    borderWidth: {
        veryThin: '0.5',
        thin: '1',
        medium: '2',
        thick: '4',
    },

    // transition
    timeTransition: {
        slow: '0.2s',
        medium: '0.5s',
        fast: '0.8s',
    },
}

export const theme = {
    // basic setup
    breakpoints: {
        mobileSmall: '300px',
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
        desktopPlus: '1280px',
    },
    fonts: ['Amazon Ember', 'Arial', 'sans-serif', 'Noto Sans HK'],

    // per component setup
    dataTable: {
        headerColor: defaultValues.colorSet1.text,
        background: defaultValues.backgroundColor,
        searchBackground: defaultValues.glassBackgroundColor,
        shadowColor: defaultValues.lightBackgroundColor,
        evenRow: defaultValues.colorSet2.secondary,
        oddRow: defaultValues.lightBackgroundColor,
        toggleEnabledColor: defaultValues.colorSet2.primary,
        toggleDisabledColor: defaultValues.lightBackgroundColor,
        loaderPrimaryColor: defaultValues.darkBackgroundColor,
        loaderSecondaryColor: defaultValues.colorSet2.primary,
        fontSize: defaultValues.fontSize.small,
        fontWeight: defaultValues.fontWeight.bold,
        fontSizeIcon: defaultValues.fontSize.medium,
        borderWidth: defaultValues.borderWidth.thin,
        borderRadius: defaultValues.borderRadius.small,
        borderColor: defaultValues.lightBackgroundColor,
        shadowFocus: defaultValues.shadow[1],
        hoverColor: defaultValues.colorSet1.primary,
        borderColorFocus: defaultValues.colorSet2.error,
    },
}

export const up = (breakpointName) => {
    const breakpoint = theme.breakpoints[breakpointName]

    return `@media (min-width: ${breakpoint})`
}

export const down = (breakpointName) => {
    const breakpoint = theme.breakpoints[breakpointName]

    return `@media (max-width: ${breakpoint})`
}

export const theme1 = extendTheme(
    Object.assign({}, theme, {
        breakpoints: {
            mobile: '480px',
            tablet: '768px',
            desktop: '1280px',
            desktopPlus: '1280px',
        },
        styles: {
            global: {
                'html, body': {
                    fontFamily:
                        "'roboto', 'Noto Sans TC', 'Noto Sans SC', sans-serif",
                },
                a: {
                    color: 'blue.800',
                },
            },
        },
        components: {
            Button: {
                defaultProps: {
                    colorScheme: 'yellow',
                },
            },
            DataTable: {
                bgColor: '#fff',
                fontSize: 1,
                borderWidth: 1,
                widgetSize: 'md',
                Actions: {
                    bgColor: '#fff',
                    TotalRecords: {
                        fontSize: 0.8,
                        padding: 0.5,
                    },
                    ToggleButtons: {
                        colorScheme: 'gray',
                        size: 'sm',
                    },
                },
                Header: {
                    fontSize: 0.8,
                    fontWeight: 700,
                    widgetSize: 'sm',
                    bgColor: '#fff',
                    borderBottomWidth: '1px',
                    borderColor: '#8a8a8a',
                    Search: {
                        bgColor: '#fff',
                        variant: 'unstyled',
                    },
                },
                Body: {
                    Row: {
                        fontSize: 0.8,
                        borderWidth: '1px',
                        borderColor: '#e1e4e8',
                        bgColor: '#fff',
                    },
                    Cell: {
                        fontSize: 1.2,
                    },
                },
            },
        },
    })
)
