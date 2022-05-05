/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { ForwardRefExoticComponent, forwardRef, ReactElement, useEffect } from 'react';
import { useTable, UseTableOptions, useRowSelect, usePagination } from 'react-table';
import Loading from '../Loading';
import './index.less';

interface TableProps<T extends object> {
    rowKey: string;
    columns?: UseTableOptions<T>['columns'];
    dataSource?: UseTableOptions<T>['data'];
    currentPage?: number;
    pageSize?: number;
    pageCount?: number;
    loading?: boolean;
    onPageChange?: (page: number) => void;
    rowSelection?: {
        rowKey: string;
        onSelectedChange?: (rows: { [key: string]: boolean }) => void;
    };
}

type TableComponent = <T extends object>(props: TableProps<T>) => ReactElement<any, any>;

interface IndeterminateCheckboxProps {
    [key: string]: any;
    indeterminate: any;
}

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox: ForwardRefExoticComponent<IndeterminateCheckboxProps> = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef<any>()
      const resolvedRef: any = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <div className="sandbox-checkbox">
          <input id="checkbox-widget" type="checkbox" ref={resolvedRef} {...rest} title="选择" />
          <label htmlFor="checkbox-widget" />
        </div>
      )
    }
  );

const Table: TableComponent = (props) => {
    const { rowKey, loading, columns = [], dataSource = [], currentPage, rowSelection, pageCount, pageSize = 3, onPageChange = (page: number) => page } = props;
    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        // @ts-ignore
        canPreviousPage,
        // @ts-ignore
        canNextPage,
        // @ts-ignore
        nextPage,
        // @ts-ignore
        previousPage,
        // @ts-ignore
        gotoPage,
        state: {
            // @ts-ignore
            pageIndex,
            // @ts-ignore
            selectedRowIds
        },
        // state,
        // useControlledState,
    } = useTable(
        {
            columns,
            data: dataSource,
            // @ts-ignore
            initialState: { pageIndex: 0, pageSize },
            manualPagination: true,
            autoResetSelectedRows: false,
            pageCount,
            getRowId: (originRow: any) => originRow[rowKey],
        },
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                if (!rowSelection) {
                    return columns;
                }

                return [
                    {
                        id: 'selection',
                        Header: () => (
                            <span>
                                选择
                            </span>
                        ),
                        Cell: ({ row }: any) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]
            });
        },
    );

    useEffect(() => {
        gotoPage((currentPage ?? 1) - 1);
    }, [currentPage]);

    useEffect(() => {
        rowSelection?.onSelectedChange && rowSelection.onSelectedChange(selectedRowIds);
    }, [selectedRowIds])

    console.log(selectedRowIds, 'selectedRowIds ==>');

    return (
        <Loading loading={loading}>
            <table {...getTableProps()} className="sandbox-table">
                <thead className="header">
                    {headerGroups.map(headerGroup => {
                        const { key, ...headerProps } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr {...headerProps} key={key}>
                                {headerGroup.headers.map((col) => {
                                    const { key: colKey, ...colHeaderProps } = col.getHeaderProps();

                                    return (
                                        <th {...colHeaderProps} key={colKey}>
                                            <div className="table-header">
                                                {col.render('Header')}
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row);
                            const { key, ...rowProps } = row.getRowProps();
                            return (
                                <tr {...rowProps} key={key}>
                                    {row.cells.map((cell) => {
                                        const { key: cellKey, ...cellProps } = cell.getCellProps();
                                        return (
                                            <td key={cellKey} {...cellProps}>
                                                <div className="table-cell">
                                                    {cell.render('Cell')}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <div className="sandbox-table-pagination">
                <div
                    style={{
                        visibility: canPreviousPage ? 'visible' : 'hidden',
                    }}
                    className='prev-page' onClick={() => {
                        onPageChange(pageIndex);
                        previousPage();
                    }}
                />
                <span>
                    {(pageIndex ?? 0) + 1} / {pageCount ?? 1} (页)
                </span>
                <div
                    style={{
                        visibility: canNextPage ? 'visible' : 'hidden',
                    }}
                    className='next-page'
                    onClick={() => {
                        onPageChange(pageIndex + 1 + 1);
                        nextPage();
                    }}
                />
            </div>
        </Loading>
    );
};

export default Table;
