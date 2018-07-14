import bcrypt from 'bcrypt';
import uuid from 'uuid';

const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync('password', salt);

const data = {
  users: [
    {
      id: uuid.v4(),
      firstName: 'Kelvin',
      lastName: 'George',
      email: 'kelvingeorge@gmail.com',
      password: password
    },
    {
      id: uuid.v4(),
      firstName: 'Daniel',
      lastName: 'David',
      email: 'danieldavid@gmail.com',
      password: password
    }
  ],

  entries: [
    {
      id: uuid.v4(),
      userId: 1,
      title: 'My first day in school',
      content: 'Lorem ipsum dolor sit amet,adipiscing elit. Etiam pulv inar, mauris sit amet interdum feugiat'
    },

    {
      id: uuid.v4(),
      userId: 1,
      title: 'My fight of faith',
      content: 'Lorem ipsum dolor sit amet,adipiscing elit. Etiam pulv inar, mauris sit amet interdum feugiat'
    },

    {
      id: uuid.v4(),
      userId: 2,
      title: 'How to prepare a good meal',
      content: 'Lorem ipsum dolor sit amet,adipiscing elit. Etiam pulv inar, mauris sit amet interdum feugiat'
    },

    {
      id: uuid.v4(),
      userId: 2,
      title: 'Not knowing what to do',
      content: 'Lorem ipsum dolor sit amet,adipiscing elit. Etiam pulv inar, mauris sit amet interdum feugiat'
    },
  ]
};


export default data;
