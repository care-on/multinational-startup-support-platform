'use client';
import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function WritePostPage() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  useEffect(() => {
    // 글쓰기 버튼 클릭 시
    const writePost = async () => {
      const response = await axios.post(
        'http://43.202.133.160:8000/api/question/',
        {
          title: title,
          content: content,
        }
      );
      console.log(response.data);
    };
    writePost();
  }, [title, content]);

  return (
    <Grid container justifyContent='center' spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant='h5' gutterBottom>
            글쓰기
          </Typography>
          <TextField
            label='제목'
            fullWidth
            margin='normal'
            variant='outlined'
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='내용'
            fullWidth
            margin='normal'
            variant='outlined'
            multiline
            rows={10}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* 글쓰기 버튼 */}
          <Button type='submit' color='primary'>
            글쓰기
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
