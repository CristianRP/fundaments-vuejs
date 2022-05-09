describe('Example Component', () => {
  test('Should be greather than 10', () => {
    // Arrange
    let value = 8;

    // Act
    value = value + 3

    // Assert
    // if( value > 10 ) {
    //   // pato
    // } else {
    //   throw `${value} is less than 10`
    // }
    expect(value).toBeGreaterThan(10)
  });
});
