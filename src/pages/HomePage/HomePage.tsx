import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Container, Divider, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchArticles, selectArticles } from '../../store/slices/articlesSlice';
import { SearchBlock } from '../../components/SearchBlock';
import { ArticleCard } from '../../components/ArticleCard';
import { sortArticlesList } from '../../utils/helpers';
import { Article } from '../../types/Article';
import { CardSkeleton } from '../../components/CardSkeleton';
import { GridItem } from '../../components/GridItem';
import styles from './HomePage.module.scss';
import { WarningCard } from '../../components/WarningCard';

export const HomePage = () => {
  const [ searchParams ] = useSearchParams();
  const query = searchParams.get('query') || '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch]);

  const { articles, status } = useAppSelector(selectArticles);
  const [sortedList, setSortedList] = useState<Article[]>(articles);
  
  useEffect(() => {
    setSortedList(sortArticlesList(articles, query))
  }, [query, articles]);

  if (status === 'failed') {
    return <WarningCard />
  }

  return (
    <Container classes={{root: styles.container}}>
      <SearchBlock />
        <Typography classes={{root: styles.results}}>
          {Boolean(query.length) 
            && `${sortedList.length > 1 ? 'Results' : 'Results'}: ${sortedList.length}`
          }
        </Typography>
      <Divider classes={{root: styles.divider}}/>
      <Grid container spacing={{md: '45px', xs: '25px'}}>
        {status === 'idle' ? (
          <>
            {sortedList.map((article) => (
              <Fragment key={article.id}>
                <GridItem 
                  children={<ArticleCard article={article} query={query}/>} 
                />
              </Fragment>
            ))}
          </>
        ) : (
          <>{[...Array(6)].map(() => (
            <Fragment key={uuid()}>
              <GridItem children={<CardSkeleton />} />
            </Fragment>
            ))}
          </>
        )}
      </Grid>
    </Container>
  )
};