import './styles/main.scss';


const userStack = {
  language: 'JavaScript',
  framework: 'Angular',
};

const user = {
  name: 'Vitaliy',
  age: '37',
  ...userStack,
};

console.log(user);