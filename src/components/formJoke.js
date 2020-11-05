import React, { useState } from 'react';
import JokeList from './jokeList'
import { Box,Switch, Button, Grid, TextField,Paper } from '@material-ui/core';
import jokeService from '../service/jokeService'

const FormJoke = () => {

    const [checkedNum, setCheckedNum] = useState(false);
    const [checkedName, setCheckedName] = useState(false);
    const [disableNum, setDisableNum] = useState(false);
    const [disableName, setDisableName] = useState(false);
    const [disableTextNum, setDisableTextNum] = useState(true);
    const [disableTextName, setDisableTextName] = useState(true);
    const [name,setName]= useState('');
    const [lastName,setLastName]= useState('');
    const [num,setNum]= useState('');
    const [joke, setJoke] = useState([]);
    
    const getJoke = () => {
        console.log('getJoke')
        jokeService.getOnce()
          .then(response => {
            setJoke(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
      const getJokeByName = (name,lastName) => {
        jokeService.getByName(name,lastName)
          .then(response => {  
            let arr =[];
            let tmp ={};
            arr.push(response.data.value);
            tmp.value =arr;
            setJoke(tmp)
            console.log(response.data);
          })
          
          .catch(e => {
            console.log(e);
          });  
      };

      const getJokeByNum = (num) => {
        console.log('getbynum')
        jokeService.getByNumber(num)
          .then(response => {
            setJoke(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

    
    const switchNumHandleChange = (e) => {
        setCheckedNum(e.target.checked);
        setDisableName(!disableName);
        setDisableTextNum(!disableTextNum);
        setName('');
        setLastName('');
    }
    const switchNameHandleChange = (e) => {
        setCheckedName(e.target.checked);
        setDisableNum(!disableNum);
        setDisableTextName(!disableTextName)
        setNum('');
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        const payload ={num,name,lastName}
        console.log(payload);
        

        if(checkedNum===true){
                getJokeByNum(num);
        }else if( checkedName===true
        ){
            getJokeByName(name,lastName);
        }else{
            getJoke();
        }  
    }

    const clearForm=()=>{
        setName('');
        setLastName('');
        setNum('');
    }
    return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={6} >
            <Box pt={1} >
            <Paper style={{paddingLeft: '20px'}} >
    <form onSubmit={onSubmit} >
            <Grid container  spacing={3}  direction="column" justify="flex-start" >
                <Grid item xs={12} >
                    <Switch
                        checked={checkedNum}
                        disabled={disableNum}
                        onChange={switchNumHandleChange}
                        color="primary"
                        name="checkedNum"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                <Grid item={true} xs={12} ml={2} >
                    <TextField id="standard-basic" label="Number" disabled={disableTextNum} 
                     type='number'inputProps={{ min: "0", max: "574", step: "1" }}
                     value={num}
                    onChange={(e)=>setNum(e.target.value)} />
                </Grid>
                <Grid item>
                    <Switch
                        checked={checkedName}
                        disabled={disableName}
                        onChange={switchNameHandleChange}
                        color="primary"
                        name="checkedName"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                <Grid item  xs={12}>
                    <TextField id="standard-basic" label="Name" disabled={disableTextName}
                    value={name} 
                    onChange={(e)=>setName(e.target.value)} />
                </Grid>
                <Grid item  xs={12}>
                    <TextField id="standard-basic" label="Last Name" disabled={disableTextName}
                    value={lastName}
                     onChange={(e)=>setLastName(e.target.value)} />
                </Grid>
            </Grid>
            
            <Grid container spacing={3}>
                <Grid item>
                    <Button variant="contained" type="submit" size="medium" color="primary" >
                        Get Joke
            </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained"  type="reset" size="medium" color="secondary" 
                    onClick={clearForm}>
                        Clear
            </Button>
                </Grid>
            </Grid>
        </form>
        </Paper>
        </Box>
       
        </Grid>

        <Grid item xs={12} md={6}>
            <Paper >
            <JokeList joke={joke} />
            </Paper>
        </Grid>
    </Grid>
    
   
        
    );
};

export default FormJoke;