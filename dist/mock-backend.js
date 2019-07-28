const MAX_BODY_IDX = 139;

class Memo {
  constructor(title, body) {
    this.title = title;
    body = body || '';
    this.body = body.substring(0, MAX_BODY_IDX);
    this.id = ++CURRENT_ID;
    this.created_date = new Date();
    MEMOS[this.id] = this;
  }
}

let CURRENT_ID = 0;
const MEMOS = {};

new Memo('Hello world', 'Nice to meet you');
new Memo('My first memo', 'This is the body text');

const DELAY = 400;

const mockDelay = (slowAction) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const response = slowAction();
        resolve({
          status: 200, data: JSON.parse(response)
        });
      } catch(e) {
        reject(e);
      }
    }, DELAY);
  })
}

const getRoute = (url) => {
  if (url === '/ideas') {
    return mockDelay(() => JSON.stringify(Object.values(MEMOS)));
  }
  if (url === '/ideas/new') {
    const memo = new Memo();
    return mockDelay(() => JSON.stringify(memo));
  }
  return mockDelay(() => {
    return JSON.stringify({
      status: 404, msg: `No resource at ${url}`
    });
  });
};

const postRoute = (url, data) => {
  data = JSON.parse(JSON.stringify(data));
  if (url === '/idea/update') {
    return mockDelay(() => {
      const memo = MEMOS[data.id];
      if (!memo) {
        throw {
          status: 404,
          msg: 'Not found'
        };
      } else {
        data.body = data.body.substring(0, MAX_BODY_IDX);
        MEMOS[data.id] = Object.assign(memo, data);
        return JSON.stringify(MEMOS[data.id]);
      }
    });
  }
  if (url === '/idea/delete') {
    return mockDelay(() => {
      delete MEMOS[data.id];
      return JSON.stringify({ id: data.id });
    });
  }
  return mockDelay(() => {
    throw JSON.stringify({
      status: 404, msg: `No resource at ${url}`
    });
  });
}

const $http = {
  get: getRoute,
  post: postRoute
};

//// Testing the mock backend:
// $http.get('/ideas/new')
//   .then(res => {
//     console.log(res);
//     $http.post('/idea/update', {
//       id: res.data.id,
//       title: 'Hello World',
//       body: 'Hello'
//     })
//       .then(res => {
//         console.log(res);
//         $http.post('/idea/delete', {
//           id: res.data.id
//         })
//           .then(res => {
//             console.log(res);
//           });
//       });
//   });


