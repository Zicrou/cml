import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Dropdown } from "react-bootstrap";
import "../screens/ViewUpcomingEvent/style.css";
import { ChartsComponentProps } from "../types"

const Charts: React.FC<ChartsComponentProps> = (props: ChartsComponentProps) => {
  const { chartsData } = props;
  const { dataDonut, dataBarMen, dataBarWomen } = chartsData;
  const [gender, setGender] = useState("male");
  const options = {
    maintainAspectRatio: true,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          {dataDonut ? (
            <Pie data={dataDonut} width={100} height={30} options={options} />
          ) : null}
        </div>
      </div>

      <div className="row">
        <div className="col-md-2 col-lg-2 col-sm-2">
          <Dropdown className="when-and-where-custom-dropdown">
            <Dropdown.Toggle
              variant="default"
              id="dropdown-basic"
              className="dropdown-toggle menu-btn"
            >
              {gender === "male" ? "Male" : "Female"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setGender("male");
                }}
              >
                Male
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setGender("female");
                }}
              >
                Female
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-md-10 col-lg-10 col-sm-10"></div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <Bar
            data={gender === "male" ? dataBarMen : dataBarWomen}
            width={100}
            height={50}
            options={{ maintainAspectRatio: true }}
          />
        </div>
      </div>
    </>
  );
};
export default Charts;
