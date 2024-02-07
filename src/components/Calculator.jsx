import React, { useEffect, useState } from 'react';

const Calculator = () => {
    const [state, setState] = useState({
        bill: '',
        selectedTip: '',
        customTip: '', // New state for custom tip percentage
        people: ''
    });
    console.log(state)
    const [tipAmount, setTipAmount] = useState(0); // Initialize to 0
    const [totalAmount, setTotalAmount] = useState(0); // Initialize to 0

    // Function to handle changes in the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // Function to handle the selection of tip percentage
    const handleTipSelection = (percentage) => {
        if (percentage === 'Custom') {
            setState({ ...state, selectedTip: 'Custom' }); // Reset selectedTip and customTip
        } else {
            setState({ ...state, selectedTip: percentage });
        }
    };

    // Function to calculate tip and total amount per person


    useEffect(() => {
        const calculatePerPerson = () => {
            const billAmount = parseFloat(state.bill);
            let tipPercentage;
            if (state.selectedTip === 'Custom') {
                tipPercentage = parseFloat(state.customTip) / 100;
            } else {
                tipPercentage = parseFloat(state.selectedTip) / 100;
            }
            const numberOfPeople = parseFloat(state.people);

            // Check if any input value is invalid or empty
            if (isNaN(billAmount) || isNaN(tipPercentage) || isNaN(numberOfPeople) || numberOfPeople <= 0) {
                setTipAmount(0);
                setTotalAmount(0);
                return;
            }

            const tipAmount = billAmount * tipPercentage / numberOfPeople;
            const totalAmountPerPerson = (billAmount + tipAmount) / numberOfPeople;

            setTipAmount(tipAmount);
            setTotalAmount(totalAmountPerPerson);
        };
        calculatePerPerson();
    }, [state.bill, state.selectedTip, state.customTip, state.people]);

    return (
        <div className='container'>
            <div>
                <h3>SPLITTER</h3>
            </div>
            <div className='calculator'>
                <div className='left-side'>
                    <div className='input-container'>
                        <label htmlFor='bill'>Bill</label>
                        <span style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)' }}>$</span>
                            <input
                                type='text'
                                style={{
                                    paddingLeft: '20px', /* Adjust this value based on the width of the $ symbol */
                                    backgroundColor: '#F3F8FB',
                                    height: '20px',
                                    width: '90%'
                                }}
                                id='bill'
                                name='bill'
                                value={state.bill}
                                onChange={handleChange}
                            />
                        </span>
                    </div>

                    <div className='select_tip_label'>
                        <label>Select Tip %</label>
                    </div>

                    <div>
                        <div>
                            {[5, 10, 15, 25, 50].map((percentage, i) => (
                                <button className={state?.selectedTip !== percentage ? `button_${i}` : 'selectedButton'} key={percentage} onClick={() => handleTipSelection(percentage)}>{percentage} %</button>
                            ))}
                            {state.selectedTip === 'Custom' ?

                                <input className='customInput' type='text' name='customTip' value={state.customTip} onChange={handleChange} />

                                :
                                <button className='customButton' onClick={() => handleTipSelection('Custom')}>Custom</button>

                            }
                        </div>

                    </div>
                    <br />
                    <div className='input-container'>
                        <label>Number of people</label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-8c2.21 0 4 1.79 4 4 0 2.45-1.81 4.47-4 4.9-2.19-.43-4-2.45-4-4.9 0-2.21 1.79-4 4-4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0 4c-2.67 0-5.33 1.33-5.33 2s2.66 2 5.33 2 5.33-1.33 5.33-2-2.66-2-5.33-2z" />
                                </svg>
                            </span>
                            <input type='text' name='people' value={state.people} onChange={handleChange} style={{ paddingLeft: "30px", backgroundColor: '#F3F8FB', width: '90%', height: '20px' }} />
                        </div>
                    </div>

                </div>
                <div className='right-side'>
                    <div className='total-tip'>
                        <div >
                            <div>
                                <label style={{ color: '#FFFFFF' }}>Tip Amount</label>
                            </div>
                            <div>
                                <label style={{ color: '#649BA0',fontWeight:'600',fontSize:'12px' }}>/Person</label>
                            </div>
                        </div>
                        <div style={{ marginRight: '45px', color: '#21C3AC' }}>
                            <p>${tipAmount || '0.00'}</p>
                        </div>
                    </div>
                    <div className='total-tip'>
                    <div >
                            <div>
                                <label style={{ color: '#FFFFFF' }}>Total Amount</label>
                            </div>
                            <div>
                                <label style={{ color: '#649BA0',fontWeight:'600',fontSize:'12px' }}>/Person</label>
                            </div>
                        </div>
                        <div style={{ marginRight: '45px', color: '#21C3AC' }}>
                            <p>${totalAmount || '0.00'}</p>
                        </div>
                    </div>
                    <div className='reset'>
                        <button type='submit' onClick={() => setState({ bill: '', people: '', selectedTip: '' })}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
