import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Delete } from "baseui/icon";
import Show from "baseui/icon/show";
import { AiFillEdit } from "react-icons/ai";

const Table = (props) => {
  const BtnCellRenderer = (row) => {
    return (
      <>
        <Show size={30} onClick={() => props.viewHandler(row.data)} /> |
        {props.viewDelete && (
          <Delete size={35} onClick={() => props.deleteHandler(row.data)} />
        )}
        <AiFillEdit size={30} onClick={() => props.editHandler(row.data)} />
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
        onGridReady={props.onGridReady}
        pagination={props.pagination}
        paginationPageSize={props.paginationPageSize}
        rowData={props.data || []}
        frameworkComponents={{
          ...props.frameworkComponents,
          btnCellRenderer: props.BtnCellRenderer || BtnCellRenderer,
        }}
      >
        {props.ActionRow === "FIRST" && (
          <AgGridColumn
            field="Action"
            cellClass="custom-athlete-cell"
            cellRenderer="btnCellRenderer"
            filter="agNumberColumnFilter"
            floatingFilter={false}
          />
        )}
        {props.columns.map((column) => (
          <AgGridColumn {...column} key={column.field} />
        ))}
        {props.ActionRow !== "FIRST" && (
          <AgGridColumn
            field="Action"
            cellClass="custom-athlete-cell"
            cellRenderer="btnCellRenderer"
            filter="agNumberColumnFilter"
            floatingFilter={false}
          />
        )}
      </AgGridReact>
    </div>
  );
};

export default Table;
