import add from '../files/func';

describe( 'add() test: ', ()=>{
  it( '1+2=3', ()=>{
    expect(add(1,2)).toBe(3);
  } )
})