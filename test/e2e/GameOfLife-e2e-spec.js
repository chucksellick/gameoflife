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

  // Shortcut to access grid coords using CSS pseudo selectors
  function findCell(x,y) {
    return element(by.css('.grid .grid-row:nth-child('+(y+1)+') .grid-cell:nth-child('+(x+1)+') span'));
  }

  describe('with an empty grid', function() {
    it('Makes a cell alive when clicking on it', function(){
      var cell_1_1 = findCell(1,1);
      expect(element.all(by.css('.grid-cell .alive')).count()).toEqual(0);
      expect(cell_1_1.getAttribute("class")).toEqual("");
      cell_1_1.click();
      expect(element.all(by.css('.grid-cell .alive')).count()).toEqual(1);
      expect(cell_1_1.getAttribute("class")).toEqual("alive");
    });
  });

  var nextButton = element(by.id('next-button'));
  var clearButton = element(by.id('clear-button'));

  describe('with a single alive cell', function() {
    var cell_1_1 = findCell(1,1);

    beforeEach(function(){
      cell_1_1.click();
    });

    it('has two alive cells if clicking on another cell', function(){
      var cell_1_2 = findCell(1,2);
      cell_1_2.click();
      expect(element.all(by.css('.grid-cell .alive')).count()).toEqual(2);
      expect(cell_1_1.getAttribute("class")).toEqual("alive");
      expect(cell_1_2.getAttribute("class")).toEqual("alive");
    });

    it('makes a cell not alive when clicking on it again', function(){
      cell_1_1.click();
      expect(element.all(by.css('.grid-cell .alive')).count()).toEqual(0);
      expect(cell_1_1.getAttribute("class")).toEqual("");
    });

    it('kills the cell by iterating the grid', function(){
      nextButton.click();
      expect(element.all(by.css('.grid-cell .alive')).count()).toEqual(0);
      expect(cell_1_1.getAttribute("class")).toEqual("");
    });

    it('clears the grid when the clear button is clicked', function(){
      clearButton.click();
      expect(element.all(by.css('.grid-cell .alive')).count()).toEqual(0);
      expect(cell_1_1.getAttribute("class")).toEqual("");
    });
  });

  describe('with a cyclic pattern', function() {

    beforeEach(function(){
      findCell(1,0).click();
      findCell(1,1).click();
      findCell(1,2).click();
    });

    it('produces the next cycle by iterating', function(){
      nextButton.click();
      expect(element.all(by.css('.grid-cell .alive')).count()).toEqual(3);
      expect(findCell(1,0).getAttribute('class')).toEqual('');
      expect(findCell(1,1).getAttribute('class')).toEqual('alive');
      expect(findCell(1,2).getAttribute('class')).toEqual('');
      expect(findCell(0,1).getAttribute('class')).toEqual('alive');
      expect(findCell(1,0).getAttribute('class')).toEqual('alive');
    });

    it('returns to the original pattern on the second iteration', function(){
      nextButton.click();
      nextButton.click();
      expect(element.all(by.css('.grid-cell .alive')).count()).toEqual(3);
      expect(findCell(1,0).getAttribute('class')).toEqual('alive');
      expect(findCell(1,1).getAttribute('class')).toEqual('alive');
      expect(findCell(1,2).getAttribute('class')).toEqual('alive');
      expect(findCell(0,1).getAttribute('class')).toEqual('');
      expect(findCell(1,0).getAttribute('class')).toEqual('');
    });


  });
});