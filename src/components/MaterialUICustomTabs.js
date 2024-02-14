import { Tab, Tabs } from "@mui/material";
import React from "react";

export const MaterialUICustomTabs = ({ activeTab, setActiveTab, tabsData }) => {
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Tabs
      value={activeTab}
      onChange={handleChange}
      aria-label="basic tabs example"
    >
      {tabsData.map((item, index) => {
        return (
          <Tab
            key={index}
            label={item.label}
            value={item.value}
            sx={{ textTransform: "none" }}
          />
        );
      })}
    </Tabs>
  );
};
