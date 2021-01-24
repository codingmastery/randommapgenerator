const utils = require('./utils');

describe('calculateIndex', () => {
    it('should calculate index between bounds', ()=>{
        try{
        let index = utils.calculateIndex({x:0, y:0}, {x:1, y:1});
        expect(index).toBe(0);
        } catch (e) {
            console.error(e);
        }
    });
    it('should throwError out of bounds - x < 0', ()=>{
        try{
            let index = utils.calculateIndex({x:-1, y:-1}, {x:2, y:2});
            expect(index).not.toBe(0);
        } catch (e) {
            expect(e).toBe(`Out of bounds: x`);
        }
    });
    it('should throwError out of bounds - x > bounds.x', ()=>{
        try{
            let index = utils.calculateIndex({x:3, y:-1}, {x:2, y:2});
            expect(index).not.toBe(0);
        } catch (e) {
            expect(e).toBe(`Out of bounds: x`);
        }
    });
    it('should throwError out of bounds - y < 0', ()=>{
        try{
            let index = utils.calculateIndex({x:0, y:-1}, {x:2, y:2});
            expect(index).not.toBeLess(-1);
        } catch (e) {
            expect(e).toBe(`Out of bounds: y`);
        }
    });
    it('should throwError out of bounds - y > bounds.y', ()=>{
        try{
            let index = utils.calculateIndex({x:0, y:3}, {x:2, y:2});
            expect(index).not.toBeGreaterThanOrEqual(2);
        } catch (e) {
            expect(e).toBe(`Out of bounds: y`);
        }
    });
});

describe('generateARandomNumberUpTo', () => {
    it('should generate a Random number lower than 4', ()=>{
        const number = utils.generateARandomNumberUpTo(4);
        expect(number).toBeLessThan(4);
    });
    it('should generate a random number greater than or equal to 0', ()=>{
        const number = utils.generateARandomNumberUpTo(4);
        expect(number).toBeGreaterThanOrEqual(0);
    });
})

describe('generateCoordinates', () => {
    it('should never be out of bounds - x < 0', ()=>{
        let coordinates = utils.generateCoordinates({x: 4, y: 4});
        expect(coordinates.x).not.toBeLessThan(0);
    });
    it('should never be out of bounds - x > bounds.x', ()=>{
        let coordinates = utils.generateCoordinates({x:2, y:2});
        expect(coordinates.x).not.toBeGreaterThan(1);
    });
    it('should never be out of bounds - y < 0', ()=>{
        let coordinates = utils.generateCoordinates({x:2, y:2});
        expect(coordinates.y).not.toBeLessThan(0);
    });
    it('should never be out of bounds - y > bounds.y', ()=>{
        let coordinates = utils.generateCoordinates({x:2, y:2});
        expect(coordinates.y).not.toBeGreaterThan(1);
    });
});