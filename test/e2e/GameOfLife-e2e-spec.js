describe('Game of life', function(){

  var url = 'http://localhost:3000/'

  beforeEach(function(){
    browser.get(url);
  });

  it('Loads the game view', function(){
    expect(element(by.css('#game h1')).getText()).toEqual('Game Grid');
  });

  it('Renders a 20x20 grid of cells', function(){
    expect(element.all(by.css('.grid-row')).count()).toEqual(20);
    expect(element.all(by.css('.grid-cell')).count()).toEqual(400);
  });

  /*

  describe('with an empty grid', function() {

    it('Makes a cell alive when clicking on it', function(){
      browser.get('/');
      var cell_1_1 = element(by.class('grid-row')[1].children()[1]);
      expect(cell_1_1.hasClass("alive").toEqual(false));
      cell_1_1.click();
      expect(cell_1_1.hasClass("alive").toEqual(true));
    });

  });

  describe('with a single alive cell', function() {
    var cell_1_1 = element(by.class('grid-row')[1].children()[1]);
    var nextButton = element(by.id('next-button'));
    var clearButton = element(by.id('clear-button'));

    beforeEach(function(){
      browser.get('/');
      cell_1_1.click();
    });

    it('makes a cell not alive when clicking on it again', function(){
      cell_1_1.click();
      expect(cell_1_1.hasClass("alive").toEqual(false));
    });

    it('kills the cell by iterating the grid', function(){
      nextButton.click();
      // TODO: Expect ALL cells to not be alive
      expect(cell_1_1.hasClass("alive").toEqual(false));
    });

    it('clears the grid when the clear button is clicked', function(){
      clearButton.click();


    });
  });
  describe('with a cyclic pattern', function() {

    beforeEach(function(){
      browser.get('/');
      getCell(1,0).click();
      getCell(1,1).click();
      getCell(1,2).click();
    });

    it('produces the next cycle by iterating', function(){
      nextButton.click();
      expect(getCell(1,0).hasClass('alive').toEqual(false));
      expect(getCell(1,1).hasClass('alive').toEqual(false));
      expect(getCell(1,2).hasClass('alive').toEqual(false));
      expect(getCell(0,1).hasClass('alive').toEqual(false));
      expect(getCell(1,0).hasClass('alive').toEqual(false));

    });
  });
*/
});