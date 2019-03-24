import React from "react";
import Dinero from "dinero.js";

export default function Money({ amount, currency }) {
  return Dinero({ amount: parseInt(amount * 100), currency }).toFormat();
}
