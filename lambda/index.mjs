import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
const dynamodbClient = new DynamoDBClient({ region: "us-east-2" });
const s3Client = new S3Client({ region: "us-east-2" });

function generateRandom12DigitNumber() {
  let randomNumber = '';
  for (let i = 0; i < 12; i++) {
    randomNumber += Math.floor(Math.random() * 10).toString();
  }
  return randomNumber;
}
export const handler = async (event) => {
  const tableName = "users";
  const bucketName = 'myfilestorage1';
  const id = generateRandom12DigitNumber()
  const boundary = getBoundary(event.headers);
  const result = parseMultipart(event.body, boundary, event.isBase64Encoded);
  const { firstName, lastName, filePath, fileContent, contentType } = result;
  const S3params = {
    Bucket: bucketName,
    Key: filePath,
    Body: Buffer.from(fileContent, 'base64'),
    ContentType: contentType || 'image/jpeg'
  };
  const params = {
    TableName: tableName,
    Item: {
      id: { S: id },
      firstName: { S: firstName },
      lastName: { S: lastName },
      profileImg: { S: filePath }
    }
  };

  try {
    // Upload the file to S3
    const s3data = await s3Client.send(new PutObjectCommand(S3params));
    console.log(`File uploaded successfully.`, s3data);
    // Put item into DynamoDB
    const data = await dynamodbClient.send(new PutItemCommand(params));
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: "Item inserted successfully", id: id })
    };
  } catch (err) {
    console.error("Error inserting item:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error inserting item", error: err.message })
    };
  }
};

function getBoundary(headers) {
  const contentTypeHeader = Object.keys(headers).find(key => key.toLowerCase() === 'content-type');
  const contentType = headers[contentTypeHeader];
  const items = contentType.split(";");
  for (let i = 0; i < items.length; i++) {
    const item = (String(items[i])).trim();
    if (item.indexOf("boundary") >= 0) {
      const k = item.split("=");
      return (String(k[1])).trim();
    }
  }
  return "";
}

function parseMultipart(body, boundary, isBase64Encoded) {
  const result = {};
  const lines = (isBase64Encoded ? Buffer.from(body, 'base64').toString('binary') : body).split(`--${boundary}`);

  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];
    const parts = line.split("\r\n\r\n");

    const nameMatch = parts[0].match(/name="([^"]+)"/);
    const filenameMatch = parts[0].match(/filename="([^"]+)"/);

    if (nameMatch) {
      const name = nameMatch[1];
      const content = parts[1].split("\r\n")[0];

      if (filenameMatch) {
        result[name] = filenameMatch[1];
        result['fileContent'] = content;
        const contentTypeMatch = parts[0].match(/Content-Type:\s?([^\r\n]+)/);
        if (contentTypeMatch) {
          result['contentType'] = contentTypeMatch[1];
        }
      } else {
        result[name] = content;
      }
    }
  }

  return result;
}
