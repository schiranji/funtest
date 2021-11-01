import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Delete } from "baseui/icon";
import Show from "baseui/icon/show";
import { AiFillEdit } from "react-icons/ai";

const Table = (props) => {
  const BtnCellRenderer = (row) => {
    return (
      <>
        {props.viewHandler && (
          <Show size={30} onClick={() => props.viewHandler(row.data)} />
        )}
        {props.deleteHandler && (
          <Delete size={35} onClick={() => props.deleteHandler(row.data)} />
        )}
        {props.editHandler && (
          <AiFillEdit size={30} onClick={() => props.editHandler(row.data)} />
        )}
      </>
    );
  };

  return (
    <div
      id="myGrid"
      style={{
        height: props.height || 300,
        width: "100%",
      }}
      className="ag-theme-alpine"
    >
      <AgGridReact
        {...props}
        defaultColDef={{
          flex: 1,
        }}
        autoGroupColumnDef={{
          headerName: "Action",
          field: "Action",
          minWidth: 200,
          cellRenderer: "agGroupCellRenderer",
          cellRendererParams: { checkbox: true },
        }}
        rowSelection={"multiple"}
        groupSelectsChildren={true}
        suppressRowClickSelection={true}
        suppressAggFuncInHeader={true}
        onGridReady={props.onGridReady}
        pagination={props.pagination}
        paginationPageSize={props.paginationPageSize}
        rowData={props.data || []}
        frameworkComponents={{
          ...props.frameworkComponents,
          btnCellRenderer: props.BtnCellRenderer || BtnCellRenderer,
        }}
        suppressSizeToFit={true}
        onSelectionChanged={props.onSelectionChanged}
      >
        {!props.isNoAction && props.ActionRow === "FIRST" && (
          <AgGridColumn
            field="Action"
            cellClass="custom-athlete-cell"
            cellRenderer="btnCellRenderer"
            filter="agNumberColumnFilter"
            floatingFilter={false}
            headerCheckboxSelection={props.IsCheckBox}
            headerCheckboxSelectionFilteredOnly={props.IsCheckBox}
            checkboxSelection={props.IsCheckBox}
            flex={props.flex || 3}
          />
        )}
        {props.columns.map((column) => (
          <AgGridColumn {...column} key={column.field} />
        ))}
        {!props.isNoAction && props.ActionRow !== "FIRST" && (
          <AgGridColumn
            field="Action"
            cellClass="custom-athlete-cell"
            cellRenderer="btnCellRenderer"
            filter="agNumberColumnFilter"
            floatingFilter={false}
            headerCheckboxSelection={props.IsCheckBox}
            headerCheckboxSelectionFilteredOnly={props.IsCheckBox}
            checkboxSelection={props.IsCheckBox}
            flex={props.flex || 3}
          />
        )}
      </AgGridReact>
    </div>
  );
};

export default Table;
