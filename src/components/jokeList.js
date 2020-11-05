import React,{useEffect, useState} from 'react';
import {Table,TableContainer,TableHead,TableRow,TableCell,TableBody} from '@material-ui/core'

const JokeList =(props)=>{
    const [data, setData] = useState([]);
   useEffect(()=>{
     setData(props.joke);
   })
   
      return(
          <div>
            <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Joke List</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.value &&
            data.value.map((data, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
              {data.joke}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
      );
}
export default JokeList;