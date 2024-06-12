function accessProperty(obj, property) {
  try {
    let value = obj[property];
    console.log(`Property: ${property}: ${value}`);
  } catch (error) {
    if (error instanceof TypeError) {
      console.log('A type error occurs');
    } else {
      console.log('Other error occurs', error);
    }
  }
}

const anyObj = {
  name: 'John',
  age: '21',
};

accessProperty(undefined, 'name');
accessProperty(anyObj, 'name');
accessProperty(undefined, 'age');
accessProperty(anyObj, 'age');
