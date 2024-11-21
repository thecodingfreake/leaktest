import React, { useState, useEffect } from 'react';
import image from "../assests/logo.png"
import './insu.css'

const InsulationCalculator = () => {
  const [selectedInsulation, setSelectedInsulation] = useState('');
  const [costing, setCosting] = useState({
    c4: 0,
    c5: 0,
    BPT: 0,
    RT: 0,
    f19: 0, f25: 0, f32: 0,
    c25: 0, c50: 0,
    R19: 0, R25: 0, R32: 0,
    fl:0,
    fh:0,
    fl2:0,
    fh2:0,
    flc:0,
    fhc:0,
    cl:0,
    ch:0,
    cl2:0,
    ch2:0,
    clc:0,
    chc:0,
    rl:0,
    rh:0,
    rl2:0,
    rh2:0,
    rlc:0,
    rhc:0,
    tp:0,
    t:0,
    lab:0,
    resin:0,
    resintot:0,
    totadd:0,
    mar:0,
    marp:0,
    totam:0,
    dis:0,
    totd:0,
    total:0,
    trans:0,
    totadd2:0
  });
  const [calc, setCalc] = useState({
    foamf: 0, foams: 0, foamc: 0, foamtot: 0,
    ceramicf: 0, ceramics: 0, ceramicc: 0, ceramictot: 0,
    rockwoolf: 0, rockwools: 0, rockwoolc: 0, rockwooltot: 0,
    addtot: 0, profitot: 0, discounttot: 0
  });

  // useEffect(() => {
  //   const storedCosting = JSON.parse(localStorage.getItem('costing'));
  //   if (storedCosting) {
  //     setCosting(storedCosting);
  //   }
  // }, []);

  const handleSelectionChange = (event) => {
    setSelectedInsulation(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCosting((prevCosting) => {
      const updatedCosting = { ...prevCosting, [name]: parseInt(value) };
      console.log(name,value)
      if (name === 'f19') {
        updatedCosting.FFH = updatedCosting.f19;
      }
      calculateTotalCost(updatedCosting); // Use updatedCosting here
      return updatedCosting;
    });
    console.log(costing)
  };
  

  const calculateTotalCost = (costing1) => {
    console.log(costing1)
    const foamf = (costing1.fl * costing1.fh * costing1.FFH)||0;
    const foams = (costing1.fl2 * costing1.fh2 * costing1.FSH)||0;
    const foamc=(costing1.Fc*costing1.flc*costing1.fhc)||0
    const ceramicf=(costing1.cl * costing1.ch * costing1.CFH)||0;
    const ceramics=(costing1.cl2 * costing1.ch2 * costing1.CSH)||0;
    const ceramicc=(costing1.clc * costing1.chc * costing1.Cc)||0;
    const rockwoolf=(costing1.rl * costing1.rh * costing1.RFH)||0;
    const rockwools=(costing1.rl2 * costing1.rh2 * costing1.RSH)||0;
    const rockwoolc=(costing1.rlc * costing1.rhc * costing1.Rc)||0;
    const totadd=(costing1.lab ||0)+(costing1.trans || 0)+((costing1.tp*costing1.t) || 0)+((costing.resin*costing1.resintot) || 0)
    // console.log(totadd)
    let totalCeramic = (ceramicf + ceramics + ceramicc)||0;
    let foamtot = (foamf + foamc + foams)||0;
    let totalRockwool = (rockwoolf + rockwools + rockwoolc)||0;
    const totadd2=(totadd+totalCeramic+foamtot+totalRockwool)||0
    const marp=((totadd2*parseInt(costing1.marp))/100)||0;
    console.log(marp)
    const mar=(marp+totadd2)||0
    const totd=((mar*parseInt(costing1.dis))/100)||0
    const total=(mar-totd)||0
    setCalc((prevCalc) => ({
      ...prevCalc,
      foamf: foamf,
      foams:foams,
      foamc:foamc,
      foamtot: foamtot,
      ceramicf:ceramicf,
      ceramicc:ceramicc,
      ceramics:ceramics,
      totalCeramic:totalCeramic,
      rockwoolf:rockwoolf,
      rockwools:rockwools,
      rockwoolc:rockwoolc,
      totalRockwool:totalRockwool,
      totadd:totadd,
      totadd2:totadd2,
      marp:marp,
      mar:mar,
      totd:totd,
      total:total
    }));
    // console.log(calc)
  };


  const handleInsulationChange = (event) => {
  const selectedValue = event.target.value;
  setSelectedInsulation(selectedValue);

  setCalc((prevCalc) => {
    // Reset values for non-selected insulation types
    const updatedCalc = {
      ...prevCalc,
      foamf: selectedValue === 'foam' ? prevCalc.foamf : 0,
      foams: selectedValue === 'foam' ? prevCalc.foams : 0,
      foamc: selectedValue === 'foam' ? prevCalc.foamc : 0,
      foamtot: selectedValue === 'foam' ? prevCalc.foamtot : 0,

      ceramicf: selectedValue === 'ceramic' ? prevCalc.ceramicf : 0,
      ceramics: selectedValue === 'ceramic' ? prevCalc.ceramics : 0,
      ceramicc: selectedValue === 'ceramic' ? prevCalc.ceramicc : 0,
      totalCeramic: selectedValue === 'ceramic' ? prevCalc.totalCeramic : 0,

      rockwoolf: selectedValue === 'rockwool' ? prevCalc.rockwoolf : 0,
      rockwools: selectedValue === 'rockwool' ? prevCalc.rockwools : 0,
      rockwoolc: selectedValue === 'rockwool' ? prevCalc.rockwoolc : 0,
      totalRockwool: selectedValue === 'rockwool' ? prevCalc.totalRockwool : 0,
    };

    // Update margin and discount based on the selected insulation type
    const selectedTotal =
      selectedValue === 'foam'
        ? updatedCalc.foamtot
        : selectedValue === 'ceramic'
        ? updatedCalc.totalCeramic
        : updatedCalc.totalRockwool;

    const totAdd = (prevCalc.totadd || 0) + selectedTotal;
    const marp = ((totAdd * (costing.marp || 0)) / 100) || 0;
    const mar = totAdd + marp;
    const totd = ((mar * (costing.dis || 0)) / 100) || 0;
    const total = mar - totd;

    return {
      ...updatedCalc,
      totadd2: totAdd,
      marp: marp,
      mar: mar,
      totd: totd,
      total: total,
    };
  });
};

 return(
  <>
  <div className='heading'>
    <h2>SHAM ENGINEERING WORKS INSULATION CALCULATION</h2>
    <img src={image} className='logo'/>
  </div>
  <div className='selection'>
        <div>
          <input 
            type='radio' 
            name="insulation" 
            value="foam" 
            checked={selectedInsulation === "foam"} 
            onChange={handleInsulationChange} 
           />
          <label htmlFor='foam'> Foam</label>
        </div>
        <div> 
          <input 
            type='radio' 
            name="insulation" 
            value="ceramic" 
            checked={selectedInsulation === "ceramic"} 
            onChange={handleInsulationChange} 
     />
          <label htmlFor='ceramic'> Ceramic</label>
        </div>
        <div>
          <input 
            type='radio' 
            name="insulation" 
            value="rockwool" 
            checked={selectedInsulation === "rockwool"} 
            onChange={handleInsulationChange} 
        />
          <label htmlFor='rockwool'> Rockwool</label>
        </div>
      </div>
  <div>
    <div>
      <p style={{display:'inline-block'}}>Cost of Cladding (0.4mm): </p>
      <input className='costing' name="c4"  value={costing.c4 || ''} type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Cost of Cladding (0.5mm): </p>
      <input className='costing' name="c5"  value={costing.c5 || ''} type='number' onChange={handleInputChange} />
    </div>
    </div>
    {selectedInsulation === "foam" && ( <div className="container-1" name="foam-content">
      <p>Foam clacualtion:</p>
      <p>Costing of thickness: </p>
      <div>
      <p style={{display:'inline-block'}}>Cost of 19mm thickness: </p>
      <input className='costing'   value={costing.f19 || ''} type='number' onChange={handleInputChange} name="f19"   />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Cost of 25mm thickness: </p>
      <input className='costing' name="f25" value={costing.f25 || ''} type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Cost of 32mm thickness: </p>
      <input className='costing' name="f32" value={costing.f32 || ''} type='number'onChange={handleInputChange} />
    </div>
      <div>
      <p style={{display:'inline-block'}}>First Layer Thickness</p>
      <select name="FFH" className='costing' id="cars" onChange={handleInputChange}>
        <option value={0}>Choose a thickness</option>
        <option value={costing.f19}>19 mm</option>
        <option value={costing.f25}>25 mm</option>
        <option value={costing.f32}>32 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of first layer foam in sq.m: </p>
      <input className='costing' name="fl"  type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of first layer foam in sq.m: </p>
      <input className='costing' name="fh" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the First layer: {calc.foamf} </p>
    <div>
      <p style={{display:'inline-block'}}>Second Layer Thickness</p>
      <select name="FSH" className='costing' onChange={handleInputChange}>
      <option value={0}>Choose a thickness</option>
      <option value={costing.f19}>19 mm</option>
        <option value={costing.f25}>25 mm</option>
        <option value={costing.f32}>32 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of second layer foam in sq.m: </p>
      <input className='costing' name="fl2" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of second layer foam in sq.m: </p>
      <input className='costing' name="fh2" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the Second layer: {calc.foams}</p>
    <div>
      <p style={{display:'inline-block'}}>Cladding Layer Thickness</p>
      <select name="Fc" className='costing' onChange={handleInputChange}>
      <option value={0}>Choose a thickness</option>
        <option value={costing.c4}>0.4 mm</option>
        <option value={costing.c5}>0.5 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of Cladding layer foam in sq.m: </p>
      <input className='costing' name="flc" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of Cladding layer foam in sq.m: </p>
      <input className='costing' name="fhc" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the Cladding layer:{calc.foamc} </p>
    <p> total cost for the foam:{calc.foamtot} </p>
    </div>)}
    {/* cermaic layer */}
    {selectedInsulation === "ceramic" && (<div className="container-1" name="ceramic-content">
      <p>Ceramic clacualtion:</p>
      <p>Costing of thickness: </p>
      <div>
      <p style={{display:'inline-block'}}>Cost of 25mm thickness: </p>
      <input className='costing'  value={costing.c25 || ''} name="c25" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Cost of 50mm thickness: </p>
      <input className='costing' name="c50"  value={costing.c50 || ''} type='number'onChange={handleInputChange} />
    </div>
      <div>
      <p style={{display:'inline-block'}}>First Layer Thickness</p>
      <select name="CFH" className='costing' id="cars" onChange={handleInputChange}>
      <option value={0}>Choose a thickness</option>
        <option value={costing.c25}>25 mm</option>
        <option value={costing.c50}>50 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of first layer ceramic in sq.m: </p>
      <input className='costing' name="cl" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of first layer ceramic in sq.m: </p>
      <input className='costing' name="ch" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the First layer:{calc.ceramicf} </p>
    <div>
      <p style={{display:'inline-block'}}>Second Layer Thickness</p>
      <select name="CSH" className='costing' onChange={handleInputChange}>
      <option value={0}>Choose a thickness</option>
        <option value={costing.c25}>25 mm</option>
        <option value={costing.c50}>50 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of second layer ceramic in sq.m: </p>
      <input className='costing' name="cl2" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of second layer ceramic in sq.m: </p>
      <input className='costing' name="ch2" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the Second layer:{calc.ceramics} </p>
    <div>
      <p style={{display:'inline-block'}}>Cladding Layer Thickness</p>
      <select name="Cc" className='costing' onChange={handleInputChange}>
      <option value={0}>Choose a thickness</option>
        <option value={costing.c4}>0.4 mm</option>
        <option value={costing.c5}>0.5 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of Cladding layer foam in sq.m: </p>
      <input className='costing' name="clc" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of Cladding layer foam in sq.m: </p>
      <input className='costing' name="chc" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the Cladding layer: {calc.ceramicc}</p>
    <p> total cost for the foam: {calc.totalCeramic}</p>
    </div>)}
    {/* Rockwool costing */}
    {selectedInsulation === "rockwool" && (<div className="container-1" name="foam-content">
      <p>Foam clacualtion:</p>
      <p>Costing of thickness: </p>
      <div>
      <p style={{display:'inline-block'}}>Cost of 19mm thickness: </p>
      <input className='costing'  value={costing.R19 || ''} name="R19" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Cost of 25mm thickness: </p>
      <input className='costing' name="R25"  value={costing.R25 || ''} type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Cost of 32mm thickness: </p>
      <input className='costing' name="R32"  value={costing.R32 || ''} type='number'onChange={handleInputChange} />
    </div>
      <div>
      <p style={{display:'inline-block'}}>First Layer Thickness</p>
      <select name="RFH" className='costing' id="cars" onChange={handleInputChange}>
        
      <option value={0}>Choose a thickness</option>
      <option value={costing.R19}>19 mm</option>
        <option value={costing.R25}>25 mm</option>
        <option value={costing.R32}>32 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of first layer rockwool in sq.m: </p>
      <input className='costing' name="rl" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of first layer rockwool in sq.m: </p>
      <input className='costing' name="rh" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the First layer:{calc.rockwoolf} </p>
    <div>
      <p style={{display:'inline-block'}}>Second Layer Thickness</p>
      <select name="RSH" className='costing' id="cars" onChange={handleInputChange}>
        <option value={costing.R19}>19 mm</option>
        <option value={costing.R25}>25 mm</option>
        <option value={costing.R32}>32 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of second layer rockwool in sq.m: </p>
      <input className='costing' name="rl2" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of second layer rockwool in sq.m: </p>
      <input className='costing' name="rh2" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the Second layer:{calc.rockwools} </p>
    <div>
      <p style={{display:'inline-block'}}>Cladding Layer Thickness</p>
      <select name="Rc" className='costing' onChange={handleInputChange}>
        
      <option value={0}>Choose a thickness</option>
      
      <option value={costing.c4}>0.4 mm</option>
        <option value={costing.c5}>0.5 mm</option>
      </select>
    </div>
    <div>
      <p style={{display:'inline-block'}}>Length of Cladding layer rockwool in sq.m: </p>
      <input className='costing' name="rlc" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Height of Cladding layer rockwool in sq.m: </p>
      <input className='costing' name="rhc" type='number'onChange={handleInputChange} />
    </div>
    <p>Cost for the Cladding layer:{calc.rockwoolc} </p>
    <p> total cost for the Rockwool:{calc.totalRockwool} </p>
    </div>)}
    <div className='container-1'>
      <p>Additional cost</p>
      <div>
      <p style={{display:'inline-block'}}>Labour cost:  </p>
      <input className='costing' name="lab" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Transport cost:  </p>
      <input className='costing' name="trans" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Black tape cost per tape:  </p>
      <input className='costing' name="t"  value={costing.t || ''} type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>quantity of black tape  </p>
      <input className='costing' name="tp" type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Resin per tin cost:  </p>
      <input className='costing' name="resin"  value={costing.resin || ''} type='number'onChange={handleInputChange} />
    </div>
    <div>
      <p style={{display:'inline-block'}}>Quantity of Resin cost:  </p>
      <input className='costing' name="resintot" type='number'onChange={handleInputChange} />
    </div>
    <p>total cost of additonal:{calc.totadd} </p>
    <p>total cost including additional cost: {calc.totadd2}</p>
    </div>
    <div className='container-1'>
    <p style={{display:'inline-block'}}>Margin percent</p>
      <select name="marp" className='costing' onChange={handleInputChange}>
        <option value="0">0 %</option>
        <option value="20">20 %</option>
        <option value="30">30 %</option>
        <option value="50">50 %</option>
        <option value="60">60 %</option>
        <option value="80">80 %</option>
      </select>
      <p>total margin amount (profit):{calc.marp} </p>
      <p>total production amount:{calc.mar} </p>
    </div>
    <div className='container-1'>
    <p style={{display:'inline-block'}}>Discount percent</p>
      <select name="dis" className='costing' onChange={handleInputChange}>
      <option value="0">0 %</option>
        <option value="5">5 %</option>
        <option value="10">10 %</option>
        <option value="15">15 %</option>
        <option value="20">20 %</option>
      </select>
      <p>total Discount amount :{calc.totd} </p>
      <p>total production amount after discount:{calc.total} </p>
    </div>
    
  </>
 )
};

export default InsulationCalculator;
