import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

const StyledTableContainer = styled(Paper)`
  width: 100%;
  margin-top: 3rem;
  overflow-x: auto;
  table {
    min-width: 800;
    th {
      font-size: 1.5rem;
    }
    tbody {
      tr {
        td {
          font-size: 1rem;
        }
      }
    }
  }
`;

const BillRow = ({ bill, index }) => {
  const {
    Id,
    TxnDate,
    DocNumber,
    VendorRef,
    DueDate,
    Balance,
    TotalAmt
  } = bill;
  return (
    <TableRow key={Id}>
      <TableCell>{TxnDate}</TableCell>
      <TableCell>{DocNumber}</TableCell>
      <TableCell>{VendorRef.name}</TableCell>
      <TableCell>{DueDate}</TableCell>
      <TableCell align="right">{Balance}</TableCell>
      <TableCell align="right">{TotalAmt}</TableCell>
    </TableRow>
  );
};

export default function Bills({ bills }) {
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map((bill, index) => BillRow({ bill, index }))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
