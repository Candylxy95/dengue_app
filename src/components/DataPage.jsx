import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import Chart from "./Chart";

const DataPage = () => {
  const [dengueData, setDengueData] = useState([]);
  const [offsetValue, setOffsetValue] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [isGraph, setIsGraph] = useState(false);
  const dataset_id = "d_ac1eecf0886ff0bceefbc51556247015";

  const getDengueData = async () => {
    const filtersParam = filterValue
      ? JSON.stringify({ eweek: filterValue })
      : undefined;

    try {
      const res = await axios.get(
        "https://data.gov.sg/api/action/datastore_search",
        {
          params: {
            resource_id: dataset_id,
            offset: offsetValue,
            limit: 106,
            ...(filtersParam && { filters: filtersParam }),
          },
        }
      );
      setDengueData(res.data.result.records);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getDengueData();
  }, [offsetValue, filterValue]);

  //Revise data by grouping dengue and DHF into same object
  const groupedData = dengueData.reduce((acc, currData) => {
    const year = currData.year;
    const week = currData.eweek;

    const uniqueDate = `${year}-${week}`;

    if (!acc[uniqueDate]) {
      acc[uniqueDate] = { year, week, dengue_cases: 0, DHF_cases: 0 };
    }

    const cases = parseInt(currData.number, 10) || 0;

    if (currData.type_dengue === "Dengue") {
      acc[uniqueDate].dengue_cases += cases;
    }

    if (currData.type_dengue === "DHF") {
      acc[uniqueDate].DHF_cases += cases;
    }
    return acc;
  }, {});

  const revisedData = Object.values(groupedData);

  return (
    <div className="flex flex-col align-items">
      <FilterBar
        onForwardClick={() => setOffsetValue((prevValue) => prevValue + 106)}
        onBackwardClick={() =>
          offsetValue > 0 && setOffsetValue((prevValue) => prevValue - 106)
        }
        backwardDisabled={offsetValue === 0 && true}
        setFilterValue={setFilterValue}
        onChartClick={() => setIsGraph((prev) => !prev)}
        isGraph={isGraph}
        filterValue={filterValue}
      />

      {!isGraph ? (
        <table className="border border-stone-950">
          <thead>
            <tr className="text-center border border-stone-950">
              <th className="border border-stone-950 w-1/6">Year</th>
              <th className="border border-stone-950 w-1/6 ">week</th>
              <th className="border border-stone-950 w-2/6">
                Dengue Fever Cases
              </th>
              <th className="border border-stone-950 w-3/6">
                Dengue Haemorrhagic Fever Cases
              </th>
            </tr>
          </thead>
          <tbody>
            {revisedData.length > 0 ? (
              revisedData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="text-center">{data.year}</td>
                  <td className="text-center">{data.week}</td>
                  <td className="text-center">{data.dengue_cases}</td>
                  <td className="text-center">{data.DHF_cases}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <Chart data={revisedData} />
      )}
    </div>
  );
};

export default DataPage;
