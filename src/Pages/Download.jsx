
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import image from "../assests/p1.bmp";
const Download = ({ state = {} }) => {
    const location = useLocation();
    const getValue = (value) => (value !== undefined ? value : '-');
    console.log(location.state)
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    
    useEffect(() => {
        // Retrieve images from local storage
        const storedImage1 = localStorage.getItem('image1');
        const storedImage2 = localStorage.getItem('image2');

        if (storedImage1) {
            // console.log('Image 1 found in local storage:', storedImage1);
            setImage1(storedImage1);
        } else {
            console.warn('No image1 found in local storage');
        }

        if (storedImage2) {
            // console.log('Image 2 found in local storage:', storedImage2);
            setImage2(storedImage2);
        } else {
            console.warn('No image2 found in local storage');
        }
    }, []);
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    };
    const promptForErase = () => {
        const confirmErase = window.confirm('Do you want to erase the images from local storage?');
        if (confirmErase) {
            localStorage.removeItem('image1');
            localStorage.removeItem('image2');
            setImage1(null);
            setImage2(null);
            alert('Images erased from local storage.');
        } else {
            alert('Images retained in local storage.');
        }
    };
const downloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.7); // Use JPEG format with 70% quality
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 250; // Slightly wider to reduce side margins
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0; // Start from the very top of the page

        // Add the first page without margins
        pdf.addImage(imgData, 'JPEG', -20, position, imgWidth, imgHeight); // Start slightly off to the left to center better
        heightLeft -= pageHeight;

        // Handle multiple pages without margins
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', -20, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('service-order-form.pdf');
        localStorage.removeItem('formData')
        promptForErase();
    });
};

    return (
        <>
            <div id='pdf-content' style={{ marginTop: '80px' }}>
                <h1 className='report-h1'>IFF Refrigerant Service Order Form</h1>

                <div className='row-1'>
                    <div className='col-1'>
                        <p><strong>Service Id: </strong>{getValue(location.state.serviceId)}</p>
                        <br/>
                        <p><strong>Work order: </strong>{getValue(location.state.workOrder)}</p>
                        <br/>

                        <p><strong>Date issue: </strong>{formatDate(location.state.dateIssued)}</p>
                        <br/>

                        <p><strong>Completed date: </strong>{formatDate(location.state.dateCompleted)}</p>
                        <br/>

                        <p><strong>Contractors / Technicians: </strong>{getValue(location.state.contractors)}</p>
                        <br/>

                    </div>
                    <div className='col-2'>

                        <p><strong> IFF Ltd., Sricity, General Location: </strong>{getValue(location.state.generalLocation)}</p>
                        <br/>
                        <div className="inline-fields">
                            <p><strong>EquipmentID: </strong>{getValue(location.state.equipmentId)}</p>
                        </div>
                        <br/>
                        <div className="inline-fields">
                            <p><strong>Sublocation: </strong>{getValue(location.state.subLocation)}</p>
                            <p><strong>Model: </strong>{getValue(location.state.model)}</p>
                        </div>
                        <br/>
                        <div className="inline-fields">
                            <p><strong>Manufacturer: </strong>{getValue(location.state.manufacturer)}</p>
                            <p><strong>Unit type: </strong>{getValue(location.state.unitType)}</p>
                        </div>
                        <br/>
                        <div className="inline-fields">
                            <p><strong>Refrigerant: </strong>{getValue(location.state.refrigerant)}</p>
                            <p><strong>Charge FUll Kgs: </strong>{getValue(location.state.Fullkgs)}</p>
                        </div>
                        <br/>
                    </div>
                </div>
                <div className='row-2'>
                <p style={{display:'flex', justifyContent:"center"}}><strong style={{marginRight:"20px"}}>Service request:</strong>{getValue(location.state.serviceRequest)}</p>

                </div>
                <div className='row-2'>
                    <p><strong>Service description: </strong>{getValue(location.state.serviceDescription)}</p>
                    <div className='formTextGroup checkInputs' style={{paddingTop:'0px'}}>
                        <div>
                            <ul>
                                <li>
                                    <input  type="checkbox" name="IsolatedLeak" id="IsolatedLeak" />
                                    <label htmlFor="IsolatedLeak">Isolated Leak</label>
                                </li>
                                <li>
                                    <input type="checkbox" name="RefrigerantConversion" id="RefrigerantConversion" />
                                    <label htmlFor="RefrigerantConversion">Refrigerant Conversion</label>
                                </li>
                                <li>
                                    <input type="checkbox" name="MajorMaintenance" id="MajorMaintenance" />
                                    <label htmlFor="MajorMaintenance">Major Maintenance</label>
                                </li>
                                <li>
                                    <input type="checkbox" name="DisposeofUnit" id="DisposeofUnit" />
                                    <label htmlFor="DisposeofUnit">Dispose of Unit</label>
                                </li>
                                <li>
                                    <input type="checkbox" name="LeakTest" id="LeakTest" />
                                    <label htmlFor="LeakTest">Leak Test</label>
                                </li>
                                <li>
                                    <input type="checkbox" name="MinorMaintenance" id="MinorMaintenance" />
                                    <label htmlFor="MinorMaintenance">Minor Maintenance</label>
                                </li>
                                <li>
                                    <input type="checkbox" name="RecoveryStopped" id="RecoveryStopped" />
                                    <label htmlFor="RecoveryStopped">Recovery Stopped (Air)</label>
                                </li>
                                <li>
                                    <input type="checkbox" name="TransferedTo" id="TransferedTo" />
                                    <label htmlFor="TransferedTo">Transferred to receiver / condenser / pump out unit</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                <div style={{ maxWidth: '1000px', margin: '0 auto', marginTop: '20px' }}>
                    <p><strong>Notes: {getValue(location.state.notes)}</strong></p>
                    <div className="table-container">
                    <table className="refrigerant-table">
                        <thead>
                            <tr>
                                <th>Refrigerant</th>
                                <th>Cylinder ID</th>
                                <th>Type</th>
                                <th>Condition</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Recovered</td>
                                <td>{getValue(location.state.cylinderId1)}</td>
                                <td>{getValue(location.state.type1)}</td>
                                <td>{getValue(location.state.condition1)}</td>
                                <td>{getValue(location.state.w1)} Kg &nbsp; {getValue(location.state.grm1)} grm</td>
                            </tr>
                            <tr>
                                <td>Added (No cylinder ID# if contractor Supplied)</td>
                                <td>{getValue(location.state.cylinderId2)}</td>
                                <td>{getValue(location.state.type2)}</td>
                                <td>{getValue(location.state.condition2)}</td>
                                <td>{getValue(location.state.w2)} Kg &nbsp; {getValue(location.state.grm2)} grm</td>
                            </tr>
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>New unit start-up charge</td>
                                <td>{getValue(location.state.kg)}Kg &nbsp; {getValue(location.state.grm3)}grm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>




                <div className="leak-container">
                    <div className="leak-details">
                        <h2>Leaks</h2>
                        <p><div style={{marginLeft:"70px",marginRight:"200px", display:"inline-block"}}>Leak found:</div> date: {formatDate(location.state.lid)}</p>
                        <br/>
                        <p><div style={{marginLeft:"70px",marginRight:"183px",display:"inline-block"}}>Leak repaired:</div> date: {formatDate(location.state.date1)}</p>
                        <br/>
                        <p><div style={{marginLeft:"70px",marginRight:"89px", display:"inline-block"}}>Initial Leak Verification Test:</div> date: {formatDate(location.state.ILVT)}</p>
                        <br/>
                        <p><div style={{marginLeft:"32px",marginRight:"77px", display:"inline-block",fontSize:"12px"}}> Test done after repair before charging</div> method: {getValue(location.state.TDAFRBC)}</p>
                        <br/>
                        <p><div style={{marginLeft:"70px",marginRight:"89px", display:"inline-block"}}>Follow-up Verification Test:</div> date: {formatDate(location.state.FUVT)}</p>
                        <br/>
                        <p><div style={{marginLeft:"32px",marginRight:"70px", display:"inline-block",fontSize:"12px"}}>Test done with unit running under normal load</div> method: {getValue(location.state.TDWURUNL)}</p>
                    </div>

                    <div className="leak-notes">
                        <p><strong>Leak notes:</strong></p>
                        <p>{getValue(location.state.Lnotes)}</p>
                    </div>
                </div>

                <div className='row-6' style={{display:"flex", alignItems:"center", justifyContent:"space-around", border:"none"}}>
                    <p>Trace gas used</p>
                    <p>Type: {getValue(location.state.type3)}</p>
                    <p>Cylinder id: {getValue(location.state.cylinderId3)}</p>
                    <p>Quantity: {getValue(location.state.Quantity)}</p>
                </div>
                {/* <hr style={{color:"black"}}/> */}
                <div className='row-6' style={{border:"none",borderTop:"1px solid black"}}>
                    <p style={{marginBottom:"7px"}}><strong style={{marginRight:"20px"}}>Accidental Release Occurred</strong></p>
                    <p style={{marginBottom:"7px"}}><strong style={{marginRight:"20px"}}>Description:</strong>{getValue(location.state.Adescrip)}</p>
                    <p style={{marginBottom:"7px"}}><strong style={{marginRight:"20px"}}>Estimated Amount Released:</strong>{getValue(location.state.kg2)} kg {getValue(location.state.grm4)} grm</p>
                    <p style={{marginBottom:"7px"}}><strong style={{marginRight:"20px"}}>Percent loss from Unit:</strong>{getValue(location.state.loss)}</p>
                </div>
                </div>


                <div className='row-6' style={{display:"flex", alignItems:"center"}}>
                <p><strong>Leak Tester Make / Model: IFLUKE / ii900 Industrial Acoustic Imager</strong></p>
                </div>

                <div className="image-container">
                    <div className="image-section">
                        <h3>{getValue(location.state.model)}</h3>
                        <img src={image1} alt="First Image" className="comparison-image" />
                    </div>
                    <div className="image-section">
                        <h3>{getValue(location.state.model)}</h3>
                        <img src={image2} alt="Second Image" className="comparison-image" />
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button className='btn' onClick={downloadPDF}>Download as PDF</button>
            </div>
        </>
    );
};

export default Download;
