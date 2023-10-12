test('testThatTermAcceptsLowNumber', async ()=>{
    // For an accept, it will be easy
    //  1. Call constructor with arguments
    const term1 = await Term.create({startDate: 'start', endDate: 'end', termNumber: 1});
    //  2. Check that object is created and has valid info
    expect(term1).toBeTruthy();
    expect(term1.termNumber).toBe(1);

    // Check for no errors
    expect(term1.validate()).resolves.toBe(undefined);

});

test('testThatTermRejectsBelowOne', async ()=>{
    // For a reject, we need to catch the error message
    try {
        const term1 = await Term.create({startDate: 'start', endDate: 'end', termNumber: 0});
    } catch (err) {
        expect(err.errors[0].message).toBe('Term number must be between 1 and 6');
    }

});

test('testThatTermAcceptsHighNumber', ()=>{

});

test('testThatTermRejectsAboveSix', ()=>{

});
