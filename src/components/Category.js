import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { db } from '../firebase-config';
import { AddAdBtn } from './AddAdBtn';

const Category = ({ title: categoryTitle, categoryName }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const snapshot = await db
          .collection('announcements')
          .where('category', '==', categoryName)
          .get();
        setAnnouncements(
          snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        );
        console.log(snapshot);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAnnouncements();
  }, [categoryName]);

  return (
    <Container>
      <Link
        style={{ color: '#2e4053', fontWeight: 500 }}
        component={RouterLink}
        to="/"
      >
        ⬅️ go back to Category list
      </Link>
      <Typography
        style={{ color: '#2e4053', margin: '10px', fontSize: '40px' }}
        variant="h4"
      >
        {categoryTitle}
      </Typography>
      <AddAdBtn></AddAdBtn>

      <List>
        {announcements.map(({ title, descriptions, author, id }) => {
          return (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h5">
                    <Link component={RouterLink} to={`/ad/${id}`}>
                      {title}
                    </Link>
                  </Typography>
                }
                secondary={
                  <>
                    <Typography>Treść: {descriptions}</Typography>
                    <Typography>Author: {author}</Typography>
                  </>
                }
              ></ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default Category;
