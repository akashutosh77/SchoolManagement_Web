/**
 * MaterialReactTableField is a wrapper component for MaterialReactTable that provides
 * enhanced functionality and simplified configuration options.
 * It supports both direct table configuration and pre-configured table instances.
 */

import { MaterialReactTable } from "material-react-table"
import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import NoData from '../noData';

/**
 * @component MaterialReactTableField
 * @param {Object} props - Component props
 * @param {Object} props.table - Pre-configured table instance (optional)
 * @param {Array} props.data - Array of data to display in the table
 * @param {Array} props.columns - Array of column definitions
 * @param {boolean} props.enableGrouping - Enable/disable grouping
 * @param {boolean} props.enableTopToolbar - Show/hide top toolbar
 * @param {boolean} props.enableBottomToolbar - Show/hide bottom toolbar
 * @param {boolean} props.enableColumnFilters - Enable/disable column filters
 * @param {boolean} props.enablePagination - Enable/disable pagination
 * @param {boolean} props.enableSorting - Enable/disable sorting
 * @param {boolean} props.enableRowSelection - Enable/disable row selection
 * @param {boolean} props.enableColumnResizing - Enable/disable column resizing
 * @param {boolean} props.enableDensityToggle - Enable/disable density toggle
 * @param {boolean} props.enableFullScreenToggle - Enable/disable full screen toggle
 * @param {boolean} props.enableColumnActions - Enable/disable column actions
 * @param {boolean} props.enableGlobalFilter - Enable/disable global filter
 * @param {Object} props.muiTableContainerProps - Props for MUI Table Container
 * @param {Object} props.muiTablePaperProps - Props for MUI Table Paper
 * @param {Function} props.renderEmptyState - Custom empty state renderer
 * @param {boolean} props.isLoading - Loading state flag
 * @param {Function} props.onRowSelectionChange - Callback for row selection changes
 * @param {Function} props.onPaginationChange - Callback for pagination changes
 * @param {Function} props.onSortingChange - Callback for sorting changes
 * @param {Object} props.initialState - Initial state configuration
 * @param {number} props.pageSize - Default page size
 */
const MaterialReactTableField = ({ 
  table,
  data = [],
  columns = [],
  enableGrouping = true,
  enableTopToolbar = true,
  enableBottomToolbar = true,
  enableColumnFilters = true,
  enablePagination = true,
  enableSorting = true,
  enableRowSelection = false,
  enableColumnResizing = true,
  enableDensityToggle = true,
  enableFullScreenToggle = true,
  enableColumnActions = true,
  enableGlobalFilter = true,
  muiTableContainerProps,
  muiTablePaperProps,
  renderEmptyState,
  isLoading = false,
  onRowSelectionChange,
  onPaginationChange,
  onSortingChange,
  initialState = {},
  pageSize = 10,
  ...rest 
}) => {
  // State management for table features
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [sorting, setSorting] = useState([]);

  /**
   * Handles row selection changes and calls the provided callback
   * @param {Object} newSelection - New row selection state
   */
  const handleRowSelectionChange = useCallback((newSelection) => {
    setRowSelection(newSelection);
    onRowSelectionChange?.(newSelection);
  }, [onRowSelectionChange]);

  /**
   * Handles pagination changes and calls the provided callback
   * @param {Object} newPagination - New pagination state
   */
  const handlePaginationChange = useCallback((newPagination) => {
    setPagination(newPagination);
    onPaginationChange?.(newPagination);
  }, [onPaginationChange]);

  /**
   * Handles sorting changes and calls the provided callback
   * @param {Array} newSorting - New sorting configuration
   */
  const handleSortingChange = useCallback((newSorting) => {
    setSorting(newSorting);
    onSortingChange?.(newSorting);
  }, [onSortingChange]);

  /**
   * Default empty state component that shows loading spinner or no data message
   */
  const DefaultEmptyState = () => (
    isLoading ? (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
        }}
      >
        <CircularProgress />
      </Box>
    ) : (
      <NoData />
    )
  );

  /**
   * Memoized table configuration that combines all props and state
   * This prevents unnecessary re-renders when props don't change
   */
  const tableProps = useMemo(() => ({
    // Data and column configuration
    columns,
    data,
    
    // Feature flags
    enableGrouping,
    enableTopToolbar,
    enableBottomToolbar,
    enableColumnFilters,
    enablePagination,
    enableSorting,
    enableRowSelection,
    enableColumnResizing,
    enableDensityToggle,
    enableFullScreenToggle,
    enableColumnActions,
    enableGlobalFilter,
    
    // Styling props with defaults
    muiTableContainerProps: {
      sx: { maxHeight: '500px' },
      ...muiTableContainerProps,
    },
    muiTablePaperProps: {
      sx: { boxShadow: 2 },
      ...muiTablePaperProps,
    },
    
    // Custom components
    renderEmptyState: renderEmptyState || DefaultEmptyState,
    
    // State management
    state: {
      isLoading,
      pagination,
      sorting,
      ...(enableRowSelection && { rowSelection }),
    },
    
    // Event handlers
    onRowSelectionChange: handleRowSelectionChange,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    
    // Initial configuration
    initialState: {
      pagination: {
        pageSize,
        pageIndex: 0,
      },
      ...initialState,
    },
    ...rest,
  }), [
    // Dependencies array for memoization
    columns,
    data,
    enableGrouping,
    enableTopToolbar,
    enableBottomToolbar,
    enableColumnFilters,
    enablePagination,
    enableSorting,
    enableRowSelection,
    enableColumnResizing,
    enableDensityToggle,
    enableFullScreenToggle,
    enableColumnActions,
    enableGlobalFilter,
    muiTableContainerProps,
    muiTablePaperProps,
    renderEmptyState,
    isLoading,
    pagination,
    sorting,
    rowSelection,
    handleRowSelectionChange,
    handlePaginationChange,
    handleSortingChange,
    initialState,
    pageSize,
    rest,
  ]);

  // If a pre-configured table instance is provided, use it directly
  if (table) {
    return <MaterialReactTable table={table} {...rest} />;
  }

  // Otherwise, use the configured props
  return <MaterialReactTable {...tableProps} />;
};

// PropTypes for documentation and runtime type checking
MaterialReactTableField.propTypes = {
  table: PropTypes.object,
  data: PropTypes.array,
  columns: PropTypes.array,
  enableGrouping: PropTypes.bool,
  enableTopToolbar: PropTypes.bool,
  enableBottomToolbar: PropTypes.bool,
  enableColumnFilters: PropTypes.bool,
  enablePagination: PropTypes.bool,
  enableSorting: PropTypes.bool,
  enableRowSelection: PropTypes.bool,
  enableColumnResizing: PropTypes.bool,
  enableDensityToggle: PropTypes.bool,
  enableFullScreenToggle: PropTypes.bool,
  enableColumnActions: PropTypes.bool,
  enableGlobalFilter: PropTypes.bool,
  muiTableContainerProps: PropTypes.object,
  muiTablePaperProps: PropTypes.object,
  renderEmptyState: PropTypes.func,
  isLoading: PropTypes.bool,
  onRowSelectionChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSortingChange: PropTypes.func,
  initialState: PropTypes.object,
  pageSize: PropTypes.number,
};

export default MaterialReactTableField;
