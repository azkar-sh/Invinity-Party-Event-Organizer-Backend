module.exports = (result) => {
  const dataSection = [];
  result.data.forEach((element) => {
    element.bookingSection.forEach((elementSection) => {
      dataSection.push(elementSection.section);
    });
  });

  const counts = dataSection.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {}
  );

  const sectionCapacity = [
    { section: "VVIP", capacity: 10 },
    { section: "VIP", capacity: 20 },
    { section: "REG", capacity: 30 },
  ];

  const newData = [];
  Object.keys(counts).forEach((data) => {
    const sectionFind = sectionCapacity.filter((el) =>
      data.includes(el.section)
    );

    const resultSection = {
      section: data,
      booked: counts[data],
      available: sectionFind[0].capacity - counts[data],
      statusFull: sectionFind[0].capacity === counts[data],
    };
    newData.push(resultSection);
  });

  return newData;
};
