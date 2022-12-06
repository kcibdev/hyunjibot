import fs from "fs";

export const appendToJson = (data: {
  userId: string;
  mobile: string;
  question: string;
  answer: string;
  device: string;
  date: number;
}) => {
  if (!fs.existsSync("data.json")) {
    //create new file if not exist
    fs.closeSync(fs.openSync("data.json", "w"));
  }
  // read file
  const file = fs.readFileSync("data.json");
  //check if file is empty
  if (file.length < 1) {
    //add data to json file
    fs.writeFileSync("data.json", JSON.stringify([data]));
  } else {
    var myObject = JSON.parse(file.toString());

    // Defining new data to be added

    // Adding the new data to our object
    myObject.push(data);

    // Writing to our JSON file
    var newData2 = JSON.stringify(myObject);
    fs.writeFile("data.json", newData2, (err) => {
      // Error checking
      if (err) throw err;
      console.log("New data added");
    });
    //   //append data to jso file
    //   let json = JSON.parse(file.toString());
    //   //add json element to json object
    //   json.push(data);
    //   fs.writeFileSync("data.json", JSON.stringify(data));
  }
};
