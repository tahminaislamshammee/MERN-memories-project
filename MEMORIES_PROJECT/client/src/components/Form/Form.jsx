import { useEffect, useState } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts';
const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

    const post = useSelector((state)=> currentId ? state.posts.find((p)=> p._id === currentId) : null);

    useEffect(()=>{
        if(post) setPostData(post)
    },[post])

    console.log('data',postData.selectedFile)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        if(currentId) {
            dispatch(updatePost(currentId,postData)) 
            setTimeout (()=>{
                setLoading(false)
                clear()
            }, 1000)
            
        }else {
             dispatch(createPost(postData))
             setLoading(false)
             clear()
        }
        
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }
    return ( 
       <Paper className={classes.paper}>
        <form autoComplete='off' className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant='h6'>{currentId? 'Updating': 'Creating'} a Memory</Typography>
            
            <TextField name='creator' variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData, creator: e.target.value})} required/>

            <TextField name='title' variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title: e.target.value})} required/>

            <TextField name='message' variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e)=> setPostData({...postData, message: e.target.value})} required/>

            <TextField name='tags' variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')})} required/>

            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

            {/* <div className={classes.fileInput}><input type="file" multiple={false} onChange={(e) => setPostData({ ...postData, selectedFile: e.target.files[0].name })} /></div> */}

            {/* <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>{currentId ? 'Update': 'Submit'}</Button> */}

            {currentId ? <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>{loading? 'Updating...' : 'Update'}</Button> : <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>{loading? 'Loading...' : 'Submit'}</Button>}
            

            <Button variant='contained' color='secondary' size='small' onClick={clear}fullWidth>Clear</Button>
        </form>
       </Paper>
     );
}
 
export default Form;