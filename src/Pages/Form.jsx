import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForumbee } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Select from 'react-select';
const Form = () => {
    const [formData, setFormData] = useState({});
    const [imagePreviews, setImagePreviews] = useState({ image1: null, image2: null });
    const [dropdownData, setDropdownData] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://leaktestb.onrender.com/data/')
            .then(response => response.json())
            .then(data => setDropdownData(data))
            .catch(error => console.error('Error fetching dropdown data:', error));

        const storedData = JSON.parse(localStorage.getItem('formData')) || {};
        setFormData(storedData);

        const storedImage1 = localStorage.getItem('image1');
        const storedImage2 = localStorage.getItem('image2');
        if (storedImage1) setImagePreviews(prev => ({ ...prev, image1: storedImage1 }));
        if (storedImage2) setImagePreviews(prev => ({ ...prev, image2: storedImage2 }));
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('formData', JSON.stringify(formData));
        if (imagePreviews.image1) localStorage.setItem("image1", imagePreviews.image1);
        if (imagePreviews.image2) localStorage.setItem("image2", imagePreviews.image2);
        navigate('/download', { state: formData });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e, imageKey) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevData => ({
                ...prevData,
                [imageKey]: file
            }));
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setImagePreviews(prev => ({
                    ...prev,
                    [imageKey]: fileReader.result
                }));
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleSelectChange = (selectedOption, field) => {
      
        if(selectedOption==null){
            setFormData(prevData => ({
                ...prevData,
                [field]: "",
                [`${field}Label`]: ""
            }));    
        }
        else{
        setFormData(prevData => ({
            ...prevData,
            [field]: selectedOption.value ? selectedOption.value : "",
            [`${field}Label`]: selectedOption ? selectedOption.label : ""
        }));
    }
        // console.log(formData)
    };

    const getFilteredOptions = useCallback((field) => {
        let options = dropdownData;
        
        if (formData.equipmentId) {
            options = options.filter(item => item.equipmentId === formData.equipmentId);
        }
        if (formData.subLocation) {
            options = options.filter(item => item.subloaction === formData.subLocation);
        }
        if (formData.model) {
            options = options.filter(item => item.model === formData.model);
        }
        if (formData.refrigerant) {
            options = options.filter(item => item.Rtype === formData.refrigerant);
        }
        if (formData.unitType) {
            options = options.filter(item => item.type === formData.unitType);
        }

        options = options.map(item => item[field]);
        options = [...new Set(options)];

        return options.map(option => ({ value: option, label: option }));
    }, [dropdownData, formData]);

    useEffect(() => {
        const updatedFilteredOptions = {
            equipmentId: getFilteredOptions('equipmentId'),
            subLocation: getFilteredOptions('subLocation'),
            model: getFilteredOptions('model'),
            refrigerant: getFilteredOptions('refrigerant'),
            unitType: getFilteredOptions('unitType')
        };
        setFilteredOptions(updatedFilteredOptions);
    }, [getFilteredOptions]);
    
    return (
    <>
        <div className='pageBody'>
            <div className="topBody">
                <FontAwesomeIcon icon={faForumbee} />
            </div>
            <div className='midBody'>
                <h1>Main Form</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <form className="formBody">
                <div className="formSections">
                    <h2>Service Details</h2>
                    <hr />
                    <div className='formTextGroup'>
                        <p>Service ID<span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='id here...'
                              name="serviceId" value={formData.serviceId || ''} onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Work Order<span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='id here...'
                              name="workOrder" value={formData.workOrder || ''} onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Date Issued<span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="date" placeholder='id here...'
                             name="dateIssued" value={formData.dateIssued || ''} onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Date Completed<span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="date" placeholder='id here...'
                            name="dateCompleted" value={formData.dateCompleted || ''} onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Contractors/Technicians<span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='id here...'
                             name="contractors" value={formData.contractors || ''} onChange={handleInputChange}  />
                        </div>
                    </div>
                </div>

                <div className="formSections">
                    <h2>Location Details</h2>
                    <hr />
                    <div className='formTextGroup'>
                        <p>General Location: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='id here...'
                             name="generalLocation" value={formData.generalLocation || ''} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="formTextGroup">
                    <p>Equipment ID<span>*</span></p>
                    <div>
                    <FontAwesomeIcon icon={faForumbee} />

                    <Select options={getFilteredOptions("equipmentId")} value={ formData.equipmentId 
                    ? { value: formData.equipmentId, label: formData.equipmentIdLabel }: null }
                    onChange={(selectedOption) => handleSelectChange(selectedOption, "equipmentId")}
                    placeholder="Select Equipment ID"
                    isClearable
                    />
                    </div>
                </div>
                    <div className='formTextGroup'>
                        <p>SubLocation<span>*</span></p>
                       <div>
                    <FontAwesomeIcon icon={faForumbee} />

                    <Select options={getFilteredOptions("subloaction")} value={ formData.subLocation 
                    ? { value: formData.subLocation, label: formData.subLocation }: null }
                    onChange={(selectedOption) => handleSelectChange(selectedOption, "subLocation")}
                    placeholder="Select Sub Location"
                    isClearable
                    />
                    </div>
                    </div>
                    <div className="formTextGroup">
                    <p>Model<span>*</span></p>
                    <div>
                    <FontAwesomeIcon icon={faForumbee} />
                    <Select
                        options={getFilteredOptions("model")}
                        value={formData.model ? { value: formData.model,label: formData.model  } : null}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, "model")}
                        placeholder="Select Model"
                        isClearable
                    />
                    </div>
                </div>
                    <div className='formTextGroup'>
                        <p>Manufacturer<span>*</span></p>
                        <div>
                    <FontAwesomeIcon icon={faForumbee} />
                    <Select
                        options={getFilteredOptions("manufacturer")}
                        value={formData.manufacturer ? { value: formData.manufacturer,label: formData.manufacturer  } : null}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, "manufacturer")}
                        placeholder="Select Manufacturer"
                        isClearable
                    />
                    </div>
                    </div>
                    <div className="formTextGroup">
                    <p>Refrigerant<span>*</span></p>
                    <div>
                    <FontAwesomeIcon icon={faForumbee} />
                    <Select
                        options={getFilteredOptions("Rtype")}
                        value={formData.refrigerant ? { value: formData.refrigerant,label: formData.refrigerant  } : null}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, "refrigerant")}
                        placeholder="Select Refrigerant"
                        isClearable
                    />
                    </div>
                </div>
                <div className="formTextGroup">
                    <p>Unit Type<span>*</span></p>
                    <div>
                    <FontAwesomeIcon icon={faForumbee} />

                    <Select
                        options={getFilteredOptions("type")}
                        value={formData.unitType ? { value: formData.unitType,label: formData.unitType  } : null}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, "unitType")}
                        placeholder="Select Unit Type"
                        isClearable
                    />
                    </div>
                </div>
                    <div className='formTextGroup'>
                        <p>Charge Full Kgs<span>*</span></p>
                        <div>
                    <FontAwesomeIcon icon={faForumbee} />

                    <Select
                        options={getFilteredOptions("charge")}
                        value={formData.Fullkgs ? { value: formData.Fullkgs,label: formData.Fullkgs  } : null}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, "Fullkgs")}
                        placeholder="Select Charge"
                        isClearable
                    />
                    </div>
                    </div>
                </div>

                <div className="formSections">
                    <h2>Service</h2>
                    <hr />
                    <div className='formTextGroup'>
                        <p>Service Request <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='id here...'
                           name="serviceRequest" value={formData.serviceRequest || ''}  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Service Description: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <textarea placeholder='id here...'
                            name="serviceDescription" value={formData.serviceDescription || ''} onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup' style={{marginTop:"60px"}}>
                        <p>Notes <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='id here...' name="notes"
                            value={formData.notes || ''}  onChange={handleInputChange}  />
                        </div>
                    </div>
                </div>

                <div className="formSections">
                    <h2>Refrigerant</h2>
                    <hr />
                    <div className='formTextGroup tableInputs'>
                        <p>Recovered <span>*</span></p>
                        <div>
                            <input type="text" placeholder='Cylinder ID'
                            name="cylinderId1" value={formData.cylinderId1 || ''} onChange={handleInputChange}  />
                            <input type="text" placeholder='Type'
                              name="type1" onChange={handleInputChange}  />
                            <input type="text" placeholder='Condition'
                             name="condition1" value={formData.condition1 || ''} onChange={handleInputChange}  />
                            Weight =
                            <input type="text" placeholder='Kg'
                             name="w1" value={formData.w1 || ''} onChange={handleInputChange}  />
                            <input type="text" placeholder='grm'
                             name="grm1" value={formData.grm1 || ''} onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup tableInputs'>
                        <p>Added (No cylinder ID if contractor Supplied)</p>
                        <div>
                            <input type="text" placeholder='Cylinder ID' name="cylinderId2" value={formData.cylinderId2 || ''} onChange={handleInputChange}/>
                            <input type="text" placeholder='Type' name='type2' value={formData.type2 || ''} onChange={handleInputChange}/>
                            <input type="text" placeholder='Condition' name="condition2"  value={formData.condition2 || ''}onChange={handleInputChange}/>
                            Weight =
                            <input type="text" placeholder='Kg' name="w2" value={formData.w2 || ''} onChange={handleInputChange}/>
                            <input type="text" placeholder='grm' name="grm2" value={formData.grm2 || ''} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>New unit start-up charge</p>
                        <div style={{height:'30px'}}>
                            <input type="text" placeholder='Kg' name="kg" value={formData.kg || ''}
                              onChange={handleInputChange}  />
                            <input type="text" placeholder='grm' value={formData.grm3 || ''}
                              onChange={handleInputChange}  name="grm3"/>
                        </div>
                    </div>
                </div>

                <div className="formSections">
                    <h2>Leaks</h2>
                    <hr />
                    <div className='formTextGroup'>
                        <p>Leak Found: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="date" placeholder='id here...' value={formData.lid || ''}
                            name="lid"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Leak Repaired: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="date" placeholder='id here...' value={formData.date1 || ''}
                            name="date1"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Initial Leak Verification Test (date): <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="date" placeholder='id here...' value={formData.ILVT || ''}
                            name="ILVT"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Test done after repair before charging (methode): <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='type method here...' value={formData.TDAFRBC || ''}
                            name="TDAFRBC"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Follow-up Verification Test (date): <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="date" placeholder='type method here...' value={formData.equipmentId || ''}
                            name="FUVT"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Test done with unit running under normal load (method): <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='type method here...' value={formData.TDWURUNL || ''}
                            name="TDWURUNL"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Leak Notes: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <textarea placeholder='id here...' value={formData.Lnotes || ''}
                            name="Lnotes"  onChange={handleInputChange}  />
                        </div>
                    </div>
                </div>

                <div className="formSections" style={{marginTop:'75px'}}>
                    <h2>Trace Gas Used</h2>
                    <hr />
                    <div className='formTextGroup'>
                        <p>Type of gas: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type='text' placeholder='type here...' value={formData.type3 || ''}
                            name="type3"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Cylinder ID: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type='text' placeholder='id here...' value={formData.cylinderId3 || ''}
                            name="cylinderId3"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Quantity: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type='text' placeholder='volume here...' value={formData.Quantity || ''}
                            name="Quantity"  onChange={handleInputChange}  />
                        </div>
                    </div>
                </div>

                <div className="formSections">
                    <h2>Accidental Release</h2>
                    <hr />
                    <div className='formTextGroup'>
                        <p>Description: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <textarea placeholder='id here...' value={formData.Adescrip || ''}
                            name="Adescrip"  onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup' style={{marginTop:'75px'}}>
                        <p>Estimated Amount Released: <span>*</span></p>
                        <div>
                            <input type='text' placeholder='Kg' name="kg2"  onChange={handleInputChange} value={formData.kg2 || ''} />
                            <input type='text' placeholder='grm' name="grm4"  onChange={handleInputChange} value={formData.grm4 || ''} />
                        </div>
                    </div>
                    <div className='formTextGroup'>
                        <p>Percent loss from Unit: <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type='text' placeholder='% here...' name="loss" value={formData.loss || ''}
                              onChange={handleInputChange}  />
                        </div>
                    </div>
                    
                </div>

                <div className="formSections">
                    <h2>Others</h2>
                    <hr />
                    <div className='formTextGroup'>
                        <p>Leak Tester Make
                        Model <span>*</span></p>
                        <div>
                            <FontAwesomeIcon icon={faForumbee} />
                            <input type="text" placeholder='model here...' name="others" value={formData.others || ''}
                              onChange={handleInputChange}  />
                        </div>
                    </div>
                    <div className='formTextGroup imageInputs'>
                        <p>Accoustic Image - AHU-FGFL-1-ID-D2 <span>*</span></p>
                        <div>
                            <input type="file" onChange={(e) => handleImageChange(e, 'image1')} />
                            {imagePreviews.image1 && <img src={imagePreviews.image1} alt="Preview of Image 1" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                        </div>
                    </div>
                    <div className='formTextGroup imageInputs'>
                        <p>Accoustic Image - AHU-FGFL-1-OD-D2 <span>*</span></p>
                        <div>
                            <input type="file" onChange={(e) => handleImageChange(e, 'image2')} />
                            {imagePreviews.image2 && <img src={imagePreviews.image2} alt="Preview of Image 2" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                        </div>
                    </div>
                </div>

                <button className='sumbitButton' onClick={handleFormSubmit}>Submit</button>
            </form>
        </div>
    </>
  )
}

export default Form
