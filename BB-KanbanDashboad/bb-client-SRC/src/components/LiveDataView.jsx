
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jql } from '../utils/jqlHelper';
import './Styles/livedataview.css'

import { calculateSprintDates, calculateSprintEndDate, calculateStartDateFor14DayPeriod } from '../utils/dataCalculator';

export const exportToExcel = (jsonData,targetDate, fileName = 'data', sheetName = 'Sheiet1') => {
    if (!jsonData || jsonData.length === 0) {
        console.warn("No data provided for Excel export.");
        return;
    }

    // 1. Create a worksheet from JSON data
    // json_to_sheet automatically extracts headers from the keys of the first object
    const ws = XLSX.utils.json_to_sheet(jsonData);

    // 2. Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${fileName}_${targetDate}_sheet`);

    // 3. Write the workbook to a buffer
    // { bookType: 'xlsx' } specifies the Excel format
    // { type: 'array' } tells it to output as a byte array
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // 4. Create a Blob from the buffer and save it
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, `${fileName}_${targetDate}.xlsx`);
};





const LiveDataView = () => {

    const initialjql = `Project in (SCPA, PAYSYS, TMSPON) AND Type NOT in ("EPIC")
AND ((assignee in (e.subbiah, Anushree.Chandrasek, Soujanya.Shetty, sumitha.kumari, Sai.Suluru, praveer.nair, srinithi.ilangovan, vivekprabhakaran.j)) 
OR ( (issueFunction in commented("by e.subbiah") OR issuekey in updatedBy(e.subbiah) )
OR ( issueFunction in commented("by Anushree.Chandrasek") OR issuekey in updatedBy( Anushree.Chandrasek) )
OR ( issueFunction in commented("by Soujanya.Shetty") OR issuekey in updatedBy(Soujanya.Shetty) )
OR ( issueFunction in commented("by sumitha.kumari") OR issuekey in updatedBy(sumitha.kumari) )
OR ( issueFunction in commented("by Sai.Suluru") OR issuekey in updatedBy(Sai.Suluru) )
OR ( issueFunction in commented("by praveer.nair") OR issuekey in updatedBy(praveer.nair) )
OR ( issueFunction in commented("by srinithi.ilangovan") OR issuekey in updatedBy(srinithi.ilangovan) )
OR ( issueFunction in commented("by vivekprabhakaran.j") OR issuekey in updatedBy(vivekprabhakaran.j) ) ))
`

    const [targetDate, setTargetDate] = useState('');
    const [query, setQuery] = useState(initialjql);
    const [jqlQuery, setJqlQuery] = useState('');
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [podName, setPodName] = useState('Money Matrix');
    const startDate = calculateStartDateFor14DayPeriod(targetDate);

    useEffect(() => {
        console.log(calculateSprintDates(targetDate))
        const dynamicDateJql = `AND ( ((updatedDate >=${startDate}) AND updatedDate <=${targetDate}) OR (issueFunction in commented ( "after ${startDate} before ${targetDate}")) ) ORDER BY status ASC`
        const constructedJql = `${query} ${dynamicDateJql}`;

        if (!targetDate) {
            setJqlQuery(initialjql);
            return;
        }

        setJqlQuery(constructedJql);

    }, [targetDate, query]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setStatuses({});

        try {
            const response = await axios.post('http://localhost:3001/api/jira-status', {
                jqlQuery,
                targetDate
            });
            
            setStatuses(response.data);
            // console.log(response.data)
            exportToExcel(response.data,targetDate,podName) 
        } catch (err) {
            console.error('Error fetching Jira statuses:', err);
            setError(err.response?.data?.error || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className={"info-container"}>
                <div>
                    <textarea
                        id="jqlQuery"
                        rows="5"
                        cols="70"
                        value={jqlQuery}
                        onChange={(e) => setJqlQuery(e.target.value)}
                        style={{ padding: '8px', boxSizing: 'border-box', marginBottom: '15px' }}
                    />
                    <div className={"date-container"}>
                        <button onClick={() => {
                            setTargetDate(calculateSprintEndDate(targetDate, "prev"))
                        }}> {'<< Prev Sprint End'}</button>
                        <input
                            type="date"
                            id="targetDate"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            style={{ padding: '8px', boxSizing: 'border-box' }}
                        />
                        <button onClick={() => {
                            setTargetDate(calculateSprintEndDate(targetDate, "next"))
                        }}>{'Next Sprint End >>'}</button>

                        <button onClick={handleSubmit} disabled={!targetDate || loading} style={{ backgroundColor: `${targetDate ? '#3498db' : '#e0e0e0'}` }}>
                            {loading ? 'Fetching...' : 'Submit'}
                        </button>
                    </div>

                    {error && (
                        <div style={{ color: 'red', marginTop: '20px' }}>
                            <p>Error: {error}</p>
                        </div>
                    )}
                </div>
                <div className='pod-container'>
                    <button className='btn' onClick={() => { setQuery(jql['mm']);setPodName('Money_Matrix') }}>Money Matrix</button>
                    <button className='btn' onClick={() => { setQuery(jql['pp']);setPodName('Power_Play') }}>Power Play</button>
                    <button className='btn'>Orion</button>
                    <button className='btn'> Placeholder</button>
                </div>
            </div>
       

        </>
    );
}

export default LiveDataView;