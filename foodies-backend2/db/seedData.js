const recipes = [
  {
    title: 'Eggs',
    meal: 'Breakfast',
    ingredients: 'eggs, butter, milk',
    directions: '1. put butter in pan, 2. pour eggs in pan, 3. cook until done',
    cookTime: '5',
  },
  {
    title: 'sandwich',
    meal: 'lunch',
    ingredients: 'bread, mayo, cheese, meat',
    directions: '1. put mayo on both pieces of bread, 2. layer cheese and meat on one slice of break, 3. put other slice on top',
    cookTime: '7',
  },
  {
    title: 'steak',
    meal: 'dinner',
    ingredients: 'steak, butter, herbs',
    directions: '1. pan sear steak, 2. put in butter and herbs to baste steak, 3. finish in oven',
    cookTime: '17',
  },
  {
    title: 'pancakes',
    meal: 'Breakfast',
    ingredients: 'eggs, butter, milk, flour, sugar',
    directions: '1. put butter in pan, 2. pour mixture in pan, 3. flip once there are bubbles',
    cookTime: '15',
  },
  {
    title: 'salad',
    meal: 'lunch',
    ingredients: 'lettuce, veggies, chicken, salad dressing',
    directions: '1. put all ingredients in a bowl and mix',
    cookTime: '22',
  },
  {
    title: 'burger',
    meal: 'dinner',
    ingredients: 'beef burger patties, cheese, bun, condiments',
    directions: '1. cook burger, 2. put condiments and burger on bun, 3. enjoy',
    cookTime: '18',
  },
  {
    title: 'trail mix',
    meal: 'snack',
    ingredients: 'nuts, dried fruit, chocolate chips or m&ms',
    directions: '1. put all ingredients in a bowl and mix, 2. separate out into individual snack servings',
    cookTime: '0',
  },
  {
    title: 'fruit salad',
    meal: 'snack',
    ingredients: 'mango, strawberry, banana, apple',
    directions: '1. dice all ingredients into bite-size pieces, 2. put all ingredients in a bowl and mix',
    cookTime: '5',
  },
];

const users = [
  {
    username: 'Brianna',
    name: 'Brianna Gaines',
    password: 'briannagaines',
    passwordNoJWT: 'briannagaines',
    email: 'brianna1@gmail.com',
  },
  {
    username: 'Lola',
    name: 'Lola Gorgeous',
    password: 'iamgorgeous',
    passwordNoJWT: 'iamgorgeous',
    email: 'iamgorgeous1@gmail.com',
  },
  {
    username: 'Hana',
    name: 'Hana Jane',
    password: 'iwillfightyou',
    passwordNoJWT: 'iwillfightyou',
    email: 'iwillfightyou1@gmail.com',
  },
];

module.exports = {
  recipes,
  users,
};
