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
  if (file.length == 0) {
    //add data to json file
    fs.writeFileSync("data.json", JSON.stringify([data]));
  } else {
    //append data to jso file
    const json = JSON.parse(file.toString());
    //add json element to json object
    json.push(data);
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
};
