import DataTable from './components/DataTable'
import DataTableServer from './components/DataTableSever'
import { Search, Range, Slider, Dropdown } from './components/DataTable/Filters'

// export DataTable component
import ServerDataTable from './components/DataTableServer2/components/DataTable'

//export FunctionalComponents
import ServerHeader from './components/DataTableServer2/components/Header' // Header
import ServerGlobalSearch from './components/DataTableServer2/components/functionalcomponents/GlobalSearch' // Global Searchbar component
import ServerTableTitle from './components/DataTableServer2/components/functionalcomponents/TableTitle' // TitleComponent

//export BodyComponents
import ServerTable from './components/DataTableServer2/components/Table' // Table component
import ServerTableHeader from './components/DataTableServer2/components/bodycomponents/TableHeader' // TableHeader Component
import ServerTableBody from './components/DataTableServer2/components/bodycomponents/TableBody' // TableBody Component

import ServerColumnSearch from './components/DataTableServer2/components/bodycomponents/ColumnSearch' // Field Searchbar component
import ServerDropdownFilter from './components/DataTableServer2/components/bodycomponents/DropdownFilter' // Dropdown filter component

//export Footer components
import ServerFooter from './components/DataTableServer2/components/Footer' // Footer component
import ServerPagination from './components/DataTableServer2/components/footercomponents/Pagination' // Pagination Component
import ServerPageSizeControl from './components/DataTableServer2/components/footercomponents/PageSizeControl' // PageSizeControl Component
import ServerSelectedNumber from './components/DataTableServer2/components/footercomponents/SelectedNumber' // SelectedNumber Component

// export DataTableServer component
import DataTableServer2 from './components/DataTableServer2/DataTableServer'

export {
    DataTable,
    DataTableServer,
    Range,
    Search,
    Slider,
    Dropdown,
    ServerDataTable,
    DataTableServer2,
    ServerHeader,
    ServerGlobalSearch,
    ServerTableTitle,
    ServerTable,
    ServerTableHeader,
    ServerTableBody,
    ServerColumnSearch,
    ServerDropdownFilter,
    ServerFooter,
    ServerPagination,
    ServerPageSizeControl,
    ServerSelectedNumber
}
