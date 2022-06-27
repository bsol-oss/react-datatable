# react-datatable

A library for react data table.

## Install

Run

    yarn add @bsol-oss/react-datatable

N.B.:

-   Make sure to add all the peer-dependency packages.
-   Fork the package for your changes.
-   Update the `react-datatable` package to the latest version.

## DataTable's Props

| Property                   | Type     | Required | Default value | Note                               |
| :------------------------- | :------- | :------- | :------------ | :--------------------------------- |
| `data`                     |          | required |               | Table data                         |
| `loading`                  | boolean  | required |               | Data loading state                 |
| `totalCount`               | number   | required |               | Row count                          |
| `columns`                  | array    | required |               | Table column details               |
| `wrapper`                  | object   | optional | {}            | Wrapper components                 |
| `height`                   | number   | required | 500           | Table height                       |
| `headerStyle`              | object   | optional | {}            | Header style properties            |
| `headerClass`              | string   | optional | ''            | Header class name                  |
| `sortIconSize`             | string   | required |               | Header sort icon size              |
| `view`                     | string   | optional | 'ROW'         | Table view option                  |
| `showToggleButtons`        | boolean  | optional | true          |                                    |
| `showTotalRecords`         | boolean  | optional | true          |                                    |
| `showGlobalSearch`         | boolean  | optional | true          |                                    |
| `showTableHeader`          | boolean  | optional | true          |                                    |
| `cellMinWidth`             | number   | required | null          |                                    |
| `cellMaxWidth`             | number   | optional | 250           |                                    |
| `cellHeight`               | number   | optional | null          |                                    |
| `selectable`               | boolean  | optional | false         | If row can be select               |
| `onSelect`                 | function | optional | () => {}      | On row select event                |
| `recordTotalComponent`     |          | optional | null          |                                    |
| `globalSearchBarComponent` |          | optional | null          |                                    |
| `arrowIcons`               | object   | optional |               |                                    |
| `isHeader`                 | boolean  | optional | false         |                                    |
| `isColumnResizable`        | boolean  | optional | false         |                                    |
| `enabledView`              | array    | optional |               | can be 'ROW','ROWCONDENSED','GRID' |


## DataTableServer's Props

| Property                   | Type     | Required | Default value | Note                               |
| :------------------------- | :------- | :------- | :------------ | :--------------------------------- |
| `apiUrl`                   | string   | required |               |                                    |
| `authorizationKey`         | string   | optional |               | if API required for calling        |
| `loading`                  | boolean  | required |               | Data loading state                 |
| `columns`                  | array    | required |               | Table column details               |
| `wrapper`                  | object   | optional | {}            | Wrapper components                 |
| `height`                   | number   | required | 500           | Table height                       |
| `headerStyle`              | object   | optional | {}            | Header style properties            |
| `headerClass`              | string   | optional | ''            | Header class name                  |
| `sortIconSize`             | string   | required |               | Header sort icon size              |
| `view`                     | string   | optional | 'ROW'         | Table view option                  |
| `showToggleButtons`        | boolean  | optional | true          |                                    |
| `showTotalRecords`         | boolean  | optional | true          |                                    |
| `showGlobalSearch`         | boolean  | optional | true          |                                    |
| `showTableHeader`          | boolean  | optional | true          |                                    |
| `cellMinWidth`             | number   | required | null          |                                    |
| `cellMaxWidth`             | number   | optional | 250           |                                    |
| `cellHeight`               | number   | optional | null          |                                    |
| `selectable`               | boolean  | optional | false         | If row can be select               |
| `onSelect`                 | function | optional | () => {}      | On row select event                |
| `recordTotalComponent`     |          | optional | null          |                                    |
| `globalSearchBarComponent` |          | optional | null          |                                    |
| `arrowIcons`               | object   | optional |               |                                    |
| `isHeader`                 | boolean  | optional | false         |                                    |
| `isColumnResizable`        | boolean  | optional | false         |                                    |
| `enabledView`              | array    | optional |               | can be 'ROW','ROWCONDENSED','GRID' |

## Used Theme

```
    dataTable: {
        headerColor: color code,
        background: color code,
        searchBackground: color code,
        shadowColor: color code,
        evenRow: color code,
        oddRow: color code,
        toggleEnabledColor: color code,
        toggleDisabledColor: color code,
        loaderPrimaryColor: color code,
        loaderSecondaryColor: color code,
        fontSize: in rem,
        fontWeight: in number,
        fontSizeIcon: in rem,
        borderWidth: in px,
        borderRadius: in rem,
        borderColor: color code,
        shadowFocus: color code,
        borderColorFocus: color code,
    }
```



## How to use

```
import { DataTable } from @bsol-oss/react-datatable

<DataTable
    loading={false}
    totalCount={100}
    columns={sampleColumns}
    data={sampleData}
    showToggleButtons={true}
    showTotalRecords={true}
    showGlobalSearch={true}
    showTableHeader={true}
    headerStyle={{ fontSize: '10px' }}
    headerClass={{'custom-header-item-class'}}
    sortIconSize={'14'}
/>


<DataTableServer
    apiUrl="URL where you want to work"
    columns={serverColumns}
    authorizationKey="authorizationKey if required for calling API"
    isColumnResizable={true}
/>
```

## Example

Check the hosted storybook components at https://bsol-oss.github.io/react-datatable

Or,

Run `yarn storybook` to see the storybook components locally.

Or,

Check at **CodeSandbox**: https://codesandbox.io/s/bsol-oss-react-datatable-example-fh9prl
