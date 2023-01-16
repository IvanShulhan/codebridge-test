import * as React from 'react';
import { Link } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import { Article } from '../../types/Article';
import { Calendar } from '../icons/Calendar';
import { Arrow } from '../icons/Arrow';
import styles from './ArticleCard.module.scss';
import { modifyDate, cutText, queryToCollection } from '../../utils/helpers';
import { 
  Card,
  CardMedia, 
  Box, 
  CardContent, 
  CardActions, 
  Typography
} from '@mui/material';

type Props = {
  article: Article;
  query: string;
};

export const ArticleCard: React.FC<Props> = React.memo(({ article, query }) => {
  const searchWords = queryToCollection(query);
  const text = cutText(article.summary, 100);

  return (
    <Card classes={{root: styles.card}}>
      <CardMedia
        component="img"
        height="217"
        image={article.imageUrl}
        alt={article.title}
      />
      <CardContent classes={{root: styles.content}}>
        <Box className={styles.date}>
          <Calendar />      
          <Typography 
            variant="body2" 
            classes={{root: styles.text}}
          >
            {modifyDate(article.publishedAt)}
          </Typography>
        </Box>
        <Typography variant="h3" classes={{ root: styles.title }}>
          <Highlighter
            searchWords={searchWords}
            autoEscape={true}
            textToHighlight={article.title}
          />
        </Typography>
        <Typography classes={{ root: styles.article }}>
          <Highlighter
            searchWords={searchWords}
            autoEscape={true}
            textToHighlight={text}
          />
        </Typography>
      </CardContent>
      <CardActions classes={{root: styles.action}}>
        <Link to={`/${article.id}`} className={styles.link}>
          Read more
          <Arrow />
        </Link>
      </CardActions>
    </Card>
  )
});