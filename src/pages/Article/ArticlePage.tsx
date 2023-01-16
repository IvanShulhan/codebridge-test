import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchArticleById, selectArticle } from '../../store/slices/articleSlice';
import { Box, Paper, Typography, Container, Skeleton, Button } from '@mui/material';
import { Arrow } from '../../components/icons/Arrow';
import { WarningCard } from '../../components/WarningCard';
import styles from './ArticlePage.module.scss';

export const ArticlePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id))
    }
  }, [dispatch, id]);

  const { article, status } = useAppSelector(selectArticle);

  if (status === 'failed') {
    return <WarningCard />
  }

  return (
    <>
      {article && (
          <Box className={styles.content}>
            <Paper 
              classes={{ root: styles.banner }} 
              sx={{ backgroundImage: `url(${article.imageUrl})` }} 
            />
            <Container classes={{ root: styles.container }}>
              <Paper 
                classes={{ root: styles.article }} 
              >
                {status === 'idle' ? (
                  <>
                    <Typography classes={{ root: styles.title }}>
                      {article.title}
                    </Typography>
                    <Typography classes={{ root: styles.text }}>
                      {article.summary}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Skeleton classes={{root: styles.skeleton}}/>
                    <Skeleton classes={{root: styles.skeleton}}/>
                  </>
                )}
              </Paper>
            </Container>
            <Container classes={{ root: styles.bottom }}>
              {status === 'idle' ? (
                <Button 
                  className={styles.button} 
                  onClick={() => navigate(-1)}
                >
                  <span className={styles.wrapper}>
                    <Arrow/>
                  </span>
                    Back to homepage
                </Button>
              ) : (
                <Skeleton classes={{root: styles.skeleton}}/>
              )}
            </Container>
          </Box>
        )}    
    </>
  )
};