import React from "react";
import numeral from "numeral";

export const PrettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";