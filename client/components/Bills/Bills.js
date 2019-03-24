import React from "react";

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
    <tr key={Id}>
      <td>{TxnDate}</td>
      <td>{DocNumber}</td>
      <td>{VendorRef.name}</td>
      <td>{DueDate}</td>
      <td>{Balance}</td>
      <td>{TotalAmt}</td>
    </tr>
  );
};

export default function Bills({ bills }) {
  return (
    <table id="bills">
      <tbody>{bills.map((bill, index) => BillRow({ bill, index }))}</tbody>
    </table>
  );
}
