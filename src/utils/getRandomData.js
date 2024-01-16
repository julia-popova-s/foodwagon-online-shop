const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomData = (list) => {
  return list.map((el) => {
    el.salePeriodStart = new Date(2024, 0, 16);
    el.salePeriodEnd = new Date(2024, 0, 16 + getRandomNumber(7, 90));

    const random = getRandomNumber(0, 30);
    el.discount = random - (random % 10);

    return el;
  });
};
