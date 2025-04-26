// src/components/DataTable/DataTable.jsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const DataTable = ({
  title,
  subtitle,
  columns,
  data,
  loading = false,
  pagination = true,
  sorting = true,
  filtering = true,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  onRowClick,
  onRefresh,
  actions
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  // Filtrowanie danych na podstawie wyszukiwania
  const filteredData = data.filter((row) => {
    if (!searchTerm) return true;
    
    return columns.some(column => {
      const value = row[column.id];
      if (value == null) return false;
      
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Sortowanie i paginacja
  const sortedData = sorting
    ? stableSort(filteredData, getComparator(order, orderBy))
    : filteredData;

  const paginatedData = pagination
    ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : sortedData;

  const emptyRows = pagination
    ? Math.max(0, rowsPerPage - paginatedData.length)
    : 0;

  const renderCellContent = (column, value) => {
    if (column.render) {
      return column.render(value);
    }

    if (column.type === 'status') {
      let color = 'default';
      if (value === 'active' || value === 'completed' || value === 'success') color = 'success';
      if (value === 'pending' || value === 'in_progress') color = 'warning';
      if (value === 'inactive' || value === 'failed' || value === 'error') color = 'error';
      
      return (
        <Chip 
          label={value} 
          size="small" 
          color={color}
          sx={{ textTransform: 'capitalize' }}
        />
      );
    }

    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }

    if (column.type === 'datetime' && value) {
      return new Date(value).toLocaleString();
    }

    if (value === null || value === undefined) {
      return '-';
    }

    return value;
  };

  return (
    <Card>
      {title && (
        <>
          <CardHeader
            title={title}
            subheader={subtitle}
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
            action={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {actions}
                {onRefresh && (
                  <Tooltip title="Odśwież">
                    <IconButton onClick={handleRefresh} disabled={loading}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            }
          />
          <Divider />
        </>
      )}
      <CardContent sx={{ p: 0 }}>
        {filtering && (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Szukaj..."
              value={searchTerm}
              onChange={handleSearch}
              sx={{ minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ ml: 'auto' }}>
              <Tooltip title="Filtry">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}

        <TableContainer component={Paper} elevation={0}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    padding={column.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === column.id ? order : false}
                    sx={{ 
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      width: column.width || 'auto'
                    }}
                  >
                    {sorting && column.sortable !== false ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Ładowanie danych...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1">
                      Brak danych do wyświetlenia
                    </Typography>
                    {searchTerm && (
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Spróbuj zmienić kryteria wyszukiwania
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {paginatedData.map((row, index) => (
                    <TableRow
                      hover
                      key={row.id || index}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      sx={{ 
                        cursor: onRowClick ? 'pointer' : 'default',
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      {columns.map((column) => (
                        <TableCell 
                          key={`${row.id || index}-${column.id}`}
                          align={column.align || 'left'}
                        >
                          {renderCellContent(column, row[column.id])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={columns.length} />
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {pagination && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Wierszy na stronie:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
