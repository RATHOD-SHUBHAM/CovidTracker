import React from 'react'
// create another file table.css
import './Table.css';
import numeral from "numeral";
//
function Table({countries}) {
    return (
        // <div className = "table">
        //     {/* for every single country in countries return  data as table*/}
        //     {countries.map(country => (
        //         <tr>
        //             <td>{country.country}</td>
        //             <td>{country.cases}</td>
        //         </tr>
        //     ))}
        // </div>

        // the entire above code can be written using destructuring.

        // we got to sort the data based on cases. So we create a seperate file and do it there.

        <div className="table">
            {countries.map(({country,cases}) => (
                <tr>
                    <td>{country}</td>
                    {/* .format will add comma */}
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}

        </div>
    )
}

export default Table
