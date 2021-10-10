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
        <Delete size={35} onClick={() => props.deleteHandler(row.data)} /> |
        <AiFillEdit size={30} onClick={() => props.editHandler(row.data)} />
      </>
    );
  };

  return (
    <div
      id="myGrid"
      style={{
        height: 300,
        width: "100%",
      }}
      className="ag-theme-alpine"
    >
      <AgGridReact
        pagination={true}
        rowData={props.data || []}
        frameworkComponents={{
          btnCellRenderer: BtnCellRenderer,
        }}
      >
        <AgGridColumn
          field="Action"
          cellClass="custom-athlete-cell"
          cellRenderer="btnCellRenderer"
          filter="agNumberColumnFilter"
          floatingFilter={false}
        />
        {props.columns.map((column) => (
          <AgGridColumn {...column} key={column.field} />
        ))}
      </AgGridReact>
    </div>
  );
};

export default Table;
