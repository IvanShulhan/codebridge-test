import { Article } from '../types/Article';

export const cutText = (text: string, value: number) => {
  const shortedText = text.slice(0, value);

  return text.length > value ? shortedText + '...' : shortedText;
};

export const modifyDate = (date: Date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric'} as const;
  const rightFormat = new Date(date).toLocaleDateString('en-US', options).split(',');

  return `${rightFormat[0]}th, ${rightFormat[1]}`
};

export const queryToCollection = (query: string) => (
  query.split(' ').filter(el => Boolean(el.length))
)

export const sortArticlesList = (list: Article[], query: string) => {
  if (!query) return list;
  
  const queryCollection = queryToCollection(query.toLowerCase());

  const filteredByTitle = list.filter(({ title }) => (
    queryCollection.some(el => title.toLowerCase().includes(el))
  ));

  const filteredBySummary = list.filter(({ summary }) => (
    queryCollection.some(el => summary.toLowerCase().includes(el))
  ));

  return filteredByTitle.concat(filteredBySummary)
    .filter((item, i, arr) => arr.indexOf(item) === i);
}