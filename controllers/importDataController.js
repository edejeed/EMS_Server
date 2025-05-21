import Employee from "../model/Employee.js"
import fs from "fs";
import csv from "csv-parser";

const importData = async (req, res) => {
  if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const results = [];

  fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {

          try {
              // Map CSV data to Employee model fields
              const employees = results.map((row) => ({
                Lastname: row['Last Name'],
                Firstname: row['First Name'],
                position: row.Position,
                jobType: row['Job Type'],
                division: row.Division,
                hiringDate: new Date(row[' Regular']), 
                salary: parseFloat(row[' Rate'].replace(/,/g, '').trim())
            }));
            

              // Insert data into MongoDB
              await Employee.insertMany(employees);

              console.log("Inserted data:", employees);
              res.status(200).json({
                  success: true,
                  message: "CSV data uploaded successfully!",
                  insertedCount: employees.length
              });
          } catch (error) {
              console.error("Error inserting data:", error);
              res.status(500).json({ success: false, message: "Failed to upload data" });
          }
      });
};

export {importData}
