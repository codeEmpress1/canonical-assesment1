import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row } from '@canonical/react-components';

const URL =
  'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(URL)
      .then((res) => setData(res.data))
      .catch((err) => console.log({ err }));
  }, []);
  return (
    <section className='container'>
    <Row className='u-equal-height'>
      {data.map((item: any) => {
        const {
          id,
          link,
          title: { rendered },
          date,
          featured_media,
          _embedded: {
            author: [{ name, link: authorLink }],
            'wp:term': [[first], [second], [third]],
          },
        } = item;
        const dateObject = new Date(date);
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const day = dateObject.getDate();
        const year = dateObject.getFullYear();

        return (
          <Card
            title={third?.name || second.name}
            key={id}
            className='col-4 p-card--top-border'
          >
              <img
                src={featured_media}
                alt='featured media'
                className='p-card__image'
              />
              <h3 className='p-heading--4'>
                <a href={link}>{rendered}</a>
              </h3>
              <p className='p-card--author'>
                  by <a href={authorLink}>{name}</a> on {day} {month} {year}
              </p>
            <p className='p-card--footer'>{first.name}</p>
          </Card>
        );
      })}
    </Row>
    </section>
  );
}

export default App;
